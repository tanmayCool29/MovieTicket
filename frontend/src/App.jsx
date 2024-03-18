import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Theaters from "./pages/Theaters";
import Theater from "./pages/Theater";
import axios from "axios";

function App() {
  const [theaters, setTheaters] = useState([]);
  const [theater, setTheater] = useState({});

  useEffect(() => {
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

  console.log(theaters);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/theaters"
            element={<Theaters theaters={theaters} setTheater={setTheater} />}
          />
          <Route
            path="/theaters/theater"
            element={<Theater theater={theater} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
