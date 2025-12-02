-- ============================================
-- 기존 kv_store_41d28b0a 데이터를 elementary_reports 테이블로 마이그레이션
-- ============================================
-- 주의:
-- 1. schema.sql을 먼저 실행한 후 이 스크립트를 실행하세요.
-- 2. students 테이블은 이미 존재하므로, 기존 학생 데이터와 매칭합니다.

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
  found_student_id UUID;
  kv_student_name TEXT;
  kv_parent_phone TEXT;
BEGIN
  -- kv_store의 각 레코드를 순회
  FOR rec IN SELECT key, value FROM kv_store_41d28b0a LOOP

    -- JSON에서 학생 정보 추출
    kv_student_name := safe_text(rec.value, 'student_name');
    kv_parent_phone := safe_text(rec.value, 'parent_phone');

    -- 기존 students 테이블에서 학생 찾기 (name + parent_phone으로 매칭)
    -- students 테이블의 열 이름은 'name' (not 'student_name')
    SELECT id INTO found_student_id
    FROM students
    WHERE name = kv_student_name
      AND parent_phone = kv_parent_phone
    LIMIT 1;

    -- 학생을 찾지 못한 경우 경고 출력 후 스킵
    IF found_student_id IS NULL THEN
      RAISE WARNING 'Student not found: name=%, parent_phone=%, key=%',
        kv_student_name, kv_parent_phone, rec.key;
      CONTINUE;
    END IF;

    -- 초등 리포트 정보 삽입
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
      found_student_id,
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

    RAISE NOTICE 'Migrated: % -> student_id: %', rec.key, found_student_id;
  END LOOP;
END $$;

-- 5. 임시 함수 삭제
DROP FUNCTION IF EXISTS safe_text(JSONB, TEXT);
DROP FUNCTION IF EXISTS safe_int(JSONB, TEXT);
DROP FUNCTION IF EXISTS safe_decimal(JSONB, TEXT);

-- 6. 마이그레이션 결과 확인
SELECT
  'elementary_reports' as table_name,
  COUNT(*) as row_count
FROM elementary_reports;
