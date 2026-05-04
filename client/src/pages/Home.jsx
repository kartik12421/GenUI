import React, { useState } from "react";
import Auth from "../components/Auth.jsx";
import { useSelector } from "react-redux";

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const {userData} = useSelector((state) => {})
  return (
    <div className="">
      {/* <button className="bg-black text-white p-4" onClick={() => { setShowAuth(true) }}>Open</button> */}



















      {showAuth && <Auth onClose={() => { setShowAuth(false) }}></Auth>}
    </div>
  );
}

export default Home;
