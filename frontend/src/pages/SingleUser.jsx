import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const SingleUser = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
 
  useEffect(() => {
    if (loading) {
      toast.loading("Fetching user details...");
    } else {
      toast.dismiss();
    }
    if (error) {
      toast.error("Failed to fetch user details.");
    }
  }, [loading, error]);

  return (
    <div className="flex w-full mt-5">
      <div className="flex-6">
        <div className="p-2.5 m-5 flex justify-between">
          <h1 className="text-3xl font-semibold">User Details</h1>
          <Link 
            to={`/users/${userId}/edit`} 
            className="w-36 p-2 bg-gray-900 text-white text-center cursor-pointer mt-2.5 hover:scale-110 transition-all duration-200"
          >
            Edit
          </Link>
        </div>
        <div className="p-2.5 m-5 flex">
          <div className="flex-1 flex text-center align-center justify-center">
            <img
              src={
                user.img
                  ? user.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="User"
              className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex-2 px-5">
            <div className="flex flex-wrap gap-8 justify-between">
              {/* Display User Details */}
              <div className="w-2/5">
                <label>Username</label>
                <p className="w-full p-1 border-b border-gray-400">{user.username}</p>
              </div>

              <div className="w-2/5">
                <label>Email</label>
                <p className="w-full p-1 border-b border-gray-400">{user.email}</p>
              </div>

              <div className="w-2/5">
                <label>Phone</label>
                <p className="w-full p-1 border-b border-gray-400">{user.phone}</p>
              </div>

              <div className="w-2/5">
                <label>Role</label>
                <p className="w-full p-1 border-b border-gray-400">{user.isAdmin ? "Admin" : "User"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

