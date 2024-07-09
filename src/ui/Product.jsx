"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { productOne } from "../../public/images";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "@/utils/apiConfig";
import { getData } from "@/lib";
import Loading from "./Loading";

const Product = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const [addedProduct, setAddedProduct] = useState([]);

  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [brandName, setBrandName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const user = userInfo?.user;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          productQuantity,
          expireDate,
          purchaseDate,
          brandName,
          purchasePrice,
          sellingPrice,
          user,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAddedProduct((prev) => [...prev, data.product]);
        // Reset form fields
        setProductName("");
        setProductQuantity("");
        setExpireDate("");
        setPurchaseDate("");
        setBrandName("");
        setPurchasePrice("");
        setSellingPrice("");
      }
      console.log("data", data);
    } catch (error) {
      console.error("Error adding product", error);
    } finally {
      setLoading(false);
    }
  };

  //this useEffect for fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`${API_BASE_URL}/api/product`);
        setAddedProduct(data.data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [addedProduct]);

  const filteredData =
    user && addedProduct.filter((product) => product.user === user);

  // console.log("added product", addedProduct);
  console.log("filteredData", filteredData);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-y-3 mb-5">
          <div className="bg-white/45 rounded-md p-4">
            <p className="text-2xl text-white my-2">Add Product</p>
            <div className="flex flex-col gap-y-2">
              <div className="w-full flex flex-col md:flex-row gap-x-3">
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">
                    Total Product Quantity
                  </label>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Total Product Quantity"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-x-3">
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">Expire Date</label>
                  <input
                    type="date"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                    placeholder="Expire Date"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">Purchase Date</label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    placeholder="Purchase Date"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-x-3">
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Brand Name"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">Purchase Price</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="Purchase Price"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-x-3">
                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                  <label className="text-sm text-white">Selling Price</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="Selling Price"
                    className="px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
                  />
                </div>
              </div>
              <div className="my-2">
                <button
                  onClick={handleAddProduct}
                  className="px-6 py-1 rounded-md bg-[#1D3471] text-sm text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th className="p-[8px] text-left bg-white/40">
                      <p className="flex items-center text-white text-sm">
                        Product Image
                      </p>
                    </th>
                    <th className="p-[8px] text-left bg-white/40">
                      <p className="flex items-center text-white text-sm">
                        Product name
                      </p>
                    </th>
                    <th className="p-[8px] text-left bg-white/40">
                      <p className="flex items-center text-white text-sm">
                        Brand Name
                      </p>
                    </th>
                    <th className="p-[8px] text-left bg-white/40">
                      <p className="flex items-center text-white text-sm">
                        Total In Stock
                      </p>
                    </th>
                    <th className="p-[8px] text-left bg-white/40">
                      <p className="flex items-center text-white text-sm">
                        Expire Date
                      </p>
                    </th>
                    <th className="p-[8px] text-left bg-white/40">
                      <p className="flex items-center text-white text-sm">
                        Purchase Date
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData && filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="w-full text-xl font-semibold text-white p-4 text-center"
                      >
                        No Product Added in store
                      </td>
                    </tr>
                  ) : (
                    filteredData &&
                    filteredData.map((item) => (
                      <tr key={item._id}>
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
                            {item.productName}
                          </p>
                        </td>
                        <td className="p-[8px]">
                          <p className="flex items-center text-white text-sm">
                            {item.brandName}
                          </p>
                        </td>
                        <td className="p-[8px]">
                          <p className="flex items-center text-white text-sm">
                            {item.productQuantity}
                          </p>
                        </td>
                        <td className="p-[8px]">
                          <p className="flex items-center text-white text-sm">
                            {item.expireDate}
                          </p>
                        </td>
                        <td className="p-[8px]">
                          <p className="flex items-center text-white text-sm">
                            {item.purchaseDate}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
