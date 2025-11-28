export const Header = ({ test_round }: { test_round?: string }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      <div className="flex flex-col items-start px-2">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2 flex flex-col md:block">
          <span className="text-green-800 md:mr-2">BETO</span>
          <span>성장 리포트</span>
        </h1>
        <p className="text-gray-500 text-xs">
          테스트 일자: {test_round || "2025년 11월 5회차"}
        </p>
      </div>
      
      <div className="w-full h-px bg-gray-200 mt-4" />
    </div>
  );
};
