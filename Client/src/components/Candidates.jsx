import React, { useContext, useEffect, useState } from 'react'
import VoterCard from './VoterCard';
import { AuthContext } from '../App';

const Candidates = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const { contract } = useContext(AuthContext);
    const [candidates, setArr] = useState([]);

    const getCandidateArray = async () => {
        try {
            const voter = await contract.getCandidateArray();
            setArr(voter);

        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getCandidateArray();

    }, []);

    return (
        <div className='section_padding basic register'>
            <h2>Candidate</h2>
            <div className='card-container'>
                {candidates.map((v, i) => (
                    <VoterCard key={i} name={v.name} admin={true} />


                ))}

            </div>

        </div>
    )
}

export default Candidates
