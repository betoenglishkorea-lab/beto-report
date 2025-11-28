import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScoreOverviewProps {
  // Grade Goal
  grade_badge?: string;
  core_goal?: string;

  // Vocab
  vocab_score?: number | string;
  vocab_total?: number | string;
  vocab_percent?: number | string;
  vocab_comment?: string;
  vocab_book?: string;

  // Reading
  reading_comment?: string;
  reading_book?: string;
  reading_task?: string;

  // Grammar
  grammar_comment?: string;
  grammar_book?: string;
  grammar_scope?: string;

  // Chart Data
  reading_student?: number | string;
  reading_average?: number | string;
  reading_top30?: number | string;
  
  grammar_student?: number | string;
  grammar_average?: number | string;
  grammar_top30?: number | string;
  
  total_student?: number | string;
  total_average?: number | string;
  total_top30?: number | string;
}

export const ScoreOverview = ({
  grade_badge = "4학년",
  core_goal = "기초 문장 구조에 익숙해지고, 초등 필수 단어/단문 이해력 안정시키기",
  
  vocab_score = 0,
  vocab_total = 600,
  vocab_percent = 0,
  vocab_comment = "주제별로 초등 필수 어휘를 체계적으로 학습하며 어휘력의 기초를 다집니다",
  vocab_book = "Word Master 초등 Complete",
  
  reading_comment = "한 문장을 \"끊어 읽기\" 할 수 있는 수준 확보...",
  reading_book = "Subject Link Starter 1 ~ 3",
  reading_task = "직독직해 & 구문 분석",
  
  grammar_comment = "문장의 기본 구조를 익히고...",
  grammar_book = "Grammar Mento Joy 시리즈",
  grammar_scope = "명사, 대명사, 관사",
  
  reading_student = 0,
  reading_average = 0,
  reading_top30 = 0,
  
  grammar_student = 0,
  grammar_average = 0,
  grammar_top30 = 0,
  
  total_student = 0,
  total_average = 0,
  total_top30 = 0
}: ScoreOverviewProps) => {

  // 1. 데이터 숫자 변환 (DB에서 문자열로 올 경우 대비)
  const vScore = Number(vocab_score) || 0;
  const vTotal = Number(vocab_total) || 600;

  // 2. 어휘 그래프 퍼센트 직접 계산 (DB의 vocab_percent 값 무시하고 정확하게 계산)
  const calculatedVocabPercent = vTotal > 0 
    ? Math.min(100, Math.max(0, (vScore / vTotal) * 100)) 
    : 0;

  // 3. 차트 데이터도 숫자로 안전하게 변환
  const chartData = [
    { name: 'Reading', student: Number(reading_student), average: Number(reading_average), top30: Number(reading_top30) },
    { name: 'Grammar', student: Number(grammar_student), average: Number(grammar_average), top30: Number(grammar_top30) },
    { name: 'Total', student: Number(total_student), average: Number(total_average), top30: Number(total_top30) },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg text-xs">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="mb-1">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto mb-12 px-0 md:px-2">
      <div className="mb-4 flex w-full justify-center items-center gap-3 border-b-2 border-gray-800 pb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          학년별 핵심 목표
        </h2>
        <span className="bg-green-800 text-white px-3 py-0.5 rounded-sm text-xs md:text-sm font-bold">
          {grade_badge}
        </span>
      </div>

      <div className="bg-gradient-to-r from-green-800 to-green-900 p-3 md:p-4 rounded-xl shadow-sm mb-4">
        <p className="text-white font-bold leading-relaxed text-base md:text-lg text-center">
          {core_goal}
        </p>
      </div>

      <div className="space-y-6">
        {/* 어휘 Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-green-300 transition-colors duration-300">
          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs md:text-sm">
                    01
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    어휘 <span className="text-xs md:text-sm font-normal text-gray-400 ml-1">Vocabulary</span>
                  </h3>
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-gray-50 rounded-lg p-3 md:p-4 mt-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-600">주제별 초등 필수 {vTotal}단어</span>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-bold text-green-700">{vScore}</span>
                    <span className="text-xs md:text-sm text-gray-400 ml-1">/ {vTotal}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-1000" 
                    // 수정됨: 계산된 퍼센트를 적용
                    style={{ width: `${calculatedVocabPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  * 어휘 학습량은 학생별 이해도와 학습 속도에 맞춰 최적화된 개별 커리큘럼으로 진행됩니다
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed pl-2 border-l-2 border-green-100 text-sm md:text-base">
              {vocab_comment}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                <span className="shrink-0 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  교재
                </span>
                <span className="text-gray-800 font-medium text-xs md:text-sm flex-1">
                  {vocab_book}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 독해 Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-green-300 transition-colors duration-300">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs md:text-sm">
                02
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                독해 <span className="text-xs md:text-sm font-normal text-gray-400 ml-1">Reading</span>
              </h3>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed pl-2 border-l-2 border-green-100 text-sm md:text-base">
              {reading_comment}
            </p>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                <span className="shrink-0 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  교재
                </span>
                <span className="text-gray-800 font-medium text-xs md:text-sm flex-1">
                  {reading_book}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></span>
                <span className="shrink-0 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  핵심과제
                </span>
                <span className="text-gray-800 font-medium text-xs md:text-sm flex-1">
                  {reading_task}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 문법 Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-green-300 transition-colors duration-300">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs md:text-sm">
                03
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                문법 <span className="text-xs md:text-sm font-normal text-gray-400 ml-1">Grammar</span>
              </h3>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed pl-2 border-l-2 border-green-100 text-sm md:text-base">
              {grammar_comment}
            </p>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                <span className="shrink-0 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  교재
                </span>
                <span className="text-gray-800 font-medium text-xs md:text-sm flex-1">
                  {grammar_book}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                <span className="shrink-0 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  평가범위
                </span>
                <span className="text-gray-800 font-medium text-xs md:text-sm flex-1">
                  {grammar_scope}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 성취도 평가 영역별 결과 그래프 */}
      <div className="mt-12">
        <div className="mb-4 flex w-full justify-center items-center gap-3 border-b-2 border-gray-800 pb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            성취도 평가 영역별 결과
          </h2>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="h-[300px] w-full font-sans text-xs md:text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                barGap={12}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 11 }} 
                  width={30}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ fill: '#f9fafb', opacity: 0.5 }} 
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '24px' }}
                  iconType="circle"
                  iconSize={8}
                  align="center"
                />
                <Bar 
                  dataKey="student" 
                  name="Student" 
                  fill="#10b981" 
                  radius={[6, 6, 0, 0]} 
                />
                <Bar 
                  dataKey="average" 
                  name="Class Average" 
                  fill="#e5e7eb" 
                  radius={[6, 6, 0, 0]} 
                />
                <Bar 
                  dataKey="top30" 
                  name="상위 30%" 
                  fill="#374151" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
