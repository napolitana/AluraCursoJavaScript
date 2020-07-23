var botaoImportaPacientes = document.querySelector("#importa-pacientes");

botaoImportaPacientes.addEventListener("click", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

  xhr.addEventListener("load", () => {
    var erroAjax = document.querySelector("#erro-ajax");

    if (xhr.status == 200) {
      erroAjax.classList.add("invisivel");

      var pacientes = JSON.parse(xhr.responseText);
      pacientes.forEach((paciente) => {
        adicionaPaciente(paciente);
      });
    } else {
      erroAjax.classList.remove("invisivel");
    }
  });
  xhr.send();
});
