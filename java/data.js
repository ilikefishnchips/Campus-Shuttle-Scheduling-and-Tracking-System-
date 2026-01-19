// ===== FAKE DATABASE =====
let shuttle = {
  id: "SH01",
  route: "Hostel → Campus",
  status: "On Time",
  seatsAvailable: 5
};

let incidents = [];

// ===== STUDENT FUNCTIONS =====
function bookSeat() {
  if (shuttle.seatsAvailable > 0) {
    shuttle.seatsAvailable--;
    document.getElementById("seatCount").innerText = shuttle.seatsAvailable;
    alert("Seat booked successfully!");
  } else {
    alert("No seats available!");
  }
}

function cancelSeat() {
  shuttle.seatsAvailable++;
  document.getElementById("seatCount").innerText = shuttle.seatsAvailable;
  alert("Booking cancelled!");
}

// ===== DRIVER FUNCTIONS =====
function updateStatus(newStatus) {
  shuttle.status = newStatus;
  document.getElementById("driverStatus").innerText = shuttle.status;
  alert("Status updated to " + newStatus);
}

function reportIncident() {
  incidents.push("Traffic Delay");
  alert("Incident reported!");
}

// ===== ADMIN FUNCTIONS =====
function loadAdminData() {
  document.getElementById("adminStatus").innerText = shuttle.status;
  document.getElementById("adminSeats").innerText = shuttle.seatsAvailable;
  document.getElementById("incidentCount").innerText = incidents.length;
}
