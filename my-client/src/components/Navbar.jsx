import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
import { useNavigate} from 'react-router-dom'; 
import { useState } from 'react';
import { useEffect } from 'react';

import jwt_decode from "jwt-decode";

const getUserEmailFromSessionStorage = () => {
  const token = sessionStorage.getItem("user");
  
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.email;
    } catch (e) {
      console.error("Error decoding JWT token:", e);
      return null;
    }
  }
  return null;
}

const Navbar = ({ setSelectedPublisher }) => {

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const emailFromStorage = getUserEmailFromSessionStorage();
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }
    else{
      console.log("there is an error")
    }
  }, []);
  const handlePublisherChange = (publisher) => {
    setSelectedPublisher(publisher);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            SUPER HEROES
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Choose Comics
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handlePublisherChange('Marvel Comics')}
                    >
                      Marvel Comics
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handlePublisherChange('DC Comics')}
                    >
                      DC comics
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="mx-3">
              <h2>Hello,</h2><p>{userEmail}</p>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
