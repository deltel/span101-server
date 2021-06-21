export const executeRequest = async (endpoint) => {
  const response = await fetch(endpoint);

  return response.json();
};
