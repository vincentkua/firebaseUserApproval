import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const useAuthNavigator = (pathvalid: string, pathfailed: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate(pathvalid);
      } else {
        navigate(pathfailed);
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [navigate, pathvalid, pathfailed]);
};

export default useAuthNavigator;
