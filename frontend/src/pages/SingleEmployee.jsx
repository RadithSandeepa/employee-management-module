import { useParams, Link  } from "react-router-dom"; 
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const SingleEmployee = () => {
  const { employeeId } = useParams(); // Get the employee ID from the URL
  const { data: employee, loading, error } = useFetch(`/api/employees/${employeeId}`);
 
  useEffect(() => {
    if (loading) {
      toast.loading("Fetching employee details...");
    } else {
      toast.dismiss();
    }
    if (error) {
      toast.error("Failed to fetch employee details.");
    }
  }, [loading, error]);

  return (
    <div className="flex w-full mt-5">
      <div className="flex-6">
        <div className="p-2.5 m-5 flex justify-between">
          <h1 className="text-3xl font-semibold">Employee Details</h1>
          <Link 
            to={`/employees/${employeeId}/edit`} 
            className="w-36 p-2 bg-gray-900 text-white text-center cursor-pointer mt-2.5 hover:scale-110 transition-all duration-200"
          >
            Edit
          </Link>
        </div>
        <div className="p-2.5 m-5 flex">
          <div className="flex-1 flex text-center align-center justify-center">
            <img
              src={
                employee.img
                  ? employee.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Employee"
              className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex-2 px-5">
            <div className="flex flex-wrap gap-8 justify-between">
              {/* Display Employee Details */}
              <div className="w-2/5">
                <label>Name</label>
                <p className="w-full p-1 border-b border-gray-400">{employee.name}</p>
              </div>

              <div className="w-2/5">
                <label>Email</label>
                <p className="w-full p-1 border-b border-gray-400">{employee.email}</p>
              </div>

              <div className="w-2/5">
                <label>NIC Number</label>
                <p className="w-full p-1 border-b border-gray-400">{employee.NIC_NO}</p>
              </div>

              <div className="w-2/5">
                <label>Position</label>
                <p className="w-full p-1 border-b border-gray-400">{employee.position}</p>
              </div>

              <div className="w-2/5">
                <label>Contact Number</label>
                <p className="w-full p-1 border-b border-gray-400">{employee.contactNumber}</p>
              </div>

              {/* Display Birth Certificate */}
              <div className="w-2/5">
                <label>Birth Certificate</label>
                {employee.birthCertificate ? (
                  <a
                    href={employee.birthCertificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline ml-2"
                  >
                    View
                  </a>
                ) : (
                  <p>No birth certificate uploaded</p>
                )}
              </div>

              {/* Display NIC PDF */}
              <div className="w-2/5">
                <label>NIC</label>
                {employee.NIC ? (
                  <a
                    href={employee.NIC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline ml-2"
                  >
                    View
                  </a>
                ) : (
                  <p>No NIC uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployee;