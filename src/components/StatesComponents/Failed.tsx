type Props = {
  text?: string;
  title?: string;
};

const Failed = ({
  text = "Los productos no pudieron ser cargados correctamente",
  title = "Productos no encontrados",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl text-center font-extrabold text-gray-800">
        {title}
      </h1>
      <p className="text-gray-600 mt-2 p-2 text-justify">{text}</p>
    </div>
  );
};

export default Failed;
