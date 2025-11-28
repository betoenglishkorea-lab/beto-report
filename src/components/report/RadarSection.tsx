import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: '어휘', A: 80, fullMark: 100 },
  { subject: '문법', A: 45, fullMark: 100 },
  { subject: '독해', A: 90, fullMark: 100 },
  { subject: '영작', A: 30, fullMark: 100 },
  { subject: '듣기', A: 85, fullMark: 100 },
];

export const RadarSection = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-12 px-2">
        <div className="flex items-center justify-between border-b-2 border-green-800 pb-2 mb-6">
             <h2 className="text-2xl font-bold text-gray-900">개인별 맞춤 분석 1</h2>
             <span className="text-xs text-gray-400">DETAILED ANALYSIS</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
             {/* Chart */}
             <div className="w-full md:w-1/3 h-[300px] bg-white rounded-lg border border-gray-100 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Student"
                        dataKey="A"
                        stroke="#166534"
                        fill="#166534"
                        fillOpacity={0.4}
                    />
                    </RadarChart>
                </ResponsiveContainer>
             </div>

             {/* Analysis Text */}
             <div className="w-full md:w-2/3">
                <h3 className="text-lg font-bold text-gray-800 mb-4">영역별 분석 (Radar Chart)</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed space-y-4">
                    <p>
                        학생은 <span className="font-bold text-blue-600">독해(Reading)</span>와 <span className="font-bold text-blue-600">듣기(Listening)</span> 영역에서 강점을 보입니다. 
                        전반적인 맥락 파악 능력이 우수하며, 이미 아는 단어들을 조합하여 내용을 유추하는 능력이 뛰어납니다.
                    </p>
                    <p>
                        반면 <span className="font-bold text-red-500">문법(Grammar)</span>과 <span className="font-bold text-red-500">영작(Writing)</span> 영역에서는 개념 이해 부족으로 인해 점수가 낮게 형성되었습니다.
                        특히 '시제'와 '수 일치'와 같은 문법의 기본 규칙을 문장에 적용하는 데 어려움을 겪고 있습니다.
                    </p>
                    <p>
                        향후 학습은 <span className="bg-green-100 px-2 py-0.5 rounded font-bold text-green-800">문법 개념 정리 후 → 영작으로 연결하는 훈련</span>을 집중적으로 진행하여
                        균형 잡힌 영어 실력을 완성하는 것이 목표입니다.
                    </p>
                </div>
             </div>
        </div>
    </div>
  );
};
