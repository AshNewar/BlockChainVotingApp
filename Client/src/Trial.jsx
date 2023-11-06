
import "./App.css"
import { useState } from "react";
import { ethers } from "ethers"
import { BrowserProvider, parseUnits } from "ethers";
import { ABI } from "./ABI";
import e from "cors";
function App2() {
    const [connected, setConnect] = useState(false);
    const [contract, setContract] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", account: "" })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        console.log(form)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        registerVoter();

    }
    const contractAddress = "0xBC9129Dc0487fc2E169941C75aABC539f208fb01"
    const connectWallet = async () => {
        try {
            if (typeof window != "undefined" && window.ethereum != undefined) {
                const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
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
    const getVoter = async () => {
        try {
            const voter = await contract.getVoter(2);
            console.log(voter.name)
        } catch (error) {
            console.log(error);

        }
    }
    const getCandidateArray = async () => {
        try {
            const voter = await contract.getCandidateArray();
            for (let i = 0; i < voter.length; i++) {
                console.log(voter[i].name, voter[i].account, voter[i].email)
            }
        } catch (error) {
            console.log(error);

        }

    }
    const getCandidate = async () => {
        try {
            const voter = await contract.getCandidate(1);
            console.log(voter.name)
        } catch (error) {
            console.log(error);

        }
    }
    const registerVoter = async () => {
        try {
            const res = await contract.registerVoter(form.name, form.email);
            await res.wait();
            console.log("Done");

        } catch (error) {
            console.log(error);

        }
    }

    const vote = async () => {
        try {
            await contract.voteCandidate(form.account, 3);
            const can = await contract.getCandidateDetails(form.account);
            console.log(can.preference1.toString(), can.preference2.toString(), can.preference3.toString());
            const voter = await contract.getVoterDetails(form.account);

            console.log(voter.name, voter.preference1.toString(), voter.preference2.toString(), voter.preference3.toString());


        } catch (error) {

        }
    }

    const registerCandidate = async () => {
        try {
            const res = await contract.registerCandidate(form.name, form.account, form.email);
            await res.wait();
            console.log("Done Candidate");

        } catch (error) {
            console.log(error);

        }
    }
    const getPhase = async () => {
        try {
            const owner = await contract.getCurrentPhase();
            console.log(owner.toString());

        } catch (error) {
            console.log(error);

        }
    }

    const changePhase = async () => {
        try {
            await contract.changeCurrentPhase();
            const owner = await contract.getCurrentPhase();

            console.log(owner.toString());

        } catch (error) {
            console.log(error);

        }
    }



    const getOwner = async () => {
        try {
            const owner = await contract.getOwner();
            console.log(owner);

        } catch (error) {
            console.log(error);

        }
    }









    return (
        <div className="app">
            <div>
                <button onClick={connectWallet}>
                    {connected ? "Connected" : "Connect"}</button>

            </div>
            <div>
                <button onClick={registerCandidate}>Add Candidate</button>

            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} />
                    <input type="text" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
                    <input type="text" name="account" placeholder="Account Address" required value={form.account} onChange={handleChange} />

                    <button type="submit">Voter Register</button>

                </form>


            </div>
            <div>
                <button onClick={getVoter}>Voter</button>

            </div>
            <div>
                <button onClick={getCandidate}>Candidate</button>

            </div>
            <div>
                <button onClick={vote}>CastVote</button>

            </div>
            <div>
                <button onClick={changePhase}>Change Phase</button>

            </div>
            <div>
                <button onClick={getPhase}>Get Phase</button>

            </div>

            <div>
                <button>Vote</button>

            </div>
            <div>
                <button>Result</button>

            </div>
            <div>
                <button onClick={getOwner}>GetOwner</button>

            </div>
            <button onClick={getCandidateArray}>Get CandidateArray</button>
        </div>
    )
}

export default App2
