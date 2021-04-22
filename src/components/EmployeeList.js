import EmployeeCard from "./employeeCard"
import SortableAttribute from "./SortableAttributes"
import "./sortCss.css"

export default function EmployeeList(props) {
    return <ul className="list-group">
        <li className="list-group-item">
            <div className="row justify-content-between">
                <div className="col-2">
                    <p>Image</p>
                </div>
                <SortableAttribute handleClick={props.handleClick} dataKey="name.first" text="First Name" />
                <SortableAttribute handleClick={props.handleClick} dataKey="name.last" text="Last Name" />
                <div className="col-2">
                    <p>Phone</p>
                </div>
                <div className="col-2">
                    <p>Email</p>
                </div>
                <div className="col-2">
                    <p>Date of Birth</p>
                </div>
            </div>
        </li>
        {props.employees.map(({ picture, name, phone, email, dob, id }) => {
            return <>
                <EmployeeCard key={id.value} image={picture.thumbnail} fName={name.first} lName={name.last} phone={phone} email={email} date={dob.date.slice(0, -14)} />
            </>
        })}
    </ul>
}