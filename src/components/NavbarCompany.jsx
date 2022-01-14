import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { deleteData } from '../redux/sliceData'
import logo from '../image/logo.png'
import { useSelector } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavbarCompany({ curSlug }) {
    const name = useSelector((state) => state.data.datas?.name);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigation = [
        { name: 'Dashboard', slug: 'dashboard', current: curSlug ===  'dashboard' ? true : false},
        { name: 'Employee', slug: 'employee', current: curSlug ===  'employee' ? true : false },
        { name: 'Customer', slug: 'customer', current: curSlug ===  'customer' ? true : false },
        { name: 'Team', slug: 'team', current: curSlug ===  'team' ? true : false },
        { name: 'Scrum', slug: 'scrum', current: curSlug ===  'scrum' ? true : false },
    ]

    const handleSignOut = () => {
        dispatch(deleteData())
        navigate("/")
    }

    return (
        <>
        <Disclosure as='nav' className='bg-[#f5e3e0] mb-8 shadow-lg sticky top-0 z-10'>
            {({open}) => (
            <>
                <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                    <div className='relative flex items-center justify-between h-16'>
                        <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                            {/* Mobile menu Button */}
                            <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-[#991B19] hover:bg-[#ac3432] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#991B19]'>
                                <span className='sr-only'>Open Main Menu</span>
                                {open ? (
                                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                                ) : (
                                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                                )}
                            </Disclosure.Button>
                        </div>
                        <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                            <div className='flex-shrink-0 flex items-center'>
                                <img className='w-16' src={logo} alt="logo" onClick={handleSignOut} />
                            </div>
                            <div className='hidden sm:block sm:ml-6'>
                                <div className='flex space-x-4 my-5'>
                                    {navigation.map((item, index) => (
                                        <Link to={`/company/${item.slug}`}>
                                            <a
                                                key={index}
                                                className={classNames(
                                                    item.current ? 'bg-[#991B19] text-white' : 'text-[#991B19] hover:bg-[#ac3432] hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-6'>
                            <Menu as='div' className='ml-3 relative'>
                                <div>
                                    <Menu.Button>
                                        <span className='sr-only'>Open User Menu</span>
                                        <span className='font-semibold text-lg text-[#991B19]'>
                                            {name}
                                        </span>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    onClick={handleSignOut}
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link to={`/company/${item.slug}`}>
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    className={classNames(
                                        item.current ? 'bg-[#991B19] text-white' : 'text-[#991B19] hover:bg-[#ac3432] hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                    >
                                    {item.name}
                                </Disclosure.Button>
                            </Link>
                        ))}
                    </div>
                </Disclosure.Panel>
            </>
            )}
        </Disclosure>
        </>
    )
}

export default NavbarCompany