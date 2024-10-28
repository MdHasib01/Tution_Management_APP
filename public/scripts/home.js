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
                                            <h3 class="text-lg font-bold text-gray-800">${teacher.name}</h3>
                                            <p class="text-sm text-gray-600">Subjects: ${teacher.subjects}</p>
                                            <p class="text-sm text-gray-600">Location: ${teacher.location}</p>
                                            <p class="text-sm text-gray-600">Availability: ${teacher.availability}</p>
                                            <p class="text-sm text-gray-600">Experience: ${teacher.experience} years</p>
                                            <p class="text-sm text-gray-600">Contact: ${teacher.contact}</p>
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
                                          teacher.subjects
                                        }</p>
                                        <p class="text-sm text-gray-600">Availability: ${
                                          teacher.availability
                                        }</p>
                                        <p class="text-sm text-gray-600">Learning Goals: ${
                                          teacher.learningGoals
                                        }</p>
                                        <p class="text-sm text-gray-600">Budget: ${
                                          teacher.budget || "N/A"
                                        }</p>
                                        <p class="text-sm text-gray-600">Teaching Style: ${
                                          teacher.teachingStyle
                                        }</p>
                                        <p class="text-sm text-gray-600">Notes: ${
                                          teacher.notes || "No additional notes"
                                        }</p>
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
