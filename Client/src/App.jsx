
import "./App.css"
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Sidebar from "./components/Sidebar/Sidebar";
import Register from "./components/Register";
import Vote from "./components/Vote";
import Results from "./components/Results";
import Profile from "./components/Profile";
import Candidates from "./components/Candidates";
import RegisterCandidate from "./components/RegisterCandidate";
import ChangePhase from "./components/ChangePhase";
import ChangeOwner from "./components/ChangeOwner";
import Login from "./components/Login/Login";
import { createContext } from "react";
import axios from "axios";
import { server } from "./constant";
import Welcome from "./components/Wlcome";


export const AuthContext = createContext(null);

function App() {
  const [connected, setConnect] = useState(false);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  //Initialy set the voter Here Using UseEffect ;
  // const [voter ,setVoter] =useState(null);s





  const [authenticated, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${server}/voter/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data)
        setAuth(true);
      })
      .catch((error) => {
        setAuth(false);
      });
  }, []);



  return (
    <AuthContext.Provider value={{ authenticated, setAuth, user, setUser, contract, setContract, connected, setConnect, account, setAccount }}>
      <div className="app">

        <BrowserRouter>
          <Sidebar />


          <Routes>
            <Route path="/register" element={!authenticated ? <Login /> : <Register />} />
            <Route path="/" element={authenticated ? <Welcome /> : <Login />} />


            <Route path="/candidates" element={!authenticated ? <Login /> : <Candidates />} />
            <Route path="/vote" element={!authenticated ? <Login /> : <Vote />} />
            <Route path="/profile" element={!authenticated ? <Login /> : <Profile />} />
            <Route path="/result" element={!authenticated ? <Login /> : <Results />} />
            <Route path="/admin/register" element={!authenticated ? <Login /> : <RegisterCandidate />} />
            <Route path="/admin/changephase" element={!authenticated ? <Login /> : <ChangePhase />} />
            <Route path="/admin/changeowner" element={!authenticated ? <Login /> : <ChangeOwner />} />







          </Routes>

        </BrowserRouter>


      </div>

    </AuthContext.Provider>

  )
}

export default App
