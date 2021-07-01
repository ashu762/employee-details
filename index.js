import { validateName, createPost,isFilteredEvent } from "./utils.js";

// Dom Element Selections
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
const deleteButton=document.querySelector(".btn-delete");
const male = document.querySelector("#male");
const married=document.querySelector("#married");
const female=document.querySelector("#female");
const unmarried=document.querySelector("#unmarried");
const loading = document.querySelector(".loading");
const loadingModal = document.querySelector(".loading-modal");
const previousPosts = document.querySelector(".previous-posts");
const viewEmployeeModal=document.querySelector(".viewEmployeeModal");
const employeeModal=document.querySelector(".employeeModal");
const drawerCloseButton=document.querySelector(".closebtn");
const drawer=document.querySelector("#mySidenav");
const drawerButton=document.querySelector(".side-drawer-icon")
const threeDotsMenu=document.querySelector(".three-dots");
let previousEmployeeData;
const url = "https://employeeapi2626.herokuapp.com/api/employees";
const filterButton=document.querySelector("#filter-btn")
const previousFormBtn=document.querySelector("#previousFormBtn");
const dropDownElementSelector=document.querySelector("#selector");


const formContainer=document.querySelector(".container");

const filterInput=document.querySelector(".filter-input");
let isAutoFocused = false;
const errors = [];
let isMarried = true;

let isEditableForm=false;
let employeeId="";


// Validators

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

// Loading
function setLoading() {
  loadingModal.style.display = "block";
  loading.style.visibility = "block";
}

function removeLoading() {
  loadingModal.style.display = "none";
  loading.style.visibility = "none";
}

// Form Submission
async function submitForm() {



  setLoading();
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    spouse: spouse.value,
    martial_status: isMarried ? "married" : "unmarried",
    gender: male.checked ? "male" : "female",
    comments: other.value,
  };
  const queryString=isEditableForm?employeeId:"";
  const url = `https://employeeapi2626.herokuapp.com/api/employees/${queryString}`;
  const method=isEditableForm?"PUT":"POST";
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    removeLoading();
    alert("Thank you.Your response has been Saved");
    resetData();
  } catch (error) {
    console.log(error);
    removeLoading();
    isEditableForm=false;
    employeeId="";
    alert("Please try Again!");
  }
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
  submitForm();
});

function resetData() {
  errorContainer.innerHTML = "";
  firstName.focus();
  isAutoFocused = false;
  firstNameIcon.classList.add("icon--firstName");
  lastNameIcon.classList.add("icon--lastName");
  spouseIcon.classList.add("icon--spouse");
  checkBoxIcon.classList.add("icon--checkbox");
  setValues({})
  recoverConfiguration();
  previousPosts.innerText=""
  isEditableForm=false;
  filterInput.value="";
  employeeId=""
}

resetButton.addEventListener("click", resetData);

async function fetchPreviousForms(input,type) {
  setLoading();
  try {
    let response = await fetch(url);
    response = await response.json();
    const posts = [];
    previousPosts.innerHTML = "";
    let numberOfPosts=0;
    for (let post of response) {
      if(!type)
      {
        numberOfPosts++;
        previousPosts.appendChild(createPost(post));
      }
      
      if(type&&isFilteredEvent(input,type,post))
      {
        previousPosts.appendChild(createPost(post));
        numberOfPosts++;
      }
      
    }

    if(type&&numberOfPosts===0)
    {
        alert("No filter Found for the specified data")
    }
    removeLoading();
  } catch (error) {
    removeLoading();
    console.log(error);
  }
}



// Modal
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


window.addEventListener("click",async(e)=>{

  if(e.target.innerText==="Edit Details")
  {
      setLoading();
      drawer.style.width="0px";
      resetData();
      isEditableForm=true;
      employeeId=e.target.id;
      let employee=await fetch(`${url}/${e.target.id}`);
      checkBox.checked=true;
      employee=await employee.json();
      setValues(employee[0]);
      changeConfiguration();

      removeLoading();
  }
  
  
})




previousFormBtn.addEventListener("click",(e)=>{
  fetchPreviousForms();
})


//filter handling

filterButton.addEventListener("click",(e)=>{
  e.preventDefault();
  const type=dropDownElementSelector.value;
  const filteredInput=filterInput.value;
  fetchPreviousForms(filteredInput,type);


})


function setValues(employee)
{
  
  firstName.value=employee.firstName || "";
  lastName.value=employee.lastName|| "";
  spouse.value=employee.spouse||"";
  toggle(male,female);
  toggle(married,unmarried);
  if(employee.gender==='female')
    toggle(female,male);
  if(employee.martial_status==="unmarried")
    {
      toggle(unmarried,married);
      spouse.disabled=true;
      isMarried=false;
    }
  if(employee.martial_status==="married")
  spouse.disabled=false;
  
  other.value=employee.comments||"";
}

function toggle(val1,val2)
{
  val1.checked=true;
  val2.checked=false;
}

function changeConfiguration()
{
  submitButton.innerText="UPDATE";
  resetButton.innerText="CANCEL";
  deleteButton.style.display="block"
}
function recoverConfiguration()
{
    deleteButton.style.display="none";
    resetButton.innerText="RESET";
    submitButton.innerText="SUBMIT";
}


deleteButton.addEventListener("click",async(e)=>{

    setLoading();
    try{
      let data=await fetch(`${url}/${employeeId}`,{
        method:"DELETE"
      })
      data=await data.json();
      console.log(data);
      previousPosts.innerText="";
      setValues({});
      alert("Employee Details Deletion Successful")
      removeLoading();
      recoverConfiguration();
      isEditableForm=false;
      employeeId="";
      filterInput.value="";



    }
    catch(e)
    {
      console.log(e);
      alert("Some Error Occured");
      removeLoading();
    }
})




drawerButton.addEventListener("click",(e)=>{
  
  drawer.style.width="27rem";

 if(window.innerWidth<1400)
 drawer.style.width="100%"
})

drawerCloseButton.addEventListener("click",(e)=>{
 
  drawer.style.width="0px";
})


// window.addEventListener("click",(e)=>{
//   if(e.target.id)
//   {
    
//   }
// })

