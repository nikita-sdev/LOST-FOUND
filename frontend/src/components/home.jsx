import { useEffect, useState } from "react";
import { getItemsFromServer } from "../services/itemServices";

const Home=()=>{
  const [items,setItems]= useState([]);
  const [filter, setFilter]= useState("all");
  

  const fetchItems= async()=>{
    const data= await getItemsFromServer();
    setItems(data);
  }

  useEffect(()=>{
    fetchItems();
  },[]);

  const filteredItems= 
    filter==="all"?items: items.filter(item=>item.type === filter);


  return (
    <div className="bg-white py-24 sm:py-32 bg-gradient-to-r from-white via-blue-600 to-blue-200">
      <div className="mx-auto  max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  max-w-2xl lg:mx-0 ">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Lost & Found Items</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Browse all reported items</p>
          <span className="mt-2 text-lg/8 text-gray-700">Filter Items:  
            <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="ml-2 bg-blue-100 rounded-md shadow text-lg/8 text-gray-700"
            >
              <option value="all">All</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </span>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
          {filteredItems.map((item) => (
            <article key={item.id} className="flex max-w-xl flex-col items-start justify-between border-2 border-blue-900 p-5">
              <div className="flex items-center gap-x-4 text-xs">
              <span className="text-gray-500">
                {new Date(item.createdAt).toDateString()}
              </span>
              <span 
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                item.type === "lost"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {item.type}
              </span>
              </div>

              <div className="group relative grow">
                <h3 className="mt-3 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-800 line-clamp-3 font-semibold">
                  {item.product}
                </p>

                <p className="mt-3 text-l text-gray-700 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* BOTTOM */}
              <div className="mt-6 text-sm text-blue-900 font-semibold">
                📍 {item.location}
              </div>

            </article>
          ))}
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-[100px] py-2 rounded-lg shadow-md transition"><a href="/add-post">Add Item</a></button>
        </div>
      </div>
    </div>
  )
}

export default Home;