import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from '../components'
import { saveData } from '../redux/sliceData'

function Home() {
    const [company, setCompany] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const openCompany = (id, name, address, email, phoneNumber) => {
        const data = {
            company_id: id,
            name: name,
            address: address,
            email: email,
            phoneNumber: phoneNumber
        }
        dispatch(saveData(data))
    }

    const initialData = {
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
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
        if (inputData.name && inputData.email && inputData.address && inputData.phoneNumber) {
            fetch("http://localhost:8080/company/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputData)
            }).then(() => {
                alert("New Company Created")
            })
            setInputData(initialData);
            closeModal();
            window.location.reload();
        } else {
            alert("All Fields are Required")
            e.preventDefault();
        }
    }

    useEffect(() => {
        fetch("http://localhost:8080/company/get")
        .then(res => res.json())
        .then((result) => {
            setCompany(result)
        })
    }, [])

    return (
        <>
            <Navbar/>
            <div className='container mx-auto px-10 mt-4'>
                <div className='w-full mx-auto'>
                    <div className="flex items-center mb-3 w-full">
                        <div className="flex-auto items-center w-full">
                            <p className="inline align-middle text-grey ml-2 text-lg">Company List</p>
                        </div>
                        <div className="flex-auto font-medium text-grey">
                            <button
                                type='button'
                                onClick={openModal}
                                className='inline-flex items-center justify-center px-4 py-2 mr-2 w-32 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Company</button>
                        </div>
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto"
                            onClose={closeModal}
                            >
                                <div className="min-h-screen px-4 text-center">
                                    <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    >
                                        <Dialog.Overlay className="fixed inset-0" />
                                    </Transition.Child>

                                    {/* This element is to trick the browser into centering the modal contents. */}
                                    <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                    >
                                    &#8203;
                                    </span>
                                    <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                    >
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#f5e3e0] shadow-xl rounded-2xl">
                                        <div className="max-w-md w-full space-y-8">
                                            <div>
                                                <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Create Company</h2>
                                            </div>
                                            <form className="mt-8 space-y-6" action="#" method="POST">
                                                <input type="hidden" name="remember" defaultValue="true" />
                                                <div className="rounded-md shadow-sm -space-y-px">
                                                    <div>
                                                        <label htmlFor="name" className="sr-only">
                                                            Company Name
                                                        </label>
                                                        <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={inputData.name}
                                                        required
                                                        onChange={handleInput}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Company Name"
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
                                                        className="group relative w-full flex justify-center py-2 px-4 border border-green text-sm font-medium rounded-md text-white font-serif bg-[#e9c0b9] hover:bg-[#e0a499] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f09d8e]"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                    <div className='rounded-lg shadow mb-4'>
                        <table className='table-auto w-full'>
                            <thead className='bg-gray-50 border-2 border-gray-200'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Company Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'></th>
                                </tr>
                            </thead>
                            <tbody className='border-gray-200 border-2'>
                                {company?.map((item, key) => (
                                    <>
                                    <tr key={key} className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className='p-3 text-sm text-gray-700'>{key + 1}</td>
                                        <td className='p-3 text-sm text-gray-700'>{item.name}</td>
                                        <td className='p-3 text-sm text-gray-700 text-right'>
                                            <Link to={`/company/dashboard`}>
                                                <button
                                                    type='button'
                                                    onClick={() => openCompany(item.id, item.name, item.address, item.email, item.phoneNumber)}
                                                    className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Open Company
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
