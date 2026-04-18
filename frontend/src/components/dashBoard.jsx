import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { decideClaim, deleteItemFromServer, getOwnerItemsFromServer, getOwnerItemsUnderVerification } from "../services/itemServices";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

const DashBoard=()=>{
  const navigate= useNavigate();
  const [items,setItems]= useState([]);
  const [verificationItems, setVerificationItems]= useState([]);
  const [loading, setLoading]= useState();

  useEffect(()=>{
    fetchOwnerItems();
    fetchOwnerItemsUnderVerification();
  },[])

  const fetchOwnerItems= async()=>{
    const res= await getOwnerItemsFromServer();
    if(res){
    setItems(res);}
    else{
      console.log("no item");
    }
  }
  const fetchOwnerItemsUnderVerification= async()=>{
    const res= await getOwnerItemsUnderVerification();
    setVerificationItems(res);
  }

  const handleDecision= async(itemid, claimId, action)=>{
    try{
      setLoading(true);
      const res= await decideClaim(itemid, claimId, action);
    if(res){
      fetchOwnerItems();
      fetchOwnerItemsUnderVerification();
    }
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  const handleDeleteItem= async(id)=>{
    try{
      setLoading(true);
      const res= await deleteItemFromServer(id);
      if(res){
        fetchOwnerItems();
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false);
    }
  }

  if(loading){
    return (
      <Loader></Loader>
    )
  }


return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-200 p-6">
    
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white">My Posts</h2>

        <a
          href="/add-post"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-xl text-white shadow hover:scale-105 transition"
        >
          + Add Item
        </a>
      </motion.div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length===0 && <h1 className="text-gray-400 text-lg">No Posts</h1>}
        {items.map((item, i) => (
          <motion.article
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/20 transition flex flex-col justify-between"
          >
            {/* TOP */}
            <div className="flex flex-wrap gap-2 text-xs mb-3">
              <span className="text-gray-400">
                {new Date(item.createdAt).toDateString()}
              </span>

              <span
                className={`px-3 capitalize py-1 rounded-full font-medium ${
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
                    className={`ml-1 capitalize font-semibold ${
                      item.status === "returned"
                        ? "text-red-400"
                        : item.status === "under_verification"
                        ? "text-yellow-400"
                        : item.status === "available"
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
              <h3 className="text-xl capitalize font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400 line-clamp-3 first-letter:uppercase">
                {item.description}
              </p>
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex justify-between items-center capitalize text-sm">
              <p className="text-gray-400">📍 {item.location}</p>
              <div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(`/item/${item._id}`)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-md shadow hover:shadow-indigo-500/30 transition mr-2"
                >
                  View
                </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-500/80 hover:bg-red-600 px-3 py-1 rounded-md text-white text-sm shadow hover:shadow-red-500/30 transition"
              >
                Delete
              </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
        
      </div>

      {/* UNDER VERIFICATION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Under Verification
        </h2>

        {verificationItems.length === 0 ? (
          <p className="text-gray-400 text-lg">
            No items under verification
          </p>
        ) : (
          verificationItems.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-800/80 border border-gray-700 rounded-2xl p-5 mb-6 shadow hover:shadow-indigo-500/20 transition"
            >
              {/* ITEM HEADER */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-semibold text-white capitalize">
                  {item.title}
                </p>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold capitalize ${
                    item.type === "lost"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <p className="text-sm capitalize text-gray-400 mb-3">
                📍 {item.location}
              </p>

              {/* CLAIMS */}
              {item.claims.map((claim) => (
                <div
                  key={claim._id}
                  className="border-t border-gray-700 pt-4 mt-4"
                >
                  <p className="font-medium text-gray-200">
                    Claimed by:{" "}
                    <span className="text-indigo-400">
                      {claim.user?.name}
                    </span>{" "}
                    ({claim.user?.email})
                  </p>

                  <p className="text-xs text-gray-500">
                    Status: {claim.status}
                  </p>

                  {/* ANSWERS */}
                  <div className="mt-2 space-y-2">
                    {claim.answers.map((a, i) => (
                      <div key={i} className="text-sm text-gray-400">
                        <p><b className="text-gray-300">Q:</b> {a.question}</p>
                        <p><b className="text-gray-300">A:</b> {a.answer}</p>
                      </div>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  {claim.status === "pending" && item.status !== "returned" && (
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handleDecision(item._id, claim._id, "approve")
                        }
                        className="bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-md text-white shadow hover:shadow-green-500/30 transition"
                      >
                        Approve
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handleDecision(item._id, claim._id, "reject")
                        }
                        className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md text-white shadow hover:shadow-red-500/30 transition"
                      >
                        Reject
                      </motion.button>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  </div>
);
}

export default DashBoard;