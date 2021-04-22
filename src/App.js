import React from "react";
//import component files
import API from "./API.js";
import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar"
import Header from "./components/Header"

class App extends React.Component {
  state = {
    employees: [],
    searchParam: "",
  };

  componentDidMount() {
    this.getEmployees();
  };

  getEmployees = async () => {
    const { data } = await API.getUsers();
    this.setState({ employees: data.results });
  };

  render() {
    return <>
    <Header />
      <div className="container-fluid">
        <SearchBar />
        <EmployeeList employees={this.state.employees} />
      </div>
    </>
  }
}

export default App;
