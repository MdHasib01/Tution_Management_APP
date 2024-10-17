const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

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

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: username, password: password }),
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token); // Store token for session
    alert("Login successful");
    login_btn.innerText = "Login";
    // Redirect to dashboard or another page
  } else {
    alert(data.message);
    login_btn.innerText = "Login";
  }
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

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: signup_username,
      email,
      password: signup_password,
      role,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      success_msg.innerHTML = `<p>Account Create Successfully!</p>`;
      signup_btn.innerText = "Sign Up";
    })
    .catch((err) => {
      console.log(`Account creation unseccessfull!!\nError: ${err.message}`);
      error_msg.innerHTML = `<p>Account creation unsuccessful!</p>`;
      signup_btn.innerText = "Sign Up";
    });
};
