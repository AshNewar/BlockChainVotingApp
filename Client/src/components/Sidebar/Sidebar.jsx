import React, { useContext, useEffect, useState } from 'react'
import "../../styles/styles.css"
import { Link, useNavigate } from 'react-router-dom'
import { adminNav, contractAddress, navItem, server } from '../../constant'
import { Spin as Hamburger } from 'hamburger-react'
import { AuthContext } from '../../App'
import { ethers } from "ethers"
import { BrowserProvider, parseUnits } from "ethers";


import axios from 'axios'
import { ABI } from '../../ABI'

const Sidebar = () => {
    const [click, setClick] = useState(false);
    const { authenticated, setAuth, user, setUser, setContract, connected, setConnect, account, setAccount } = useContext(AuthContext);
    const navigate = useNavigate();

    const connectWallet = async () => {
        try {
            if (typeof window != "undefined" && window.ethereum != undefined) {
                const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(account[0]);
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const cont = new ethers.Contract(contractAddress, ABI, signer);

                setContract(cont);
                setConnect(true);
            }

        } catch (error) {
            console.log(error);

        }

    }

    function clickHandler() {
        setClick(!click);
    }
    const logOut = async () => {
        try {
            await axios.get(`${server}/voter/logout`, {
                withCredentials: true
            });
            setAuth(false);
            setUser(null);
            setContract(null);
            setAccount("");

            navigate("/");

        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        connectWallet()
    }, [])



    return (
        <>
            {authenticated &&
                <div>
                    <div className="menu-icon">
                        <Hamburger size={24} toggled={click} toggle={clickHandler} />

                    </div>
                    <div className='sidebar section_padding'>
                        <div className='connect-sec'>
                            <button onClick={connectWallet}>
                                {connected ? "Connected" :
                                    "Connect Wallet"
                                }</button>
                            <p className='acc-para'>
                                {connected && account.slice(0, 5) + "..." + account.slice(-4)}
                            </p>

                        </div>

                        <div className='side-link'>
                            {user && user.role_id === 1 ? (
                                <>
                                    {adminNav.map((nav, i) => (
                                        <Link to={nav.link} key={i}>{nav.title}</Link>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {navItem.map((nav, i) => (
                                        <Link to={nav.link} key={i}>{nav.title}</Link>
                                    ))}
                                </>
                            )}
                            {authenticated && <div onClick={logOut}>LogOut</div>}



                        </div>


                    </div>


                    {click &&
                        <div className='sidebar-menu sidebar section_padding'>
                            <div className='connect-sec'>
                                <button onClick={connectWallet}>
                                    {connected ? "Connected" :
                                        "Connect Wallet"
                                    }</button>
                                <p className='acc-para'>
                                    {connected && account.slice(0, 5) + "..." + account.slice(-4)}
                                </p>

                            </div>
                            <div className='side-link'>
                                {user && user.role_id === 1 ?
                                    <>
                                        {adminNav.map((nav, i) => (
                                            <Link to={nav.link} key={i}>{nav.title}</Link>

                                        ))}

                                    </>
                                    :
                                    <>
                                        {navItem.map((nav, i) => (
                                            <Link to={nav.link} key={i}>{nav.title}</Link>

                                        ))}

                                    </>
                                }
                                {authenticated && <div onClick={logOut}>LogOut</div>}




                            </div>


                        </div>
                    }

                </div>

            }

        </>


    )
}

export default Sidebar
