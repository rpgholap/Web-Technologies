document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".password-toggle");

  if (toggleIcon && passwordInput) {
    toggleIcon.addEventListener("click", function () {
      // Toggle the type attribute between 'password' and 'text'
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle the eye icon (fa-eye / fa-eye-slash)
      this.classList.toggle("fa-eye-slash");
    });
  }
});
