import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App';
import ResultCard from './ResultCard';

const Results = () => {
    const [phase, setPhase] = useState(null);
    const [candidates, setArr] = useState([]);

    const { authenticated, setAuth, user, setUser, contract, setContract, connected, setConnect, account } = useContext(AuthContext);
    const getPhase = async () => {
        try {
            const owner = await contract.getCurrentPhase();
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

    const getCandidateArray = async () => {
        try {
            const voter = await contract.getCandidateArray();
            setArr(voter);

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getPhase();
        getCandidateArray();

    }, []);


    return (
        <div className='section_padding basic register'>
            <h2>Results</h2>
            <h3>CurrentPhase : {phase} </h3>
            {
                phase == "Results" ?

                    <div className='card-container'>
                        {
                            candidates.map((c, i) => (
                                <ResultCard candidate={c} key={i} />
                            ))
                        }
                    </div>
                    :
                    <h3>{phase} Phase is Not Over</h3>}


        </div>
    )
}

export default Results
