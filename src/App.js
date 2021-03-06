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
    if (this.state.searchParam !== prevState.searchParam) {
      const filteredList = this.state.employees.filter((employee) => {
        return employee.name.first.toLowerCase().includes(this.state.searchParam.toLowerCase())
          || employee.name.last.toLowerCase().includes(this.state.searchParam.toLowerCase())
          || employee.phone.includes(this.state.searchParam.toLowerCase())
          || employee.email.toLowerCase().includes(this.state.searchParam.toLowerCase())
      });
      this.setState({ ...this.state, filterEmployees: filteredList })
    }

    if (this.state.sortParam !== prevState.sortParam){
      this.sortEmployees();
    }

    if (this.state.sortDirection !== prevState.sortDirection){
      this.sortEmployees();
    }

  }

  sortEmployees = () => {
    const sortParamArr = this.state.sortParam.split('.');
    const sortDirectionSwitch = this.state.sortDirection==="sortDown"? 1:-1;
    const sortedEmployees = this.state.employees.sort((a,b) => {
      return a[sortParamArr[0]][sortParamArr[1]] < b[sortParamArr[0]][sortParamArr[1]]? -1*sortDirectionSwitch: 1*sortDirectionSwitch;
    })
    const sortedFilteredEmployees = this.state.filterEmployees.sort((a,b) => {
      return a[sortParamArr[0]][sortParamArr[1]] < b[sortParamArr[0]][sortParamArr[1]]? -1*sortDirectionSwitch: 1*sortDirectionSwitch;
    })
    this.setState({...this.state, employees: sortedEmployees, filterEmployees: sortedFilteredEmployees})
  }

  getEmployees = async () => {
    const { data } = await API.getUsers();
    this.setState({ ...this.state, employees: data.results, filterEmployees: data.results });
  };

  handleInputChange = (event) => {
    const input = event.target.value;
    this.setState({ ...this.state, searchParam: input });
  }

  handleClick = async (event) => {
    let sortDirectionValue = this.state.sortDirection;
    if (event.target.dataset.key === this.state.sortParam){
      sortDirectionValue = sortDirectionValue === "sortDown"? "sortUp":"sortDown";
    }
    await this.setState({ ...this.state, sortParam: event.target.dataset.key, sortDirection: sortDirectionValue })
  }

  render() {
    return <>
      <Header />
      <div className="container-fluid">
        <SearchBar handleInputChange={this.handleInputChange} />
        <EmployeeList sortDirection={this.state.sortDirection} sortParam={this.state.sortParam} handleClick={this.handleClick} employees={this.state.searchParam.length ? this.state.filterEmployees : this.state.employees} />
      </div>
    </>
  }
}

export default App;
