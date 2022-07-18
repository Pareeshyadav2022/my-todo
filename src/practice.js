import React, { useEffect, useState } from "react";
import "./App.css";
function Practice() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
    //fetch("https://logging.googleapis.com/v2/{parent=billingAccounts/*/locations/*/buckets/*}/views")
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
          <th>Title</th>
        </thead>
        {data.map((item, index) => (
          <tbody key={index}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            </tbody>
        ))}
      </table>
    </div>
  );
}
export default Practice;
