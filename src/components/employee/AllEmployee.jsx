import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../../services/EmployeeService'
import Employee from './Employee'

const AllEmployee = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true)
  const [employees,setEmployees] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await EmployeeService.getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    fetchData()
  }, [])

  const deleteEmployee = (e,id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id)
    .then((res) => {
        if(employees) {
            setEmployees((prevElement) => {
                return prevElement.filter((employee) => employee.id !== id)
            })
        }
    })
  }

  return (
    <div className="container mx-auto my-8">
        <div className="h-12">
            <button 
                onClick={() => navigate("/employee/add")}
                className="rounded bg-slate-600 text-white py-2 px-6"
            >
                Add Employee
            </button>
        </div>
        <div className="flex shadow border-b">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">First Name</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Last Name</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Email Address</th>
                        <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Actions</th>
                    </tr>
                </thead>
                {!loading && (
                    <tbody className="bg-white">
                        {employees.map((employee) => (
                            <Employee 
                                employee={employee} 
                                deleteEmployee={deleteEmployee}
                                key={employee.id} 
                            />
                        ))}
                    </tbody>
                )}
                
            </table>
        </div>
    </div>
  )
}

export default AllEmployee