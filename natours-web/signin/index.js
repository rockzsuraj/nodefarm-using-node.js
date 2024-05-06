document
  .getElementById("signInForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate form fields (you can add more validation if needed)
    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in all fields", "red");
      return;
    }

    // Simulate sign-in logic (replace with actual sign-in logic)
    // For demonstration, just show success message

    // Fetch post request
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resJson = await res.json();

    if (res.ok) {
      const jwt = getCookie("jwt");
      console.log("JWT:", jwt);
      setMessage("Sign-in successful", "green");
    } else {
      setMessage(resJson.message, "red");
    }
  });

function setMessage(message, color) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.color = color;
}

// Function to get cookie value by name
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
