const form = document.querySelector("#form");
const formContainer = document.querySelector(".form-container");
const username = document.querySelector("#full-name");
const email = document.querySelector("#email");
const github = document.querySelector("#github");
const avatarDropzone = document.querySelector("#avatarDropzone");
/** @type {HTMLInputElement | null} */
const avatarInput = document.querySelector("#avatarInput");
const avatarIcon = document.querySelector("#avatarIcon");
const avatarActions = document.querySelector(".avatar-upload__actions");
const avatarInfo = document.querySelector(".avatar-upload__placeholder");
const ticketContainer = document.querySelector(".ticket-container");
const congratsUsername = document.querySelector(".congratulations__username");
const ticketUsername = document.querySelector(".ticket__username");
const ticketGithub = document.querySelector(".ticket__username-github");
const ticketAvatar = document.querySelector(".ticket__avatar");
let userAvatarData = null;

function logError(message, ...args) {
  console.log(`[ERROR] [${new Date().toISOString}: ${message}]`, ...args);
}

function handleFileSelect(file) {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onloadend = () => {
      userAvatarData = reader.result;
      updateUiToImageState(userAvatarData);
    };

    reader.onerror = () => {
      logError("Error rendering image", reader.error);
    };

    reader.readAsDataURL(file);
  } else {
    logError("The file must be of image type");
  }
}

function updateUiToImageState(imageData) {
  avatarIcon.src = imageData;

  avatarInfo.classList.add("hidden");
  avatarInput.style.display = "none";
  setupActionButtons();
}

function resetUiToInitialState() {
  avatarIcon.src = "./assets/images/icon-upload.svg";
  avatarInfo.classList.remove("hidden");

  avatarActions.innerHTML = "";

  avatarInput.style.display = "initial";
}

function setupActionButtons() {
  avatarActions.innerHTML = "";

  const changeButton = document.createElement("button");
  const removeButton = document.createElement("button");

  changeButton.textContent = "Change image";
  removeButton.textContent = "Remove button";
  changeButton.classList.add(
    "avatar-upload__button",
    "avatar-upload__button--change"
  );
  removeButton.classList.add(
    "avatar-upload__button",
    "avatar-upload__button--remove"
  );

  changeButton.addEventListener("click", () => avatarInput.click());
  removeButton.addEventListener("click", () => resetUiToInitialState());

  avatarActions.appendChild(changeButton);
  avatarActions.appendChild(removeButton);
}

avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  handleFileSelect(file);
});

avatarDropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  handleFileSelect(file);
});

avatarDropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

function userTicketInfo() {
  const user = username.value;
  const usernameGithub = github.value;

  congratsUsername.innerHTML = user;
  ticketAvatar.src = ""
  ticketUsername.innerHTML = user;
  ticketGithub.innerHTML = usernameGithub;

  if (userAvatarData) {
    ticketAvatar.src = userAvatarData;
  } else {
    ticketAvatar.src = "./assets/images/image-avatar.jpg";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = email.value;

  if (emailValue === "" || !emailValue.includes("@")) {
    alert("Please, submit a valid email!");
    return;
  }

  formContainer.style.display = "none";
  ticketContainer.style.display = "flex";

  userTicketInfo();
});
