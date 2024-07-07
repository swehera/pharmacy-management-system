"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { productOne } from "../../public/images";

const Sell = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [medicine, setMedicine] = useState([]);
  const [filterMedicine, setFilterMedicine] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");

  // customer information
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  const endpoint = "https://fakestoreapi.com/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = medicine.filter((item) =>
      item?.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterMedicine(filtered);
  }, [searchText, medicine]);

  const handleProductClick = (item) => {
    if (productQuantity) {
      setSelectedProduct((prevSelectedProduct) => [
        ...prevSelectedProduct,
        { ...item, quantity: productQuantity },
      ]);
      setSearchText("");
      setProductQuantity("");
      setFilterMedicine([]);
    } else {
      toast.error("Please enter the product quantity");
    }
  };

  const handleDeleteClick = (index) => {
    const updatedProducts = selectedProduct.filter((_, i) => i !== index);
    setSelectedProduct(updatedProducts);
  };

  const handleSellSubmit = async () => {
    console.log("Customer Name", customerName);
    console.log("Phone", phone);
    console.log("selected product", selectedProduct);
    setSelectedProduct([]);
    setCustomerName("");
    setPhone("");
    toast.success("Sell info added successfully");
  };

  return (
    <div className="flex flex-col gap-y-3">
      {/* add selling data */}
      <div className="bg-white/45 rounded-md p-4">
        <p className="text-2xl text-white my-2">Add Selling data</p>
        <div className="flex flex-col gap-y-2">
          <div className="w-full flex flex-col md:flex-row gap-x-3">
            <div className="w-full md:w-[50%] flex flex-col gap-y-2">
              <label className="text-sm text-white">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className=" px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
              />
            </div>
            <div className="w-full md:w-[50%] flex flex-col gap-y-2">
              <label className="text-sm text-white">
                Customer Phone Number
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Customer Phone Number"
                className=" px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
              />
            </div>
          </div>

          {/* all selected products show here */}
          <div className="w-full flex flex-col gap-y-2">
            {selectedProduct.length !== 0 && (
              <div className="w-full overflow-y-scroll bg-white p-4 rounded-md">
                <div className="flex items-center justify-center">
                  <p className="text-xl text-[#1D3471] font-semibold mb-2">
                    Selected Products
                  </p>
                </div>
                <table className="whitespace-nowrap w-full">
                  <thead>
                    <tr>
                      <th className="p-[8px] text-left border border-gray-800">
                        Image
                      </th>
                      <th className="p-[8px] text-left border border-gray-800">
                        Product Name
                      </th>
                      <th className="p-[8px] text-left border border-gray-800">
                        Product Quantity
                      </th>
                      <th className="p-[8px] text-left border border-gray-800">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.map((item, index) => (
                      <tr key={item?.id}>
                        <td className="p-[8px] border border-gray-800">
                          <div className="flex items-center justify-center">
                            <Image
                              width={50}
                              height={50}
                              src={productOne}
                              alt="product-image"
                            />
                          </div>
                        </td>
                        <td className="p-[8px] text-left border border-gray-800">
                          {item?.title}
                        </td>
                        <td className="p-[8px] text-left border border-gray-800">
                          {item?.quantity}
                        </td>
                        <td className="p-[8px] border border-gray-800">
                          <div className="flex items-center justify-center gap-x-2">
                            <p
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDeleteClick(index)}
                            >
                              Delete
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* select and add product */}
          <div className="w-full flex flex-row gap-x-3 relative">
            <div className="w-[70%] md:w-[80%] flex flex-col gap-y-2">
              <label className="text-sm text-white">Search Product</label>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Product"
                className=" px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
              />
            </div>
            <div className="w-[30%] md:w-[20%] flex flex-col gap-y-2">
              <label className="text-sm text-white">Product quantity</label>
              <input
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                placeholder="Product quantity"
                className=" px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
              />
            </div>

            {/* this is for showing the search data */}
            {searchText && (
              <div className="absolute h-20 top-full mt-2 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto z-20 scrollbar-hide">
                {filterMedicine.length > 0 ? (
                  filterMedicine.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleProductClick(item)}
                    >
                      <div className="w-full border border-gray-400 rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Image
                              src={productOne}
                              alt="product-image"
                              width={50}
                              height={50}
                            />
                          </div>
                          <p>{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2">No products found</div>
                )}
              </div>
            )}
          </div>

          {/* add more input field for add new product and quantity */}
          <div>
            <button
              onClick={handleSellSubmit}
              className="px-4 py-1 rounded-md bg-[#1D3471] text-sm text-white"
            >
              Sell Product
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Sell;
