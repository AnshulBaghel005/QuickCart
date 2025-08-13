import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

const inputStyle = "w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

const AddProduct = ({token}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
  });
  const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleSizeChange = (size) => {
    const updatedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.price < 0) return alert("Price cannot be negative");

    //const token = localStorage.getItem("token");
    console.log('token',token);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, key === "sizes" ? JSON.stringify(value) : value);
    });
    Object.entries(images).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      const res = await axios.post(`${backendUrl}/api/v1/product/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.data.success){
        toast.success(res.data.message);
      setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      subCategory: "",
      sizes: [],
      bestseller: false,
    });

    setImages({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });

      }
      else{
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error(err);
      toast.error("Error in product adding");

    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Product</h2>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <input className={inputStyle} name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <textarea className={inputStyle} name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className={inputStyle} name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />

          <select className={inputStyle} name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          <select className={inputStyle} name="subCategory" value={formData.subCategory} onChange={handleChange} required>
            <option value="">Select Sub-Category</option>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
          </select>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
            <label className="text-sm font-medium">Best Seller</label>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Select Sizes</label>
          <div className="flex flex-wrap gap-4">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input type="checkbox" checked={formData.sizes.includes(size)} onChange={() => handleSizeChange(size)} />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Upload Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(images).map((key, idx) => (
              <label
                key={key}
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-32 cursor-pointer bg-gray-50 hover:bg-blue-50 transition"
              >
                <PlusCircle className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-xs text-gray-600 text-center px-2">{images[key]?.name || `Upload Image ${idx + 1}`}</span>
                <input type="file" accept="image/*" name={key} className="hidden" onChange={handleImageChange} />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
