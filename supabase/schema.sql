-- ============================================
-- 베토 초등 성장 리포트 - elementary_reports 테이블 스키마
-- ============================================
-- 주의: students 테이블은 이미 존재하므로 생성하지 않음

-- 초등 리포트 테이블 (시험 회차별 성적)
CREATE TABLE IF NOT EXISTS elementary_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  report_key VARCHAR(100) UNIQUE NOT NULL,  -- URL 파라미터용 (기존 kv_store의 key 역할)
  test_round VARCHAR(100),                   -- 시험 회차 (예: "2024년 1학기")

  -- 학년별 목표
  grade_badge VARCHAR(20),
  core_goal TEXT,

  -- 어휘 (Vocabulary)
  vocab_score INTEGER DEFAULT 0,
  vocab_total INTEGER DEFAULT 600,
  vocab_percent DECIMAL(5,2) DEFAULT 0,
  vocab_comment TEXT,
  vocab_book VARCHAR(200),

  -- 독해 (Reading)
  reading_comment TEXT,
  reading_book VARCHAR(200),
  reading_task VARCHAR(200),
  reading_student INTEGER DEFAULT 0,
  reading_average INTEGER DEFAULT 0,
  reading_top30 INTEGER DEFAULT 0,

  -- 문법 (Grammar)
  grammar_comment TEXT,
  grammar_book VARCHAR(200),
  grammar_scope VARCHAR(200),
  grammar_student INTEGER DEFAULT 0,
  grammar_average INTEGER DEFAULT 0,
  grammar_top30 INTEGER DEFAULT 0,

  -- 총점 (Total)
  total_student INTEGER DEFAULT 0,
  total_average INTEGER DEFAULT 0,
  total_top30 INTEGER DEFAULT 0,

  -- 선생님 메시지
  strength TEXT,
  growth_point TEXT,
  teaching_plan TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_elementary_reports_student_id ON elementary_reports(student_id);
CREATE INDEX IF NOT EXISTS idx_elementary_reports_report_key ON elementary_reports(report_key);

-- RLS (Row Level Security) 활성화
ALTER TABLE elementary_reports ENABLE ROW LEVEL SECURITY;

-- 읽기 정책 (anon 키로 조회 가능)
CREATE POLICY "Allow public read access to elementary_reports" ON elementary_reports
  FOR SELECT USING (true);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_elementary_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_elementary_reports_updated_at
  BEFORE UPDATE ON elementary_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_elementary_reports_updated_at();
