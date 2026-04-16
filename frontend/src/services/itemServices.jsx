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

export const getItemsFromServer = async()=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/home`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  const data= await res.json();
  if(res.ok){
    return data;
  }

}

//get one specific item
export const getItemById= async(id)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/items/${id}`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  const data= await res.json();
  if(res.ok){
    return data;
  }
}

//claim item api
export const claimItem= async(id,setError)=>{
  const token = localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/items/${id}/claim`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`,
    },
  })

  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    setError(data.msg);
  }
}

export const submitAnswers=async(id, formattedAnswers,setError)=>{
  const res = await fetch(
        `http://localhost:5000/api/items/${id}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            answers: formattedAnswers
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Something went wrong");
        return;
      }
      return data;
}