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
    sortParam: "",
    sortOrder: "Descending"
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

  componentDidUpdate(prevProps, prevState){
    const sortedList = this.state.employees.sort((a,b)=> {
      return this.state.sortOrder==="Descending"? 
        b.name.first - a.name.first
        : a.name.first - b.name.first
    })
    if (this.state.sortOrder !== prevState.sortOrder){
      this.setState({...this.state, employees: sortedList, filterEmployees: sortedList})
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

  handleSortClick = (event)=>{
    const input = event.target.textcontent;
    if (this.state.sortOrder === "Descending") {this.setState({...this.state, sortOrder: "Ascending"})}
    else this.setState({...this.state, sortOrder: "Descending"})
    this.setState({...this.state, sortParam: input})
  }

  render() {
    return <>
      <Header />
      <div className="container-fluid">
        <SearchBar handleInputChange={this.handleInputChange} />
        <EmployeeList employees={this.state.searchParam.length ? this.state.filterEmployees : this.state.employees} />
      </div>
    </>
  }
}

export default App;
