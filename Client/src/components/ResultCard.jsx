import React from 'react'

const ResultCard = ({ candidate }) => {


    return (
        <div className='voter-card'>
            <img src={"my.webp"} alt='pics' className='voter-pics' />
            <p>{candidate.name}</p>
            <div>
                <p>Preference 1: <b>{candidate.preference1.toString()}</b></p>
                <p>Preference 2: <b>{candidate.preference2.toString()}</b></p>
                <p>Preference 3: <b>{candidate.preference3.toString()}</b></p>
            </div>
            <p>Total Points</p>

            <div>
                <h1>{candidate.preference1.toString() * 5 + candidate.preference2.toString() * 3 + candidate.preference3.toString() * 1}</h1>

            </div>
        </div>
    )
}

export default ResultCard
