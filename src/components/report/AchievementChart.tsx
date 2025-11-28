import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { TrendingUp } from "lucide-react";

const data = [
  {
    name: 'Reading',
    Student: 90,
    ClassAvg: 78,
    Top30: 92,
  },
  {
    name: 'Grammar',
    Student: 85,
    ClassAvg: 75,
    Top30: 90,
  },
  {
    name: 'Total',
    Student: 175,
    ClassAvg: 153,
    Top30: 182,
  },
];

export const AchievementChart = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-600 w-6 h-6" />
        <h3 className="text-xl font-bold text-gray-900">성취도 평가 영역별 결과</h3>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-xl p-4 md:p-8 border border-gray-200 shadow-sm">
        <div className="h-[350px] w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#4b5563', fontSize: 14, fontWeight: 500 }} 
                axisLine={{ stroke: '#9ca3af' }}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                axisLine={{ stroke: '#9ca3af' }}
                tickLine={false}
                domain={[0, 200]}
              />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="square"
                formatter={(value) => <span className="text-gray-600 font-medium ml-1 mr-4">{value === 'ClassAvg' ? 'Class Average' : value === 'Top30' ? '상위 30%' : value}</span>}
              />
              <Bar dataKey="Student" fill="#2563EB" name="Student" radius={[4, 4, 0, 0]} barSize={50} />
              <Bar dataKey="ClassAvg" fill="#94a3b8" name="ClassAvg" radius={[4, 4, 0, 0]} barSize={50} />
              <Bar dataKey="Top30" fill="#f59e0b" name="Top30" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Info */}
        <div className="bg-blue-50/50 rounded-lg p-4 text-sm text-gray-700 space-y-2">
          <p className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>이번 평가는 학년별 목표에 맞게 난이도가 조정된 문항으로 구성되었습니다.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>점수는 비교가 아닌 <span className="text-blue-600 font-bold">현재 위치 파악을 위한 진단 도구</span>입니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
