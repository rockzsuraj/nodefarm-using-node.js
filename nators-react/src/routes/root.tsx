import axios from "axios";
import { useEffect, useState } from "react";

export default function Root() {
  const [users, setUsers] = useState();

  console.log("users:", users);

  const handleLogout = () => {
    try {
      // Trigger the backend logout and redirection by navigating to the logout route
      window.location.href = "/api/v1/users/logout";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await axios.get("/api/v1/users/userinfo");

        if (response && response.data) {
          setUsers(response.data); // Set state with the actual user data
        }
        console.log("Users:", response.data); // Log the user data
      } catch (error) {
        console.error("Error fetching users:", error); // Log the error for debugging
      }
    };
    fetchUsers(); // Call the async function
  }, []); // Dependency array

  return (
    <>
      <div
        id="sidebar"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <div>{users?.email}</div>
          <div>{users?.name}</div>
          <nav>
            <ul>
              {!users && (
                <li>
                  <a href={`/login`}>Login</a>
                </li>
              )}
              <li>{users && <button onClick={handleLogout}>Logout</button>}</li>
            </ul>
          </nav>
        </div>
        <h1>React Router Contacts</h1>
        <div></div>
      </div>
      <div id="detail"></div>
    </>
  );
}
