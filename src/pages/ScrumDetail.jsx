import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react';
import { Footer, NavbarCompany } from '../components'

function ScrumDetail() {
    let { id } = useParams();
    const [scrum, setScrum] = useState();
    const [projectManager, setProjectManager] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const initialDataTask = {
        name: "",
        description: "",
        employee_id: "",
        scrum_id: id
    }

    const [inputData, setInputData] = useState(initialDataTask);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleInput = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputData({
            ...inputData,
            [nameTarget]: value
        })
    }

    const handleRegister = (e) => {
        if (inputData.name && inputData.description && inputData.employee_id && inputData.scrum_id) {
            fetch("http://localhost:8080/task/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputData)
            }).then(() => {
                alert("New Task Added")
            })
            setInputData(initialDataTask);
            closeModal();
            window.location.reload();
        } else {
            alert("All Fields are Required")
            e.preventDefault();
        }
    }

    const isDone = (id) => {
        fetch(`http://localhost:8080/task/taskdone?id=${id}`, {
            method:"POST",
            headers:{"Content-Type":"application/json"}
        }).then(() => {
            alert(`Task with id ${id} is Done`)
        })
        window.location.reload();
    }

    useEffect( async() => {
        var ada
        await fetch(`http://localhost:8080/scrum/getone?id=${id}`)
        .then(res => res.json())
        .then((result) => {
            ada = result;
            setScrum(result)
        })

        await fetch(`http://localhost:8080/projectManager/getone?id=${ada.project.project_manager_id}`)
        .then(res => res.json())
        .then((result2) => {
            setProjectManager(result2)
        })
    }, [])
    return (
        <>
            <NavbarCompany />
            <div className='min-h-screen'>
                <div className='mb-4 w-9/12 mx-auto text-[#991B19]'>
                    <div className='grid grid-cols-1 mb-6'>
                        <div className='bg-[#f5e3e0] p-4 space-y-2 rounded-lg shadow'>
                            <div className='font-semibold text-lg'>{scrum?.name}</div>
                            <div className='grid grid-cols-1 sm:grid-cols-2'>
                                <div>
                                    <div>Type: {scrum?.project.type}</div>
                                    <div>Technology: {scrum?.project.technology}</div>
                                    <div>Price: {scrum?.project.price}</div>
                                </div>
                                <div>
                                    <div>Duedate: {moment(scrum?.project.duedate).format("YYYY-MM-DD")}</div>
                                    <div>Project Manager: {projectManager?.name}</div>
                                    <div>Team: {scrum?.team.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center mb-6'>
                        <div className='flex-auto items-center w-full'>
                            <p className='inline align-middle ml-2 text-lg font-semibold'>Task List</p>
                        </div>
                        <div className='flex-auto font-medium'>
                            <button
                                type='button'
                                onClick={openModal}
                                className='inline-flex items-center justify-center px-4 py-2 mr-2 w-32 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Task
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
                                                    <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Add Task</h2>
                                                </div>
                                                <form className="mt-8 space-y-6" action="#" method="POST">
                                                    <input type="hidden" name="remember" defaultValue="true" />
                                                    <div className="rounded-md shadow-sm -space-y-px">
                                                        <div>
                                                            <label htmlFor="name" className="sr-only">
                                                                Task Name
                                                            </label>
                                                            <input
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            value={inputData.name}
                                                            required
                                                            onChange={handleInput}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="Task Name"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="description" className="sr-only">
                                                                Description
                                                            </label>
                                                            <textarea
                                                            id="description"
                                                            name="description"
                                                            type="text"
                                                            value={inputData.description}
                                                            required
                                                            onChange={handleInput}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="Description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <select required name="employee_id" id="employee_id" onChange={handleInput} className='w-full border border-gray-300 px-3 py-2 sm:text-sm'>
                                                                <option value="">Please Select Member</option>
                                                                {scrum?.team.memberSet.map((item, key) => (
                                                                    <option key={key} value={item.id}>{item.name}</option>
                                                                ))}
                                                            </select>
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
                    <div className='overflow-auto rounded-lg shadow-lg'>
                        <table className='table-auto w-full'>
                            <thead className='bg-gray-50 border-2 border-gray-200 text-black'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Description</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Employee</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='border-gray-200 border-2'>
                                {scrum?.taskSet.map((item, key) => (
                                    <>
                                        <tr key={key} className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className='p-3 text-sm text-gray-700'>{key + 1}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item.name}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item.description}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item.employee?.name}</td>
                                            <td className='p-3'>
                                                {item.done === true ? 
                                                <div className='bg-[#991B19] px-4 py-1.5 rounded-md text-white inline-block'>Done</div> 
                                                : 
                                                <button
                                                    type='button'
                                                    onClick={() => isDone(item.id)}
                                                    className='inline-flex items-center px-4 py-1.5 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'
                                                    onMouseEnter={() => setIsShown(true)}
                                                    onMouseLeave={() => setIsShown(false)}
                                                    >
                                                    {isShown === true ? 
                                                        <div>Done?</div>
                                                    :
                                                        <div>Ongoing</div>
                                                    }
                                                </button>
                                                }
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ScrumDetail
