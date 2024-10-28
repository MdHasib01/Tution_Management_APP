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
      alert("Login successful");
      login_btn.innerText = "Login";
      if (data.user.role === "admin") {
        window.location.href = "admin_dashboard.html";
      } else if (data.user.role === "teacher") {
        window.location.href = "teacher_dashboard.html";
      } else {
        window.location.href = "student_dashboard.html";
      }
    })
    .catch((err) => {
      console.log(err);
      login_btn.innerText = "Login";
      alert("Login failed");
    });
};

document.querySelector(".register form").onsubmit = async (e) => {
  e.preventDefault();
  const signup_btn = document.getElementById("signupBtn");
  signup_btn.innerText = "Loading...";
  const signup_username = document.getElementById("signup_username").value;
  const email = document.getElementById("email").value;
  const signup_password = document.getElementById("signup_password").value;
  const role = document.getElementById("role").value;

  const success_msg = document.getElementById("signup_success");
  const error_msg = document.getElementById("signup_error");

  success_msg.innerHTML = "";
  error_msg.innerHTML = "";

  console.log(
    JSON.stringify({
      name: signup_username,
      email: email,
      password: signup_password,
      role: role,
    })
  );
  const response = await fetch(`${serverUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: signup_username,
      email: email,
      password: signup_password,
      role: role,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      success_msg.innerHTML = `<p>Account Created Successfully!</p>`;
      signup_btn.innerText = "Sign Up";
      wrapper.classList.remove("active");
      success_msg.innerHTML = ``;
    })
    .catch((err) => {
      console.log(`Account creation unseccessfull!!\nError: ${err.message}`);
      error_msg.innerHTML = `<p>Account creation unsuccessful!</p>`;
      signup_btn.innerText = "Sign Up";
    });
};
