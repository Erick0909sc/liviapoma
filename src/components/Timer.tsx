import { useState, useEffect } from "react";

interface Props {
  time: number;
  isProcessing?: boolean;
  customFunction?: () => void;
}

const Timer = ({ time, isProcessing, customFunction }: Props) => {
  const [seconds, setSeconds] = useState(time > 0 ? time : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const displayTime = () => {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    return `${minutesRemaining}:${
      secondsRemaining < 10 ? "0" : ""
    }${secondsRemaining}`;
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        {seconds > 0 && (
          <div className="">
            <h2 className="text-lg font-semibold">
              Temporizador {displayTime()}
            </h2>
            <p>
              Una vez pasado el tiempo, puede que la transacción no se complete
            </p>
          </div>
        )}
        {!seconds && (
          <>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={customFunction}
                disabled={isProcessing}
                className="px-4 py-2 ml-4 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
              >
                {!isProcessing ? "Recargar Token" : "Cargando..."}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-2 text-center">
              Recuerda recargar para generar un token para una transacción
              exitosa.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
