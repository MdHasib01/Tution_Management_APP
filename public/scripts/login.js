const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

//Server url
const serverUrl = "http://localhost:3001/api";

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

document.querySelector(".login form").onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const login_btn = document.getElementById("loginBtn");
  login_btn.innerText = "Loading...";

  const response = await fetch(`${serverUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log(data.user);
      swal("Success", "Login successful", "success");
      login_btn.innerText = "Login";
      if (data.user.role === "admin") {
        window.location.href = "admin_dashboard.html";
      } else if (data.user.role === "tutor") {
        window.location.href = "teacher_dashboard.html";
      } else {
        window.location.href = "student_dashboard.html";
      }
    })
    .catch((err) => {
      console.log(err);
      login_btn.innerText = "Login";
      swal("Error", "Login failed", "error");
    });
};

document.querySelector(".register form").onsubmit = async (e) => {
  e.preventDefault();
  const signup_btn = document.getElementById("signupBtn");
  signup_btn.innerText = "Loading...";
  const signup_fullname = document.getElementById("signup_fullname").value;
  const signup_username = document.getElementById("signup_username").value;
  const signup_phone = document.getElementById("signup_phone").value;
  const email = document.getElementById("email").value;
  const signup_password = document.getElementById("signup_password").value;
  const role = document.getElementById("role").value;

  const success_msg = document.getElementById("signup_success");
  const error_msg = document.getElementById("signup_error");

  success_msg.innerHTML = "";
  error_msg.innerHTML = "";

  try {
    const response = await fetch(`${serverUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: signup_fullname,
        name: signup_username,
        email: email,
        phone: signup_phone,
        password: signup_password,
        role: role,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    swal("Success", "Account Created Successfully!", "success");
    signup_btn.innerText = "Sign Up";
    wrapper.classList.remove("active");
    success_msg.innerHTML = ``;
  } catch (error) {
    console.log(`Account creation unsuccessful!!\nError: ${error.message}`);
    error_msg.innerHTML = `<p>Account creation unsuccessful!</p>`;
    signup_btn.innerText = "Sign Up";
    swal("Error", "Account creation unsuccessful!", "error");
  }
};
