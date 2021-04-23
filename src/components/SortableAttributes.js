export default function SortableAttribute(props) {
    return <div className="col-2">
        <p
            onClick={props.handleClick}
            data-key={props.dataKey}
            className={`sortable ${props.sortParam === props.dataKey? props.sortDirection:''}`}
        >
            {props.text}
        </p>
    </div>
}