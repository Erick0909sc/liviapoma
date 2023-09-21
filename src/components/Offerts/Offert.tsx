type Props = {
  id: number;
  startDate: Date;
  endDate: Date;
  image: string;
};

const Offert = (props: Props) => {
  return (
    <div className="p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-center flex-wrap">
      <img
        src={props.image}
        alt={"Oferta de tiempo limitado"}
        className="w-auto h-auto rounded-s-lg max-h-[700px]"
      />
    </div>
  );
};

export default Offert;
