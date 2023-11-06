import React, { useContext, useEffect, useState } from 'react'
import VoterCard from './VoterCard';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
    // const started = true;
    const navigate = useNavigate();
    const { contract, account } = useContext(AuthContext);
    const [preference, setPreference] = useState(0);
    const [pop, setPop] = useState(false);
    const [candidateId, setCandidateId] = useState(0);
    const [phase, setPhase] = useState(null);
    const [selected, setSelect] = useState(null);
    const handle = (voter, i) => {
        setCandidateId(i);
        setSelect(voter);
        setPop(true)
    }
    const [voter, setVoter] = useState(null);

    const [candidates, setArr] = useState([]);

    const getCandidateArray = async () => {
        try {
            const voter = await contract.getCandidateArray();
            setArr(voter);

        } catch (error) {
            console.log(error);

        }
        getVoter();


    }
    const getVoter = async () => {
        try {
            const voter = await contract.getVoterDetails(account);
            setVoter(voter);
        } catch (error) {
            console.log(error);

        }
    }

    const vote = async () => {
        if (preference == 0) {
            console.log("Select Preference")
        }
        else {
            try {
                const res = await contract.voteCandidate(candidateId, selected.account, preference);
                await res.wait();
                console.log("Candidate Voted Successfully")
                getCandidate();
                setPop(false)
                setPreference(0);
                getVoter();
                navigate("/vote");

            } catch (error) {
                console.log(error);

            }
        }
    }
    const getCandidate = async () => {
        try {
            const voter = await contract.getCandidateDetails(selected.account);
            console.log(voter)
        } catch (error) {
            console.log(error);

        }
    }

    const handleSelect = (e) => {
        console.log(e.target.value);
        setPreference(e.target.value)

    }
    const addressVoted = (address) => {
        if (voter?.candidates.includes(address)) {
            return true;
        }
        return false;;
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
        getCandidateArray();
        getPhase();

    }, []);


    return (
        <div className='basic section_padding vote register'>
            <h2>Vote</h2>
            {phase == 0 && <>
                <h2>▶ Registration Phase is Not Over</h2>
            </>}
            {phase == 1 &&
                <>
                    <p>⁂ Click On the Card to Vote</p>
                    <div className='card-container' >
                        {candidates.map((v, i) => (
                            !addressVoted(v.account) && (
                                <div onClick={() => handle(v, i)} key={i}>
                                    <VoterCard name={v.name} admin={false} />
                                </div>
                            )
                        ))}

                    </div>

                </>
            }
            {
                phase == 2 && <>
                    <h2>▶ Voting Phase is Over ,Please Check The Result Section</h2>
                </>
            }

            <div className='pop-up' style={{ display: pop ? 'flex' : 'none' }} >
                <div className='pop-up-card voter-card'>
                    <span className="close" onClick={() => setPop(false)}>&times;</span>
                    <img src={"my.webp"} alt='pics' className='voter-pics' />
                    <p>{selected?.name}</p>

                    <div className='card-select'>
                        <p>Select Your Preference</p>
                        <select placeholder='Select Your Preference' onChange={handleSelect} >
                            <option value="0">Select Preference</option>

                            <option value="1" disabled={voter?.preference1}>1</option>
                            <option value="2" disabled={voter?.preference2}>2</option>
                            <option value="3" disabled={voter?.preference3}>3</option>

                        </select>
                        <div>
                            <button onClick={() => setPop(false)}>Cancel</button>
                            <button onClick={vote}>Vote</button>
                        </div>

                    </div>


                </div>
            </div>




        </div >
    )
}

export default Vote
