import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";

// Define the user type
interface User {
  id: string;
  email: string;
  approved: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUnapprovedUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const unapprovedUsers = querySnapshot.docs
          .filter((doc) => doc.data().approved === false)
          .map((doc) => ({ id: doc.id, ...doc.data() })) as User[]; // Type assertion

        setUsers(unapprovedUsers);
      } catch (error: any) {
        alert("Only admin can read the list");
        alert(error.message);
      }
    };

    fetchUnapprovedUsers();
  }, []);

  const approveUser = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        approved: true,
      });
      alert("User Approved!");

      // Optionally remove approved user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h4>Admin Dashboard</h4>
      {users.length == 0 && "> Not Applicable"}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email}{" "}
            <button onClick={() => approveUser(user.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
