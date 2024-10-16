import React from 'react';
import style from './AllUser.module.css';

const Alluser = ({ user }) => {
    return (
        <div className={style.main}>
            <table>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((i, index) => (
                        <tr key={index}>
                            <td>{i.username}</td>
                            <td>{i.email}</td>
                            <td>{i.phoneNumber}</td>
                            <td>{i.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    );
}

export default Alluser;
