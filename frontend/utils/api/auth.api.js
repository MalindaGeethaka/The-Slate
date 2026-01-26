import BASEURL from "./baseURL";

// Register user
async function registerUser({ formData }) {
  try {
    const response = await BASEURL.post("/client/register", formData); // Axios automatically stringifies JSON
    return response.data; // Axios returns parsed JSON
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Server responded with status code outside 2xx
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error(error.message);
    }
  }
}

// Example login function
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
