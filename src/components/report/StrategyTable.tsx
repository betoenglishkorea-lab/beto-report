export const StrategyTable = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16 px-2">
      <div className="flex items-center justify-between border-b-2 border-green-800 pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">내신 대비 전략</h2>
          <span className="text-xs text-gray-400">STRATEGY FOR SCHOOL EXAM</span>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold w-1/6">과목</th>
              <th scope="col" className="px-6 py-3 font-bold w-1/6">난이도 예측</th>
              <th scope="col" className="px-6 py-3 font-bold w-2/3">학습 전략 (Action Plan)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-gray-900">
                어휘
              </th>
              <td className="px-6 py-4 text-red-500 font-bold">
                매우 중요
              </td>
              <td className="px-6 py-4">
                교과서 핵심 단어 및 유의어/반의어 완벽 암기. 예문 위주의 학습 필요.
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-gray-900">
                문법
              </th>
              <td className="px-6 py-4 text-orange-500 font-bold">
                중요
              </td>
              <td className="px-6 py-4">
                이번 시험 범위인 'to부정사'와 '동명사'의 용법 구분 문제 집중 풀이. 오답 노트 필수.
              </td>
            </tr>
            <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-gray-900">
                독해
              </th>
              <td className="px-6 py-4 text-green-600 font-bold">
                보통
              </td>
              <td className="px-6 py-4">
                교과서 본문 암기보다는 흐름 파악 및 지시어가 가리키는 대상 찾기 연습.
              </td>
            </tr>
            <tr className="bg-white hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-gray-900">
                서술형
              </th>
              <td className="px-6 py-4 text-red-500 font-bold">
                취약
              </td>
              <td className="px-6 py-4">
                교과서 주요 문법이 포함된 문장 통암기 및 영작 연습. 부분 점수 확보 전략 필요.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
