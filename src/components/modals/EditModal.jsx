const EditModal  = ({
    showEditModal,
    editEvent,
    oldEvent,
    handleEditEvent,
    closeEditEvent
}) =>    {
    

    return (
            showEditModal && (
            <div
              className="modal"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{showEditModal.name}</h5>
                  </div>
                  <div className="card p-4 mb-4">
                    <h2 className="mb-3">Edit Event</h2>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Event Name"
                      value={showEditModal.name}
                      onChange={(e) =>
                        editEvent({ ...oldEvent, name: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="form-control mb-3"
                      placeholder="Start Date"
                      value={showEditModal.startDate}
                      onChange={(e) =>
                        editEvent({ ...oldEvent, startDate: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="form-control mb-3"
                      placeholder="End Date"
                      value={showEditModal.endDate}
                      onChange={(e) =>
                        editEvent({ ...oldEvent, endDate: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Description"
                      value={showEditModal.description}
                      onChange={(e) =>
                        editEvent({ ...oldEvent, description: e.target.value })
                      }
                    />
                    <select
                      className="form-control mb-3"
                      value={showEditModal.category}
                      onChange={(e) =>
                        editEvent({ ...oldEvent, category: e.target.value })
                      }
                    >
                      <option value="History">History</option>
                      <option value="Science">Science</option>
                      <option value="Sport">Sport</option>
                    </select>
                    <button
                      onClick={handleEditEvent}
                      className="btn btn-primary"
                    >
                      Update Event
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeEditEvent}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
    );

};

export default EditModal;