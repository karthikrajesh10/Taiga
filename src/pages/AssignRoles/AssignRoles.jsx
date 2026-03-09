import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getUsers, assignRoles } from "../../services/userService";
import "./AssignRoles.css";
import { useNavigate } from "react-router-dom"; 

const ROLE_CHOICES = [
  "PM",
  "DEV",
  "QA",
  "MGR",
  "AP",
  "TL",
];

export default function AssignRoles() {

  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getUsers()
  //     .then((data) => {
  //       setUsers(data);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);
  useEffect(() => {
      getUsers()
        .then((data) => {

          setUsers(data);

          const initialRoles = {};

          data.forEach((user) => {
            initialRoles[user.id] = user.roles || [];
          });

          setSelectedRoles(initialRoles);
        })
        .finally(() => setLoading(false));
    }, []);

  const toggleRole = (userId, role) => {

    setSelectedRoles((prev) => {

      const userRoles = prev[userId] || [];

      if (userRoles.includes(role)) {
        return {
          ...prev,
          [userId]: userRoles.filter((r) => r !== role),
        };
      }

      return {
        ...prev,
        [userId]: [...userRoles, role],
      };
    });
  };

  const handleSave = async (userId) => {

    const roles = selectedRoles[userId] || [];

    try {
      await assignRoles(userId, roles);
      alert("Roles updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Header variant="dashboard" />

      <main className="assign-roles">

        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <h1 className="assign-roles__title">
          Assign Multiple Roles
        </h1>

        {loading && <p>Loading users...</p>}

        {!loading && users.map((user) => (

          <div key={user.id} className="user-role-row">

            <div className="user-role-row__info">
              <strong>{user.username}</strong>
              <span>{user.email}</span>
              <span>{user.role}</span>
            </div>

            <div className="user-role-row__roles">

              {ROLE_CHOICES.map((role) => (
                <label key={role}>

                  <input
                    type="checkbox"
                    checked={(selectedRoles[user.id] || []).includes(role)}
                    onChange={() => toggleRole(user.id, role)}
                  />

                  {role}

                </label>
              ))}

            </div>

            <button
              className="assign-btn"
              onClick={() => handleSave(user.id)}
            >
              Save
            </button>

          </div>

        ))}

      </main>
    </>
  );
}