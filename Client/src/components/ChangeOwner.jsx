import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App';

const ChangeOwner = () => {
    const [form, setForm] = useState("");

    const [owner, setOwner] = useState("");
    const { contract } = useContext(AuthContext);
    const getOwner = async () => {
        try {
            const owner = await contract.getOwner();
            setOwner(owner);
            console.log(owner);

        } catch (error) {
            console.log(error);

        }
    }

    const changeOwner = async () => {
        try {
            await contract.changeOwner(form);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getOwner();
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setForm(value);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        changeOwner();
        // getVoterId();
        setForm("");

    }
    return (
        <div className='register section_padding basic'>
            <h2>ChangeOwner</h2>
            <h3>Current Owner : {owner}</h3>
            <div className='reg-2'>
                <form className='form-data' onSubmit={handleSubmit}>
                    <input type='text' required name='name' placeholder='Enter Name' value={form} onChange={handleChange} />

                    <button type='submit'>ChangeOwner</button>

                </form>


            </div>

        </div>
    )
}

export default ChangeOwner
