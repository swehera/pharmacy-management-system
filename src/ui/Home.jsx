"use client";

import Image from "next/image";
import { productOne } from "../../public/images";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/apiConfig";
import { getData } from "@/lib";
import { useSelector } from "react-redux";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [totalProduct, setTotalProduct] = useState(0); // Initialize totalProduct as 0
  const [addedProduct, setAddedProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = userInfo?.user;

  //this useEffect for fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(`${API_BASE_URL}/api/product`);
        setAddedProduct(data.data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [addedProduct]);

  const filteredData =
    user && addedProduct.filter((product) => product.user === user);

  // Calculate total product quantity for filtered data
  useEffect(() => {
    if (filteredData) {
      const total = filteredData.reduce(
        (acc, product) => acc + product.productQuantity,
        0
      );
      setTotalProduct(total);
    }
  }, [filteredData]);

  console.log("addedProduct", addedProduct);
  console.log("filterdata", filteredData);
  // console.log("filterdata length", filteredData.length);

  const totalProductsItems = filteredData ? filteredData.length : 0;

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
          <p className="text-xl text-white">{totalProduct} PCS</p>
        </div>
        <div className="bg-[#8C1900] px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">Product Items</p>
          <p className="text-xl text-white">{totalProductsItems} Items</p>
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
