export default function SortableAttribute(props){
    return <div className="col-2">
        <p onClick={props.handleClick} data-key={props.dataKey}>
            {props.text}
        </p>
    </div>
}