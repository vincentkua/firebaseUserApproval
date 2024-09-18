import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

const Providers = () => {
  return (
    <>
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Link to={"/"}>Home</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Providers;
