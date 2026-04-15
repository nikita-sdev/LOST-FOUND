const BASE_URL = "http://localhost:5000";

export const addLoginToServer= async (email,password,setError,setToken)=>{
  const res= await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password})
  })
  
  const data= await res.json();
  if(res.ok){
    localStorage.setItem("token", data.token);
    setToken(data.token);
    return data;
  }else{
    setError(data.msg);
  }
}

export const addSignupToServer= async(email,password,setError)=>{
  const res= await fetch(`${BASE_URL}/api/auth/signup`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"    
    },
    body: JSON.stringify({email, password}),
  })

  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    setError(data.msg)
  }
}

