import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, NavbarCompany } from '../components'

function CompanyHome() {    
    let curSlug = 'dashboard'
    const id = useSelector((state) => state.data.datas?.company_id);
    const [employee, setEmployee] = useState([]);
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/employee/get?company_id=${id}`)
        .then(res => res.json())
        .then((result) => {
            setEmployee(result)
        })

        fetch(`http://localhost:8080/customer/get?company_id=${id}`)
        .then(res => res.json())
        .then((result) => {
            setCustomer(result)
        })
    },[])
    return (
        <>
            <NavbarCompany curSlug={curSlug}/>
            <div className='mx-auto w-10/12 min-h-screen'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    <div className='lg:col-span-6 col-span-1'>
                        <div className='bg-[#f5e3e0] shadow-xl rounded-lg p-8 pb-12 mb-8 text-[#991B19] text-center'>
                            <h3 className='text-2xl font-semibold pb-4'>Total Employee</h3>
                            <h1 className='text-3xl font-bold'>{employee?.length}</h1>
                        </div>
                        <div className='bg-[#f5e3e0] shadow-xl rounded-lg p-8 mb-8 text-[#991B19]'>
                            <h3 className='text-2xl font-semibold border-b mb-8 pb-4 border-[#70100e]'>Employee</h3>
                            {employee?.slice().splice(0,5).map((item, key) => (
                                <div key={key} className='border-b border-[#70100e] mb-4 pb-4'>
                                    <p className='mb-4 font-semibold'>
                                        <span>{item.projectManager ? "Project Manager" : "Employee"}</span>
                                        {' '}
                                        -
                                        {' '}
                                        <span>{item.email}</span>
                                    </p>
                                    <p className='whitespace-pre-line w-full font-bold'>{item.name}</p>
                                </div>
                            ))}
                            <Link to={`/company/employee`}>
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center px-4 py-2 mr-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>View All Employee
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='lg:col-span-6 col-span-1'>
                        <div className='bg-[#f5e3e0] shadow-xl rounded-lg p-8 pb-12 mb-8 text-[#991B19] text-center'>
                            <h3 className='text-2xl font-semibold pb-4'>Total Customer</h3>
                            <h1 className='text-3xl font-bold'>{customer?.length}</h1>
                        </div>
                        <div className='bg-[#f5e3e0] shadow-xl rounded-lg p-8 mb-8 text-[#991B19]'>
                            <h3 className='text-2xl font-semibold border-b mb-8 pb-4 border-[#70100e]'>Customer</h3>
                            {customer?.slice().splice(0,5).map((item, key) => (
                                <div key={key} className='border-b border-[#70100e] mb-4 pb-4'>
                                    <p className='mb-4 font-semibold'>
                                        <span>{item.occupation}</span>
                                        {' '}
                                        -
                                        {' '}
                                        <span>{item.email}</span>
                                    </p>
                                    <p className='whitespace-pre-line w-full font-bold'>{item.name}</p>
                                </div>
                            ))}
                            <Link to={`/company/customer`}>
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center px-4 py-2 mr-2 border border-transparent rounded-xl shadow-sm text-sm font-medium border-yellow-300 bg-white hover:bg-gray-200'>View All Customer
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CompanyHome
