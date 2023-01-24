import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdateUser = (event) => {
        event.preventDefault();

        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('data updated successfully!!')
                }
                event.target.reset();
                console.log(data)
            })
        // console.log(user);
    }

    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h1>Please Update. {storedUser.name}</h1>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.name} name="name" id="name" placeholder='Enter your name' />
                <br></br>
                <input onChange={handleInputChange} type="text"
                    defaultValue={storedUser.address} name="address" placeholder='address' />
                <br></br>
                <input onChange={handleInputChange} type="email" name="email" defaultValue={storedUser.email} id="email" placeholder='Enter your email address' />
                <br></br>
                <button type="submit">update user</button>
            </form>
        </div>
    );
};

export default Update;