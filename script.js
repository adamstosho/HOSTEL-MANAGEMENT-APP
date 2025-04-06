
const menuItems = document.querySelectorAll('.menu li');
const pages = document.querySelectorAll('.page');
const addStudentBtn = document.getElementById('addStudentBtn');
const addRoomBtn = document.getElementById('addRoomBtn');
const addStudentModal = document.getElementById('addStudentModal');
const addRoomModal = document.getElementById('addRoomModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const saveStudentBtn = document.getElementById('saveStudentBtn');
const saveRoomBtn = document.getElementById('saveRoomBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Date for the students
const sampleStudents = [
  { id: 1, name: "Adam Ridwanullahi", room: "101", contact: "+234-903-329-5837", status: "Active" },
  { id: 2, name: "Mr. Idris", room: "102", contact: "+234-812-547-2281", status: "Active" },
  { id: 3, name: "Lawal Kabir", room: "103", contact: "+234-801-112-4491", status: "Active" },
  { id: 4, name: "Akinola Dolapo", room: "104", contact: "+234-812-745-3325", status: "Pending" },
  { id: 5, name: "Abbas Muiz", room: "105", contact: "+234-912-445-7281", status: "Inactive" }
];

const sampleRooms = [
  { id: "101", type: "Room of 3", price: "#300K", status: "Occupied" },
  { id: "102", type: "Room of 3", price: "#300K", status: "Occupied" },
  { id: "103", type: "Room of 2", price: "#450K", status: "Occupied" },
  { id: "104", type: "Room of 2", price: "#450K", status: "Available" },
  { id: "105", type: "Room of 1", price: "#600K", status: "Occupied" },
  { id: "106", type: "Room of 1", price: "#600K", status: "Available" },
  { id: "107", type: "Room of 3", price: "#300K", status: "Available" },
  { id: "108", type: "Room of 2", price: "#450K", status: "Maintenance" }
];

const samplePayments = [
  { id: 1, student: "Adam Ridwanullahi", room: "101", amount: "#300K", date: "2025-03-01", status: "Paid" },
  { id: 2, student: "Mr. Idris", room: "102", amount: "#300K", date: "2025-03-02", status: "Paid" },
  { id: 3, student: "Lawal Kabir", room: "103", amount: "#450K", date: "2025-03-03", status: "Paid" },
  { id: 4, student: "Akinola Dolapo", room: "104", amount: "#450K", date: "2025-03-15", status: "Pending" },
  { id: 5, student: "Abbas Muiz", room: "105", amount: "#600K", date: "2025-03-10", status: "Overdue" }
];

const sampleComplaints = [
  { id: 1, student: "Adam Ridwanullahi", room: "101", issue: "Water leakage", date: "2025-03-10", status: "Open" },
  { id: 2, student: "Mr. Idris", room: "102", issue: "Broken chair", date: "2025-03-12", status: "In Progress" },
  { id: 3, student: "Lawal Kabir", room: "103", issue: "Fan not working", date: "2025-03-15", status: "Resolved" },
  { id: 4, student: "Akinola Dolapo", room: "104", issue: "Wi-Fi issues", date: "2025-03-20", status: "Open" }
];


function init() {
  loadStudentTable();
  loadRoomGrid();
  loadPaymentTable();
  loadComplaintTable();
  setupEventListeners();
  checkDarkMode();
}

// Event Listeners
function setupEventListeners() {
  // Menu navigation
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = item.getAttribute('data-page');
      activateMenuItem(item);
      showPage(targetPage);
    });
  });

  // Modal controls
  addStudentBtn.addEventListener('click', () => {
    addStudentModal.style.display = 'flex';
  });

  addRoomBtn.addEventListener('click', () => {
    addRoomModal.style.display = 'flex';
  });


  // for closing modal (using cancel or x(close-modals))
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  cancelBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });


  // Save buttons
  saveStudentBtn.addEventListener('click', saveStudent);
  saveRoomBtn.addEventListener('click', saveRoom);



  // Dark mode toggle
  darkModeToggle.addEventListener('change', toggleDarkMode);

  // Close modal when clicking outside the modal to make it more classic
  window.addEventListener('click', (event) => {
    if (event.target === addStudentModal) {
      closeAllModals();
    }
    if (event.target === addRoomModal) {
      closeAllModals();
    }
  });
}

