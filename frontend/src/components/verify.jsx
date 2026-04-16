import { useEffect, useState } from "react";
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

      const data = await submitAnswers(id, formattedAnswers, setError);

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
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="bg-white w-[450px] p-6 rounded-xl">

        <h2 className="text-xl font-bold mb-2">
          Verify Item: {item.title}
        </h2>

        <p className="text-gray-600 mb-4">
          Answer these questions to proceed with claim
        </p>

        {/* QUESTIONS */}
        {QUESTIONS.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-gray-700 mb-1">
              {q}
            </p>

            <textarea
              className="w-full border p-2 rounded"
              rows="2"
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder="Your answer..."
            />
          </div>
        ))}

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
}

export default Verify;