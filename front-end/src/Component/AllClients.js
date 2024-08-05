import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AllClients({ searchQuery }) {

    const [data, setData] = useState([])
    const [filteredClients, setFilteredClients] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/getall')
        const getAllClients = await response.json()

        setData(getAllClients)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setFilteredClients(data.filter((client) => {
            const name = client.name || ''
            return name.toLowerCase().includes((searchQuery || '').toLowerCase())
        }))
    }, [searchQuery, data])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                const response = await fetch(`http://localhost:5000/remove/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the client');
                }
                setData(data.filter((client) => client._id !== id));
                alert('Client Deleted Successfully')
            } catch (error) {
                console.error('Error deleting client:', error);
            }

        }
    }

    return (
        <div className='container'>
            <div>
                <Link className='btn btn-success mt-5' to='/addclient'>Add New Client</Link>
            </div>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Company</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredClients.map((item, idx) => (
                            <tr key={item._id}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.companyName}</td>
                                <td>
                                    <Link className='btn btn-outline-info mx-2' to={`/details/${item._id}`}>Details</Link>
                                    <Link className='btn btn-outline-warning mx-2' to={`/edit/${item._id}`}>Edit</Link>
                                    <Link className='btn btn-outline-danger mx-2' onClick={() => handleDelete(item._id)}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
