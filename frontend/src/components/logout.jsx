import { useNavigate } from "react-router-dom";

const Logout=({setToken})=>{
  const navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setToken(null);
    navigate('/login')
  }
  return (
    <div className="flex  min-h-screen flex-col  bg-gradient-to-r from-blue-950 
    via-blue-200 to-blue-950  px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Are you sure you want logout ?
          </h2>
          <div className="sm:mx-auto flex justify-center gap-5 mt-10 sm:w-full sm:max-w-sm ">
          <button className="bg-red-500 px-5 rounded font-bold hover:bg-red-600"
          onClick={()=>handleLogout()}
          >Yes</button>
          <button className="bg-green-500 px-5 rounded font-bold hover:bg-green-600"
          onClick={()=>{
            navigate("/home")
          }}
          >No</button>
        </div>
        </div>
      </div>
  )
}

export default Logout;