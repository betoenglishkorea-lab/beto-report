export const DetailedCards = () => {
  const items = [
    {
      type: "어법성 판단 (Choice)",
      question: "다음 중 어법상 옳은 문장은?",
      result: "Incorrect",
      score: "0 / 3.5",
      analysis: "주어와 동사의 수 일치를 파악하지 못함. (He don't -> He doesn't)",
      color: "red"
    },
    {
      type: "영작 (Writing)",
      question: "우리말을 영어로 바르게 옮기시오.",
      result: "Incorrect",
      score: "2 / 5.0",
      analysis: "단어 배열은 맞았으나 시제(과거형) 적용 실패.",
      color: "orange"
    },
    {
      type: "독해 (Reading Comprehension)",
      question: "글의 내용과 일치하지 않는 것은?",
      result: "Correct",
      score: "4.5 / 4.5",
      analysis: "지문의 세부 내용을 정확히 파악함.",
      color: "green"
    },
    {
      type: "어휘 (Vocabulary)",
      question: "빈칸에 들어갈 알맞은 말은?",
      result: "Correct",
      score: "3.0 / 3.0",
      analysis: "문맥에 맞는 어휘를 적절히 선택함.",
      color: "green"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 px-2">
       <h3 className="text-lg font-bold text-gray-800 mb-6 pl-2 border-l-4 border-green-800">평가 상세 (Detailed Review)</h3>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {items.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'red' ? 'bg-red-500' : 'bg-orange-400'}`}></span>
                        <h4 className="font-bold text-gray-700 text-sm">{item.type}</h4>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                        item.result === 'Correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {item.result}
                    </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 bg-gray-50 p-2 rounded border border-gray-100 line-clamp-1">
                    Q. {item.question}
                </p>
                
                <div className="flex justify-between items-end mt-4">
                     <div className="text-xs text-gray-500 w-3/4">
                        <span className="font-bold text-gray-700 block mb-1">분석:</span>
                        {item.analysis}
                     </div>
                     <span className="text-sm font-bold text-gray-900">{item.score}</span>
                </div>
            </div>
         ))}
       </div>
    </div>
  );
};
