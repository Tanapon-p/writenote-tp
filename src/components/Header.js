import { Link } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import Logo from "../assets/logo.png";
import { useState } from "react";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  function handleLogin() {
    signInWithPopup(auth, googleProvider).then((result) => {
      console.log(result);
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    });
  }
  function handleLoginFacebook() {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result);
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleLogout() {
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isAuth", false);
    window.location.reload();
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={Logo} alt="WriteNode Logo" />
        <span>WriteNote</span>
      </Link>
      <nav className="nav">
        <Link to="/" className="link">
          Home
        </Link>
        {isAuth ? (
          <>
            <Link to="/create" className="Link">
              Create
            </Link>
            <button onClick={handleLogout} className="auth">
              <i className="bi bi-box-arrow-right"></i>Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className="auth">
              <i className="bi bi-google"></i>Login
            </button>
            <button onClick={handleLoginFacebook} className="auth">
              <i className="bi bi-facebook"></i>Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
