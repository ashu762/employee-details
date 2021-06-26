import { validateName } from "./validator.js";
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const other = document.querySelector("#other");
const spouse = document.querySelector("#spouse");
const submitButton = document.querySelector(".btn-submit");
const checkBox = document.querySelector("#checked");
const firstNameIcon = document.querySelector(".icon--firstName");
const lastNameIcon = document.querySelector(".icon--lastName");
const spouseIcon = document.querySelector(".icon--spouse");
const errorContainer = document.querySelector(".errors");
const checkBoxIcon = document.querySelector(".icon--checkbox");
const resetButton = document.querySelector(".reset");
let isAutoFocused = false;
const errors = [];
let isMarried = true;
document.querySelector("#unmarried").addEventListener("click", (event) => {
  spouse.value = "";
  spouse.disabled = true;
  isMarried = false;
});

document.querySelector("#married").addEventListener("click", (event) => {
  spouse.disabled = false;
  isMarried = true;
});

function validatorFirstName() {
  const { error, message } = validateName(firstName.value.trim(), "First Name");
  if (error) {
    errors.push(message);
    if (!isAutoFocused) {
      isAutoFocused = true;
      firstName.focus();
    }
    firstNameIcon.classList.remove("icon--firstName");
  } else {
    firstNameIcon.classList.add("icon--firstName");
  }
}

function validatorLastName() {
  const { error, message } = validateName(lastName.value.trim(), "Last Name");
  if (error) {
    errors.push(message);
    if (!isAutoFocused) {
      isAutoFocused = true;
      lastName.focus();
    }
    lastNameIcon.classList.remove("icon--lastName");
  } else {
    lastNameIcon.classList.add("icon--lastName");
  }
}
function validatorSpouseName() {
  const { error, message } = validateName(spouse.value.trim(), "Spouse Name");
  if (error) {
    errors.push(message);
    if (!isAutoFocused) {
      isAutoFocused = true;
      spouse.focus();
    }
    spouseIcon.classList.remove("icon--spouse");
  } else {
    spouseIcon.classList.add("icon--spouse");
  }
}
function validateTermsAndConditions() {
  if (!checkBox.checked) {
    errors.push("Please check the Terms and Conditions");
    checkBoxIcon.classList.remove("icon--checkbox");
  } else checkBoxIcon.classList.add("icon--checkbox");
}

submitButton.addEventListener("click", (event) => {
  isAutoFocused = false;
  event.preventDefault();
  errorContainer.innerHTML = "";
  errors.length = 0;

  validatorFirstName();
  validatorLastName();

  if (isMarried) validatorSpouseName();
  if (!isMarried) {
    spouseIcon.classList.add("icon--spouse");
  }
  validateTermsAndConditions();
  if (errors.length > 0) {
    for (let error of errors) {
      const div = document.createElement("div");
      div.innerText = error;
      div.classList.add("error--title");
      errorContainer.append(div);
    }
    return;
  }
  alert("Thank You");
});

resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  errorContainer.innerHTML = "";
  firstName.focus();
  isAutoFocused = false;
  firstNameIcon.classList.add("icon--firstName");
  lastNameIcon.classList.add("icon--lastName");
  spouseIcon.classList.add("icon--spouse");
  checkBoxIcon.classList.add("icon--checkbox");
});

const modal = document.querySelector("#my-modal");
const modalBtn = document.querySelector("#modal-btn");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
