const PrintEvents = (events) => {
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

export default PrintEvents;