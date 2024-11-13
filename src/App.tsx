import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Sample Event History",
      startDate: "2000-10-01",
      endDate: "2004-10-05",
      description: "Super history event !!!!",
      category: "History",
    },
    {
      id: 2,
      name: "Sample Event Sport",
      startDate: "2004-10-01",
      endDate: "2010-10-05",
      description: "Example description about sport :)))",
      category: "Sport",
    },
    {
      id: 3,
      name: "Sample Event Science",
      startDate: "2004-10-01",
      endDate: "2008-10-05",
      description: "Example description ---- SCIENCE ;)",
      category: "Science",
    },
    {
      id: 4,
      name: "Sample Event Science 2",
      startDate: "2008-01-01",
      endDate: "2015-10-05",
      description: "Example description2 ---- SCIENCE ;)",
      category: "Science",
    },
    {
      id: 5,
      name: "Sample Event Sport",
      startDate: "1995-10-01",
      endDate: "2000-10-05",
      description: "Example description about sport :)))",
      category: "Sport",
    },
    
  ]);

  const items = useMemo(() => {
    return events.map((event) => {
      return {
        id: event.id,
        content: `<b>${event.name}</b><br>${event.startDate}/${event.startDate}<br>${event.description}`,
        start: event.startDate,
        end: event.endDate,
        style: `background-color: ${getCategoryColor(event.category)}; color: black; border-radius: 4px; padding: 5px;`,
      };
    });
  }, [events, getCategoryColor]);


  const options = useMemo(
    () => ({
      width: "100%",
      height: "400px",
      stack: true,
      start: new Date("2010-01-01"),
      end: new Date("2025-01-01"),
      showCurrentTime: false, // Disable the current time indicator
      verticalScroll: true, // Allow vertical scroll if needed
      zoomable: false, // Disable zooming to avoid displaying dates at different zoom levels
   
      format: {
        minorLabels: {
          // Hide date labels
          day: "",
          month: "",
          year: "",
        },
        majorLabels: {
          // Hide date labels
          day: "",
          month: "",
          year: "",
        },
      }

    }),
    []
  );

  useEffect(() => {
    if (timelineRef.current) {

    const timeline = new Timeline(timelineRef.current, items, options);

    return () => timeline.destroy(); // Cleanup on component unmount
    }
  }, [items, options]);
  
  const timelineRef = useRef(null); // Create a reference for the timeline DOM element

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

  function getCategoryColor(category : string) {
    switch (category) {
      case "History":
        return "#FFD700"; // Gold for history
      case "Science":
        return "#87CEEB"; // Light blue for science
      case "Sport":
        return "#98FB98"; // Pale green for sport
      default:
        return "#ffffff"; // Default color
    }
  }

  const [oldEvent, editOldEvent] = useState({
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
    if (!newEvent.name || !newEvent.startDate || !newEvent.endDate ) {
      return;
    }
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      category: "",
    });
  };  

  const handleEditEvent = () => {
    setEvents(
      events.map((event) =>
        event.id === editingEventId ? { ...event, ...oldEvent } : event
      )
    );
    setEditingEventId(null);
    closeEditEvent();
    editOldEvent({
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

  // const sortedEvents = [...events].sort((a, b) => {
  //   let aValue = a[sortCriterion];
  //   let bValue = b[sortCriterion];

  //   if (sortCriterion === "startDate" || sortCriterion === "endDate") {
  //     aValue = new Date(aValue).getTime();
  //     bValue = new Date(bValue).getTime();
  //   } else {
  //     aValue = aValue.toString().toLowerCase();
  //     bValue = bValue.toString().toLowerCase();mjuyt
  //   }

  //   if (sortOrder === "asc") {
  //     return aValue > bValue ? 1 : -1;
  //   } else {
  //     return aValue < bValue ? 1 : -1;
  //   }
  // });

  

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
    editOldEvent(event); // Populate fields with the selected event’s data
    setEditingEventId(event.id); // Set editing event ID
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

      {!isLoggedIn ? (
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
            <h2 className="mb-3">Add New Event</h2>
            <div className="form-row">
            <input type="text" className="form-control mb-3" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="Start Date" value={newEvent.startDate} onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="End Date" value={newEvent.endDate} onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
            <select className="form-control mb-3" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
                <option value="" disabled>Select category</option>
                <option value="history">History</option>
                <option value="science">Science</option>
                <option value="sport">Sport</option>
            </select>            
            <button onClick={handleSaveEvent} className="btn btn-primary">Add Event</button>
            </div>
          </div> 
          
    <div className="container my-5">
      <h1 className="text-center mb-4">Event Timeline</h1>
      <div ref={timelineRef} />
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
                <li key={event.id} className="list-group-item d-flex align-items-start" style={{ backgroundColor: getCategoryColor(event.category) }}>
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
            <h2 className="mb-3">Edit Event</h2>
            <input type="text" className="form-control mb-3" placeholder="Event Name" value={showEditModal.name} onChange={(e) => editEvent({ ...oldEvent, name: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="Start Date" value={showEditModal.startDate} onChange={(e) => editEvent({ ...oldEvent, startDate: e.target.value })} />
            <input type="date" className="form-control mb-3" placeholder="End Date" value={showEditModal.endDate} onChange={(e) => editEvent({ ...oldEvent, endDate: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Description" value={showEditModal.description} onChange={(e) => editEvent({ ...oldEvent, description: e.target.value })} />
            <select className="form-control mb-3" value={showEditModal.category} onChange={(e) => editEvent({ ...oldEvent, category: e.target.value })}>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Sport">Sport</option>
            </select>  
            <button onClick={handleEditEvent} className="btn btn-primary">Update Event</button>
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
