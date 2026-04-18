import { useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";

const Logout=({setToken})=>{
  const navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setToken(null);
    navigate('/login')
  }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 text-gray-200">
    
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8 text-center"
    >
      
      {/* ICON */}
      <div className="text-5xl mb-4">⚠️</div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-white">
        Confirm Logout
      </h2>

      {/* SUBTEXT */}
      <p className="text-gray-400 mt-2">
        Are you sure you want to log out of your account?
      </p>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mt-8">
        
        {/* YES */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout}
          className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 hover:shadow-red-500/30 transition"
        >
          Yes, Logout
        </motion.button>

        {/* NO */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/home")}
          className="px-6 py-2 rounded-xl bg-gray-700 text-gray-200 font-semibold hover:bg-gray-600 transition"
        >
          Cancel
        </motion.button>

      </div>
    </motion.div>
  </div>
);
}

export default Logout;