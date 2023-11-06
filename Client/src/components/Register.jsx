import React, { useContext, useEffect, useState } from 'react'
import "../styles/styles.css"
import { AuthContext } from '../App';

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "" });
    const [registered, setRegistered] = useState(false);
    const [phase, setPhase] = useState(null);

    const { authenticated, setAuth, user, setUser, setContract, contract, account } = useContext(AuthContext);
    const registerVoter = async () => {
        try {
            const res = await contract.registerVoter(form.name, form.email);
            await res.wait();
            console.log("Done");

        } catch (error) {
            console.log(error);

        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        registerVoter();
        setForm({ name: "", email: "" });

    }
    const checkRegister = async () => {
        try {
            const res = await contract.checkRegisteredVoters(account);
            setRegistered(res);

        } catch (error) {
            console.log(error);

        }

    }
    const getPhase = async () => {
        try {
            const owner = await contract.getCurrentPhase();
            console.log(owner.toString());
            setPhase(owner.toString());

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        checkRegister();
        getPhase();

    }, [])

    return (
        <div className='register section_padding basic'>
            <h2>Register</h2>
            {!registered && <p>* To Vote the Candidate , Registration is Compulsory</p>}
            <div className='reg-2'>
                {registered ? <h3>User Registered Already</h3> : phase == 0 && <form className='form-data' onSubmit={handleSubmit}>
                    <input type='text' required name='name' placeholder='Enter Name' value={form.name} onChange={handleChange} />
                    <input type='email' required name='email' placeholder='Enter Email' value={form.email} onChange={handleChange} />
                    <button type='submit'>Register</button>

                </form>}


            </div>
            {phase != 0 && <h3>▶ Registrations Phase is Over</h3>}


        </div>
    )
}

export default Register
