import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';

const UpdateEmployee = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [errors,setErrors] = useState({})
  const [employee,setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailId: ""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({...employee, [e.target.name]: value})
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await EmployeeService.getEmployeeById(id)
            setEmployee(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()
  },[])

  const isValidEmail = (emailId) => {
    const emailRegex = /^\S+@\S+\.\S+$/
    return emailRegex.test(emailId)
  }

  const formValidation = () => {
    let newErrors = {};
    if(!employee.firstName.trim()) {
        newErrors.firstName = "first name is required!"
    }
    if(!employee.lastName.trim()) {
        newErrors.lastName = "last name is required!"
    }
    if(!employee.emailId.trim()) {
        newErrors.emailId = "email is required!"
    }
    else if(!isValidEmail(employee.emailId)) {
        newErrors.emailId = "email is invalid!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  }

  const updateEmployee = (e) => {
    e.preventDefault();
    const isValid = formValidation()
    if(isValid) {
        EmployeeService.updateEmployee(id,employee)
        .then((res) => {
            navigate("/employee")
        })
        .catch((error) => {
            console.log(error);
        })
    }
  }

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
        <div className="px-8 py-8">

            <div className="font-thin text-2xl tracking-wider">
                <h1>Update Employee</h1>
            </div>

            <div className="items-center justify-center h-16 w-full my-4">
                <label className="block text-sm font-normal text-gray-600">First Name</label>
                <input 
                    type="text" 
                    className="h-8 w-96 mt-2 px-2 py-2 border"
                    name="firstName"
                    value={employee.firstName}
                    onChange={(e)=>handleChange(e)}
                />
                {errors.firstName && <div className="text-red-700">{errors.firstName}</div>}
            </div>

            <div className="items-center justify-center h-16 w-full my-4">
                <label className="block text-sm font-normal text-gray-600">Last Name</label>
                <input 
                    type="text" 
                    className="h-8 w-96 mt-2 px-2 py-2 border"
                    name="lastName"
                    value={employee.lastName}
                    onChange={(e)=>handleChange(e)}
                />
                {errors.lastName && <div className="text-red-700">{errors.lastName}</div>}
            </div>

            <div className="items-center justify-center h-16 w-full my-4">
                <label className="block text-sm font-normal text-gray-600">Email</label>
                <input 
                    type="email" 
                    className="h-8 w-96 mt-2 px-2 py-2 border"
                    name="emailId"
                    value={employee.emailId}
                    onChange={(e)=>handleChange(e)}
                />
                {errors.emailId && <div className="text-red-700">{errors.emailId}</div>}
            </div>

            <div className="items-center justify-center h-16 w-full my-4 space-x-4 pt-4">
                <button 
                    onClick={updateEmployee} 
                    className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                >
                    Update
                </button>
                <button 
                    onClick={() => navigate("/employee")}
                    className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default UpdateEmployee