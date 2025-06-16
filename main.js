const avatarDropzone = document.getElementById("avatarDropzone");
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.querySelector("#avatarDropzone img");
const avatarIcon = document.querySelector(".avatar-upload__icon");

avatarDropzone.addEventListener("drop", (e) => {
  e.preventDefault();

  console.log("processo em andamento");

  const reader = new FileReader();
  const file = e.dataTransfer.files[0];
  console.log("file:", file, "name:", file.name);
  console.log("type:", file.type, "size:", file.size);

  if (file.type.startsWith("image/")) {
    reader.onloadend = () => {
      avatarPreview.src = reader.result;
      console.log("resultado", reader.result);
    }
    reader.onerror = () => {
      console.log("Deu erro pai")
    }

    reader.readAsDataURL(file);
    console.log("executando...")
  } else {
    console.error("Deve ser do tipo imagem");
  }
});
