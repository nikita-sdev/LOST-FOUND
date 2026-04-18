import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 text-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
    
    {/* LOGO */}
    <div className="text-2xl font-bold text-white tracking-wide">
      Lost<span className="text-indigo-400">Found</span>
    </div>

    {/* LINKS */}
    <div className="flex items-center gap-6 text-sm font-medium">
      
      <a href="/home" className="hover:text-indigo-400 transition">
        Home
      </a>

      <a href="/add-post" className="hover:text-indigo-400 transition">
        Add Post
      </a>

      <a href="/dashboard" className="hover:text-indigo-400 transition">
        Dashboard
      </a>

      <a href="/logout" className="hover:text-red-400 transition">
        Logout
      </a>

      {/* NOTIFICATIONS */}
      <div className="relative">
        
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={handleToggle}
          className="cursor-pointer relative text-lg"
        >
          🔔

          {/* BADGE */}
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white">
              {unreadCount}
            </span>
          )}
        </motion.div>

        {/* DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
            >
              
              {/* HEADER */}
              <div className="p-3 border-b border-gray-700 text-sm font-semibold text-gray-300">
                Notifications
              </div>

              {/* CONTENT */}
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-400 text-center">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n, i) => (
                    <div
                      key={i}
                      className={`p-3 text-sm border-b border-gray-700 transition ${
                        !n.read
                          ? "bg-indigo-500/10 text-white"
                          : "text-gray-300"
                      } hover:bg-gray-700`}
                    >
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  </nav>
);
}

export default Navbar;