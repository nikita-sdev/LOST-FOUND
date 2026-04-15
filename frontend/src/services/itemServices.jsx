const BASE_URL = "http://localhost:5000";

export const addItemToServer= async (title,product, description, location,type,setError)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/add-post`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({title,product, description, location,type})
  })
  
  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    setError(data.msg);
  }
}
