export const userColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "Username",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 170,
      renderCell: (params) => (params.row.isAdmin ? "Yes" : "No"),
    },
  ];
  
  export const employeeColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "position",
      headerName: "Position",
      width: 180,
    },
    {
      field: "contactNumber",
      headerName: "Contact",
      width: 150,
    },
  ];
  