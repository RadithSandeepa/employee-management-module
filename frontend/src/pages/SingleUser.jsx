import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SingleUser = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
 
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <div className="flex-6">
        <div className="shadow-md p-2.5 m-5 flex justify-between">
          <h1 className="text-gray-400 text-xl">User Details</h1>
          <Link 
            to={`/users/${userId}/edit`} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
        <div className="shadow-md p-2.5 m-5 flex">
          <div className="flex-1 text-center">
            <img
              src={
                user.img
                  ? user.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="User"
              className="w-24 h-24 rounded-full object-cover"
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
