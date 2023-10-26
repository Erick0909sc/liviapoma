import Link from "next/link";
type Props = {
  name: string;
};

const Categorysearch = ({ name }: Props) => {
  
  return (
    <div className="">
      <Link href={`/products?category=${name}`}>
        <h2 className="">
          {name}
        </h2>
      </Link>
    </div>
  );
};

export default Categorysearch;
