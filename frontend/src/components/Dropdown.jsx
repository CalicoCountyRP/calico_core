import React, { useEffect, useState} from 'react';


function DropdownMenu() {
    const [data, setData] = useState([])
    const [options, setOptions] = useState("")
    const [filtereddata, setFilteredData] = useState([])
    const [selectedName, setSelectedName] = useState("")
    const [names, setNames] = useState([])

    useEffect(() => {
      fetch('http://localhost:8081/char')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));

    //fetch uniqueNames for dropdown
    const uniqueNames = [...new Set(data.map((item) => item.name))];
    setNames(uniqueNames);

    //sets initial table data
    setFilteredData(data);
    }, [])

    const handleSelectionChange = (event) => {
        const name = event.target.value;
        console.log(name)
        setSelectedName(name);

        if (name === '') {
            //return no data if nothing is selected
            return
        } else {
            const filtered = data.filter((item) => item.name === name);
            console.log(filtered)
            setFilteredData(filtered);
            setOptions(filtered)
        }
    }

    return (
        <div>
            <select id="name-select" value={selectedName} onChange={handleSelectionChange}>
                <option value="">-- Character Select --</option>
                {names.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <h1>{options}</h1>

            <table border="1" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>charid</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>Nickname</th>
                        <th>job</th>
                        <th>money</th>
                        <th>age</th>
                        <th>gender</th>
                        <th>hours</th>
                    </tr>
                </thead>
                <tbody>
                    {filtereddata.map((d, index) => (
                        <tr key={index}>
                            <td>{d.firstname}</td>
                            <td>{d.lastname}</td>
                            <td>{d.nickname}</td>
                            <td>{d.job}</td>
                            <td>{d.money}</td>
                            <td>{d.age}</td>
                            <td>{d.gender}</td>
                            <td>{d.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DropdownMenu;