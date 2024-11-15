import React, { useState, useEffect, useRef, useMemo } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import EventList from "./components/EventList";
import EventListUnAuth from "./components/EventListUnAuth";
import Auth from "./components/Authentication";
import PrintEvents from "./components/PrintEvent";
import ChangePassword from "./components/ChangePassword";
import AddNewEvent from "./components/AddNewEvent";

// Modals
import EditModal from "./components/modals/EditModal";
import ShowFilterModal from "./components/modals/ShowFilterModal";
import SelectedEventModal from "./components/modals/SelectedEventModal";

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

  // auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "admin",
  });
  
  // sorting
  const [sortCriterion, setSortCriterion] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");

  // date filter state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // options
  const [editingEventId, setEditingEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);

 
  // edit event
  const [newEvent, setNewEvent] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    category: "",
  });
  const [oldEvent, editOldEvent] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    category: "",
  });


  const items = useMemo(() => {
    return events.map((event) => {
      return {
        id: event.id,
        content: `<b>${event.name}</b><br>${event.startDate}/${event.startDate}<br>${event.description}`,
        start: event.startDate,
        end: event.endDate,
        style: `background-color: ${getCategoryColor(
          event.category
        )}; color: black; border-radius: 4px; padding: 5px;`,
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
      },
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

  function getCategoryColor(category: string) {
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

  const handleLogin = () => {
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid login credentials");
    }
  };

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

    return sortOrder === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const printEvents = () => {
    PrintEvents(events);
  };


  const editEvent = (event : any) => {
    editOldEvent(event); // Populate fields with the selected event’s data
    setEditingEventId(event.id); // Set editing event ID
    setShowEditModal(event); // Open the edit modal
  };

  const closeEditEvent = () => {
    setShowEditModal(null);
  };

  const deleteEvent = (id : any) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const openEventDetails = (event : any) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const renderPrintButton = () => (
    <button onClick={printEvents} className="btn btn-secondary mb-4">
      Print All Events
    </button>
  );

  const logout = () => (
    <button onClick={handleLogout} className="btn btn-warning mb-4">
      Logout
    </button>
  );

  const timeline = () => (
    <div className="card p-4 mb-4">
      <div ref={timelineRef} />
    </div>
  );

  return (
    <div >
      <h1 className="text-center mb-4">Wojciech Inglot (js timeline)</h1>

      {!isLoggedIn ? (
        <div>
          {renderPrintButton()}

          <Auth
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            username={username}
            password={password}
          />

          <br></br>
          
          {timeline()}
          
          <EventListUnAuth
            events={events}
            filteredAndSortedEvents={filteredAndSortedEvents}
            toggleSortOrder={toggleSortOrder}
            setShowFilterModal={setShowFilterModal}
            openEventDetails={openEventDetails}
            getCategoryColor={getCategoryColor}
          />
        </div>
      ) : (
        <div >
          {logout()}

          {renderPrintButton()}

          <ChangePassword
            setNewPassword={setNewPassword}
            newPassword={newPassword}
            handleChangePassword={handleChangePassword}
          />

          <AddNewEvent
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            handleSaveEvent={handleSaveEvent}
          />

         {timeline()}

          <EventList
            events={events}
            filteredAndSortedEvents={filteredAndSortedEvents}
            toggleSortOrder={toggleSortOrder}
            setShowFilterModal={setShowFilterModal}
            editEvent={editEvent}
            deleteEvent={deleteEvent}
            openEventDetails={openEventDetails}
            getCategoryColor={getCategoryColor}
          />

          {
            <EditModal
              showEditModal={showEditModal}
              editEvent={editEvent}
              oldEvent={oldEvent}
              handleEditEvent={handleEditEvent}
              closeEditEvent={closeEditEvent}
            />
          }
        </div>
      )}

      <ShowFilterModal
        showFilterModal={showFilterModal}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        setShowFilterModal={setShowFilterModal}
      />

      <SelectedEventModal
        selectedEvent={selectedEvent}
        closeEventDetails={closeEventDetails}
      />
    </div>
  );
}

export default App;
