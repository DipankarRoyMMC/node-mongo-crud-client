import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleAddUser = (event) => {
        event.preventDefault();
        console.log(user);
        event.target.reset();

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('send data server to database')
                }
                console.log(data)
            })
    }

    const handleInputBlur = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h2>Please add new user</h2>
            <form onSubmit={handleAddUser}>
                <input onChange={handleInputBlur} type="text" name="name" id="name" placeholder='Enter your name' />
                <br></br>
                <input onChange={handleInputBlur} type="text" name="address" placeholder='address' />
                <br></br>
                <input onChange={handleInputBlur} type="email" name="email" id="email" placeholder='Enter your email address' />
                <br></br>
                <button type="submit">add user</button>
            </form>
        </div>
    );
};

export default AddUser;