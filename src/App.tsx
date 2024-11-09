import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "admin",
  });

  const [newEvent, setNewEvent] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    category: "",
  });

  const [sortCriterion, setSortCriterion] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleLogin = () => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid login credentials");
    }
  };

    // Date filter state

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
  
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.startDate).getTime();
      const fromDateValue = fromDate ? new Date(fromDate).getTime() : null;
      const toDateValue = toDate ? new Date(toDate).getTime() : null;
  
      return (
        (!fromDateValue || eventDate >= fromDateValue) &&
        (!toDateValue || eventDate <= toDateValue)
      );
    });


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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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

  const toggleSortOrder = (criterion) => {
    if (sortCriterion === criterion) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriterion(criterion);
      setSortOrder("asc");
    }
  };
  

  // Sorting logic applied to filtered events
const filteredAndSortedEvents = [...filteredEvents].sort((a, b) => {
  let aValue = a[sortCriterion];
  let bValue = b[sortCriterion];

  if (sortCriterion === "startDate" || sortCriterion === "endDate") {
    aValue = new Date(aValue).getTime();
    bValue = new Date(bValue).getTime();
  } else {
    aValue = aValue.toString().toLowerCase();
    bValue = bValue.toString().toLowerCase();
  }

  return sortOrder === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
});


  const sortedEvents = [...events].sort((a, b) => {
    let aValue = a[sortCriterion];
    let bValue = b[sortCriterion];

    if (sortCriterion === "startDate" || sortCriterion === "endDate") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else {
      aValue = aValue.toString().toLowerCase();
      bValue = bValue.toString().toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const printEvents = () => {
    const printWindow = window.open("", "_blank");
    const htmlContent = `
      <html>
        <head>
          <title>Printable Events</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .event-container { margin-bottom: 20px; }
            h3 { color: #333; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Event Timeline</h1>
          ${events
            .map(
              (event) => `
              <div class="event-container">
                <h3>${event.name}</h3>
                <p><strong>Start Date:</strong> ${event.startDate}</p>
                <p><strong>End Date:</strong> ${event.endDate}</p>
                <p><strong>Description:</strong> ${event.description}</p>
                <p><strong>Category:</strong> ${event.category}</p>
              </div>`
            )
            .join("")}
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };



  const [editingEventId, setEditingEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);

  const editEvent = (event) => {
   // setNewEvent(event); // Populate fields with the selected event’s data
    setShowEditModal(event); // Open the edit modal
  };

  const closeEditEvent = () => {
    setShowEditModal(null);
  };



  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };


  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Event Timeline</h1>



      {isLoggedIn ? (
        <div className="card p-4 mb-4">
          <h2 className="mb-3">Login</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout} className="btn btn-warning mb-4">Logout</button>
          <button onClick={printEvents} className="btn btn-secondary mb-4">Print All Events</button>
          <div className="card p-4 mb-4">
            <h3>Change Password</h3>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleChangePassword} className="btn btn-primary">Change Password</button>
          </div>

  

          <div className="card p-4 mb-4">
            <h2 className="mb-3">{editingEventId ? "Edit Event" : "Add New Event"}</h2>
            <input type="text" className="form-control mb-3" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="Start Date" value={newEvent.startDate} onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="End Date" value={newEvent.endDate} onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Category" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} />
            <button onClick={handleSaveEvent} className="btn btn-primary">{editingEventId ? "Update Event" : "Add Event"}</button>
          </div> 

          <div className="card">
            <h2 className="card-header">Events</h2>          
            <div className="d-flex justify-content-around mb-2">
              <button onClick={() => toggleSortOrder("name")} className="btn btn-light">Sort by Name</button>
              <button onClick={() => toggleSortOrder("startDate")} className="btn btn-light">Sort by Start Date</button>
              <button onClick={() => toggleSortOrder("category")} className="btn btn-light">Sort by Category</button>
              <button onClick={() => setShowFilterModal(true)} className="btn btn-light">Filter by Date</button>
            </div>
            <ul className="list-group list-group-flush">
              {filteredAndSortedEvents.map((event) => (
                <li key={event.id} className="list-group-item d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h3 className="mb-1">{event.name}</h3>
                    <p className="mb-1 text-muted">{event.startDate} - {event.endDate}</p>
                    <p className="mb-1">{event.description}</p>
                    <p className="mb-1"><strong>Category:</strong> {event.category}</p>
                  </div>
                  <button onClick={() => editEvent(event)} className="btn btn-secondary ms-3">Edit</button>
                  <button onClick={() => deleteEvent(event.id)} className="btn btn-danger ms-2">Delete</button>
                  <button onClick={() => openEventDetails(event)} className="btn btn-info ms-2">View Details</button>
                </li>
              ))}
            </ul>
          </div>


          {showFilterModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filter by Date</h5>
              </div>
              <div className="modal-body">
              <h5>Start date</h5>
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="From Date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                 <h5>End date</h5>
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="To Date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowFilterModal(false)}>
                  Apply Filter
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowFilterModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showEditModal && (
            <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{showEditModal.name}</h5>
                  </div>
                  <div className="card p-4 mb-4">
            <h2 className="mb-3">{editingEventId ? "Edit Event" : "Add New Event"}</h2>
            <input type="text" className="form-control mb-3" placeholder="Event Name" value={showEditModal.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="Start Date" value={showEditModal.startDate} onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="End Date" value={showEditModal.endDate} onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Description" value={showEditModal.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Category" value={showEditModal.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} />
            <button onClick={handleSaveEvent} className="btn btn-primary">{editingEventId ? "Update Event" : "Add Event"}</button>
          </div> 

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEditEvent}>Close</button>
                  </div>
                </div>
              </div>
            </div>
            
          )}


          {selectedEvent && (
            <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedEvent.name}</h5>
                    <button type="button" className="btn-close" onClick={closeEventDetails}></button>
                  </div>
                  <div className="modal-body">
                    <p><strong>Start Date:</strong> {selectedEvent.startDate}</p>
                    <p><strong>End Date:</strong> {selectedEvent.endDate}</p>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                    <p><strong>Category:</strong> {selectedEvent.category}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEventDetails}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}    
        </div>
      )}
    </div>
  );
}

export default App;
