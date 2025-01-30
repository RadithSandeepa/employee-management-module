import Datatable from "../components/Datatable"

const List = ({columns}) => {
  return (
    <div className="p-5">
        <Datatable columns={columns} />
    </div>
  )
}

export default List