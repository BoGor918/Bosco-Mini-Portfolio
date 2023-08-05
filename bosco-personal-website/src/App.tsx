import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { MapperContext } from "./globalVariable/MapperContextProvider";

function App() {
  // Get user data from context
  const {
    authUser,
  } = useContext(MapperContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={authUser === null ? < Login /> : <Home />} />
        <Route path="/logout" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
