import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Details() {
    const { id } = useParams()
    const [singleClient, setSingleClient] = useState([])

    const getOneClient = async () => {
        const response = await fetch(`http://localhost:5000/getclient/${id}`)
        const data = await response.json()

        setSingleClient(data)

    }

    useEffect(() => {
        getOneClient()
    }, [id])
    return (
        <div className='container mt-5'>
            <Link className='btn btn-success mb-3' to='/'>Home</Link>
            <Link className='btn btn-warning mx-2 mb-3' to={`/edit/${singleClient._id}`}>Edit</Link>
            <div className='row'>
                <div className='col-md-6'>
                    <ul className="list-group">
                        <li className="list-group-item active">Client Details</li>
                        <li className="list-group-item">Full Name : {singleClient.name}</li>
                        <li className="list-group-item">Phone Number : {singleClient.phoneNumber}</li>
                        <li className="list-group-item">Company Name : {singleClient.companyName}</li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
