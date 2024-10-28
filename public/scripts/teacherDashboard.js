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
                  <button class="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Respond</button>
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
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
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
        alert("Tuition request submitted successfully!");
      } else {
        alert("Error submitting request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for more details.");
    }
  });
});
