export function validateName(name, type) {
  if (!name || name.length === 0) {
    return { error: true, message: `Please enter your ${type}` };
  }
  if (name.includes(" ")) {
    return { error: true, message: `${type} should not contain spaces` };
  }

  return { error: false, message: "No error" };
}

export function createPost(post) {
  const ele = document.createElement("div");
  ele.classList.add("post");

  // const threeDotsMenu=document.createElement("div");
  // threeDotsMenu.classList.add("three-dots");
  // threeDotsMenu.id=post._id;
  // threeDotsMenu.innerHTML=`<i class="fa fa-ellipsis-v fa-lg" aria-hidden="true" id=${post._id}>`;
  // ele.appendChild(threeDotsMenu)
  const avatartext = (post["firstName"][0] + post["lastName"][0]).toUpperCase();
  const avatardiv = document.createElement("span");
  avatardiv.innerText = avatartext;
  avatardiv.classList.add("avatar");
  ele.appendChild(avatardiv);
  const firstNameElement = document.createElement("div");
  firstNameElement.innerHTML = `<strong>FirstName</strong> : ${post["firstName"]}`;
  ele.appendChild(firstNameElement);
  const lastNameElement = document.createElement("div");
  lastNameElement.innerHTML = `<strong>LastName</strong> : ${post["lastName"]}`;
  ele.appendChild(lastNameElement);

  const genderElement = document.createElement("div");
  genderElement.innerHTML = `<strong>Gender</strong> : ${post[
    "gender"
  ].toUpperCase()}`;
  ele.appendChild(genderElement);
  const martialStatusElement = document.createElement("div");
  martialStatusElement.innerHTML = `<strong>Martial Status</strong> : ${post[
    "martial_status"
  ].toUpperCase()}`;
  ele.appendChild(martialStatusElement);
  if (post["spouse"]&&post["spouse"].length > 0) {
    const spouseElement = document.createElement("div");
    spouseElement.innerHTML = `<strong>Spouse</strong> : ${post["spouse"]}`;
    ele.appendChild(spouseElement);
  }
  if (post["commnets"]&&post["comments"].length > 0) {
    const commentsElement = document.createElement("div");
    commentsElement.innerHTML = `<strong>Comments</strong> : ${post["comments"]}`;
    ele.appendChild(commentsElement);
  }
  const viewDetails=document.createElement("div");
  viewDetails.innerText="Edit Details";
  viewDetails.classList.add("btn");
  viewDetails.id=post._id;
  ele.appendChild(viewDetails);

  const modal=document.createElement("div");
  modal.classList.add("viewEmployeeModal");
  const modal_content=document.createElement("div");
  modal_content.classList.add("employeeModal");
  modal.appendChild(modal_content);
  ele.appendChild(modal);
  return ele;
}



export function isFilteredEvent(input,type,post)
{
  
  if(post[type]&&post[type].toLowerCase()===input.toLowerCase())
  return true;
  return false;
}