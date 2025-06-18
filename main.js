const avatarDropzone = document.getElementById("avatarDropzone");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.querySelector("#avatarDropzone img");
const avatarIcon = document.querySelector(".avatar-upload__icon");

function logError(message, ...args) {
  console.log(`[ERROR] [${new Date().toISOString}: ${message}]`, ...args);
}

avatarDropzone.addEventListener("drop", (e) => {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.dataTransfer.files[0];

  if (file.type.startsWith("image/")) {
    reader.onloadend = () => {
      avatarPreview.src = reader.result;
    }
    reader.onerror = () => {
      logError("Error rendering image", reader.error);
    }

    reader.readAsDataURL(file);
  } else {
    logError("The file must be of image type");
  }
});
