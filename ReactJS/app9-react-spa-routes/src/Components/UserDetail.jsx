import React from 'react'
import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';
import Axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserDetail = () => {
    // const location = useLocation();
    // const pathParts = location.pathname.split('/');
    // const id = pathParts[pathParts.length - 1];

    const { id } = useParams();
    // console.log(useParams())

    const [user, setUser] = useState(null)

    useEffect(() => {
        Axios.get("http://localhost:3001/users/" + id).then((res) => {
            console.log(res.data)
            setUser(res.data);
        })
    }, [id])
    return (
        <div>
            <h2>Welcome to User Detail Function component</h2>
            {
                user !== null &&
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ border: '2px solid black' }}>FullName</th>
                                    <th style={{ border: '2px solid black' }}>Gender</th>
                                    <th style={{ border: '2px solid black' }}>Areas Of Intrest</th>
                                    <th style={{ border: '2px solid black' }}>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td style={{ border: '2px solid black' }}><Link to={`/userDetail/${user.id}`}>{user.fname}</Link></td>
                                    <td style={{ border: '2px solid black' }}>{user.gender}</td>
                                    <td style={{ border: '2px solid black' }}>{user.areasOfInterest.join(",")}</td>
                                    <td style={{ border: '2px solid black' }}>{user.state}</td>
                                </tr>
                                <Outlet/>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Link to={'/users'}>
                            <button type="button">Return</button>
                        </Link>
                    </div>
                </div>
            }

        </div>
    )
}

export default UserDetail
