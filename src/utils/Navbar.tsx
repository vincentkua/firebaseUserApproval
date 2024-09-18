import { Link } from "react-router-dom";
import AuthValidator from "./AuthValidator";

const Navbar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Signup</Link>
      <AuthValidator />
    </div>
  );
};

export default Navbar;
