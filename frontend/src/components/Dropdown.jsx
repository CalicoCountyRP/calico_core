import React, { useEffect, useState } from "react";

function DropdownMenu({ discordID }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!discordID) {
            console.log("Error, no discord ID provided")
            return;
        }
        setIsLoading(true);
        console.log(`Fetching data for discordID: ${discordID}`)
        const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/char/${discordID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);

        const uniqueNames = [
          ...new Set(
            result.map((item) => `${item.firstname} ${item.lastname}`)
          ),
        ];
        setNames(uniqueNames);
        setFilteredData(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
        fetchData();
  }, [discordID]);

  const handleSelectionChange = (event) => {
    const selectedFullName = event.target.value;
    setSelectedName(selectedFullName);

    if (!selectedFullName) {
      setFilteredData(data);
      return;
    }

    const [firstName, lastName] = selectedFullName.split(" ");
    const filtered = data.filter(
      (item) => item.firstname === firstName && item.lastname === lastName
    );
    setFilteredData(filtered);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <select
        id="name-select"
        value={selectedName}
        onChange={handleSelectionChange}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">-- Character Select --</option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Nickname</th>
            <th className="p-2 border">Job</th>
            <th className="p-2 border">Money</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Hours</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">{item.firstname}</td>
              <td className="p-2 border">{item.lastname}</td>
              <td className="p-2 border">{item.nickname}</td>
              <td className="p-2 border">{item.job}</td>
              <td className="p-2 border">{item.money}</td>
              <td className="p-2 border">{item.age}</td>
              <td className="p-2 border">{item.gender}</td>
              <td className="p-2 border">{item.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DropdownMenu;