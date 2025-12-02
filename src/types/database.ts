// 베토 초등 성장 리포트 - 데이터베이스 타입 정의

export interface Student {
  id: string;
  student_name: string;
  school: string | null;
  grade: string | null;
  class_name: string | null;
  parent_phone: string;
  created_at: string;
  updated_at: string;
}

export interface ElementaryReport {
  id: string;
  student_id: string;
  report_key: string;
  test_round: string | null;

  // 학년별 목표
  grade_badge: string | null;
  core_goal: string | null;

  // 어휘 (Vocabulary)
  vocab_score: number;
  vocab_total: number;
  vocab_percent: number;
  vocab_comment: string | null;
  vocab_book: string | null;

  // 독해 (Reading)
  reading_comment: string | null;
  reading_book: string | null;
  reading_task: string | null;
  reading_student: number;
  reading_average: number;
  reading_top30: number;

  // 문법 (Grammar)
  grammar_comment: string | null;
  grammar_book: string | null;
  grammar_scope: string | null;
  grammar_student: number;
  grammar_average: number;
  grammar_top30: number;

  // 총점 (Total)
  total_student: number;
  total_average: number;
  total_top30: number;

  // 선생님 메시지
  strength: string | null;
  growth_point: string | null;
  teaching_plan: string | null;

  created_at: string;
  updated_at: string;
}

// 초등 리포트 + 학생 정보 조인 결과
export interface ElementaryReportWithStudent extends ElementaryReport {
  students: Student;
}

// 하위 호환성을 위한 별칭
export type Report = ElementaryReport;
export type ReportWithStudent = ElementaryReportWithStudent;

// 화면에서 사용하는 통합 데이터 타입 (기존 JSON 구조와 호환)
export interface ReportData {
  // 학생 정보 (students 테이블)
  student_name: string;
  school: string | null;
  grade: string | null;
  class_name: string | null;
  parent_phone: string;

  // 리포트 정보 (elementary_reports 테이블)
  test_round: string | null;
  grade_badge: string | null;
  core_goal: string | null;

  vocab_score: number;
  vocab_total: number;
  vocab_percent: number;
  vocab_comment: string | null;
  vocab_book: string | null;

  reading_comment: string | null;
  reading_book: string | null;
  reading_task: string | null;
  reading_student: number;
  reading_average: number;
  reading_top30: number;

  grammar_comment: string | null;
  grammar_book: string | null;
  grammar_scope: string | null;
  grammar_student: number;
  grammar_average: number;
  grammar_top30: number;

  total_student: number;
  total_average: number;
  total_top30: number;

  strength: string | null;
  growth_point: string | null;
  teaching_plan: string | null;
}
