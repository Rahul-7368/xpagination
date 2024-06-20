import React, {useState, useEffect} from "react";
// import App from './App.js'
import './App.css';
  function App() {
  const[members, setMembers] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setMembers(data))
    .catch(error => {
      setError(error);
      alert('Failed to fetch data')
    });
  }, []);

  const handlePrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if(currentPage * rowsPerPage < members.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const displayTable = () => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = members.slice(start, end);

    return paginatedItems.map(member => (
      <tr key={member.id}>
        <td>{member.id}</td>
        <td>{member.name}</td>
        <td>{member.email}</td>
        <td>{member.role}</td>
      </tr>
    ));
  };

  return(
     <div className="App">
      <header className="App-header">
        <h1>Employee Data Table</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {displayTable()}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick = {handlePrevPage}>Previous</button>
        <button >{currentPage}</button>
        <button onClick = {handleNextPage} disabled = {currentPage * rowsPerPage >= members.length}>Next</button>
      </div>
     </div>
  );
};

export default App;
