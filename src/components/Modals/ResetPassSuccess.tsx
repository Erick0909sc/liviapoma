import React from "react";

type Props = {
  title: string;
  message: string;
  icon?: React.ReactNode;
};
const ResetPassSuccess = ({ title, icon, message }: Props) => {
  const isIn = true;
  const animationClass = isIn ? "animate-jump-in" : "animate-jump-out";
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-50">
      <div
        className={`w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto bg-white p-6 rounded-lg ${animationClass}`}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold">
            <span className="underline">{title}</span>
          </h2>
          {icon}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassSuccess;
