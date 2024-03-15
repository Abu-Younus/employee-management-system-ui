import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8090/api/v1/employee";

class EmployeeService {
    saveEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL + "/add",employee)
    }
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL)
    }
    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/edit/" + id)
    }
    updateEmployee(id,employee) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/update/" + id, employee)
    }
    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/delete/" + id)
    }
}

export default new EmployeeService();