import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 디자인된 로그인 컴포넌트 import
import { Login } from "./components/Login";

// 기존 레포트 컴포넌트들
import { Header } from "./components/report/Header";
import { StudentProfile } from "./components/report/StudentProfile";
import { ScoreOverview } from "./components/report/ScoreOverview";
import { TeacherMessage } from "./components/report/TeacherMessage";
import { Footer } from "./components/report/Footer";
import {
  projectId,
  publicAnonKey,
} from "./utils/supabase/info";
import { ReportData, ReportWithStudent } from "./types/database";

// 1. Supabase 클라이언트 설정
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;
const supabase = createClient(supabaseUrl, supabaseKey);

// ReportWithStudent를 화면용 ReportData로 변환하는 함수
const transformToReportData = (result: ReportWithStudent): ReportData => {
  return {
    // 학생 정보
    student_name: result.students.student_name,
    school: result.students.school,
    grade: result.students.grade,
    class_name: result.students.class_name,
    parent_phone: result.students.parent_phone,

    // 리포트 정보
    test_round: result.test_round,
    grade_badge: result.grade_badge,
    core_goal: result.core_goal,

    vocab_score: result.vocab_score,
    vocab_total: result.vocab_total,
    vocab_percent: result.vocab_percent,
    vocab_comment: result.vocab_comment,
    vocab_book: result.vocab_book,

    reading_comment: result.reading_comment,
    reading_book: result.reading_book,
    reading_task: result.reading_task,
    reading_student: result.reading_student,
    reading_average: result.reading_average,
    reading_top30: result.reading_top30,

    grammar_comment: result.grammar_comment,
    grammar_book: result.grammar_book,
    grammar_scope: result.grammar_scope,
    grammar_student: result.grammar_student,
    grammar_average: result.grammar_average,
    grammar_top30: result.grammar_top30,

    total_student: result.total_student,
    total_average: result.total_average,
    total_top30: result.total_top30,

    strength: result.strength,
    growth_point: result.growth_point,
    teaching_plan: result.teaching_plan,
  };
};

export default function App() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        if (!id) {
          setError("잘못된 접근입니다. (ID가 없습니다)");
          setLoading(false);
          return;
        }

        // 새 테이블 구조에서 데이터 조회 (elementary_reports + students 조인)
        const { data: result, error: dbError } = await supabase
          .from("elementary_reports")
          .select(`
            *,
            students (*)
          `)
          .eq("report_key", id)
          .single();

        if (dbError || !result) {
          console.error("DB Error:", dbError);
          setError("레포트를 찾을 수 없습니다.");
        } else {
          // 조인 결과를 화면용 데이터로 변환
          const reportData = transformToReportData(result as ReportWithStudent);
          setData(reportData);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 3. 비밀번호 검증 로직 (11자리 전체 비교)
  const handleLogin = (inputPhone: string) => {
    if (!data?.parent_phone) {
      alert("데이터 오류: 연락처 정보가 없습니다. 학원에 문의해주세요.");
      return;
    }

    // DB에 저장된 번호에서 하이픈(-) 제거하고 숫자만 남김
    // 예: "010-9397-0823" -> "01093970823"
    const dbPhoneClean = data.parent_phone.replace(/[^0-9]/g, "");
    
    // Login 컴포넌트에서 넘어온 번호(이미 숫자 11자리)와 비교
    if (inputPhone === dbPhoneClean) {
      setIsLoggedIn(true); // 일치하면 로그인 성공!
    } else {
      alert("입력하신 정보가 등록된 번호와 일치하지 않습니다.");
    }
  };

  // --- 화면 렌더링 ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 font-bold">
        {error}
      </div>
    );
  }

  // 4. 로그인 안 된 상태 -> 피그마 디자인 Login 컴포넌트 보여주기
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // 5. 로그인 성공 -> 성적표 보여주기
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-xl min-h-[1200px] p-4 md:p-12 border-t-8 border-green-800">
        <Header test_round={data?.test_round} />
        <StudentProfile
          student_name={data?.student_name}
          school={data?.school}
          grade={data?.grade}
          class_name={data?.class_name}
        />
        <ScoreOverview {...data} />
        <TeacherMessage
          strength={data?.strength}
          growth_point={data?.growth_point}
          teaching_plan={data?.teaching_plan}
        />
        <Footer />
      </div>
    </div>
  );
}
