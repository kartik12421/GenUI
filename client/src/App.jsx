import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

export const ServerUrl = "http://localhost:3000";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/currentUser", {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
