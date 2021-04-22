import EmployeeCard from "./employeeCard"

export default function EmployeeList(props) {
    return <ul className="list-group container-fluid">
        <li className="list-group-item">
            <div className="row justify-content-between">
                <div className="col-2">
                    <p>Image</p>
                </div>
                <div className="col-2">
                    <p>First Name</p>
                </div>
                <div className="col-2">
                    <p>Last Name</p>
                </div>
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
            const formattedDate = new Date(dob.date).toLocaleString('en-US')
            return <>
                <EmployeeCard key={id.value} image={picture.thumbnail} fName={name.first} lName={name.last} phone={phone} email={email} date={formattedDate} />
            </>
        })}
    </ul>
}