import { motion } from "framer-motion";
import { useState } from "react";
import { addLoginToServer } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

const Login=({setToken})=>{
  const navigate= useNavigate();
  const [email,setEmail]= useState("");
  const [password,setPassword] =useState('');
  const [error, setError]= useState("");
  const [loading,setLoading]= useState(false);
  
  const handleLogin=async()=>{
    try{
      setLoading(true);
      const res=await addLoginToServer(email,password, setError,setToken);
    if(res){
      navigate("/home");
    }else{
      navigate("/login");
    }
    }
    catch{
      setError("Something went wrong");
    }
    finally{
      setLoading(false);
    }
  }

  if(loading){
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-12 size-4 text-gray-200">
        <Loader></Loader>
      </div>
    )
  }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 text-gray-200">
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
    >
      
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white text-center">
        Welcome Back 👋
      </h2>
      <p className="text-center text-gray-400 mt-2">
        Login to your account
      </p>

      {/* FORM */}
      <div className="mt-6 space-y-5">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleLogin}
          className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition"
        >
          Log in
        </motion.button>

        {/* SIGNUP */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-400 font-medium hover:text-indigo-300 transition"
          >
            Signup
          </a>
        </p>

      </div>
    </motion.div>
  </div>
);
}

export default Login;