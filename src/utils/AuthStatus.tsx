import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AuthStatus = () => {
  const [user, setUser] = useState<User | null>(null); // Type is User or null


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser can be null, so we allow that in the state
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
    <>
      <div style={{ marginLeft: "20px" }}>
        <span>Current User: </span>
        <span>{user ? user.email : "Not Logged In"} </span>
        <button onClick={signOutUser}>Logout</button>
      </div>
    </>
  );
};

export default AuthStatus;
