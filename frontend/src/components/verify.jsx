import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { submitAnswers, getItemById } from "../services/itemServices";

const QUESTIONS =[
  "What color is the item?",
  "Where did you see it last",
  "Any unique mark on the item?"
]

const Verify=()=>{
  const {id}= useParams();
  const navigate= useNavigate();

  const [item,setItem] = useState();
  const [answers, setAnswers]= useState({});
  const [error, setError]= useState("");

  useEffect(()=>{
    fetchItem();
  },[id]);

  const fetchItem= async()=>{
    try{
      const data= await getItemById(id,setError);
      setItem(data);
    }catch(err){
      console.log(err);
    }
  }

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = QUESTIONS.map((q, i) => ({
        question: q,
        answer: answers[i] || ""
      }));

      const data = await submitAnswers(id, formattedAnswers,setError);

      if(data){
      alert("Answers submitted successfully!");
      navigate(`/item/${id}`);
      }

    } catch (err) {
      setError("Server error");
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 text-gray-200">
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
    >

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Verify Item
        </h2>
        <p className="text-gray-400 mt-1">
          Answer the questions to confirm your claim for{" "}
          <span className="text-indigo-400 font-medium">
            {item.title}
          </span>
        </p>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-6">
        {QUESTIONS.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-4"
          >
            <p className="text-sm text-gray-400 mb-1">
              Question {i + 1}
            </p>

            <p className="font-medium text-gray-200 mb-3">
              {q}
            </p>

            <textarea
              rows="3"
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder="Type your answer clearly..."
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </motion.div>
        ))}
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}

      {/* SUBMIT */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleSubmit}
        className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 transition"
      >
        Submit Answers
      </motion.button>

    </motion.div>
  </div>
);
}

export default Verify;