import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backend_url } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchList = async () => {
    try {
      setLoading(true); 
      const response = await fetch(
        'https://hslbackend-5.onrender.com/api/product/list',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setList(data.products || []);
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false); 
    }
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${backend_url}/api/product/delete/${id}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Product deleted successfully');
        await fetchList();
      } else {
        toast.error(response.data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All products List</p>
      {loading ? (
        // ✅ Tailwind loader style
        <div className="flex justify-center items-center py-10">
          <div className="h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-green-600">LoadingProducts...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="hidden text-amber-950 md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100">
            <b>Images</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Code</b>
            <b>Brand</b>
            <b>Features</b>
            <b className="text-red-500">Action</b>
          </div>

          {list.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No products found</p>
          ) : (
              list.map((item, index) => (
               <div
                key={index}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-white/55"
               >
                <img className="w-16" src={item.images[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p>{item.code}</p>
                <p>{item.brand}</p>
                <p>{item.features}</p>
                <p
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeProduct(item._id)}
                >
                  X
                </p>
               </div>
               ))
              )}
        </div>
      )}
    </>
  );
};

export default List;
