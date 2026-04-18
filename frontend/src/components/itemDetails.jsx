import { useNavigate, useParams } from "react-router-dom"
import { claimItem, getItemById } from "../services/itemServices";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ItemDetails=()=>{
  const {id}= useParams();
  const navigate= useNavigate();
  const [item,setItem]= useState(null);
  const [questions, setQuestions]= useState([]);
  const [error,setError]= useState("");

  const fetchOneItem = async()=>{
    const res= await getItemById(id);
    setItem(res);
  }
  useEffect(()=>{
    fetchOneItem();
  },[id])

  const handleClaim= async()=>{
    navigate(`/verify/${id}`);
  }

  if(!item)return <p>Loading..</p>


return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-200 px-6 py-12">
    
    <div className="max-w-5xl mx-auto">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
      >

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              📍 {item.location}
            </p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              item.type === "lost"
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {item.type}
          </span>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Description
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* STATUS BOX */}
        <div className="mt-6 p-4 rounded-xl bg-gray-900 border border-gray-700">
          <p className="text-sm text-gray-400">
            Status:
            <span
              className={`ml-2 font-semibold ${
                item.status === "returned"
                  ? "text-green-400"
                  : item.status === "under_verification"
                  ? "text-yellow-400"
                  : "text-blue-400"
              }`}
            >
              {item.status || "available"}
            </span>
          </p>

          {/* STATUS STATES */}
          {item.status === "under_verification" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yellow-400 mt-2"
            >
              ⏳ Under Verification...
            </motion.p>
          )}

          {item.status === "returned" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 mt-2"
            >
              ✅ Item Returned
            </motion.p>
          )}

          {(item.status === "under_verification" || item.status === "returned") && (
            <p className="mt-2 text-gray-400 text-sm">
              Claimed by:{" "}
              <span className="text-white font-medium">
                {item.claims[item.claims.length - 1]?.user?.name}
              </span>
            </p>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-red-400 text-sm">{error}</p>
        )}

        {/* ACTION BUTTON */}
        {item.status === "available" && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleClaim}
            className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 transition"
          >
            Claim Item
          </motion.button>
        )}

        {/* BACK BUTTON */}
        <div className="mt-6 text-center">
          <a
            href="/home"
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to Home
          </a>
        </div>

      </motion.div>
    </div>
  </div>
);
}

export default ItemDetails