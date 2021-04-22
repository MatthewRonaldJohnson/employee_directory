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
    filterEmployees: [],
    sortDirection: "sortDown",
    sortParam: "",
  };

  componentDidMount() {
    this.getEmployees();
  };

  componentDidUpdate(prevProps, prevState) {
    const filteredList = this.state.employees.filter((employee) => {
      return employee.name.first.toLowerCase().includes(this.state.searchParam.toLowerCase()) 
        || employee.name.last.toLowerCase().includes(this.state.searchParam.toLowerCase())
        || employee.phone.includes(this.state.searchParam.toLowerCase())
        || employee.email.toLowerCase().includes(this.state.searchParam.toLowerCase())
    });
    if (this.state.searchParam !== prevState.searchParam) {
      this.setState({ ...this.state, filterEmployees: filteredList })
    }
  }

  getEmployees = async () => {
    const { data } = await API.getUsers();
    this.setState({ ...this.state, employees: data.results, filterEmployees: data.results });
  };

  handleInputChange = (event) => {
    const input = event.target.value;
    this.setState({ ...this.state, searchParam: input });
  }

  handleClick = ()=>{
    //change class of clicked on attribute
    //sort state.employess & filterEmployees 
    console.log('click')
  }

  render() {
    return <>
      <Header />
      <div className="container-fluid">
        <SearchBar handleInputChange={this.handleInputChange} />
        <EmployeeList sortDirection={this.state.sortDirection} handleClick={this.handleClick} employees={this.state.searchParam.length ? this.state.filterEmployees : this.state.employees} />
      </div>
    </>
  }
}

export default App;
