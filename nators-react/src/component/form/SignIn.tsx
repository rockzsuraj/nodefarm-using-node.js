import axios from "axios";
import { useEffect, useState } from "react";

const SignIn = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const [users, setUsers] = useState();

  // const ref = useRef(null);

  useEffect(() => {
    async function callLoginApi() {
      try {
        window.location.href = "/api/v1/users/login";
      } catch (error) {
        console.log("error");
      }
    }
    callLoginApi();
  }, []);

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await axios.post('/api/v1/users/login', {
  //             email,
  //             password,
  //         });
  //         // Handle successful login
  //         console.log('Login successful:', response.data);
  //         const response = await axios.post('/api/v1/');

  //         console.log('response', response);

  //     } catch (error) {
  //         // Handle login error
  //         console.error('Login error:', error.response.data);
  //         setError('Invalid email or password');
  //     }
  // };

  return <div></div>;
};

export default SignIn;
