-- ============================================
-- 기존 kv_store_41d28b0a 데이터를 새 테이블로 마이그레이션
-- ============================================
-- 주의: schema.sql을 먼저 실행한 후 이 스크립트를 실행하세요.

-- 1. 임시 함수: JSON에서 안전하게 텍스트 추출
CREATE OR REPLACE FUNCTION safe_text(json_val JSONB, key_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN json_val ->> key_name;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 2. 임시 함수: JSON에서 안전하게 정수 추출
CREATE OR REPLACE FUNCTION safe_int(json_val JSONB, key_name TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE((json_val ->> key_name)::INTEGER, 0);
EXCEPTION WHEN OTHERS THEN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

-- 3. 임시 함수: JSON에서 안전하게 소수 추출
CREATE OR REPLACE FUNCTION safe_decimal(json_val JSONB, key_name TEXT)
RETURNS DECIMAL AS $$
BEGIN
  RETURN COALESCE((json_val ->> key_name)::DECIMAL, 0);
EXCEPTION WHEN OTHERS THEN
  RETURN 0;
END;
$$ LANGUAGE plpgsql;

-- 4. 마이그레이션 실행
DO $$
DECLARE
  rec RECORD;
  new_student_id UUID;
BEGIN
  -- kv_store의 각 레코드를 순회
  FOR rec IN SELECT key, value FROM kv_store_41d28b0a LOOP

    -- 4-1. 학생 정보 삽입 (중복 방지를 위해 parent_phone + student_name으로 체크)
    INSERT INTO students (student_name, school, grade, class_name, parent_phone)
    VALUES (
      COALESCE(safe_text(rec.value, 'student_name'), '이름없음'),
      safe_text(rec.value, 'school'),
      safe_text(rec.value, 'grade'),
      safe_text(rec.value, 'class_name'),
      COALESCE(safe_text(rec.value, 'parent_phone'), '000-0000-0000')
    )
    ON CONFLICT DO NOTHING
    RETURNING id INTO new_student_id;

    -- 만약 이미 존재하는 학생이면 ID 조회
    IF new_student_id IS NULL THEN
      SELECT id INTO new_student_id
      FROM students
      WHERE student_name = COALESCE(safe_text(rec.value, 'student_name'), '이름없음')
        AND parent_phone = COALESCE(safe_text(rec.value, 'parent_phone'), '000-0000-0000')
      LIMIT 1;
    END IF;

    -- 4-2. 초등 리포트 정보 삽입
    INSERT INTO elementary_reports (
      student_id, report_key, test_round,
      grade_badge, core_goal,
      vocab_score, vocab_total, vocab_percent, vocab_comment, vocab_book,
      reading_comment, reading_book, reading_task,
      reading_student, reading_average, reading_top30,
      grammar_comment, grammar_book, grammar_scope,
      grammar_student, grammar_average, grammar_top30,
      total_student, total_average, total_top30,
      strength, growth_point, teaching_plan
    )
    VALUES (
      new_student_id,
      rec.key,  -- 기존 key를 report_key로 사용
      safe_text(rec.value, 'test_round'),
      safe_text(rec.value, 'grade_badge'),
      safe_text(rec.value, 'core_goal'),
      safe_int(rec.value, 'vocab_score'),
      COALESCE(safe_int(rec.value, 'vocab_total'), 600),
      safe_decimal(rec.value, 'vocab_percent'),
      safe_text(rec.value, 'vocab_comment'),
      safe_text(rec.value, 'vocab_book'),
      safe_text(rec.value, 'reading_comment'),
      safe_text(rec.value, 'reading_book'),
      safe_text(rec.value, 'reading_task'),
      safe_int(rec.value, 'reading_student'),
      safe_int(rec.value, 'reading_average'),
      safe_int(rec.value, 'reading_top30'),
      safe_text(rec.value, 'grammar_comment'),
      safe_text(rec.value, 'grammar_book'),
      safe_text(rec.value, 'grammar_scope'),
      safe_int(rec.value, 'grammar_student'),
      safe_int(rec.value, 'grammar_average'),
      safe_int(rec.value, 'grammar_top30'),
      safe_int(rec.value, 'total_student'),
      safe_int(rec.value, 'total_average'),
      safe_int(rec.value, 'total_top30'),
      safe_text(rec.value, 'strength'),
      safe_text(rec.value, 'growth_point'),
      safe_text(rec.value, 'teaching_plan')
    )
    ON CONFLICT (report_key) DO NOTHING;

    RAISE NOTICE 'Migrated: %', rec.key;
  END LOOP;
END $$;

-- 5. 임시 함수 삭제
DROP FUNCTION IF EXISTS safe_text(JSONB, TEXT);
DROP FUNCTION IF EXISTS safe_int(JSONB, TEXT);
DROP FUNCTION IF EXISTS safe_decimal(JSONB, TEXT);

-- 6. 마이그레이션 결과 확인
SELECT
  'students' as table_name,
  COUNT(*) as row_count
FROM students
UNION ALL
SELECT
  'elementary_reports' as table_name,
  COUNT(*) as row_count
FROM elementary_reports;
