import React from "react";
//import component files
import API from "./API.js";
import EmployeeList from "./components/EmployeeList";

class App extends React.Component {
  state = {
    employees: [],
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
      <EmployeeList employees={this.state.employees}/>
    </>
  }
}

export default App;
