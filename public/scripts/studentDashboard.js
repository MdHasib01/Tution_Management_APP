const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("name").value = user.fullName;
document.getElementById("studentName").innerHTML = `Welcome ${user.fullName}`;

document
  .getElementById("tutorForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = {
      name: user.fullName,
      subjects: document.getElementById("subjects").value,
      email: user.email,
      availability: document.getElementById("availability").value,
      learningGoals: document.getElementById("learningGoals").value,
      budget: document.getElementById("budget").value,
      teachingStyle: document.getElementById("teachingStyle").value,
      notes: document.getElementById("notes").value,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/student/post_request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        alert("Form submitted successfully!");
      } else {
        console.error("Error submitting form");
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });
function sendWhatsAppMessage(phone, name) {
  const encodedMessage = encodeURIComponent(
    `Hello ${name},\nI would like to discuss opportunities regarding your subject expertise. Please let me know your availability.`
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank"); // Opens WhatsApp in a new tab
}
const handleResponse = async (id) => {
  const respondedUser = JSON.parse(localStorage.getItem("user")).name; // Get the user's name from localStorage
  try {
    const response = await fetch(
      `http://localhost:3001/api/teacher/response/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ respondedUser }), // Send respondedUser in the payload
      }
    );

    if (response.ok) {
      swal("Success!", "Response submitted successfully!", "success");
    } else {
      swal("Error!", "Failed to submit response.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    swal("Error!", "An error occurred while submitting the response.", "error");
  }
};
document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const location = document.getElementById("location").value;

    // Clear previous results
    const teacherCards = document.getElementById("teacherCards");
    teacherCards.innerHTML = "";

    if (!location) {
      alert("Please enter a location.");
      return;
    }

    try {
      // Fetch matching teachers from API
      const response = await fetch(
        `http://localhost:3001/api/teacher/location?location=${location}`
      );

      if (response.ok) {
        const teachers = await response.json();

        if (teachers.length > 0) {
          // Display each teacher in a card
          teachers.forEach((teacher) => {
            const teacherCard = `
              <div class="bg-white text-black p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                <h3 class="text-lg font-bold text-gray-800">${teacher.name}</h3>
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
                <button class="responseTutor bg-blue-500 text-white px-2 py-1 my-1 rounded" data-id="${
                  teacher._id
                }" data-email="${teacher.email}">Response</button>
                
                <button
                            class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                            onclick="sendWhatsAppMessage('${teacher.phone}', '${
              teacher.name || "Teacher"
            }')">
                            Message on WhatsApp
                          </button>
              </div>
            `;
            teacherCards.insertAdjacentHTML("beforeend", teacherCard);
          });

          // Event delegation: Add a single click event listener to the parent container
          teacherCards.addEventListener("click", function (event) {
            // Check if the clicked element is a "Response" button
            if (event.target.classList.contains("responseTutor")) {
              const teacherId = event.target.getAttribute("data-id");
              const teacherEmail = event.target.getAttribute("data-email");
              const userEmail = localStorage.getItem("user").email;
              handleResponse(teacherId, teacherEmail, userEmail);
              //service_a8lzrfd
              emailjs.init("service_a8lzrfd");
              emailjs
                .send("service_a8lzrfd", "template_wrp0405", {
                  from_name: localStorage.getItem("user").name,
                  from_email: userEmail,
                  to_email: teacherEmail,
                  message: document.getElementById("message").value,
                })
                .then(
                  function (response) {
                    alert("Email sent successfully!");
                  },
                  function (error) {
                    alert("Failed to send email: " + error);
                  }
                );
            }
          });
        } else {
          // If no teachers found, display a message
          teacherCards.innerHTML = `<p class="text-red-500 text-center">No teachers found for this location.</p>`;
        }
      } else {
        console.error("Error fetching teachers:", response.status);
        alert("Error fetching teachers.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });
//logout
document.getElementById("logout").addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", async function () {
  const studentCards = document.getElementById("studentCards");

  async function fetchStudentRequests() {
    try {
      const response = await fetch("http://localhost:3001/api/student");

      if (response.ok) {
        const students = await response.json();
        console.log("Students:", students);

        if (students.length > 0) {
          const userEmail = user.email;
          const filteredStudents = students.filter(
            (student) => student.email === userEmail
          );
          if (filteredStudents.length > 0) {
            filteredStudents.forEach((student) => {
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
                                  <button class="deleteStudent bg-red-500 text-white px-2 py-1 my-1 rounded" data-id="${
                                    student._id
                                  }">Delete</button>
                              </div>
                          `;
              studentCards.insertAdjacentHTML("beforeend", studentCard);
            });
          } else {
            studentCards.innerHTML = `<p class="text-red-500 text-center">You have no request</p>`;
          }
        } else {
          studentCards.innerHTML = `<p class="text-red-500 text-center">You have no request</p>`;
        }
      } else {
        alert("Error fetching student requests.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching student requests.");
    }
  }

  // Event delegation for delete button
  studentCards.addEventListener("click", async function (event) {
    if (event.target.classList.contains("deleteStudent")) {
      const studentId = event.target.getAttribute("data-id");
      try {
        const response = await fetch(
          `http://localhost:3001/api/student/${studentId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Student request deleted successfully.");
          fetchStudentRequests(); // Refresh the list after deletion
        } else {
          alert("Error deleting student request.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the student request.");
      }
    }
  });

  fetchStudentRequests();
});

document.addEventListener("DOMContentLoaded", () => {
  // Get the user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Populate the form fields with user data
  if (user) {
    document.getElementById("profile-name").value = user.name || "";
    document.getElementById("profile-email").value = user.email || "";
    document.getElementById("profile-phone").value = user.phone || "";
    document.getElementById("profile-goals").value = user.goals || "";
  }

  // Form submission handler
  const profileForm = document.getElementById("profile-form");
  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect updated data from the form
    const updatedUser = {
      name: document.getElementById("profile-name").value.trim(),
      email: document.getElementById("profile-email").value.trim(),
      phone: document.getElementById("profile-phone").value.trim(),
      goals: document.getElementById("profile-goals").value.trim(),
    };

    // Make a PUT request to update the user data
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Profile updated successfully:", result);

      // Update the user data in localStorage
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  });
});
