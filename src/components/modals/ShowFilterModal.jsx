const ShowFilterModal = ({

    showFilterModal,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    setShowFilterModal,
}) => {


    return (

        showFilterModal && (
            <div
              className="modal"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setShowFilterModal(false)}
                    >
                      Apply Filter
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowFilterModal(false)}
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

export default ShowFilterModal;