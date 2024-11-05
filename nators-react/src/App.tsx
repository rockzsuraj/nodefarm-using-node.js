import SignIn from "./component/form/SignIn";
// import { useAuth0 } from "@auth0/auth0-react";
function App() {
  // const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  // console.log('user', user);

  // const logOut = () => {
  //   logout();
  // }

  // const handleLoginLogOut = () => {
  //   console.log('handleLogin click');

  //   if (isAuthenticated) {
  //     logOut()
  //   }else {
  //     loginWithRedirect()
  //   }
  // }

  // const handleOktaLogin = () => {
  //   const res = await axios.get('/lo')
  // }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <a href="/login">Login</a>
      {/* <button onClick={handleOktaLogin}>{'Logged In'}</button> */}
      {/* <button onClick={handleOktaLogin}>{'Log In okta'}</button> */}
      <SignIn />
    </div>
  );
}

export default App;
