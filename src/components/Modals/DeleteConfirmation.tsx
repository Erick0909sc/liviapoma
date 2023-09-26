import { useState, useEffect } from "react";

type Props = {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};
const DeleteConfirmation = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) => {
  const [isIn, setIsIn] = useState(true);
  const animationClass = isIn ? 'animate-jump-in' : 'animate-jump-out';
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-50">
      <div className={`w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto bg-white p-6 rounded-lg ${animationClass}`}>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold">
            <span className="underline">{title}</span>
          </h2>
          <p>{message}</p>
          <div className="w-full flex justify-evenly">
            <button
              className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              type="button"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  onConfirm()
                  onCancel()
                }, 500);
              }}
            >
              {confirmText}
            </button>
            <button
              className="p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              type="button"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  onCancel()
                }, 500);
              }}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
