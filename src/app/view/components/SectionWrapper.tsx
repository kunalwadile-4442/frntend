// components/SectionWrapper.tsx
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return (
    <div className="my-4">
      <div className="ml-[-20px] mr-[-20px] h-[5px] bg-[#F7F7F7]" />
      <div className="font-semibold  py-2">
        {children}
      </div>
      <div className="ml-[-20px] mr-[-20px] h-[5px] bg-[#F7F7F7]" />
    </div>
  );
};

export default SectionWrapper;
