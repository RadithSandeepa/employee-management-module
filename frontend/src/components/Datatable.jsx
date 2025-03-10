import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/api/${path}`);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    }
    if (data) {
      toast.dismiss(); // Remove loading toast
      setList(data);
    }
    if (error) {
      toast.error("Failed to fetch data.");
    }
  }, [data, loading, error]);

  const handleDelete = async (id) => {
    const deleteToast = toast.loading("Deleting...");
    try {
      await axios.delete(`/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      toast.success("Record deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete record!");
    } finally {
      toast.dismiss(deleteToast); // Remove loading toast
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4 h-full">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}> 
              <div className="text-blue-800 px-1 py-0.5 border border-dotted border-blue-800 cursor-pointer w-[100px] h-[30px] flex justify-center items-center hover:bg-blue-100 transition-colors">View</div>
            </Link>
            <div
              className="text-red-500 px-1 py-0.5 border border-dotted border-red-600 cursor-pointer w-[100px] h-[30px] flex justify-center items-center hover:bg-red-100 transition-colors"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold capitalize">{path}</h1>
        <Link to={`/${path}/new`} className="text-green-500 px-4 py-2 border border-dotted border-green-300 hover:bg-green-50 transition-colors">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;