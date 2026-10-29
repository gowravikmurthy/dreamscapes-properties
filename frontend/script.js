document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const signinForm = document.getElementById("signinForm");

  // Signup form validation
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value.trim();

      if (!name || !email || !password) {
        alert("Please fill all fields.");
        e.preventDefault(); // prevent form from submitting if fields are empty
      }
    });
  }

  // Signin form validation
  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      const email = signinForm.email.value.trim();
      const password = signinForm.password.value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        e.preventDefault(); // prevent form from submitting if fields are empty
      }
    });
  }
});
