import { useEffect, useState } from "react";
import { getUserNotifications, markNotificationReadOnServer } from "../services/itemServices";

const Navbar=()=>{
  const [notifications, setNotifications]= useState([]);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    fetchNotification();
  },[]);

  const fetchNotification= async()=>{
    const res= await getUserNotifications();
    setNotifications(res);
  }

  const handleToggle=async()=>{
    setOpen(!open);
    if(!open){
      await markNotificationReadOnServer();
      fetchNotification();
    }
  }

  const unreadCount= notifications.filter(n=> !n.read).length;
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-xl font-bold">
        LostFound
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <a href="/home" className="hover:text-gray-300">Home</a>
        <a href="/add-post" className="hover:text-gray-300">Add Post</a>
        <a href="/dashboard" className="hover:text-gray-300">DashBoard</a>
        <a href="/logout" className="hover:text-gray-300">Logout</a>
        <div className="relative cursor-pointer" onClick={handleToggle}>🔔
          {unreadCount> 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">{unreadCount}</span>
          )}

          {open && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              {notifications.length === 0? (
                <p className="p-3 text-sm">No notifications</p>
              ):(
                notifications.map((n,i)=>(
                  <div key={i}
                  className={`p-3 border-b text-sm ${!n.read ? "bg-gray-100" : ""
                  }`}>
                    {n.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

    </nav>
  )
}

export default Navbar;