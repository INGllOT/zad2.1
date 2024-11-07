import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State for storing events
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Sample Event History",
      startDate: "2021-10-01",
      endDate: "2023-10-05",
      description: "Example description",
      category: "History",
    },
    {
      id: 2,
      name: "Sample Event Sport",
      startDate: "2023-10-01",
      endDate: "2023-10-05",
      description: "Example description",
      category: "Sport",
    },
    {
      id: 3,
      name: "Sample Event Science",
      startDate: "2024-10-01",
      endDate: "2023-10-05",
      description: "Example description",
      category: "Science",
    },
    {
      id: 4,
      name: "Sample Event Science 2",
      startDate: "2020-10-01",
      endDate: "2023-10-05",
      description: "Example description",
      category: "Science",
    },
  ]);

  // State for form values and editing
  const [newEvent, setNewEvent] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    category: "",
  });
  const [editingEventId, setEditingEventId] = useState(null);


 // State for other necessary data
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [newPassword, setNewPassword] = useState("");

// State for storing admin credentials
const [adminCredentials, setAdminCredentials] = useState({
  username: "admin",
  password: "admin",
});



   // Function to handle login
   const handleLogin = () => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid login credentials");
    }
  };


   // Function to change the password
   const handleChangePassword = () => {
    if (newPassword) {
      setAdminCredentials((prevCredentials) => ({
        ...prevCredentials,
        password: newPassword,
      }));
      setNewPassword("");
      alert("Password changed successfully!");
      handleLogout();
    } else {
      alert("Please enter a new password.");
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Add or update event function
  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.startDate || !newEvent.endDate) {
      return;
    }
    if (editingEventId) {
      setEvents(
        events.map((event) =>
          event.id === editingEventId ? { ...event, ...newEvent } : event
        )
      );
      setEditingEventId(null);
    } else {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    }
    setNewEvent({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      category: "",
    });
  };

  // Delete event function
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Edit event function
  const editEvent = (event) => {
    setNewEvent(event);
    setEditingEventId(event.id);
  };

  // Sort events by start date
  const sortedEvents = events.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Event Timeline</h1>

      {!isLoggedIn ? (
        <>
          <div className="card p-4 mb-4">
            <h2 className="mb-3">Login</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="card">
            <h2 className="card-header">Events</h2>
            <ul className="list-group list-group-flush">
              {sortedEvents.map((event) => (
                <li
                  key={event.id}
                  className="list-group-item d-flex align-items-start"
                >
                  <div
                    className="timeline-icon me-3"
                    style={{
                      backgroundColor:
                        event.category === "Sport"
                          ? "lightcoral"
                          : event.category === "Science"
                          ? "lightgreen"
                          : event.category === "History"
                          ? "lightblue"
                          : "gray",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  ></div>

                  <div className="flex-grow-1">
                    <h3 className="mb-1">{event.name}</h3>
                    <p className="mb-1 text-muted">
                      {event.startDate} - {event.endDate}
                    </p>
                    <p className="mb-1">{event.description}</p>
                    <p className="mb-1">
                      <strong>Category:</strong> {event.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button onClick={handleLogout} className="btn btn-warning">
              Logout
            </button>
          </div>

          <div className="card p-4 mb-4">
            <h3>Change Password</h3>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleChangePassword} className="btn btn-primary">
              Change Password
            </button>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="mb-3">
              {editingEventId ? "Edit Event" : "Add New Event"}
            </h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="Start Date"
                value={newEvent.startDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startDate: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="End Date"
                value={newEvent.endDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endDate: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
              />
            </div>
            <button onClick={handleSaveEvent} className="btn btn-primary">
              {editingEventId ? "Update Event" : "Add Event"}
            </button>
          </div>

          <div className="card">
            <h2 className="card-header">Events</h2>
            <ul className="list-group list-group-flush">
              {sortedEvents.map((event) => (
                <li
                  key={event.id}
                  className="list-group-item d-flex align-items-start"
                >
                  <div
                    className="timeline-icon me-3"
                    style={{
                      backgroundColor:
                        event.category === "Sport"
                          ? "lightcoral"
                          : event.category === "Science"
                          ? "lightgreen"
                          : event.category === "History"
                          ? "lightblue"
                          : "gray",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="flex-grow-1">
                    <h3 className="mb-1">{event.name}</h3>
                    <p className="mb-1 text-muted">
                      {event.startDate} - {event.endDate}
                    </p>
                    <p className="mb-1">{event.description}</p>
                    <p className="mb-1">
                      <strong>Category:</strong> {event.category}
                    </p>
                  </div>
                  <button
                    onClick={() => editEvent(event)}
                    className="btn btn-secondary ms-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
