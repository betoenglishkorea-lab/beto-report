import { Check, X } from "lucide-react";

export const AnalysisGrid = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-12 px-2">
      <h3 className="text-sm font-bold text-green-800 mb-4 bg-gray-50 inline-block px-2 py-1 rounded">
        고등학교 과정 성취도 분석
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Area Achievement */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">영역별 성취도</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">어휘 (Vocabulary)</span>
              <span className="text-sm font-bold text-gray-900">22.5 / 50 (45%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-gray-700">서술형 (Writing)</span>
              <span className="text-sm font-bold text-red-500">5 / 30 (16%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '16%' }}></div>
            </div>
            
             <p className="text-xs text-red-400 mt-2 pt-2 border-t border-dashed border-gray-200">
              * 서술형 문항에서 감점이 컸으며, 보완이 우선적으로 필요함
            </p>
          </div>
        </div>

        {/* Right: Rule Application */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">규칙 적용 능력</h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="font-medium text-gray-700">● 개념 이해</span>
              <div className="flex gap-2">
                 <span className="text-red-500 font-bold flex items-center gap-1"><X size={14}/> 부족 (Concept Weak)</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-2">
              <span className="font-medium text-gray-700">● 문제 적용</span>
              <div className="flex gap-2">
                 <span className="text-orange-500 font-bold flex items-center gap-1">▲ 보통 (Average)</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-2">
              <span className="font-medium text-gray-700">● 응용 심화</span>
              <div className="flex gap-2">
                 <span className="text-orange-500 font-bold flex items-center gap-1">▲ 보통 (Average)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
