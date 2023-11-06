import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App';

const ChangePhase = () => {
    const { contract } = useContext(AuthContext);
    const [phase, setPhase] = useState(null);
    const getPhase = async () => {
        try {
            const owner = await contract.getCurrentPhase();
            console.log(owner.toString());
            if (owner.toString() == "0") {
                setPhase("Registration");
            }
            else if (owner.toString() == "1") {
                setPhase("Voting")
            }
            else {
                setPhase("Results");
            }

        } catch (error) {
            console.log(error);

        }
    }

    const changePhase = async () => {
        try {
            const res = await contract.changeCurrentPhase();
            await res.wait();
            getPhase();
            console.log("Done")

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getPhase();
    }, [])



    return (
        <div className='register section_padding basic'>
            <h2>ChangePhase</h2>
            <p><b>Current Phase</b>: {phase}</p>
            <p>Registration ▶ Voting  ▶ Results</p>
            <button onClick={changePhase}>ChangePhase</button>

        </div>
    )
}

export default ChangePhase
