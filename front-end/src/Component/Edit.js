import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Edit() {
    const [inputValue, setInputValue] = useState({
        name: '',
        phoneNumber: '',
        companyName: ''
    })

    const { id } = useParams()
    const setData = (e) => {
        const { name, value } = e.target

        setInputValue((preValue) => {
            return {
                ...preValue, [name]: value
            }
        })
    }

    const fillData = async () => {
        const response = await fetch(`http://localhost:5000/getclient/${id}`)
        const data = await response.json()

        setInputValue(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, phoneNumber, companyName } = inputValue
        try {
            const req = new Request(`http://localhost:5000/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, phoneNumber, companyName
                })
            })

            const res = await fetch(req)
            const data = await res.json()

            console.log(data);

            if (res.status !== 200 || !data) {
                alert("Error")
            } else {
                setInputValue(data)
                alert('Client updated Successfully')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fillData()
    }, [id])

    return (
        <div className='container mt-5'>
            <form className='mx-auto p-5'>
                <Link className='btn btn-success mb-3' to='/'>Home</Link>
                <h2>Edit Details</h2>
                <div className="form-group mb-3">
                    <label htmlFor="inputName">Full Name</label>
                    <input type="text" className="form-control" name='name' id="inputName" aria-describedby="nameHelp" placeholder="Full Name" onChange={setData} value={inputValue.name} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPhone">Phone Number</label>
                    <input type="text" className="form-control" name='phoneNumber' id="inputPhone" aria-describedby="phoneHelp" placeholder="Phone Number" onChange={setData} value={inputValue.phoneNumber} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputCompanyName">Company Name</label>
                    <input type="text" className="form-control" name='companyName' id="inputCompanyName" aria-describedby="companyNameHelp" placeholder="Company Name" onChange={setData} value={inputValue.companyName} />
                </div>
                <button className='btn btn-outline-primary' onClick={handleSubmit}>Update</button>
            </form>
        </div>
    )
}
