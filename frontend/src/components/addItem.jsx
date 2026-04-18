import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { addItemToServer } from "../services/itemServices";
import { motion } from "framer-motion";
import Loader from "./loader";
import { generateAIDescriptionFromImage } from "../services/itemServices";


const AddItem=()=>{

  const [error, setError]= useState("");
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();
  const [aiDescription, setAiDescription]= useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const titleRef= useRef();
  const productRef=useRef();
  const descriptionRef= useRef();
  const locationRef= useRef();
  const typeRef= useRef();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleAddItem= async()=>{
    const title= titleRef.current.value
    const product= productRef.current.value
    const description= descriptionRef.current.value
    const location= locationRef.current.value
    const type= typeRef.current.value

    const formData= new FormData();

    formData.append("title", title);
    formData.append("product", product);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("type", type);
    formData.append("image", image);

    try{
      setLoading(true);
      const res= await addItemToServer(formData,setError);
      console.log(res);
      if(res){
        navigate('/home')
      }
    }
    catch{
      setError("Something went wrong");
    }finally{
      setLoading(false);
    }
  }

  const handleImage= async (e)=>{
    const file= e.target.files[0];

    setImage(file);
    setPreview(URL.createObjectURL(file));

    setLoadingAi(true);

    try {
      const result = await generateAIDescriptionFromImage(file);
      setAiDescription(result);
    } catch (err) {
      console.log(err);
    }

    setLoadingAi(false);

  }

  if(loading){
    return (
      <Loader></Loader>
    )
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-12 text-gray-200">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
    >
      
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Add New Item
      </h2>

      {/* FORM */}
      <div className="space-y-5">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Title
          </label>
          <input
            type="text"
            ref={titleRef}
            placeholder="e.g. Found school bag"
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* PRODUCT */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Product Name
          </label>
          <input
            type="text"
            ref={productRef}
            placeholder="e.g. Bag"
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Image
          </label>
          <input type="file" onChange={handleImage} 
          className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          {preview && (
            <img src={preview} className="w-40 h-40 rounded"/>
          )}
          {loadingAi && (
            <p className="text-sm text-indigo-400 mt-2">
              Generating AI description...
            </p>
          )}

          {aiDescription && (
            <div className="mt-3 bg-gray-900 p-4 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400">AI Suggestion:</p>

              <p className="text-white mt-1">{aiDescription}</p>

              <button
                onClick={() => {
                  descriptionRef.current.value = aiDescription;
                }}
                className="mt-3 text-sm bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg transition"
              >
                Use this
              </button>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            ref={descriptionRef}
            placeholder="Describe the item..."
            rows={3}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          
        </div>

        {/* LOCATION */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Location
          </label>
          <input
            type="text"
            ref={locationRef}
            placeholder="e.g. New Gallery"
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Type
          </label>
          <select
            ref={typeRef}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>


        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleAddItem}
          className="w-full mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition"
        >
          Add Item
        </motion.button>

      </div>
    </motion.div>
  </div>
);
}

export default AddItem;