export const StudentInfo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-blue-50 rounded-xl p-6 mb-10 shadow-sm border border-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* School / Grade */}
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs font-medium mb-1">학교 / 학년</span>
          <span className="text-lg font-bold text-gray-900">서울초등학교 / 4학년</span>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs font-medium mb-1">학생명</span>
          <span className="text-lg font-bold text-gray-900">김베토</span>
        </div>

        {/* Class */}
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs font-medium mb-1">반</span>
          <span className="text-lg font-bold text-gray-900">FLY반</span>
        </div>
      </div>
    </div>
  );
};
