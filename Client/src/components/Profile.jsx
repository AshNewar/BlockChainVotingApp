import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { server } from "../constant/index.js";
import { AuthContext } from '../App.jsx';


const Profile = () => {
    const [form, setForm] = useState("");
    const [id, setId] = useState(null);
    const [voter, setVoter] = useState([]);
    const { authenticated, setAuth, user, setUser, contract, setContract, connected, setConnect, account } = useContext(AuthContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setForm(value);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getVoterId();
        setForm("");

    }
    const getVoterId = async () => {
        try {
            const voter = await contract.getVoterId();
            setId(voter.toString());
        } catch (error) {
            console.log(error);

        }
    }
    const getVoter = async () => {
        try {
            const vote = await contract.getVoterDetails(account);
            setVoter(vote.candidates);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getVoter();
    }, []);




    return (
        <div className='section_padding register basic'>
            <h2>Profile</h2>
            <div className='pro-1'>
                <div className='pro-2'>
                    {connected ?
                        <>
                            <img src={"my.webp"} alt='profile' className='profile-pics' />
                            <div>
                                <p>Name : {user.username}</p>
                                <p>Address : {account.slice(0, 5) + "....." + account.slice(-4)}</p>
                                <p>Email : {user.email}</p>

                            </div>

                        </>

                        :
                        <p>Please Connect Wallet</p>
                    }

                </div>
                {
                    connected &&
                    <div>
                        <h4>Candidate Voted</h4>
                        {voter?.map((v, i) => (
                            <li key={i}>{v.slice(0, 8) + "....." + v.slice(-5)}</li>

                        ))}

                    </div>

                }






            </div>
            <h2>Find Your Id</h2>
            <div className='reg-2'>
                <form className='form-data' onSubmit={handleSubmit}>
                    <input type='text' required name='name' placeholder='Enter Name' value={form} onChange={handleChange} />

                    <button type='submit'>FindId</button>

                </form>


            </div>
            {id &&
                <div>⁂ Your Id is <b>{id}</b></div>
            }

        </div>
    )
}

export default Profile
