import React, { useState } from 'react';
import { assets } from '../assets/assets/assets';
import axios from 'axios';
import { backend_url } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image, setImage] = useState(false);
  const [image1, setImage1] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [sizes, setSizes] = useState([]);
  const [material, setMaterial] = useState("");
  const [code, setCode] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("certificate");
  const [brand, setBrand] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("images", image); // <-- changed from "images" to "file" to match backend
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      // formData.append("mrp", mrp); // ALWAYS append
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("material", material);
      formData.append("code", code);
      formData.append("model", model);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("features", features);

      const response = await axios.post(
        backend_url + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false);
        setName(" ");
        setDescription(" ");
        setPrice(" ");
        // setMrp(" "); // reset MRP
        setSizes([]);
        setMaterial(" ");
        setCode(" ");
        setModel(" ");
        setCategory("certificate");
        setBrand(" ");
        setFeatures("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4 p-4 rounded-lg ">
      {/* Upload Image */}
      <div>
        <p className="mb-2 font-semibold">Upload Image</p>
        <label
          htmlFor="image"
          className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className="w-12" alt="Upload" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-1 font-semibold">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)} value={name}
          className="w-full max-w-[400px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-1 font-semibold">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)} value={description}
          className="w-full max-w-[400px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your description..."
          required
        />
      </div>

      {/* Category & Price */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="buttonfiles">Button Files</option>
            <option value="certificates">Certificates</option>
            <option value="zipfiles">Zip Files</option>
            <option value="stripfiles">Strip Files</option>
            <option value="documentbag">Document bag</option>
            <option value="clothpouches">Cloth Pouches</option>
            <option value="sheetprotectors">Sheet Protectors</option>
            <option value="clothcovers">Cloth Covers</option>
            <option value="reportfiles">Report Files</option>
            <option value="expandingfiles">Expanding Files</option>
            <option value="transparentpouches">Transparent Pouches</option>
            <option value="l.shapedfolders">L-Shaped Folders</option>
            <option value="open or side open covers">Open or Side Open Covers</option>
            <option value="spiralbooks">Spiral Books</option>
            <option value="zipperbags">Zipper Bags</option>
            <option value="securitybags">Security Bags</option>
            <option value="clipfiles">Clip Files</option>
            <option value="boxfiles">Box Files</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="24"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div className="flex-1">
          <p className="mb-1 font-semibold">Product MRP</p>
          <input
            onChange={(e) => setMrp(e.target.value)}
            value={mrp}
            type="number"
            placeholder="30"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

          {/* product MRP */}
        <div>
          <p className='font-bold'>Product MRP </p>
          <input onChange={(e) => setCode(e.target.value)} type="text" placeholder='MRP' required />
        </div>

      </div>

      {/* sizes */}
      <div>
        <p className="mb-2 font-semibold">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          {["B5", "A2", "A3", "A4", "A5", "A6", "A7", "F/C"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-2 rounded-md cursor-pointer border transition
          ${sizes.includes(size)
                  ? "bg-pink-200 border-pink-400 text-pink-800"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
            >
              {size}
            </div>
          ))}
        </div>
        
      </div>

      <div className='flex flex-col md:flex-row gap-5'>
        {/* material */}
        <div>
          <p className='font-bold'>Material</p>
          <input onChange={(e) => setMaterial(e.target.value)} type="text" placeholder='material' required />
        </div>

      
        {/* model */}
        <div>
          <p className='font-bold'>Model</p>
          <input onChange={(e) => setModel(e.target.value)} type="text" placeholder='model' required />
        </div>

        {/* brand */}
        <div>
          <p className='font-bold'>Brand</p>
          <input onChange={(e) => setBrand(e.target.value)} type="text" placeholder='brand' required />
        </div>
      </div>

      {/* features */}
      <div className='w-full'>
        <p className='font-bold'>Features</p>
        <textarea
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full max-w-[400px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your description..."
          required
        />
      </div>

      {/* add */}
      <button
        type="submit"
        disabled={loading}
        className={`w-28 py-3 px-5 rounded-2xl font-bold text-white transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default Add;
