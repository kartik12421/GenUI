import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/Admin";
import AllComponents from "./pages/AllComponents";
import MyComponents from "./pages/MyComponents";
import Pricing from "./pages/Pricing";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllComponents, setAllUsers, setUserData } from "./redux/userSlice";
import Generate from "./pages/Generate";
import { useState } from "react";

export const ServerUrl = import.meta.env.VITE_BACKEND_URL;

function RequireAdmin({ authChecked, userData, children }) {
  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030b0d] text-sm text-white/60">
        Checking access...
      </div>
    );
  }

  if (userData?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/currentUser", {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
        setAuthChecked(true);
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
        setAuthChecked(true);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if(!userData) return

    const fetchAllUser = async () => {
      try {
        const usersRes = await axios.get(ServerUrl + "/api/user/users", {
          withCredentials: true,
        });
        dispatch(setAllUsers(usersRes.data));
      } catch (error) {
        console.log(error);
        dispatch(setAllUsers(null));
      }
    };

    const fetchAllComponents = async () => {
      try {
        const componentRes = await axios.get(ServerUrl + "/api/component/components", {
          withCredentials: true,
        });
        dispatch(setAllComponents(componentRes.data));
      } catch (error) {
        console.log(error);
        dispatch(setAllComponents(null));
      }
    };

    if (userData?.role === "admin") {
      fetchAllUser();
    } else {
      dispatch(setAllUsers([]));
    }

    fetchAllComponents()

  }, [userData, dispatch])

  return (
    <>
    {
      !authChecked && <div className="fixed top-0 left-0 w-full h-1 bg-[#50f7e9] animate-pulse z-50"></div>
    }
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/generate" element={<Generate />}></Route>
        <Route
          path="/admin"
          element={
            <RequireAdmin authChecked={authChecked} userData={userData}>
              <AdminDashboard />
            </RequireAdmin>
          }
        ></Route>
        <Route path="/components" element={<AllComponents />}></Route>
        <Route path="/myComponents" element={<MyComponents />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
      </Routes>
    </>
  );
}

export default App;
