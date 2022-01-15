import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { Footer, NavbarCompany } from '../components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function Customer() {
    let curSlug = 'customer'
    const [customer, setCustomer] = useState([]);
    const [projectManager, setProjectManager] = useState([]);
    const id = useSelector((state) => state.data.datas?.company_id);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProject, setIsOpenProject] = useState(false);

    const initialDataCustomer = {
        name: "",
        occupation: "",
        email: "",
        address: "",
        company_id: id
    }

    const initialDataProject = {
        name: "",
        type: "",
        technology: "",
        price: "",
        duedate: "",
        customer_id: "",
        project_manager_id: ""
    }

    const [inputData, setInputData] = useState(initialDataCustomer);
    const [inputDataProject, setInputDataProject] = useState(initialDataProject);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModalProject = () => {
        setIsOpenProject(false);
    }

    const openModalProject = (id) => {
        setInputDataProject({
            ...inputDataProject,
            customer_id: id
        })
        setIsOpenProject(true);
    }

    const handleInput = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputData({
            ...inputData,
            [nameTarget]: value
        })
    }

    const handleInputProject = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputDataProject({
            ...inputDataProject,
            [nameTarget]: value
        })
        console.log(inputDataProject);
    }

    const handleRegister = (e) => {
        if (inputData.name && inputData.occupation && inputData.email && inputData.address) {
            fetch("http://localhost:8080/customer/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputData)
            }).then(() => {
                alert("New Customer Inserted")
            })
            setInputData(initialDataCustomer);
            closeModal();
            window.location.reload();
        } else {
            alert("All Fields are Required")
            e.preventDefault();
        }
    }

    const handleAddProject = (e) => {
        if (inputDataProject.name && inputDataProject.type && inputDataProject.technology && inputDataProject.price && inputDataProject.duedate && inputDataProject.project_manager_id) {
            fetch("http://localhost:8080/project/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputDataProject)
            }).then(() => {
                alert("New Project Added")
            })
            setInputDataProject(initialDataProject);
            closeModalProject();
            window.location.reload();
        } else {
            alert("All Fields are Required")
            e.preventDefault();
        }
    }

    const handleSelect = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputDataProject({
            ...inputDataProject,
            [nameTarget]: value
        })
    }

    useEffect(() => {
        fetch(`http://localhost:8080/customer/get?company_id=${id}`)
        .then(res => res.json())
        .then((result) => {
            setCustomer(result)
        })

        fetch(`http://localhost:8080/projectManager/get`)
        .then(res => res.json())
        .then((result2) => {
            setProjectManager(result2)
        })
    }, [])
    return (
        <>
        <NavbarCompany curSlug={curSlug}/>
        <div className='min-h-screen'>
            <div className='mb-4 w-10/12 mx-auto'>
                <div className="flex items-center mb-3">
                    <div className="flex-auto items-center w-full">
                        <p className="inline align-middle ml-2 text-lg">Customer List</p>
                    </div>
                    <div className="flex-auto font-medium">
                        <button
                            type='button'
                            onClick={openModal}
                            className='inline-flex items-center justify-center px-4 py-2 mr-2 w-32 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Customer
                        </button>
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
                                                <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Register Customer</h2>
                                            </div>
                                            <form className="mt-8 space-y-6" action="#" method="POST">
                                                <input type="hidden" name="remember" defaultValue="true" />
                                                <div className="rounded-md shadow-sm -space-y-px">
                                                    <div>
                                                        <label htmlFor="name" className="sr-only">
                                                            Customer Name
                                                        </label>
                                                        <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={inputData.name}
                                                        required
                                                        onChange={handleInput}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Customer Name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="occupation" className="sr-only">
                                                            Occupation
                                                        </label>
                                                        <input
                                                        id="occupation"
                                                        name="occupation"
                                                        type="text"
                                                        value={inputData.occupation}
                                                        required
                                                        onChange={handleInput}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Occupation"
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
                <div className='overflow-auto rounded-lg shadow-lg hidden md:block'>
                    <table className='table-auto w-full'>
                        <thead className='bg-gray-50 border-2 border-gray-200'>
                            <tr>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Occupation</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Project</th>
                            </tr>
                        </thead>
                        <tbody className='border-gray-200 border-2'>
                            {customer?.map((item, key) => (
                                <>
                                    <tr key={key} className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className='p-3 text-sm text-gray-700'>{key + 1}</td>
                                        <td className='p-3 text-sm text-gray-700'>{item.name}</td>
                                        <td className='p-3 text-sm text-gray-700'>{item.occupation}</td>
                                        <td className='p-3 text-sm text-gray-700'>{item.email}</td>
                                        <td className='p-3 text-sm text-gray-700'>{item.address}</td>
                                        <td className='p-3 text-sm text-gray-700'>
                                            {item.project ? 
                                            <div className='bg-[#991B19] px-4 py-2 rounded-md text-white text-center inline-block'>{item.project.name}</div>
                                            :
                                            <button
                                                type='button'
                                                onClick={() => openModalProject(item.id)}
                                                className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Project
                                            </button>
                                        }
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden text-[#991B19]'>
                    {customer.map((item, key) => (
                        <>
                        <div key={key} className='bg-[#f5e3e0] p-4 space-y-2 rounded-lg shadow'>
                            <div className='flex items-center space-x-2 text-sm'>
                                <div>
                                    {item.occupation}
                                </div>
                                <div>
                                    ({item.email})
                                </div>
                            </div>
                            <div className='font-semibold text-lg'>
                                {item.name}
                            </div>
                            <div className=''>
                                {item.address}
                            </div>
                            <div className=''>
                            {item.project ? 
                                <div className='bg-[#991B19] px-4 py-1.5 rounded-md text-white inline-block'>{item.project.name}</div>
                                :
                                <button
                                    type='button'
                                    onClick={() => openModalProject(item.id)}
                                    className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Project
                                </button>
                            }
                            </div>
                        </div>
                        </>
                    ))}
                </div>
                <Transition appear show={isOpenProject} as={Fragment}>
                    <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModalProject}
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
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-visible text-left align-middle transition-all transform bg-[#f5e3e0] shadow-xl rounded-2xl">
                                    <div className="max-w-md w-full space-y-8">
                                        <div>
                                            <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Register Project</h2>
                                        </div>
                                        <form className="mt-8 space-y-6" action="#" method="POST">
                                            <input type="hidden" name="remember" defaultValue="true" />
                                            <div className="rounded-md shadow-sm -space-y-px">
                                                <div>
                                                    <label htmlFor="name" className="sr-only">
                                                        Project Name
                                                    </label>
                                                    <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={inputDataProject.name}
                                                    required
                                                    onChange={handleInputProject}
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Project Name"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="duedate" className="sr-only">
                                                        Duedate
                                                    </label>
                                                    <DatePicker 
                                                    name='duedate'
                                                    selected={inputDataProject.duedate}
                                                    onChange={date => setInputDataProject({...inputDataProject, duedate: date})}
                                                    dateFormat='yyyy-MM-dd'
                                                    minDate={new Date()}
                                                    placeholderText='Duedate'
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="type" className="sr-only">
                                                        Type
                                                    </label>
                                                    <input
                                                    id="type"
                                                    name="type"
                                                    type="text"
                                                    value={inputData.type}
                                                    required
                                                    onChange={handleInputProject}
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Type"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="technology" className="sr-only">
                                                        Technology
                                                    </label>
                                                    <input
                                                    id="technology"
                                                    name="technology"
                                                    type="text"
                                                    value={inputDataProject.technology}
                                                    required
                                                    onChange={handleInputProject}
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Technology"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="price" className="sr-only">
                                                        Price
                                                    </label>
                                                    <input
                                                    id="price"
                                                    name="price"
                                                    type="text"
                                                    value={inputDataProject.price}
                                                    required
                                                    onChange={handleInputProject}
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Price"
                                                    />
                                                </div>
                                                <div>
                                                    <select required name="project_manager_id" id="project_manager_id" onChange={handleSelect} className='w-full border border-gray-300 px-3 py-2 sm:text-sm'>
                                                        <option value="">Please Select Project Manager</option>
                                                        {projectManager.map((item, key) => (
                                                            <option key={key} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    onClick={handleAddProject}
                                                    className="group relative w-full flex justify-center py-2 px-4 border border-green text-sm font-medium rounded-md text-white font-serif bg-[#e9c0b9] hover:bg-[#e0a499] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f09d8e]"
                                                >
                                                    Create
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
        </div>
        <Footer/>
        </>
    )
}

export default Customer
