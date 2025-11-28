import React from 'react';

export const Footer = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-2 pt-4 border-t border-green-800/10">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-green-800 font-bold text-base tracking-tight">
          "꿈을 크게 꿔라, 깨져도 그 조각이 크다!"
        </p>
        <p className="text-gray-500 font-medium text-xs tracking-wide">
          판교영어의 자존심, <span className="text-green-800 font-bold">BETO ENGLISH</span>
        </p>
      </div>
    </div>
  );
};
