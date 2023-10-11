import Link from "next/link";
import React from "react";

type Props = {
  name: string;
};

const Cardcategory = ({ name }: Props) => {
  return (
    <div className="w-40 p-4 border border-gray-300 rounded-lg hover:shadow-lg text-center">
      <div>
        <Link href={`/${encodeURIComponent(name)}`}>
          
          <h2 className="font-bold cursor-pointer hover:text-crema-400">
            {name}
          </h2>
        </Link>
        
      </div>
      
    </div>
  );
};

export default Cardcategory;
