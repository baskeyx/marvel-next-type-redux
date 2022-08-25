const Fetch = async (resource: string) => {
  const response = await fetch(resource);
  const data = response.json();
  return data;
}

export default Fetch;
