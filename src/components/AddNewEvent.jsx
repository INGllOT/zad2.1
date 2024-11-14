const AddNewEvent = ({

    newEvent,
    setNewEvent,
    handleSaveEvent
}) => {

return (
        <div className="card p-4 mb-4">
            <h2 className="mb-3">Add New Event</h2>
            <div className="form-row">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
              />
              <input
                type="date"
                className="form-control mb-3"
                placeholder="Start Date"
                value={newEvent.startDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startDate: e.target.value })
                }
              />
              <input
                type="date"
                className="form-control mb-3"
                placeholder="End Date"
                value={newEvent.endDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endDate: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
              <select
                className="form-control mb-3"
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Sport">Sport</option>
              </select>
              <button onClick={handleSaveEvent} className="btn btn-primary">
                Add Event
              </button>
            </div>
        </div>
        );
};
export default AddNewEvent;