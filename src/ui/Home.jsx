"use client";

import Image from "next/image";
import { productOne } from "../../public/images";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/apiConfig";
import { getData } from "@/lib";
import { useSelector } from "react-redux";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [totalProduct, setTotalProduct] = useState(0);
  const [addedProduct, setAddedProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProfit, setTotalProfit] = useState(0);

  const user = userInfo?.user;

  const calculateDaysToExpire = (expireDate) => {
    const today = new Date();
    const expirationDate = new Date(expireDate);
    const timeDifference = expirationDate - today;
    const daysToExpire = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysToExpire;
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(`${API_BASE_URL}/api/product`);
        setAddedProduct(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = user
    ? addedProduct.filter((product) => product.user === user)
    : [];

  useEffect(() => {
    if (filteredData.length) {
      const total = filteredData.reduce(
        (acc, product) => acc + product.productQuantity,
        0
      );
      setTotalProduct(total);
    }
  }, [filteredData]);

  useEffect(() => {
    const fetchProfitData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/sell?userId=${user}`);
        const data = await response.json();
        if (data.success) {
          setTotalProfit(data.totalProfit);
        } else {
          console.error("Error fetching profit data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching profit data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfitData();
  }, [user]);

  console.log("added product of the user", addedProduct);
  console.log("this is the user id", user);

  const filterUserBasedItem =
    user && addedProduct.filter((product) => product.user === user);
  console.log("this is the filter user product info", filterUserBasedItem);

  const expiredProducts = filterUserBasedItem
    ? filterUserBasedItem.filter(
        (product) => calculateDaysToExpire(product.expireDate) < 0
      )
    : [];

  const productsToExpireSoon = filterUserBasedItem
    ? filterUserBasedItem.filter((product) => {
        const daysToExpire = calculateDaysToExpire(product.expireDate);
        return daysToExpire > 0 && daysToExpire <= 10;
      })
    : [];

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white/20 px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">This month profit</p>
          <p className="text-xl text-white">{totalProfit.toFixed(2)} BDT</p>
        </div>
        <div className="bg-[#004A03] px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">Product on the inventory</p>
          <p className="text-xl text-white">{totalProduct} PCS</p>
        </div>

        <div className="bg-orange-800 px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">Product Items</p>
          <p className="text-xl text-white">{filteredData.length} Items</p>
        </div>
        <div className="bg-[#8C1900] px-5 py-6 border-[0.5px] border-white rounded-md">
          <p className="text-sm text-white">Expired Items</p>
          <p className="text-xl text-white">{expiredProducts.length} Items</p>
        </div>
      </div>

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
                  <p className="flex items-center text-white text-sm">
                    Expire in
                  </p>
                </th>
                <th className="p-[8px] text-left bg-white/40">
                  <p className="flex items-center text-white text-sm">Stock</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {productsToExpireSoon.length === 0 ? (
                <div className="my-3 font-bold text-white">
                  <p>No products expiring soon</p>
                </div>
              ) : (
                productsToExpireSoon.map((item) => {
                  const daysToExpire = calculateDaysToExpire(item?.expireDate);
                  return (
                    <tr key={item?._id}>
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
                          {item?.productName}
                        </p>
                      </td>
                      <td className="p-[8px]">
                        <p className="flex items-center text-white text-sm">
                          {formatDate(item?.expireDate)}
                        </p>
                      </td>
                      <td className="p-[8px]">
                        <p className="flex items-center text-white text-sm">
                          {daysToExpire} days left
                        </p>
                      </td>
                      <td className="p-[8px]">
                        <p className="flex items-center text-white text-sm">
                          {item?.productQuantity} PCS
                        </p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* that is for already expired product */}
      <div>
        <div className="my-2">
          <p className="text-sm text-white">Already Expired</p>
        </div>
        <div className="overflow-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr>
                <th className="p-[8px] text-left bg-[#8C1900]">
                  <p className="flex items-center text-white text-sm">
                    Product
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#8C1900]">
                  <p className="flex items-center text-white text-sm">
                    Product name
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#8C1900]">
                  <p className="flex items-center text-white text-sm">
                    Expire date
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#8C1900]">
                  <p className="flex items-center text-white text-sm">
                    Expired
                  </p>
                </th>
                <th className="p-[8px] text-left bg-[#8C1900]">
                  <p className="flex items-center text-white text-sm">Stock</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {expiredProducts.length === 0 ? (
                <div className="my-3 font-bold text-white">
                  <p>No products expired</p>
                </div>
              ) : (
                expiredProducts.map((item) => {
                  const daysToExpire = calculateDaysToExpire(item?.expireDate);
                  return (
                    <tr key={item?._id}>
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
                          {item?.productName}
                        </p>
                      </td>
                      <td className="p-[8px]">
                        <p className="flex items-center text-white text-sm">
                          {formatDate(item?.expireDate)}
                        </p>
                      </td>
                      <td className="p-[8px]">
                        <p className="flex items-center text-white text-sm">
                          {Math.abs(daysToExpire)} days ago
                        </p>
                      </td>
                      <td className="p-[8px]">
                        <p className="flex items-center text-white text-sm">
                          {item?.productQuantity} PCS
                        </p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
