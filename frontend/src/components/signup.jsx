import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSignupToServer } from "../services/authServices";

const Signup= ()=>{
  const navigate= useNavigate();
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState("");
  const [name, setName]= useState("");

  const handleSignup=async()=>{
    const res= await addSignupToServer(email,password,name,setError);
    if(res){
      navigate("/login");
    }
  }

  return( 
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="eg: jonh@gmail.com"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  autoComplete="email"
                  className="block w-full border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mt-5">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  
                  type="text"
                  onChange={(e)=>{setName(e.target.value)}}
                  required
                  placeholder="eg: John Doe"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 border-2 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mt-5">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 border-2 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <p className="text-red-600">{error}</p>

            <div>
              <button
                type="submit"
                className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSignup}
              >
                Sign in
              </button>
            </div>
          {/* </form> */}

          <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>
        </div>
      </div>
  )
}

export default Signup;