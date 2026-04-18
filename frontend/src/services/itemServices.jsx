const BASE_URL = "http://localhost:5000";

export const addItemToServer= async (formData,setError)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/api/add-post`, {
    method: "POST",
    headers:{
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
            answers: formattedAnswers,
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

//get items posted by owner from server
export const getOwnerItemsFromServer= async()=>{
  const res= await fetch(`${BASE_URL}/api/owner/items`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  const data= await res.json();
  return data;
}

//get owner items under verification from server
export const getOwnerItemsUnderVerification= async()=>{
  const res= await fetch(`${BASE_URL}/api/owner/verification`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  const data= await res.json();
  return data;
}

//owner decide update
export const decideClaim= async(itemId, claimId, action)=>{
  const res= await fetch(`${BASE_URL}/api/items/${itemId}/claims/${claimId}`,{
    method:"PATCH",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body : JSON.stringify({action})
  })
  const data= await res.json();
  return data;
}

//getUser notificationsexport 
export const getUserNotifications= async()=>{
  const res= await fetch(`${BASE_URL}/api/notifications`, {
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data= await res.json();
  console.log(data);
  return data;
}

//mark notification as read
export const markNotificationReadOnServer= async()=>{
  const res= await fetch(`${BASE_URL}/api/notifications/read`,{
    method: "PATCH",
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}

//owner item delte
export const deleteItemFromServer= async(id)=>{
  const res= await fetch(`${BASE_URL}/api/items/${id}`,{
    method: "DELETE",
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  return await res.json();
}

//api to get ai description
const getAIResponse= async(imageUrl)=>{
  const res= await fetch (
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}


