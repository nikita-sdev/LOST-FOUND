import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { addItemToServer} from "../services/itemServices";

const AddItem=()=>{

  const [error, setError]= useState("");
  const navigate= useNavigate()

  const titleRef= useRef();
  const productRef=useRef();
  const descriptionRef= useRef();
  const locationRef= useRef();
  const typeRef= useRef();

  const handleAddItem= async()=>{
    const title= titleRef.current.value
    const product= productRef.current.value
    const description= descriptionRef.current.value
    const location= locationRef.current.value
    const type= typeRef.current.value

    const res= await addItemToServer(title,product,description,location,type,setError);
    console.log(res);
    if(res){
      navigate('/home')
    }
    
  }

  return (
    <div className="flex bg-gradient-to-r from-white via-blue-500 to-blue-200 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-navi-700">
            Add Post
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-navi-300">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  ref={titleRef}
                  placeholder="eg: Found school bag"
                  required
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-navi-300">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="product"
                  name="product"
                  type="text"
                  ref={productRef}
                  required
                  placeholder="eg: Bag"
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-navi-300">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  ref={descriptionRef}
                  required
                  placeholder="eg: I found an school bag today in the New Gallery"
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-navi-300">
                Location
              </label>
              <div className="mt-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  ref={locationRef}
                  placeholder="eg: New Gallery"
                  required
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mt-5">
                <label htmlFor="password" className="block text-sm/6 font-medium text-navi-300">
                Type
                </label>
              </div>
              <div className="mt-2">
                <select
                ref={typeRef}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 border-2 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
            </div>

            
            <p className="text-red-400">{error}</p>

            <div>

              <button
                type="submit"
                onClick={handleAddItem}
                className="flex w-full mt-5 justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                
              >
                Add
              </button>
            </div>
        </div>
      </div>
  )
}

export default AddItem;