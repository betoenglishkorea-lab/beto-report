export const SkillProgress = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-12 px-2">
      <h3 className="text-sm font-bold text-green-800 mb-4 bg-gray-50 inline-block px-2 py-1 rounded">
        필수 기본기
      </h3>

      <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
        {/* Item 1 */}
        <div>
          <div className="flex justify-between mb-2">
             <span className="text-sm font-bold text-gray-800">문법 개념을 활용해 정확한 문장을 쓸 수 있는가? (서술형)</span>
             <span className="text-sm font-bold text-gray-500">상위 20% 이내</span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-orange-400 rounded-full" style={{ width: '60%' }}></div>
            <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-300"></div> {/* Marker */}
          </div>
        </div>

        {/* Item 2 */}
        <div>
          <div className="flex justify-between mb-2">
             <span className="text-sm font-bold text-gray-800">기본 어휘(중등 필수) 암기 및 활용 능력 (Voca)</span>
             <span className="text-sm font-bold text-gray-500">상위 10% 이내</span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-gray-300 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        {/* Slider Style Visualization */}
        <div className="pt-4">
             <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Level 1 (기초)</span>
                <span>Level 5 (심화)</span>
             </div>
             <div className="relative h-4 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full">
                <div className="absolute top-1/2 -translate-y-1/2 left-[30%] w-8 h-8 bg-white border-2 border-red-500 rounded-full shadow flex items-center justify-center">
                    <span className="text-[10px] font-bold text-red-600">Here</span>
                </div>
             </div>
             <p className="text-xs text-center mt-2 text-gray-500">현재 학생의 단계는 <span className="font-bold text-red-500">Level 2</span> 단계에 해당합니다.</p>
        </div>

      </div>
    </div>
  );
};
