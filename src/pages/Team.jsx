import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { Footer, NavbarCompany } from '../components'

function Team() {
    let curSlug = 'team'
    const id = useSelector((state) => state.data.datas?.company_id);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [team, setTeam] = useState([]);
    const [employee, setEmployee] = useState([]);
    
    const initialDataTeam = {
        name: "",
        company_id: id
    }

    const initialDataMember = {
        id: "",
        employee_id: ""
    }
    
    const [inputDataTeam, setInputDataTeam] = useState(initialDataTeam);
    const [inputDataMember, setInputDataMember] = useState(initialDataMember);
    
    const closeModalTeam = () => {
        setIsOpen(false);
    }

    const openModalTeam = () => {
        setIsOpen(true);
    }

    const closeModalMember = () => {
        setIsOpenMember(false);
    }

    const openModalMember = (id) => {
        setInputDataMember({
            ...inputDataMember,
            id: id
        })
        setIsOpenMember(true);
    }

    const handleInputTeam = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputDataTeam({
            ...inputDataTeam,
            [nameTarget]: value
        })
    }

    const handleAddMember = (employee_id) => {
        setInputDataMember({
            ...inputDataMember,
            employee_id: employee_id
        })

        if (inputDataMember.id && inputDataMember.employee_id) {
            fetch("http://localhost:8080/team/addMember", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(inputDataMember)
            }).then(() => {
                alert("Member Added")
            })
            setInputDataMember(initialDataMember);
            closeModalMember();
            window.location.reload();
        }
    }

    const handleRegisterTeam = (e) => {
        if (inputDataTeam.name) {
            fetch("http://localhost:8080/team/addTeam", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputDataTeam)
            }).then(() => {
                alert("New Team Added")
            })
            setInputDataTeam(initialDataTeam);
            closeModalTeam();
            window.location.reload();
        } else {
            alert("All Fields are Required")
            e.preventDefault();
        }
    }

    const cleanEmployee = (list) => {
        const employee = list.filter(element => {
            return (element.projectManager === null && element.team_id === 0)
        });
        return employee;
    }

    useEffect(() => {
        fetch(`http://localhost:8080/team/getAll`)
        .then(res => res.json())
        .then((result) => {
            setTeam(result)
        })

        fetch(`http://localhost:8080/employee/get?company_id=${id}`)
        .then(res => res.json())
        .then((result2) => {
            setEmployee(cleanEmployee(result2))
        })
    }, [])

    return (
        <>
            <NavbarCompany curSlug={curSlug}/>
            <div className='min-h-screen'>
                <div className='mb-4 w-10/12 mx-auto'>
                    <div className='flex items-center mb-3'>
                        <div className='flex-auto items-center w-full'>
                            <p className="inline align-middle ml-2 text-lg">Team List</p>
                        </div>
                        <div className='flex-auto font-medium'>
                            <button
                                type='button'
                                onClick={openModalTeam}
                                className='inline-flex items-center justify-center px-4 py-2 mr-2 w-32 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Team
                            </button>
                        </div>
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto"
                            onClose={closeModalTeam}
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
                                                    <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Register Team</h2>
                                                </div>
                                                <form className="mt-8 space-y-6" action="#" method="POST">
                                                    <input type="hidden" name="remember" defaultValue="true" />
                                                    <div className="rounded-md shadow-sm -space-y-px">
                                                        <div>
                                                            <label htmlFor="name" className="sr-only">
                                                                Team Name
                                                            </label>
                                                            <input
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            value={inputDataTeam.name}
                                                            required
                                                            onChange={handleInputTeam}
                                                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="Team Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="submit"
                                                            onClick={handleRegisterTeam}
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
                            <thead className='bg-gray-50 border-2 border-gray-200'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Member</th>
                                </tr>
                            </thead>
                            <tbody className='border-gray-200 border-2'>
                                {team?.map((item, key) => (
                                    <>
                                        <tr key={key} className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className='p-3 text-sm text-gray-700'>{key + 1}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item.name}</td>
                                            <td className='p-3 text-sm text-gray-700'>
                                                {item?.memberSet.map((item, key) => (
                                                    <div key={key} className='bg-[#991B19] mb-2 mr-2 px-4 py-2 rounded-md text-white text-center inline-block'>{item.name}</div>
                                                ))}
                                                <button
                                                    type='button'
                                                    onClick={() => openModalMember(item.id)}
                                                    className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Member
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Transition appear show={isOpenMember} as={Fragment}>
                    <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModalMember}
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
                                            <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Add Member</h2>
                                        </div>
                                        {employee.length ? 
                                            <table className='table-auto w-full'>
                                                <tbody className='border-gray-200 border-2'>
                                                        {employee.map((item, key) => (
                                                            <tr className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                <td className='p-3 text-sm text-gray-700'>{item.name}</td>
                                                                <td className='text-right'>
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => handleAddMember(item.id)}
                                                                        className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Member
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            :
                                            <div className='flex items-center justify-center text-[#991B19] font-semibold'>No Employee Available</div>
                                        }
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <Footer/>
        </>
    )
}

export default Team
