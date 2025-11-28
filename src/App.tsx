import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 기존 컴포넌트들 (그대로 유지)
import { Header } from "./components/report/Header";
import { StudentProfile } from "./components/report/StudentProfile";
import { ScoreOverview } from "./components/report/ScoreOverview";
import { TeacherMessage } from "./components/report/TeacherMessage";
import { Footer } from "./components/report/Footer";
import {
  projectId,
  publicAnonKey,
} from "./utils/supabase/info";

// 1. Supabase 클라이언트 설정 (직접 연결)
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // 비밀번호 관련 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id"); // URL의 ?id= 값

        if (!id) {
          setError("잘못된 접근입니다. (ID가 없습니다)");
          setLoading(false);
          return;
        }

        // 2. Supabase DB에서 직접 데이터 조회
        const { data: result, error: dbError } = await supabase
          .from("kv_store_41d28b0a") // 테이블 이름
          .select("value")
          .eq("key", id)
          .single();

        if (dbError || !result) {
          console.error("DB Error:", dbError);
          setError("레포트를 찾을 수 없습니다.");
        } else {
          setData(result.value); // JSON 데이터 저장
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

  // 3. 로그인(비밀번호 검증) 로직
  const handleLogin = () => {
    if (!data?.parent_phone) {
      alert("데이터 오류: 연락처 정보가 없습니다.");
      return;
    }

    // 전화번호에서 숫자만 추출 후 뒤 4자리 비교
    const phoneDigits = data.parent_phone.replace(/[^0-9]/g, ""); 
    const correctPassword = phoneDigits.slice(-4); 

    if (inputPassword === correctPassword) {
      setIsLoggedIn(true);
    } else {
      alert("비밀번호가 일치하지 않습니다. (휴대폰 번호 뒤 4자리)");
      setInputPassword("");
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

  // 4. 로그인 화면 (비밀번호 입력)
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50 px-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-[#5F4B8B]">베토영어 레포트</h2>
          <p className="text-gray-500 mb-6 text-sm">
            학생 이름: <span className="font-bold text-black">{data.student_name}</span><br/>
            학부모님 휴대폰 번호 뒤 4자리를 입력해주세요.
          </p>
          
          <input 
            type="password" 
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full border bg-gray-50 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-[#5F4B8B]"
            placeholder="● ● ● ●"
            maxLength={4}
            inputMode="numeric"
          />
          
          <button 
            onClick={handleLogin}
            className="w-full bg-[#5F4B8B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#4A3A6A] transition shadow-md"
          >
            확인하기
          </button>
        </div>
      </div>
    );
  }

  // 5. 최종 레포트 화면 (로그인 성공 시)
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