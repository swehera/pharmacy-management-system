"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { productOne } from "../../public/images";
import { API_BASE_URL } from "@/utils/apiConfig";
import { useSelector } from "react-redux";
import ViewDetails from "./ViewDetails";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sell = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [medicine, setMedicine] = useState([]);
  const [filterMedicine, setFilterMedicine] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectProductQuantity, setSelectProductQuantity] = useState("");
  const [selledData, setSelledData] = useState([]);
  const [filterSelledData, setFilterSelledData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const user = userInfo?.user;

  //that is for fetch all sell data
  useEffect(() => {
    const fetchSelledData = async () => {
      try {
        const data = await getData(`${API_BASE_URL}/api/sell`);
        setSelledData(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchSelledData();
  }, [selledData]);

  const userBasedSelledFilter =
    user && selledData ? selledData.filter((item) => item?.user === user) : [];

  console.log("userBasedSelledFilter", userBasedSelledFilter);

  //that is for filter user based find sell data
  useEffect(() => {}, []);

  //that fetch is for showing the product he added in her store
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(`${API_BASE_URL}/api/product`);
        setMedicine(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("medicine data", medicine);

  const userBasedFilter =
    user && medicine ? medicine.filter((item) => item?.user === user) : [];

  console.log("userBasedFilter", userBasedFilter);

  useEffect(() => {
    const filtered = userBasedFilter.filter((item) =>
      item?.productName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterMedicine(filtered);
  }, [searchText, medicine]);

  const handleProductClick = (item) => {
    const availableQuantity = item.productQuantity;
    if (selectProductQuantity > availableQuantity) {
      toast.error(
        `Product is not available in store. You have ${availableQuantity} pcs`
      );
    } else if (selectProductQuantity) {
      setSelectedProduct((prevSelectedProduct) => [
        ...prevSelectedProduct,
        {
          ...item,
          quantity: selectProductQuantity,
          sellingPrice: item.sellingPrice, // Ensure sellingPrice is included
        },
      ]);
      setSearchText("");
      setSelectProductQuantity("");
      setFilterMedicine([]);
    } else {
      toast.error("Please enter the product quantity");
    }
  };

  const handleDeleteClick = (index) => {
    const updatedProducts = selectedProduct.filter((_, i) => i !== index);
    setSelectedProduct(updatedProducts);
  };

  // const handleSellSubmit = async () => {
  //   if (!customerName || !phone || selectedProduct.length === 0) {
  //     toast.error("Please fill in all fields and add at least one product");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${API_BASE_URL}/api/sell`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         customerName,
  //         phone,
  //         user,
  //         products: selectedProduct.map(({ _id, productName, quantity }) => ({
  //           productId: _id,
  //           productName,
  //           quantity: Number(quantity),
  //         })),
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("Response from backend:", data);

  //     if (data.success) {
  //       setCustomerName("");
  //       setPhone("");
  //       setSelectedProduct([]);
  //       toast.success("Sell info added successfully");
  //     } else {
  //       toast.error("Error adding sell info");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting sell info", error);
  //     toast.error("Error submitting sell info");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSellSubmit = async () => {
    if (!customerName || !phone || selectedProduct.length === 0) {
      toast.error("Please fill in all fields and add at least one product");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          phone,
          user,
          products: selectedProduct.map(
            ({ _id, productName, quantity, sellingPrice }) => ({
              productId: _id,
              productName,
              quantity: Number(quantity),
              sellingPrice: Number(sellingPrice), // Ensure sellingPrice is included
            })
          ),
        }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.success) {
        setCustomerName("");
        setPhone("");
        setSelectedProduct([]);
        toast.success("Sell info added successfully");
      } else {
        toast.error(`Error adding sell info: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting sell info", error);
      toast.error("Error submitting sell info");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  console.log("this is selled data", selledData);
  console.log(
    "this is selled data user",
    selledData.map((user) => user.user)
  );

  console.log("This is selected product", selectedProduct);
  return (
    <div className="flex flex-col gap-y-3">
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

          {selectedProduct.length !== 0 && (
            <div className="w-full overflow-y-scroll bg-white p-4 rounded-md">
              <div className="flex items-center justify-center">
                <p className="text-xl text-[#1D3471] font-semibold mb-2">
                  Selected Product
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.map((item, index) => (
                    <tr key={index}>
                      <td className="p-[8px] border border-gray-800">
                        <Image
                          src={productOne}
                          alt="product image"
                          width={40}
                          height={40}
                        />
                      </td>
                      <td className="p-[8px] border border-gray-800">
                        {item.productName}
                      </td>
                      <td className="p-[8px] border border-gray-800">
                        {item.quantity}
                      </td>
                      <td className="p-[8px] border border-gray-800">
                        <button
                          className="px-3 py-1 text-sm text-white bg-red-600"
                          onClick={() => handleDeleteClick(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full mt-3">
          <label className="text-sm text-white">Search Product</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter Product Name"
            className="w-full px-3 py-1 border-[0.5px] border-white bg-white/45 text-gray-600 outline-none"
          />
        </div>
        {searchText && (
          <div className="relative">
            <div className="absolute w-full bg-gray-300 z-50 p-2 h-60 overflow-y-scroll scrollbar-hide">
              {filterMedicine.length !== 0 ? (
                filterMedicine.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between  gap-x-12 border-b-[0.5px] border-b-gray-500 py-2 px-3 overflow-x-scroll"
                  >
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={item.image?.url || productOne}
                        alt="product image"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col gap-y-1">
                        <p>{item.productName}</p>
                        <p>
                          Available Quantity:{" "}
                          <span className=" text-red-500 font-bold">
                            {item.productQuantity} pcs
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" flex flex-col md:flex-row  items-center  gap-1">
                      <input
                        type="number"
                        value={selectProductQuantity}
                        onChange={(e) =>
                          setSelectProductQuantity(e.target.value)
                        }
                        placeholder="Quantity"
                        className="border px-2 py-1"
                      />
                      <button
                        onClick={() => handleProductClick(item)}
                        className="px-2 py-1 bg-blue-500 text-white ml-2"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        )}
        <button
          onClick={handleSellSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <Toaster />
      <div className="bg-white/45 rounded-md p-4">
        <p className="text-2xl text-white my-2">View Sell Data</p>
        {userBasedSelledFilter.length ? (
          <div className="overflow-y-scroll scrollbar-hide h-60">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-400">Customer</th>
                  <th className="p-2 border border-gray-400">Phone</th>
                  <th className="p-2 border border-gray-400">Total Quantity</th>
                  <th className="p-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {userBasedSelledFilter.map((sell) => (
                  <tr key={sell._id}>
                    <td className="p-2 border border-gray-400">
                      {sell.customerName}
                    </td>
                    <td className="p-2 border border-gray-400">{sell.phone}</td>
                    <td className="p-2 border border-gray-400">
                      {calculateTotalQuantity(sell.products)}
                    </td>
                    <td className="p-2 border border-gray-400">
                      <Link
                        href={`/view-details/${sell._id}`}
                        className=" flex items-center justify-center"
                      >
                        <button className="px-3 py-1 bg-slate-800 text-white text-sm rounded-md">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No sell data available</p>
        )}
      </div>
    </div>
  );
};

export default Sell;
