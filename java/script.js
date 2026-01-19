function login() {
  let role = document.getElementById("role").value;

  if (role === "student") {
    window.location.href = "student.html";
  } else if (role === "driver") {
    window.location.href = "driver.html";
  } else {
    window.location.href = "admin.html";
  }
}
