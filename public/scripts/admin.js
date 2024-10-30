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
        alert("Payment approved successfully");
        loadPaymentTable(); // Refresh the table after approval
      } else {
        console.error("Payment approval failed");
      }
    } catch (error) {
      console.error("Error approving payment:", error);
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
