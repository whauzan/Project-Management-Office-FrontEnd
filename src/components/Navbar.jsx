import React from 'react'
import logo from '../image/logo.png'

function Navbar() {
    return (
        <div className='container mx-auto sticky top-0 z-10 bg-[#f5e3e0] shadow-lg'>
            <div className='w-full inline-block py-2 px-8'>
                <div className='md:float-left block'>
                    <img className='w-16' src={logo} alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
