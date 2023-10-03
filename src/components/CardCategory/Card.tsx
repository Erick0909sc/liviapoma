import Link from "next/link";
import React from "react";

type Props = {
  name: string;
};

const Cardcategory = ({ name }: Props) => {
  return (
    <div className="w-36 text-center border-r border-slate-900">
      <div>
        <Link href={`/${encodeURIComponent(name)}`}>
          
          <h2 className="font-bold cursor-pointer hover:text-red-500">
            {name}
          </h2>
        </Link>
        
      </div>
      
    </div>
  );
};

export default Cardcategory;
