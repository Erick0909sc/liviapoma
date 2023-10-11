import Link from "next/link";
type Props = {
  name: string;
};

const Category = ({ name }: Props) => {
  return (
    <div className="w-36 border-r grid place-content-center border-slate-900">
      <Link href={`/products?category=${name}`}>
        <h2 className="relative font-bold cursor-pointer hover:text-crema-400 text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-crema-400 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
          {name}
        </h2>
      </Link>
    </div>
  );
};

export default Category;
