import React from 'react'

const VoterCard = ({ name, admin }) => {
    return (
        <div className='voter-card'>
            <img src={"my.webp"} alt='pics' className='voter-pics' />
            <p>{name}</p>
            {!admin && <button>Vote</button>}

        </div>
    )
}

export default VoterCard
