/**
 * Utility function to set authentication token in request headers
 * @param {string} token - The JWT authentication token
 * @returns {object} Headers object with auth token if provided
 */
const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request header
    return {
      'x-auth-token': token
    };
  } else {
    // If no token, return empty headers object
    return {};
  }
};

export default setAuthToken;