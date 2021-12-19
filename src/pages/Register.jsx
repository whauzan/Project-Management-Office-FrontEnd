import React, { useState } from 'react'

function Register() {
    const initialData = {
        name: "",
        gender: "",
        email: "",
        address: "",
        phoneNumber: ""
    }

    const [inputData, setInputData] = useState(initialData);

    const handleInput = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputData({
            ...inputData,
            [nameTarget]: value
        })
    }

    const handleRegister = (e) => {
        if (inputData.name && inputData.gender && inputData.email && inputData.address && inputData.phoneNumber) {
            fetch("http://localhost:8080/employee/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputData)
            }).then(() => {
                alert("New Employee Added")
            })
            setInputData(initialData);
        } else {
            alert("All Fields are Required")
            e.preventDefault();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-500 rounded-lg shadow-2xl p-12">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-white">Register Employee</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Full Name
                            </label>
                            <input
                            id="name"
                            name="name"
                            type="text"
                            value={inputData.name}
                            required
                            onChange={handleInput}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="sr-only">
                                Gender
                            </label>
                            <input
                            id="gender"
                            name="gender"
                            type="text"
                            value={inputData.gender}
                            required
                            onChange={handleInput}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Gender (L/P)"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                            id="email"
                            name="email"
                            type="text"
                            value={inputData.email}
                            required
                            onChange={handleInput}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="sr-only">
                                Address
                            </label>
                            <input
                            id="address"
                            name="address"
                            type="text"
                            value={inputData.address}
                            required
                            onChange={handleInput}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Address"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">
                            Phone Number
                            </label>
                            <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={inputData.phoneNumber}
                            required
                            onChange={handleInput}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={handleRegister}
                            className="group relative w-full flex justify-center py-2 px-4 border border-green text-sm font-medium rounded-md text-white font-serif bg-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Register
