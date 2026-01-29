import BASEURL from "./baseURL";


async function registerUser({ formData }) {
  try {
    const response = await BASEURL.post("/client/register", formData); 

    return response.data; 
  } catch (error) {
    
    if (error.response) {
      
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error(error.message);
    }
  }
}

async function logUser({ formData }) {
  try {
    const response = await BASEURL.post("/login", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error(error.message);
    }
  }
}

export { registerUser, logUser };
