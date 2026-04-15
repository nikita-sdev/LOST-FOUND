const Navbar=()=>{
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-xl font-bold">
        LostFound
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <a href="/home" className="hover:text-gray-300">Home</a>
        {/* <a href="/add-transaction" className="hover:text-gray-300">Add Transaction</a> */}
        <a href="/logout" className="hover:text-gray-300">Logout</a>
      </div>

    </nav>
  )
}