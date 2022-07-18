import React, { useEffect, useState } from "react";
import "./App.css";
function Practice() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  console.log(data);
  return (
    <div className="App">
      <h1>API Calling</h1>
      <table border="1">
        <thead>
          <th>Id</th>
          <th>Thumbnail Url</th>
          <th>Title</th>
          <th>Url</th>
        </thead>
        {data.map((item, index) => (
          <tbody key={index}>
            <td>{item.id}</td>
            <td>
              <img
                src={item.thumbnailUrl}
                className="img"
                height="100"
                width="100"
                alt="d"
              />
            </td>
            <td>{item.title}</td>
            <td>
              <img
                src={item.url}
                className="img"
                height="100"
                width="100"
                alt="d"
              />
            </td>
          </tbody>
        ))}
      </table>
    </div>
  );
}
export default Practice;
