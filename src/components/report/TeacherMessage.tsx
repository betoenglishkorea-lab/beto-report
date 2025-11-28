import { MessageSquareQuote, ThumbsUp, TrendingUp, Flag } from "lucide-react";

interface TeacherMessageProps {
  strength?: string;
  growth_point?: string;
  teaching_plan?: string;
}

export const TeacherMessage = ({ 
  strength, 
  growth_point, 
  teaching_plan 
}: TeacherMessageProps) => {
  const defaultMessage = {
    strength: `수업 태도가 매우 성실하며, 새로운 어휘를 습득하려는 열의가 돋보이는 학생입니다. 
특히 독해 지문을 읽을 때 문맥을 파악하는 직관력이 뛰어나고, 
과제를 꼼꼼하게 수행하는 습관이 잡혀 있어 꾸준한 성장이 기대됩니다.`,
    growth_point: `문법 규칙을 실제 문제 풀이에 적용하는 과정에서 다소 어려움을 겪고 있습니다.
복잡한 문장 구조를 분석할 때 실수가 잦은 편이므로, 
개념을 확실히 정리하고 다양한 유형의 문제를 통해 응용력을 기르는 것이 필요합니다.`,
    teaching_plan: `취약한 문법 영역을 보완하기 위해 매주 핵심 개념 정리와 맞춤형 클리닉을 진행하겠습니다.
또한 서술형 평가에 대비하여 문장 구조 분석 훈련을 강화하고, 
자주 틀리는 유형을 오답 노트로 정리하여 실수를 줄여나가도록 지도할 계획입니다.`
  };

  const displayStrength = strength || defaultMessage.strength;
  const displayGrowthPoint = growth_point || defaultMessage.growth_point;
  const displayTeachingPlan = teaching_plan || defaultMessage.teaching_plan;

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-8">
      <div className="bg-white border-2 border-green-100 rounded-xl overflow-hidden shadow-sm mb-8">
        {/* Header */}
        <div className="bg-green-50/50 p-6 border-b border-green-100 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <MessageSquareQuote className="w-6 h-6 text-green-700" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Teacher's Message
          </h2>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Card 1: Strengths */}
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <ThumbsUp className="w-4 h-4 text-green-700" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-lg">학생의 강점</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {displayStrength}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full" />

          {/* Card 2: Growth Points */}
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-lg">성장 포인트</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {displayGrowthPoint}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full" />

          {/* Card 3: Customized Plan */}
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center">
                <Flag className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-lg">맞춤형 지도 계획</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {displayTeachingPlan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center mb-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="text-sm font-bold text-gray-700">
            📞 성취도 리포트 발송 후<br className="block md:hidden" /> 순차적으로 유선 상담을 진행할 예정입니다
          </h3>
          <p className="text-gray-500 text-xs">
            학생의 학습 상황과 향후 지도 방향에 대해<br className="block md:hidden" /> 자세히 안내드리겠습니다.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center space-y-1 text-gray-400 text-xs">
        <p>문의사항이 있으시면 언제든 담당 선생님께 연락 주시기 바랍니다.</p>
        <p className="font-medium">
          <a href="http://pf.kakao.com/_wDypb/chat" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 hover:underline">카카오 채널 상담하기</a>
        </p>
      </div>
    </div>
  );
};