// Navigation Functions
function activateMenuItem(clickedItem) {
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
  clickedItem.classList.add('active');
}

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');
}

// This is a Load Data Functions
function loadStudentTable() {
  const tableBody = document.getElementById('studentTableBody');
  tableBody.innerHTML = '';   //clears an existing rows in the table

  sampleStudents.forEach(student => {
    const statusClass = getStatusClass(student.status);
    const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.room}</td>
                <td>${student.contact}</td>
                <td><span class="status-badge ${statusClass}">${student.status}</span></td>
                <td>
                    <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });

  // Add event listeners to action buttons
  const editBtns = document.querySelectorAll('.edit-btn');
  const deleteBtns = document.querySelectorAll('.delete-btn');

  editBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Handle edit functionality
      alert(`Edit student: ${sampleStudents[index].name}`);
    });
  });

  deleteBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Handle delete functionality
      if (confirm(`Are you sure you want to delete #{sampleStudents[index].name}?`)) {
        alert(`Student ${sampleStudents[index].name} deleted`);
      }
    });
  });
}

function loadRoomGrid() {
  const roomGrid = document.getElementById('roomGrid');
  roomGrid.innerHTML = ''; //this also clears the room grid cards

  sampleRooms.forEach(room => {
    const statusClass = getRoomStatusClass(room.status);
    const roomCard = `
            <div class="room-card ${statusClass}">
                <div class="room-number">${room.id}</div>
                <div class="room-details">
                    <p class="room-type">${room.type}</p>
                    <p class="room-price">${room.price}/year</p>
                    <p class="room-status">${room.status}</p>
                </div>       
            </div>
        `;
    roomGrid.innerHTML += roomCard;
  });
}

function loadPaymentTable() {
  const tableBody = document.getElementById('paymentTableBody');
  tableBody.innerHTML = ''; //clears the payment history in the table

    //For populating the tables with the data
  samplePayments.forEach(payment => {
    const statusClass = getPaymentStatusClass(payment.status);
    const row = `
            <tr>
                <td>${payment.id}</td>
                <td>${payment.student}</td>
                <td>${payment.room}</td>
                <td>${payment.amount}</td>
                <td>${payment.date}</td>
                <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}



function loadComplaintTable() {
  const tableBody = document.getElementById('complaintTableBody');
  tableBody.innerHTML = '';

  sampleComplaints.forEach(complaint => {
    const statusClass = getComplaintStatusClass(complaint.status);
    const row = `
            <tr>
                <td>${complaint.id}</td>
                <td>${complaint.student}</td>
                <td>${complaint.room}</td>
                <td>${complaint.issue}</td>
                <td>${complaint.date}</td>
                <td><span class="status-badge ${statusClass}">${complaint.status}</span></td>
                <td>
                    <button class="action-btn"><i class="fas fa-edit"></i></button>
                    <button class="action-btn"><i class="fas fa-check-circle"></i></button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

// To determine what color class to assign to a student's status, i declared a function using switch 
function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'active':
      return 'status-active';
    case 'pending':
      return 'status-pending';
    case 'inactive':
      return 'status-inactive';
    default:
      return '';
  }
}

function getRoomStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'available':
      return 'room-available';
    case 'occupied':
      return 'room-occupied';
    case 'maintenance':
      return 'room-maintenance';
    default:
      return '';
  }
}

function getPaymentStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'status-active';
    case 'pending':
      return 'status-pending';
    case 'overdue':
      return 'status-inactive';
    default:
      return '';
  }
}

function getComplaintStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'open':
      return 'status-inactive';
    case 'in progress':
      return 'status-pending';
    case 'resolved':
      return 'status-active';
    default:
      return '';
  }
}

// Modal Functions
function closeAllModals() {
  addStudentModal.style.display = 'none';
  addRoomModal.style.display = 'none';
  // Clear form inputs
  clearFormInputs();
}

function clearFormInputs() {
  // Clear student form
  document.getElementById('studentName').value = '';
  document.getElementById('roomSelect').value = '';
  document.getElementById('studentContact').value = '';
  document.getElementById('studentEmail').value = '';
  document.getElementById('studentAddress').value = '';

  // Clear room form
  document.getElementById('roomNumber').value = '';
  document.getElementById('roomType').value = 'Room of 3';
  document.getElementById('roomPrice').value = '';
  document.getElementById('roomStatus').value = 'available';
}

