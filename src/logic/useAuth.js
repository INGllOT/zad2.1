import { useState } from "react";

 const [adminCredentials, setAdminCredentials] = useState({
   username: "admin",
   password: "admin",
 });
 
 const handleLogin = () => {
   if (
     username === adminCredentials.username &&
     password === adminCredentials.password
   ) {
     setIsLoggedIn(true);
     setUsername("");
     setPassword("");
   } else {
     alert("Invalid login credentials");
   }
 };

export default useAuth;
