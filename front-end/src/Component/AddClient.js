import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddClient() {

    const [inputValue, setInputValue] = useState({
        "name": "",
        "phoneNumber": "",
        "companyName": "",
    })

    const setData = (e) => {
        const { name, value } = e.target

        setInputValue((preValue) => {
            return {
                ...preValue, [name]: value
            }
        })
    }

    const addClient = async (e) => {
        e.preventDefault()

        const { name, phoneNumber, companyName } = inputValue

        const req = new Request('http://localhost:5000/addclient', {
            method: 'POST',
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

        if (res.status === 422 || !data) {
            alert("Error")
        } else {
            setInputValue(data)
            alert('Data Added Successfully')
        }
    }

    return (
        <div className='container mt-5'>
            <form className='mx-auto p-5'>
                <Link className='btn btn-success mb-3' to='/'>Home</Link>
                <h2>Fill-up Details</h2>
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
                <button className='btn btn-outline-primary' onClick={addClient}>Add</button>
            </form>
        </div>
    )
}