//Saving the details - this ensures values are entered into the student form fields
function saveStudent() {
  const name = document.getElementById('studentName').value;
  const room = document.getElementById('roomSelect').value;
  const contact = document.getElementById('studentContact').value;

  if (!name || !room || !contact) {
    alert('Please fill in all required fields');
    return;
  }
  //the above function validates that no required field is empty, else stops the function


  // Add student to data
  const newId = sampleStudents.length > 0 ? Math.max(...sampleStudents.map(s => s.id)) + 1 : 1;
  const newStudent = {
    id: newId,
    name: name,
    room: room,
    contact: contact,
    status: 'Active'
  };

  sampleStudents.push(newStudent);   //add student to the samplestudents array
  loadStudentTable(); //refreshes the table
  closeAllModals();

  // Show success message
  alert(`Student ${name} added successfully!`);
}

// Function for saving room
function saveRoom() {
  const roomNumber = document.getElementById('roomNumber').value;
  const roomType = document.getElementById('roomType').value;
  const roomPrice = document.getElementById('roomPrice').value;
  const roomStatus = document.getElementById('roomStatus').value;

  //The above retrieves form values.

  if (!roomNumber || !roomPrice) {
    alert('Please fill in all required fields');
    return;
  }

  // Add/contruct the room to data/object (adding function to capitalize first letter and add # prefix)
  const newRoom = {
    id: roomNumber,
    type: roomType.charAt(0).toUpperCase() + roomType.slice(1),
    price: `#${roomPrice}`,
    status: roomStatus.charAt(0).toUpperCase() + roomStatus.slice(1)
  };

  // Check if room already exists to prevent duplicates
  const existingRoom = sampleRooms.find(r => r.id === roomNumber);
  if (existingRoom) {
    alert('A room with this number already exists!');
    return;
  }

  sampleRooms.push(newRoom);
  loadRoomGrid(); //updates/refreshes
  closeAllModals();

  // Show success message
  alert(`Room ${roomNumber} added successfully!`);
}

// Dark Mode Functions
function checkDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
}


//to add or remove the dark mode based on the toggle state and what is stored on the localstorage
function toggleDarkMode() {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
}

// styling for the darkmode and the statuses
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .status-badge {
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            color: white;
        }
        
        .status-active {
            background-color: var(--success-color);
        }
        
        .status-pending {
            background-color: var(--warning-color);
        }
        
        .status-inactive {
            background-color: var(--danger-color);
        }
        
        .room-card {
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            box-shadow: var(--shadow);
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .room-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
        }
        
        .room-available::before {
            background-color: var(--success-color);
        }
        
        .room-occupied::before {
            background-color: var(--primary-color);
        }
        
        .room-maintenance::before {
            background-color: var(--warning-color);
        }
        
        .room-number {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .room-details p {
            margin-bottom: 5px;
        }
        
        .room-actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
        }
        
        .action-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: var(--gray-color);
            margin-left: 10px;
            transition: var(--transition);
        }
        
        .action-btn:hover {
            color: var(--primary-color);
        }
        
        .edit-btn:hover {
            color: var(--primary-color);
        }
        
        .delete-btn:hover {
            color: var(--danger-color);
        }
        
        /* Dark Mode */
        .dark-mode {
            background-color: #1a1a2e;
            color: #e6e6e6;
        }
        
        .dark-mode .header,
        .dark-mode .card,
        .dark-mode .recent-activities,
        .dark-mode .room-card,
        .dark-mode .settings-group,
        .dark-mode .modal-content,
        .dark-mode .data-table {
            background-color: #16213e;
            color: #e6e6e6;
        }
        
        .dark-mode .data-table tbody tr:hover {
            background-color: #0f3460;
        }
        
        .dark-mode .activity-item {
            background-color: #0f3460;
        }
        
        .dark-mode .form-group input,
        .dark-mode .form-group select,
        .dark-mode .form-group textarea {
            background-color: #16213e;
            border-color: #0f3460;
            color: #e6e6e6;
        }
        
        .dark-mode .search-bar {
            background-color: #0f3460;
        }
        
        .dark-mode .search-bar input {
            color: #e6e6e6;
        }
    </style>
`);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

