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
  const avatartext = (post["firstName"][0] + post["lastName"][0]).toUpperCase();
  const avatardiv = document.createElement("div");
  avatardiv.innerText = avatartext;
  avatardiv.classList.add("avatar");
  ele.appendChild(avatardiv);
  const firstNameElement = document.createElement("div");
  firstNameElement.innerText = `FirstName : ${post["firstName"]}`;
  ele.appendChild(firstNameElement);
  const lastNameElement = document.createElement("div");
  lastNameElement.innerText = `LastName : ${post["lastName"]}`;
  ele.appendChild(lastNameElement);

  const genderElement = document.createElement("div");
  genderElement.innerText = `Gender : ${post["gender"].toUpperCase()}`;
  ele.appendChild(genderElement);
  const martialStatusElement = document.createElement("div");
  martialStatusElement.innerText = `Martial Status : ${post[
    "martial_status"
  ].toUpperCase()}`;
  ele.appendChild(martialStatusElement);
  if (post["spouse"].length > 0) {
    const spouseElement = document.createElement("div");
    spouseElement.innerText = `Spouse : ${post["spouse"]}`;
    ele.appendChild(spouseElement);
  }
  if (post["comments"].length > 0) {
    const commentsElement = document.createElement("div");
    commentsElement.innerText = `Comments : ${post["comments"]}`;
    ele.appendChild(commentsElement);
  }
  return ele;
}
