document.querySelector("form").addEventListener("submit", (e) => {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.style.display = "none";
    error.style.color = "red";
    console.error(error)
  });

document.querySelector('.Home').addEventListener('click',()=>{
window.location.href="../index.html"

})

  if (!isValidForm()) {
e.preventDefault()
  }
});

function isValidForm(e) {
  
  let isValid = true;

  const name = document.querySelector("#formName").value;
  const nameError = document.querySelector("#name-error");
  if (name.trim() === "") {
    nameError.textContent = "Name is required.";
    nameError.style.display = "block";
    isValid = false;
  }

  const email = document.querySelector("#formEmail").value;
  const emailError = document.querySelector("#email-error");
  if (email.trim() === "" || !isValidEmail(email)) {
    emailError.textContent = "Invalid email address.";
    emailError.style.display = "block";
    isValid = false;
  }

  const subject = document.querySelector("#subject").value;
  const subjectError = document.querySelector("#subject-error");
  if (subject.trim() === "") {
    subjectError.textContent = "Subject is required.";
    subjectError.style.display = "block";
    isValid = false;
  }

  const msg = document.querySelector("#formMessage").value;
  const msgError = document.querySelector("#message-error");
  if (msg.trim() === "") {
    msgError.textContent = "Message is required.";
    msgError.style.display = "block";
    isValid = false;
  }
  return isValid;
}

function isValidEmail(email) {
  const pattern = /^[\w\-.]+@[a-zA-Z-]{1,6}\.[a-zA-Z-]{2,}$/;
  // this allows only 5 chars after @ and doesn't allow numbers
  return pattern.test(email);
}


