import axios from 'axios';

const BASE_URL_USER = 'http://localhost:5000/api/users'; // Adjust the base URL according to your backend setup
const BASE_URL_ADMIN = 'http://localhost:5000/api/admin'; // Adjust the base URL according to your backend setup
 
//const UserService = {
export const registerUser=async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL_USER}/register`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL_USER}/login`, userData);
        console.log(response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("User login failed:", error);
        throw error; // Throw the error to handle it in the component
    }
};

export const getAllUsers= async () => {
    try {
        const response = await axios.get(`${BASE_URL_USER}/getAllUsers`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("fetching all users failed:", error);
        throw new Error(error.response.data.message);
    }
}

export const getUsersById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL_USER}/getUsersById/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${BASE_URL_USER}/updateUser/${id}`, userData);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const deleteUser =  async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL_USER}/deleteUser/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
// //};

// const AdminService = {

export const registerAdmin = async (adminData) => {
      try {
          const response = await axios.post(`${BASE_URL_ADMIN}/registerAdmin`, adminData);
          return response.data;
      } catch (error) {
          throw new Error(error.response.data.message);
      }
}

export const loginAdmin = async (adminData) => {
    try {
        const response = await axios.post(`${BASE_URL_ADMIN}/loginAdmin`, adminData);
        console.log(response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Admin login failed:", error);
        throw error; // Throw the error to handle it in the component
    }
};

//   getAllAdmins: async () => {
//       try {
//           const response = await axios.get(`${BASE_URL}/getAllAdmins`);
//           return response.data;
//       } catch (error) {
//           throw new Error(error.response.data.message);
//       }
//   },

//   getAdminById: async (id) => {
//       try {
//           const response = await axios.get(`${BASE_URL}/getAdminById/${id}`);
//           return response.data;
//       } catch (error) {
//           throw new Error(error.response.data.message);
//       }
//   },

//   updateAdmin: async (id, userData) => {
//       try {
//           const response = await axios.put(`${BASE_URL}/updateUser/${id}`, userData);
//           return response.data;
//       } catch (error) {
//           throw new Error(error.response.data.message);
//       }
//   },

//   deleteAdmin: async (id) => {
//       try {
//           const response = await axios.delete(`${BASE_URL}/deleteAdmin/${id}`);
//           return response.data;
//       } catch (error) {
//           throw new Error(error.response.data.message);
//       }
//   }
// };

// export { UserService, AdminService,Hello};
//module.exports=registerUser;
