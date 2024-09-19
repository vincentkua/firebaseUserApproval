import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";

const Navbar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Signup</Link>
      <AuthStatus />
    </div>
  );
};

export default Navbar;
