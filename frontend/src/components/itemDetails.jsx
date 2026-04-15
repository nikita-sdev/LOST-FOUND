import { useParams } from "react-router-dom"
import { getItemById } from "../services/itemServices";
import { useEffect, useState } from "react";

const ItemDetails=()=>{
  const {id}= useParams();
  const [item,setItem]= useState(null);

  const fetchOneItem = async()=>{
    const res= await getItemById(id);
    setItem(res);
  }
  useEffect(()=>{
    fetchOneItem();
  },[id])

  if(!item)return <p>Loading..</p>

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="mt-2">{item.description}</p>
        <p className="mt-2 text-gray-600">{item.location}</p>
        <span className={`mt-2 inline-block px-2 py-1 text-sm rounded ${
          item.type === "lost" ? "bg-red-200" : "bg-green-200"
        }`}>{item.type}</span>

        <p className="mt-2">Status: <b>{item.status || "available"}</b></p>

        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded">
          Claim Item
        </button>

      </div>
    </div>
  )
}

export default ItemDetails