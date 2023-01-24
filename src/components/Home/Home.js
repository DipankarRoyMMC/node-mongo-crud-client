import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = (user) => {
        const agree = window.confirm(`Are your sure want delete this ${user.name}`);
        if (agree) {
            console.log('Deleting this user id', user._id);

            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('deleted user successfully')
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUsers);
                    }
                });
        }
    }
    return (
        <div>
            <h1>Users:{displayUsers.length}</h1>
            <div>
                {
                    displayUsers.map(user => <li key={user._id}>{user.name}, {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user)}>X</button></li>)
                }
            </div>
        </div>
    );
};

export default Home;