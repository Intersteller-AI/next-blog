/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Link from "next/link";
import React from "react";

const BreadCrumbs = ({ data }) => {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((item, index) => (
        <div key={index} className="text-black opacity-50 hover:text-blue-500 transition-colors duration-200 text-xs font-roboto md:text-sm truncate">
          <Link href={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span className="px-3">/</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
