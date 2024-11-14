const EventList = ({
  events,
  filteredAndSortedEvents,
  toggleSortOrder,
  setShowFilterModal,
  editEvent,
  deleteEvent,
  openEventDetails,
  getCategoryColor,
}) => {
  // Helper component for each event item
  const EventListItem = ({ event }) => (
    <li
      className="list-group-item d-flex align-items-start"
      style={{ backgroundColor: getCategoryColor(event.category) }}
    >
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
      <button
        onClick={() => openEventDetails(event)}
        className="btn btn-info ms-2"
      >
        View Details
      </button>
    </li>
  );

  return (
    <div className="card">
      <h2 className="card-header">Events</h2>
      <div className="d-flex justify-content-around mb-2">
        <button
          onClick={() => toggleSortOrder("name")}
          className="btn btn-light"
        >
          Sort by Name
        </button>
        <button
          onClick={() => toggleSortOrder("startDate")}
          className="btn btn-light"
        >
          Sort by Start Date
        </button>
        <button
          onClick={() => toggleSortOrder("category")}
          className="btn btn-light"
        >
          Sort by Category
        </button>
        <button
          onClick={() => setShowFilterModal(true)}
          className="btn btn-light"
        >
          Filter by Date
        </button>
      </div>
      <ul className="list-group list-group-flush">
        {filteredAndSortedEvents.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
