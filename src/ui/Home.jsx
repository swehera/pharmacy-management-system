"use client";

import Image from "next/image";
import { productOne } from "../../public/images";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-4">
      {/* box section for update details */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white/20 px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">This month profit</p>
          <p className="text-xl text-white">2000 BDT</p>
        </div>
        <div className="bg-[#004A03] px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">Product on the inventory</p>
          <p className="text-xl text-white">200 PCS</p>
        </div>
        <div className="bg-[#8C1900] px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">Expire Product</p>
          <p className="text-xl text-white">4 PCS</p>
        </div>
      </div>

      {/* product expire soon section */}
      <div>
        <div className="my-2">
          <p className="text-sm text-white">Product to expire soon</p>
        </div>
        <div className="overflow-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr>
                <th className="p-[8px] text-left bg-white/40">
                  <p className="flex items-center text-white text-sm">
                    Product
                  </p>
                </th>
                <th className="p-[8px] text-left bg-white/40">
                  <p className="flex items-center text-white text-sm">
                    Product name
                  </p>
                </th>
                <th className="p-[8px] text-left bg-white/40">
                  <p className="flex items-center text-white text-sm">
                    Expire date
                  </p>
                </th>
                <th className="p-[8px] text-left bg-white/40">
                  <p className="flex items-center text-white text-sm">Stock</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-[8px]">
                  <Image
                    src={productOne}
                    width={50}
                    height={50}
                    alt="product-image"
                  />
                </td>
                <td className="p-[8px]">
                  <p className="flex items-center text-white text-sm">
                    Metformin 500mg Tablets
                  </p>
                </td>
                <td className="p-[8px]">
                  <p className="flex items-center text-white text-sm">
                    5 June 2024
                  </p>
                </td>
                <td className="p-[8px]">
                  <p className="flex items-center text-white text-sm">10 PCS</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* already expired product in store */}
      <div>
        <div className="my-2">
          <p className="text-sm text-white">Product to expire soon</p>
        </div>
        <div className="overflow-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr>
                <th className="p-[8px] text-left bg-[#FF4444]">
                  <p className="flex items-center text-white text-sm">
                    Product
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#FF4444]">
                  <p className="flex items-center text-white text-sm">
                    Product name
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#FF4444]">
                  <p className="flex items-center text-white text-sm">
                    Expire date
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#FF4444]">
                  <p className="flex items-center text-white text-sm">Stock</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-[8px]">
                  <Image
                    src={productOne}
                    width={50}
                    height={50}
                    alt="product-image"
                  />
                </td>
                <td className="p-[8px]">
                  <p className="flex items-center text-white text-sm">
                    Metformin 500mg Tablets
                  </p>
                </td>
                <td className="p-[8px]">
                  <p className="flex items-center text-white text-sm">
                    5 June 2024
                  </p>
                </td>
                <td className="p-[8px]">
                  <p className="flex items-center text-white text-sm">10 PCS</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
