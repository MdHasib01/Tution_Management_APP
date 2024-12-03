const user = JSON.parse(localStorage.getItem("user"));
function sendWhatsAppMessage(phone, name) {
  const encodedMessage = encodeURIComponent(
    `Hello ${name},\nI would like to discuss opportunities regarding your subject expertise. Please let me know your availability.`
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank"); // Opens WhatsApp in a new tab
}
function toggleContactForm() {
  const contactForm = document.getElementById("contact-form");
  contactForm.classList.toggle("hidden");
}
document.addEventListener("DOMContentLoaded", async function () {
  const studentCards = document.getElementById("studentCards");
});
document.addEventListener("DOMContentLoaded", async function () {
  const teacherCards = document.getElementById("studentCards");
});
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const teacherCards = document.getElementById("teacherCards");
  const studentCards = document.getElementById("studentCards");
  const teacherShowCards = document.getElementById("teacharShowCards");

  // Search teachers by location
  searchButton.addEventListener("click", async function () {
    const location = document.getElementById("locationInput").value.trim();

    if (location) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/teacher/location?location=${location}`
        );

        if (response.ok) {
          const teachers = await response.json();
          console.log("Teachers:", teachers);
          teacherCards.innerHTML = ""; // Clear previous results

          if (teachers.length > 0) {
            teachers.forEach((teacher) => {
              const teacherCard = `
                                        <div class="bg-white text-black p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                                        <h3 class="text-lg font-bold text-gray-800">${
                                          teacher.name
                                        }</h3>
                                        <p class="text-sm text-gray-600">Subjects: ${
                                          teacher.subjectExpertise
                                        }</p>
                                        <p class="text-sm text-gray-600">Availability: ${
                                          teacher.availabilDays
                                        }</p>
                                       
                                        <p class="text-sm text-gray-600">Budget: ${
                                          teacher.rate || "N/A"
                                        }</p>
                                        <p class="text-sm text-gray-600">Teaching Style: ${
                                          teacher.teachingStyle
                                        }</p>
                                        <p class="text-sm text-gray-600">Notes: ${
                                          teacher.notes || "No additional notes"
                                        }</p>
                                        ${
                                          user.role === "student"
                                            ? `
                 <button
                            class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                            onclick="sendWhatsAppMessage('${teacher.phone}', '${
                                                teacher.name || "Teacher"
                                              }')">
                            Message
                          </button>`
                                            : ""
                                        }
                                    </div>
                                    `;
              teacherCards.insertAdjacentHTML("beforeend", teacherCard);
            });
          } else {
            teacherCards.innerHTML = `<p class="text-red-500 text-center">No teachers found in this location.</p>`;
          }
        } else {
          alert("Error fetching teachers.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching teachers.");
      }
    } else {
      alert("Please enter a location.");
    }
  });

  // Fetch and display student requests
  async function fetchStudentRequests() {
    try {
      const response = await fetch("http://localhost:3001/api/student");

      if (response.ok) {
        const students = await response.json();
        console.log("Students:", students);

        if (students.length > 0) {
          students.forEach((student) => {
            const studentCard = `
                                    <div class="bg-white text-black p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                                        <h3 class="text-lg font-bold text-gray-800">${
                                          student.name
                                        }</h3>
                                        <p class="text-sm text-gray-600">Subjects: ${
                                          student.subjects
                                        }</p>
                                        <p class="text-sm text-gray-600">Availability: ${
                                          student.availability
                                        }</p>
                                        <p class="text-sm text-gray-600">Learning Goals: ${
                                          student.learningGoals
                                        }</p>
                                        <p class="text-sm text-gray-600">Budget: ${
                                          student.budget || "N/A"
                                        }</p>
                                        <p class="text-sm text-gray-600">Teaching Style: ${
                                          student.teachingStyle
                                        }</p>
                                        <p class="text-sm text-gray-600">Notes: ${
                                          student.notes || "No additional notes"
                                        }</p>
                                        ${
                                          user?.paid && user?.role === "tutor"
                                            ? `
                 <button
                            class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                            onclick="sendWhatsAppMessage('${student.phone}', '${
                                                student.name || "Teacher"
                                              }')">
                            Message
                          </button>`
                                            : ""
                                        }
                                    </div>
                                `;
            studentCards.insertAdjacentHTML("beforeend", studentCard);
          });
        } else {
          studentCards.innerHTML = `<p class="text-red-500 text-center">No student requests found.</p>`;
        }
      } else {
        alert("Error fetching student requests.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching student requests.");
    }
  }
  // Fetch and display teacher requests
  async function fetchteacherRequests() {
    try {
      const response = await fetch("http://localhost:3001/api/teacher");

      if (response.ok) {
        const teachers = await response.json();
        console.log("Teachers:", teachers);

        if (teachers.length > 0) {
          teachers.forEach((teacher) => {
            const teacherCard = `
                                    <div class="bg-white text-black p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                                        <h3 class="text-lg font-bold text-gray-800">${
                                          teacher.name
                                        }</h3>
                                        <p class="text-sm text-gray-600">Subjects: ${
                                          teacher.subjectExpertise
                                        }</p>
                                        <p class="text-sm text-gray-600">Availability: ${
                                          teacher.availabilDays
                                        }</p>
                                       
                                        <p class="text-sm text-gray-600">Budget: ${
                                          teacher.rate || "N/A"
                                        }</p>
                                        <p class="text-sm text-gray-600">Teaching Style: ${
                                          teacher.teachingStyle
                                        }</p>
                                        <p class="text-sm text-gray-600">Notes: ${
                                          teacher.notes || "No additional notes"
                                        }</p>
                                        ${
                                          user?.role === "student"
                                            ? `
                 <button
                            class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                            onclick="sendWhatsAppMessage('${teacher.phone}', '${
                                                teacher.name || "Teacher"
                                              }')">
                            Message
                          </button>`
                                            : ""
                                        }
                                    </div>
                                `;
            teacherShowCards.insertAdjacentHTML("beforeend", teacherCard);
          });
        } else {
          teacherShowCards.innerHTML = `<p class="text-red-500 text-center">No student requests found.</p>`;
        }
      } else {
        alert("Error fetching student requests.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching student requests.");
    }
  }
  fetchStudentRequests();
  fetchteacherRequests();
});

document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user"); // Assuming `user` is a JSON string with role information
  const navlink = document.getElementById("navLinks");

  // Create the Login/Logout button
  const authButton = document.createElement("button");
  authButton.className =
    "py-2 px-3 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 rounded transition duration-300";
  authButton.textContent = user ? "Logout" : "Login";
  navlink.appendChild(authButton);

  // Create the Dashboard button if the user exists
  if (user) {
    const dashboardButton = document.createElement("button");
    dashboardButton.className =
      "ml-2 py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded transition duration-300";
    dashboardButton.textContent = "Dashboard";
    navlink.appendChild(dashboardButton);

    // Parse the user object from localStorage
    const userData = JSON.parse(user); // Make sure user is stored as a JSON string in localStorage

    // Add click event for the Dashboard button
    dashboardButton.addEventListener("click", function () {
      if (userData.role === "student") {
        window.location.href = "./student_dashboard.html";
      } else if (userData.role === "tutor") {
        window.location.href = "./teacher_dashboard.html";
      } else if (userData.role === "admin") {
        window.location.href = "./admin_dashboard.html";
      } else {
        console.error("Invalid user role:", userData.role);
        alert("Invalid user role!");
      }
    });

    // Add click event for the Logout button
    authButton.addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "./login.html";
    });
  } else {
    // Add click event for the Login button
    authButton.addEventListener("click", function () {
      window.location.href = "./login.html";
    });
  }
});
