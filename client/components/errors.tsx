import React from 'react'

interface Props{
    msg: any[]
}

function Errors({ msg }: Props) {
    return (
        <div className="alert alert-danger mt-3" role="alert" >
            {
                msg.map((err, index) => (
                    <div key={index}> {err} </div>
                ))
            }
        </div>
    )
}

export default Errors
