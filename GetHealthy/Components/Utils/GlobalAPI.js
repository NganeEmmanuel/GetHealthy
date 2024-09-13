import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Define the base URL as a variable
const masterUrl = "http://192.168.56.1:8765";

// Function to get JWT token from secure cache
async function getAuthToken() {
  try {
    const authToken = await SecureStore.getItemAsync('authToken');
    return authToken;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
}

// Function to sign up a new user
const signup = async (data) => {
  try {
    const response = await axios.post(`${masterUrl}/authentication-service/api/v1/auth/signup`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      const authToken = response.data.token;
      await SecureStore.setItemAsync('authToken', authToken);
      return 'Signup successful';
    } else {
      throw new Error(`Signup failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Signup error:', error);
    return error.message;
  }
}

// Function to log in a user
const login = async (data) => {
  try {
    const response = await axios.post(`${masterUrl}/authentication-service/api/v1/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      const authToken = response.data.token;
      await SecureStore.setItemAsync('authToken', authToken);
      return 'Login successful';
    } else {
      throw new Error(`Login failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Login error:', error);
    return error.message;
  }
}

// Function to get logged-in user data with JWT token
const getLoggedInUser = async () => {
  try {
    const authToken = await getAuthToken();

    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${masterUrl}/authentication-service/api/v1/auth/get-logged-in-user`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return the user data
    } else {
      throw new Error(`Failed to retrieve user data with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching logged-in user data:', error);
    return error.message;
  }
}


// Function to authenticate user data with JWT token
const authenticateUser = async () => {
    try {
      const authToken = await getAuthToken();
  
      if (!authToken) {
        throw new Error('No authentication token found');
      }
  
      const response = await axios.post(`${masterUrl}/authentication-service/api/v1/auth/authenticate-user`, {}, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (response.status >= 200 && response.status < 300) {
        return response.data; // Return the user data
      } else {
        throw new Error(`Failed to authenticate user with status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error authenticating user data:', error);
      return error.message;
    }
  };

  // Function to get logged-in user data with JWT token
const getIllnessRecordsForUser = async (data) => {
    try {
      const authToken = await getAuthToken();
  
      if (!authToken) {
        throw new Error('No authentication token found');
      }
  
      const response = await axios.get(`${masterUrl}/illness-record-service/api/v1/illnesses/get-with-logged-in-user`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (response.status >= 200 && response.status < 300) {
        return response.data; // Return the user data
      } else {
        throw new Error(`Failed to get illness recordswith status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error getting illness records data:', error);
      return error.message;
    }
  };


// Function to get logged-in user data with JWT token
const geteventsByRecordID = async (recordID) => {
    try {
      const authToken = await getAuthToken();
  
      if (!authToken) {
        throw new Error('No authentication token found');
      }
  
      const response = await axios.get(`${masterUrl}/event-service/api/v1/events/record/get-all?recordID=${recordID}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (response.status >= 200 && response.status < 300) {
        return response.data; // Return the user data
      } else {
        throw new Error(`Failed to get events for recordID: ${recordID} with status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error getting events for recordID: ${recordID}:`, error);
      return error.message;
    }
  };

  // Function to add event to the database
const addEvent = async (data) => {
    try {
      const authToken = await getAuthToken();
  
      if (!authToken) {
        throw new Error('No authentication token found');
      }
  
      const response = await axios.post(`${masterUrl}/event-service/api/v1/events/event/add`, data, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (response.status >= 200 && response.status < 300) {
        return response.data; // Return the user data
      } else {
        throw new Error(`Failed to add event with status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error adding event`, error);
      return error.message;
    }
  };
  

export default {
  signup,
  login,
  getLoggedInUser, // Export the new function
  authenticateUser,
  getIllnessRecordsForUser,
  geteventsByRecordID,
  addEvent
}
