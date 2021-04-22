export default function EmployeeCard(props) {
    return <li className="list-group-item">
        <div className="row justify-content-between">
            <div className="col-2">
                <img src={props.image} alt="" />
            </div>
            <div className="col-2">
                <p>{props.fName}</p>
            </div>
            <div className="col-2">
                <p>{props.lName}</p>
            </div>
            <div className="col-2">
                <p>{props.phone}</p>
            </div>
            <div className="col-2">
                <p>{props.email}</p>
            </div>
            <div className="col-2">
                <p>{props.date}</p>
            </div>
        </div>
    </li>
}