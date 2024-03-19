import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./Profile/UserProfile";
import AddMovies from "./components/Movies/AddMovies";
import AdminProfile from "./Profile/AdminProfile";
import Theaters from "./pages/Theaters";
import Theater from "./pages/Theater";
import axios from "axios";
 
function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  const [theaters, setTheaters] = useState([]);
  const [theater, setTheater] = useState({});

  console.log("isAdminLoggedIn: ", isAdminLoggedIn);
  console.log("isUserLoggedIn: ", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }

    const fetchTheaters = async () => {
      // Check if theaters data is available in local storage
      const theatersData = localStorage.getItem("theaters");
      if (theatersData) {
        setTheaters(JSON.parse(theatersData));
      } else {
        try {
          // Fetch theaters data from the server if not available in local storage
          const response = await axios.get("http://localhost:5000/");
          const fetchedtheaters = response.data;
          setTheaters(fetchedtheaters);
          localStorage.setItem("theaters", JSON.stringify(fetchedtheaters));
        } catch (error) {
          console.error("Error fetching theaters:", error);
        }
      }
    };

    fetchTheaters();
  }, []);

  
  return (
   <div>
   <Header />
    <section>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/booking/:id" element={<Booking/>} />
        <Route path="/user" element={<UserProfile/>} />
        <Route path="/add" element={<AddMovies/>}/>
        <Route path="/user-admin" element={<AdminProfile/>}/>
        <Route
            path="/theaters"
            element={<Theaters theaters={theaters} setTheater={setTheater} />}
          />
          <Route
            path="/theaters/theater"
            element={<Theater theater={theater} />}
          />
      </Routes>
    </section>
   </div>
  );
}

export default App;
