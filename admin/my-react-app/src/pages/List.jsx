import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [products, setProducts] = useState([]);
  // Fetch products on load
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/product/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.data.success){
      setProducts(res.data.products || []);
      }
      else{
        toast.err(res.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    try {
      
      await axios.post(`${backendUrl}/api/v1/product/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from local state
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      toast.success('product remove successfully')
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Products List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4 capitalize">{product.category}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 font-bold text-xl hover:text-red-700"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
