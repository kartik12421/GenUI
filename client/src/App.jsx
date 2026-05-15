import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import Generate from "./pages/Generate";

export const ServerUrl = import.meta.env.VITE_BACKEND_URL;

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
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/generate" element={<Generate />}></Route>
    </Routes>
  );
}

export default App;
