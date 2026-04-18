import { useEffect, useState } from "react";
import { getItemsFromServer } from "../services/itemServices";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

const Home=()=>{
  const navigate= useNavigate()
  const [items,setItems]= useState([]);
  const [filter, setFilter]= useState("all");
  const [search, setSearch]= useState("");
  
  //fatch items initially
  const fetchItems= async()=>{
    const data= await getItemsFromServer();
    setItems(data);
  }

  useEffect(()=>{
    fetchItems();
  },[]);

  //filter items based on search and dropdown
  const filteredItems = items.filter((item)=>{
    const matchFilter= filter==="all" || item.type===filter;

    const matchSearch= 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.product.toLowerCase().includes(search.toLowerCase())||
    item.location.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  })


  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-16 text-gray-200">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          Lost & Found Items
        </h2>
        <p className="mt-3 text-lg text-gray-400">
          Browse all reported items
        </p>

        {/* SEARCH + FILTER */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-gray-800 border border-gray-700 px-4 py-2 shadow focus:ring-2 focus:ring-indigo-500 outline-none transition text-white placeholder-gray-400"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl bg-gray-800 border border-gray-700 px-4 py-2 shadow focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
          >
            <option value="all">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <a
            href="/add-post"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 hover:shadow-xl text-white px-5 py-2 rounded-xl transition text-center"
          >
            + Add Item
          </a>
        </div>
      </motion.div>

      {/* GRID */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20"
          >
            <h2 className="text-2xl font-semibold text-gray-400">
              No items found 😕
            </h2>
          </motion.div>
        ) : (
          filteredItems.map((item, i) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04 }}
              className="bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-lg p-5 flex flex-col justify-between hover:shadow-indigo-500/20 hover:border-indigo-500/40 transition"
            >
              {/* TOP */}
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="text-gray-400">
                  {new Date(item.createdAt).toDateString()}
                </span>

                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    item.type === "lost"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {item.type}
                </span>

                <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300">
                  Status:
                  <span
                    className={`ml-1 font-semibold ${
                      item.status === "returned"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </span>
              </div>

              {/* CONTENT */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-medium text-indigo-400">
                  {item.product}
                </p>

                <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex items-center justify-between text-sm">
                <p className="text-gray-400">📍 {item.location}</p>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(`/item/${item._id}`)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1.5 rounded-md shadow hover:shadow-indigo-500/30 transition"
                >
                  View
                </motion.button>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default Home;