import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ onSearchChange }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h4><span style={{ color: 'grey' }}>Clients</span><span style={{ color: 'red' }}>Management</span></h4>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link pl-5 font-weight-bold" to="/">All Clients</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
