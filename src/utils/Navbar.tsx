import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null); // Type is User or null
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser); // currentUser can be null, so we allow that in the state
      if (currentUser) {
        // Get the ID token and check for custom claims
        try {
          const tokenResult = await currentUser.getIdTokenResult();
          setIsAdmin(!!tokenResult.claims.admin); // Check if 'admin' claim exists
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      alert("Sign Out Successfully!!!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {user && <Link to={"/"}>Home</Link>}
      {!user && (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </>
      )}
      {isAdmin && <Link to={"/admin"}>Admin</Link>}
      <div style={{ marginLeft: "20px" }}>
        <span>Current User: </span>
        <span>{user ? user.email : "Not Logged In"} </span>
        <button onClick={signOutUser}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
