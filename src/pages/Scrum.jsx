import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { Footer, NavbarCompany } from '../components'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Scrum() {
    let curSlug = 'scrum'
    const [project, setProject] = useState([]);
    const [team, setTeam] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const initialDataScrum = {
        project_id: "",
        team_id: ""
    }

    const [inputDataScrum, setInputDataScrum] = useState(initialDataScrum);

    const closeModalScrum = () => {
        setIsOpen(false);
    }

    const openModalScrum = async (id) => {
        setInputDataScrum({
            ...inputDataScrum,
            project_id: id
        })
        const sleep = m => new Promise(r => setTimeout(r, m))
        var ada;
        const fetchProject = async () => {
            try {
                await fetch(`http://localhost:8080/scrum/getone?id=${id}`)
                .then(res => res.json())
                .then((result) => ada = result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProject();
        await sleep(50);
        if (ada) {
            navigate(`/company/scrum/detail/${ada.id}`)
        } else {
            setIsOpen(true);
        }
    }

    const handleAddTeam = (team_id) => {
        setInputDataScrum({
            ...inputDataScrum,
            team_id: team_id
        })

        if (inputDataScrum.project_id && inputDataScrum.team_id) {
            fetch("http://localhost:8080/scrum/add", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(inputDataScrum)
            }).then(() => {
                alert("Scrum Created")
            })
            setInputDataScrum(initialDataScrum);
            closeModalScrum();
            window.location.reload();
        }
    }

    const cleanTeam = (list) => {
        const team = list.filter(element => {
            return (element.scrum_idx === 0)
        });
        return team;
    }

    useEffect(() => {
        fetch(`http://localhost:8080/project/get`)
        .then(res => res.json())
        .then((result) => {
            setProject(result)
        })

        fetch(`http://localhost:8080/team/getAll`)
        .then(res => res.json())
        .then((result2) => {
            setTeam(cleanTeam(result2))
        })
    }, [])
    return (
        <>
            <NavbarCompany curSlug={curSlug}/>
            <div className='min-h-screen'>
                <div className='mb-4 w-10/12 mx-auto'>
                    <div className="flex items-center mb-3">
                        <div className='flex-auto items-center w-full'>
                            <p className="inline align-middle ml-2 text-lg">Project List</p>
                        </div>
                    </div>
                    <div className='overflow-auto rounded-lg shadow-lg'>
                        <table className='table-auto w-full'>
                            <thead className='bg-gray-50 border-2 border-gray-200'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Project Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Type</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Technology</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Price</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Due date</th>
                                    <th className='p-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {project?.map((item, key) => (
                                    <>
                                        <tr key={key} className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className='p-3 text-sm text-gray-700'>{key + 1}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item?.name}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item?.type}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item?.technology}</td>
                                            <td className='p-3 text-sm text-gray-700'>{item?.price}</td>
                                            <td className='p-3 text-sm text-gray-700'>{moment(item?.duedate).format('YYYY-MM-DD')}</td>
                                            <td className='p-3 text-sm text-gray-700'>
                                                <button
                                                    type='button'
                                                    onClick={() => openModalScrum(item.id)}
                                                    className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Start Scrum
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModalScrum}
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
                                            <h2 className="text-center text-3xl font-extrabold text-[#991B19]">Add Team</h2>
                                        </div>
                                        {team.length ? 
                                            <table className='table-auto w-full'>
                                                <tbody className='border-gray-200 border-2'>
                                                        {team.map((item, key) => (
                                                            <tr key={key} className={key % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                <td className='p-3 text-sm text-gray-700'>{item.name}</td>
                                                                <td className='text-right'>
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => handleAddTeam(item.id)}
                                                                        className='inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>Add Team
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            :
                                            <div className='flex items-center justify-center text-[#991B19] font-semibold'>No Team Available</div>
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

export default Scrum
