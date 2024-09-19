import { useEffect, useState } from "react";
import useAuthNavigator from "../utils/useAuthNavigator";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  // Manage the approved status state
  const [approved, setApproved] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useAuthNavigator("/", "/login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        //Check firestore for user approval status
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setApproved(userDoc.data()?.approved || false);
          } else {
            setApproved(false); // Default to false if user document doesn't exist
          }
        } catch (error: any) {
          alert(error.message);
        }
        //Check if 'admin' claim
        try {
          const tokenResult = await currentUser.getIdTokenResult();
          setIsAdmin(!!tokenResult.claims.admin);
        } catch (error) {
          console.error("Error getting ID token:", error);
          setIsAdmin(false);
        }
      } else {
        setApproved(false); // Default to false if no user is authenticated
        setIsAdmin(false); // Default to false if no user is authenticated
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <>
      <h4>Home Page</h4>
      <p>Note: Will navigate to login page if user is not logged in!</p>
      <p>
        Account Approval :{" "}
        {approved === null
          ? "Loading..."
          : approved
          ? "Approved"
          : "Not Approved"}
      </p>
      <p>
        Admin Right :{" "}
        {isAdmin === null ? "Loading..." : isAdmin ? "True" : "False"}
      </p>
    </>
  );
};

export default Home;
