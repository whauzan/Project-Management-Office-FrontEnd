import React, { useEffect, useState } from 'react'

function Employee() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/employee/get")
        .then(res => res.json())
        .then((result) => {
            setEmployee(result)
        })
    }, [])

    return (
        <table className="min-w-full divide-y divide-gray-200 border-gray-300 border shadow-lg">
            <thead className="bg-blue-700 border-none">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-none"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider "
                    >
                        Gender
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                        Email
                    </th>
                    <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                        Address
                    </th>
                    <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                        Phone Number
                    </th>
                </tr>
            </thead>
            <tbody className="bg-blue-500 divide-y divide-gray-300">
                {employee?.map((item, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-white">{item.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{item.gender}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{item.email}</div>
                        </td>
                        <td className="pr-3 pl-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{item.address}</div>
                        </td>
                        <td className="pl-2 pr-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{item.phoneNumber}</div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Employee
