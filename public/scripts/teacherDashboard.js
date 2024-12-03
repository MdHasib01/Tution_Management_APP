const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("teacherName").innerHTML = `Welcome ${user.fullName}`;
document.getElementById("name").value = user.fullName;
document.getElementById("phone").value = user.phone;
document.getElementById("email").value = user.email;
function sendWhatsAppMessage(phone, name) {
  const encodedMessage = encodeURIComponent(
    `Hello ${name},\nI would like to discuss opportunities regarding your subject expertise. Please let me know your availability.`
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank"); // Opens WhatsApp in a new tab
}
if (!user.paid) {
  document.getElementById("unpaid").classList.remove("hidden");
} else {
  document.getElementById("unpaid").classList.add("hidden");
  document.getElementById("teacherSubmitReq").disabled = false; // Enable button if paid
}
async function fetchTutorRequests() {
  const requestsList = document.getElementById("tutor-requests-list");
  const loadingMessage = document.getElementById("loading-message");

  try {
    const response = await fetch("http://localhost:3001/api/student");

    if (response.ok) {
      const requests = await response.json();

      // Clear the loading message
      loadingMessage.style.display = "none";

      // Check if any requests are found
      if (requests.length > 0) {
        requestsList.innerHTML = ""; // Clear any previous content

        // Loop through each request and create a card
        requests.forEach((request) => {
          const requestCard = `
                <div class="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
                  <h3 class="text-xl font-bold text-gray-700">${
                    request.name
                  }</h3>
                  <p><strong>Subject:</strong> ${request.subjects}</p>
                  <p><strong>Location:</strong> ${request.location}</p>
                  <p><strong>Availability:</strong> ${request.availability}</p>
                  <p><strong>Learning Goals:</strong> ${
                    request.learningGoals
                  }</p>
                  <p><strong>Budget:</strong> ${request.budget || "N/A"}</p>
                  <p><strong>Preferred Teaching Style:</strong> ${
                    request.teachingStyle
                  }</p>
                  <p><strong>Additional Notes:</strong> ${
                    request.notes || "No additional notes"
                  }</p>
                 ${
                   user.paid
                     ? `
                 <button
                            class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                            onclick="sendWhatsAppMessage('${request.phone}', '${
                         request.name || "Teacher"
                       }')">
                            Message on WhatsApp
                          </button>`
                     : ""
                 }
                </div>
              `;
          requestsList.insertAdjacentHTML("beforeend", requestCard);
        });
      } else {
        requestsList.innerHTML =
          '<p class="text-red-500">No tutor requests found.</p>';
      }
    } else {
      requestsList.innerHTML =
        '<p class="text-red-500">Failed to fetch tutor requests.</p>';
    }
  } catch (error) {
    console.error("Error fetching tutor requests:", error);
    requestsList.innerHTML =
      '<p class="text-red-500">An error occurred while fetching requests.</p>';
  }
}

// Fetch tutor requests when the page loads
document.addEventListener("DOMContentLoaded", fetchTutorRequests);

document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.getElementById("profile-form");

  // Add an event listener for the form submission
  form.addEventListener("submit", async function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Collect form data
    const name = user.fullName;
    const phone = user.phone;
    const email = user.email;
    const subjectExpertise = document.getElementById("subjectExpertise").value;
    const preferredLocation = document.getElementById("preferedLocation").value;
    const experience = document.getElementById("experience").value;
    const rate = document.getElementById("rate").value;
    const teachingStyle = document.getElementById("teachingStyle").value;
    const notes = document.getElementById("notes").value;
    const address = document.getElementById("address").value;

    // Get the available days as a list of checked values
    const daysCheckboxes = document.querySelectorAll(
      'input[name="availabilDays"]:checked'
    );
    const availabilDays = Array.from(daysCheckboxes).map(
      (checkbox) => checkbox.value
    );

    // Create the payload object
    const payload = {
      name: name,
      phone: phone,
      email: email,
      subjectExpertise: subjectExpertise,
      availabilDays: availabilDays,
      preferedLocation: preferredLocation,
      experience: experience,
      rate: rate,
      teachingStyle: teachingStyle,
      notes: notes,
      address: address,
    };

    console.log("Payload:", payload); // Optional: Log the payload for debugging

    try {
      // Send the POST request to the server (replace 'your-api-endpoint' with the correct API endpoint)
      const response = await fetch("http://localhost:3001/api/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Convert the payload to a JSON string
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        swal("Success", "Tuition request submitted successfully!", "success");
      } else {
        swal("Error", "Error submitting request. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      swal(
        "Error",
        "An error occurred. Please check the console for more details.",
        "error"
      );
    }
  });
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
      const response = await fetch("http://localhost:3001/api/teacher");

      if (response.ok) {
        const students = await response.json();
        console.log("Students:", students);

        if (students.length > 0) {
          const userEmail = user.email;
          const filteredStudents = students.filter(
            (student) => student.email === userEmail
          );
          if (filteredStudents.length > 0) {
            filteredStudents.forEach((teacher) => {
              const studentCard = `
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
                                        <button class="deleteTeacher bg-red-500 text-white px-2 py-1 my-1 rounded" data-id="${
                                          teacher._id
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
        swal("Error", "Error fetching student requests.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      swal(
        "Error",
        "An error occurred while fetching student requests.",
        "error"
      );
    }
  }

  // Event delegation for delete button
  studentCards.addEventListener("click", async function (event) {
    if (event.target.classList.contains("deleteTeacher")) {
      const teacherId = event.target.getAttribute("data-id");
      try {
        const response = await fetch(
          `http://localhost:3001/api/teacher/${teacherId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          swal("Success", "Teacher request deleted successfully.", "success");
          fetchStudentRequests(); // Refresh the list after deletion
        } else {
          swal("Error", "Error deleting teacher request.", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        swal(
          "Error",
          "An error occurred while deleting the teacher request.",
          "error"
        );
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

      swal("Success", "Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      swal("Error", "Failed to update profile. Please try again.", "error");
    }
  });
});
