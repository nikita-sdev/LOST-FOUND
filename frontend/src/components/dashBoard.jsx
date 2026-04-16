import { useEffect, useState } from "react";
import { decideClaim, deleteItemFromServer, getOwnerItemsFromServer, getOwnerItemsUnderVerification } from "../services/itemServices";

const DashBoard=()=>{
  const [items,setItems]= useState([]);
  const [verificationItems, setVerificationItems]= useState([]);

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
    const res= await decideClaim(itemid, claimId, action);
    if(res){
      fetchOwnerItems();
      fetchOwnerItemsUnderVerification();
    }
  }

  const handleDeleteItem= async(id)=>{
    const confirmDelete= window.confirm("Are you sure you want to delete?");

    if(!confirmDelete)return;

    const res= await deleteItemFromServer(id);

    if(res){
      fetchOwnerItems();
    }

  }

  return(
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-400 to-blue-200 p-6">
      <h2  className="text-2xl font-bold mb-4 bg-blue-950 text-white px-5 py-1" >My Posts</h2>
      <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {items.map(item=>(
        <article key={item.id} className="flex max-w-xl flex-col items-start justify-between border-2 bg-blue-200 border-blue-900 p-5">
              <div className="flex items-center gap-x-4 text-xs">
              <span className="text-gray-500">
                {new Date(item.createdAt).toDateString()}
              </span>
              <span 
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                item.type === "lost"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {item.type}
              </span>
              </div>

              <div className="group relative grow">
                <h3 className="mt-3 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-800 line-clamp-3 font-semibold">
                  {item.product}
                </p>

                <p className="mt-3 text-l text-gray-700 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* BOTTOM */}
              <div className="mt-6 flex items-center gap-10 text-sm text-blue-900 font-semibold">
                <p>📍 {item.location}</p>
                <button className="bg-red-500 px-2 rounded text-white hover:bg-red-600 text-sm"
                onClick={()=>handleDeleteItem(item._id)}
                >Delete</button>
              </div>

            </article>
      ))}
      </div>
      <div className="flex justify-center items-center mt-6 w-full">
        <button className="bg-blue-500 hover:bg-blue-600 text-white w-[100px] py-2 rounded-lg shadow-md transition">
          <a href="/add-post">Add Item</a>
        </button>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 bg-blue-950 text-white px-5 py-1">Under Verification</h2>
      {verificationItems.length===0? (
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl text-blue-900">No Items under verification</p>
        </div>
      ):
      (verificationItems.map(item=>(
        <div key={item._id} className="bg-blue-200 p-4 mb-4 rounder">
          <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-lg">{item.title}</p>

          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
            item.type === "lost"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}>
            {item.type}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          {item.location}
        </p>

        {item.claims.map(claim=>(
          <div key={claim._id} className="border-t pt-3 mt-3">
            <p className="font-semibold">Claimed by: {claim.user?.name} ({claim.user?.email})</p>
            <p className="text-xs text-gray-500">Status: {claim.status}</p>

            <div className="mt-2">
              {claim.answers.map((a,i)=>(
                <p key={i} className="text-sm">
                  <b>Q:</b> {a.question} <br/>
                  <b>A:</b> {a.answer}
                </p>
              ))}
            </div>
            {claim.status==="pending" && item.status!=="returned" && (
            <div className="flex gap-3 mt-3">

              <button className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={()=>handleDecision(item._id,claim._id, "approve")}
              >
                Approve
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={()=>handleDecision(item._id,claim._id, "reject")}
              >
                Reject
              </button>
            </div>
          )}
          </div>
        ))}
          {/* {item.claims.map((claim, i) => (
            <div key={i} className="mt-3 border-t pt-2">

              <p className="text-sm text-gray-600">
                {claim.user.name || "User"}
              </p>

              <p className="font-semibold mt-2">
                Answers:
              </p>

              {claim.answers.map((a, j) => (
                <p key={j} className="text-sm">
                  Q: {a.question} <br />
                  A: {a.answer}
                </p>
              ))}

            </div>
          ))} */}
        </div>
      )))}
    </div>
  )
}

export default DashBoard;