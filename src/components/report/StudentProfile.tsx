import { User, GraduationCap, School, BookOpen } from "lucide-react";

interface StudentProfileProps {
  student_name?: string;
  grade?: string;
  school?: string;
  class_name?: string;
}

export const StudentProfile = ({ 
  student_name, 
  grade, 
  school, 
  class_name 
}: StudentProfileProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-10 px-2">
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-5 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
        {/* School */}
        <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-300 md:pr-4">
          <div className="flex items-center gap-2 mb-1">
             <School className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">School</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{school || "서울초등학교"}</span>
        </div>

        {/* Grade */}
        <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-300 md:px-4">
          <div className="flex items-center gap-2 mb-1">
             <GraduationCap className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Grade</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{grade || "4학년"}</span>
        </div>

        {/* Name */}
        <div className="flex flex-col items-center md:items-start md:border-r md:border-gray-300 md:px-4">
           <div className="flex items-center gap-2 mb-1">
             <User className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{student_name || "최서현"}</span>
        </div>

        {/* Class */}
        <div className="flex flex-col items-center md:items-start md:pl-4">
           <div className="flex items-center gap-2 mb-1">
             <BookOpen className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Class</span>
          </div>
          <span className="text-lg font-bold text-green-700">{class_name || "FLY반"}</span>
        </div>
      </div>
    </div>
  );
};
