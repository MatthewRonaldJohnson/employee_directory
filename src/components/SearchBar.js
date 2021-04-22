export default function SearchBar(props){
    return <div>
      <input onChange={props.handleInputChange} type="search" placeholder="Enter a search parameter" className="col-12" />
    </div>
}