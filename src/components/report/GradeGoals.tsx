import { CheckCircle2, Bookmark } from "lucide-react";

export const GradeGoals = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="text-blue-600 w-6 h-6 fill-current" />
        <h3 className="text-xl font-bold text-gray-900">학년별 핵심 목표</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md text-sm shadow-sm hover:bg-blue-700 transition-colors">
          4학년
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-600 font-medium rounded-md text-sm hover:bg-gray-300 transition-colors">
          5학년
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-600 font-medium rounded-md text-sm hover:bg-gray-300 transition-colors">
          6학년
        </button>
      </div>

      {/* Main Content Box */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm">
        <h4 className="text-blue-800 font-bold text-lg mb-6">
          기초 문장 구조에 익숙해지고,<br /> 초등 필수 단어/단문 이해력 안정시키기
        </h4>

        <div className="space-y-4">
          {/* Vocabulary Section */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100/50">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
              <h5 className="text-blue-700 font-bold text-lg">(1) 어휘</h5>
              <div className="flex flex-col md:items-end gap-1">
                 <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                  주제별 초등 필수 600단어
                </span>
                 <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                  현재 학습: 72개
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              주제별로 초등 필수 어휘를 체계적으로 학습하며 어휘력의 기초를 다집니다
            </p>
            <p className="text-gray-400 text-xs italic mb-4">
              * 어휘 학습량은 학생별 이해도와 학습 속도에 맞춰 최적화된 개별 커리큘럼으로 진행됩니다
            </p>
            <div className="border-t border-gray-100 pt-3 flex items-start gap-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">교재</span>
              <span className="text-gray-800 text-sm font-medium">Word Master 초등 Complete</span>
            </div>
          </div>

          {/* Reading Section */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100/50">
            <h5 className="text-blue-700 font-bold text-lg mb-3">(2) 독해</h5>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              한 문장을 "끊어 읽기" 할 수 있는 수준 확보 / 긴 문장에서 주어, 동사 찾는 습관 형성 / 초등 교과서 수준의 짧은 정보 글 읽고 내용 파악
            </p>
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">교재</span>
                <span className="text-gray-800 text-sm font-medium">Subject Link Starter 1 ~ Subject Link Starter 3</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">핵심</span>
                <span className="text-gray-800 text-sm font-medium">직독직해 & 구문 분석 → 주어·동사 구분 완성</span>
              </div>
            </div>
          </div>

          {/* Grammar Section */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100/50">
            <h5 className="text-blue-700 font-bold text-lg mb-3">(3) 문법</h5>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              문장의 기본 구조 익히기 / 명사와 관사의 이해 및 활용
            </p>
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">교재</span>
                <span className="text-gray-800 text-sm font-medium">Grammar Mento Joy 시리즈</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">평가범위</span>
                <span className="text-gray-800 text-sm font-medium">명사, 대명사, 관사</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
