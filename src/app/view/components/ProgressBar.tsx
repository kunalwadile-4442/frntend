import React from "react";
interface IProgressBarTypes {
  progress?: string;
}
const ProgressBar: React.FC<IProgressBarTypes> = ({ progress }) => {
  return (
    <div className="w-full bg-primary_300 rounded-lg h-4 flex items-center overflow-hidden">
      <div
        className="bg-primary rounded-lg  text-white text-xs font-medium flex items-center justify-center h-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%`, minWidth: "30px" }}
      >
        <p className="mt-[0.15rem]">{progress}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
