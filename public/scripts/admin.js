document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("pieChart").getContext("2d");
  const pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Students with Tutor",
        "Students without Tutor",
        "Tutors with Tuitions",
        "Tutors without Tuitions",
      ],
      datasets: [
        {
          label: "Distribution",
          data: [80, 40, 35, 10], // Example data
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Adjusts the aspect ratio to fit the container
      plugins: {
        legend: {
          position: "left", // Set to 'top', 'bottom', 'left', or 'right'
          labels: {
            font: {
              size: 18, // Change font size here
            },
            padding: 35, // Adjust spacing between the labels
          },
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem) {
              return (
                tooltipItem.label + ": " + tooltipItem.raw + " students/tutors"
              );
            },
          },
        },
      },
    },
  });
});
document.addEventListener("DOMContentLoaded", async () => {
  const paymentTableBody = document.querySelector("#requests tbody");
  const userName = localStorage.getItem("user.name"); // Retrieve the user's name from localStorage

  // Function to fetch user data from the API
  async function fetchUserData() {
    try {
      const response = await fetch("http://localhost:3001/api/user");
      const data = await response.json();
      return data.filter((user) => user.role === "tutor" && !user.paid);
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  }

  // Function to approve payment
  async function approvePayment(name) {
    try {
      const response = await fetch("http://localhost:3001/api/user/pay", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, paid: true }),
      });

      if (response.ok) {
        swal("Success", "Payment approved successfully", "success");
        loadPaymentTable(); // Refresh the table after approval
      } else {
        console.error("Payment approval failed");
        swal("Error", "Payment approval failed", "error");
      }
    } catch (error) {
      console.error("Error approving payment:", error);
      swal("Error", "An error occurred while approving payment", "error");
    }
  }

  // Function to load data into the payment table
  async function loadPaymentTable() {
    const tutors = await fetchUserData();
    paymentTableBody.innerHTML = ""; // Clear existing rows

    tutors.forEach((tutor) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td class="border px-4 py-2">${tutor.name}</td>
                    <td class="border px-4 py-2">${
                      tutor.paid ? "Paid" : "Unpaid"
                    }</td>
                    <td class="border px-4 py-2"></td>
                `;

      // Create the approve button
      const approveButton = document.createElement("button");
      approveButton.textContent = "Approve Payment";
      approveButton.classList.add(
        "bg-green-500",
        "text-white",
        "py-1",
        "px-2",
        "rounded-md",
        "hover:bg-green-600"
      );
      approveButton.addEventListener("click", () => approvePayment(tutor.name));

      // Append the button to the last cell of the row
      row.children[2].appendChild(approveButton);
      paymentTableBody.appendChild(row);
    });
  }

  // Load the payment table on page load
  loadPaymentTable();
});

async function fetchRespondedTeachers() {
  try {
    const response = await fetch("http://localhost:3001/api/teacher/findReq");
    if (!response.ok) {
      throw new Error("Failed to fetch responded teachers");
    }
    const teachers = await response.json();
    console.log("Fetched Teachers Data:", teachers); // Log data
    populateRespondedTeachersTable(teachers);
  } catch (error) {
    console.error("Error fetching responded teachers:", error);
  }
}

function populateRespondedTeachersTable(teachers) {
  const tableBody = document.getElementById("respondedTeachersTableBody");
  tableBody.innerHTML = ""; // Clear previous data

  const teacherList = Array.isArray(teachers) ? teachers : teachers.data; // Adjust as needed

  teacherList.forEach((teacher) => {
    const subjectExpertise = Array.isArray(teacher.subjectExpertise)
      ? teacher.subjectExpertise.join(", ")
      : teacher.subjectExpertise || "N/A";

    const row = `
            <tr>
                <td class="border px-4 py-2">${teacher.name || "N/A"}</td>
                <td class="border px-4 py-2">${subjectExpertise}</td>
                <td class="border px-4 py-2">${
                  teacher.preferedLocation || "N/A"
                }</td>
                <td class="border px-4 py-2">${teacher.phone || "N/A"}</td>
                <td class="border px-4 py-2">${teacher.rate || "N/A"}</td>
                <td class="border px-4 py-2">${
                  teacher.respondedUser || "N/A"
                }</td>
                <td class="border px-4 py-2">
                    ${
                      teacher.phone
                        ? `<button
                            class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                            onclick="sendWhatsAppMessage('${teacher.phone}', '${
                            teacher.name || "Teacher"
                          }')">
                            Message on WhatsApp
                          </button>`
                        : "N/A"
                    }
                </td>
            </tr>
        `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Function to send a WhatsApp message
function sendWhatsAppMessage(phone, name) {
  const encodedMessage = encodeURIComponent(
    `Hello ${name},\nI would like to discuss opportunities regarding your subject expertise. Please let me know your availability.`
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank"); // Opens WhatsApp in a new tab
}

// Initialize fetch on page load
document.addEventListener("DOMContentLoaded", fetchRespondedTeachers);

// Logout button functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  window.location.href = "login.html"; // Redirect to the homepage or logout URL
});

let allUsers = []; // To store all fetched users for search functionality

// Fetch user data from the API
async function fetchUserData() {
  try {
    const response = await fetch("http://localhost:3001/api/user/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    allUsers = await response.json(); // Store users for search
    renderTable(allUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Render table rows
function renderTable(users) {
  const tableBody = document.getElementById("user-table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
                <td class="border px-4 py-2">${user.name}</td>
                <td class="border px-4 py-2">${user.role}</td>
                <td class="border px-4 py-2">${user.email}</td>
                <td class="border px-4 py-2">
                    <button class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600" 
                        onclick="openMailApp('${user.email}')">Message</button>
                </td>
            `;

    tableBody.appendChild(row);
  });
}

// Filter users by name
function filterUsersByName(searchText) {
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );
  renderTable(filteredUsers);
}

// Function to open the default mail app
function openMailApp(email) {
  window.location.href = `mailto:${email}`;
}

// Event listener for the search box
document.getElementById("search-box").addEventListener("input", (event) => {
  const searchText = event.target.value;
  filterUsersByName(searchText);
});

// Fetch data on page load
document.addEventListener("DOMContentLoaded", fetchUserData);
