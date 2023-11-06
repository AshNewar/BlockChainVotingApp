import React, { useContext, useEffect, useState } from 'react'
import "../styles/styles.css"
import { AuthContext } from '../App';

const RegisterCandidate = () => {
    const [form, setForm] = useState({ name: "", email: "", address: "" });
    const { contract } = useContext(AuthContext);
    const [phase, setPhase] = useState(null);

    const registerCandidate = async () => {
        try {
            const res = await contract.registerCandidate(form.name, form.address, form.email);
            await res.wait();
            console.log("Done Candidate");
            setForm({ name: "", email: "", address: "" });


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
        registerCandidate();

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
        getPhase();

    }, [])

    return (
        <div className='register section_padding basic'>
            <h2>Register Candidates</h2>
            {phase == 0 ?
                <div className='reg-2'>
                    <form className='form-data' onSubmit={handleSubmit}>
                        <input type='text' required name='name' placeholder='Enter Name' value={form.name} onChange={handleChange} />
                        <input type='email' required name='email' placeholder='Enter Email' value={form.email} onChange={handleChange} />
                        <input type='text' required name='address' placeholder='Enter Wallet Address' value={form.address} onChange={handleChange} />

                        <button>Register</button>

                    </form>


                </div>
                : <h3>▶ Registrations Phase is Over</h3>}


        </div>
    )
}

export default RegisterCandidate
