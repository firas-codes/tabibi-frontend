import React from "react";
// const url = "http://localhost:5000/api/v1/users";
const prodUrl = "https://tabibi-backend.herokuapp.com/api/v1/users";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(prodUrl);
      const data = await response.json();
      const { users } = data;

      if (users) {
        const newUsers = users.map((user) => {
          const { _id: userid, name, email, status } = user;
          return {
            userid,
            name,
            email,
            status,
          };
        });
        setUsers(newUsers);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>users</h2>
      <div>
        {users.map((user, index) => {
          const { userid, name, email, status } = user;

          return (
            <ul key={index}>
              <li>id: {userid}</li>
              <br />
              <li>name: {name}</li>
              <li>email: {email}</li>
              <li>statut: {status}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
