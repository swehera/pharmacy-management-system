"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "./Loading";
import { getData } from "@/lib";
import { API_BASE_URL } from "@/utils/apiConfig";

const ViewDetails = () => {
  const [loading, setLoading] = useState(false);
  const [singleCustomerData, setSingleCustomerData] = useState(null);
  const { id } = useParams();

  console.log("single data id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(`${API_BASE_URL}/api/sell/${id}`);
        console.log("This is single data", data);
        setSingleCustomerData(data);
      } catch (error) {
        console.log("data fetching error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        singleCustomerData && (
          <div className="flex flex-col gap-y-3">
            <div className="bg-white/45 rounded-md p-4">
              <p className="text-2xl text-white my-2">
                Your Selling Product Data
              </p>
              <div className="flex flex-col gap-y-2">
                <p className="text-sm text-white">
                  Customer Name:{" "}
                  {singleCustomerData.singleSelledData.customerName}
                </p>
                <p className="text-sm text-white">
                  Customer Phone number:{" "}
                  {singleCustomerData.singleSelledData.phone}
                </p>
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <p className="text-xl text-white">Products:</p>
                {singleCustomerData.singleSelledData.products.map((product) => (
                  <div key={product.productId} className="text-sm text-white">
                    <p>Product Name: {product.productName}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ViewDetails;
