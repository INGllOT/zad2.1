const SelectedEventModal = ({
    selectedEvent,
    closeEventDetails

}) => {

return (
    selectedEvent && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedEvent.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEventDetails}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Start Date:</strong> {selectedEvent.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {selectedEvent.endDate}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
                <p>
                  <strong>Category:</strong> {selectedEvent.category}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEventDetails}
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

export default SelectedEventModal