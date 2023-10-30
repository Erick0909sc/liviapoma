type Props = {};

const Pending = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-24 h-24 border-t-4 border-b-4 border-green-700 rounded-full animate-spin"></div>
      <p className="mt-4 text-xl font-semibold text-green-700">Cargando...</p>
    </div>
  );
};

export default Pending;
