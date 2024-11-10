
class Animal {
  constructor(nombre, edad, comentarios, sonido, imagen) {
    this.nombre = nombre;
    this.edad = edad;
    this.comentarios = comentarios;
    this.sonido = `assets/sounds/${sonido}`;
    this.imagen = `assets/imgs/${imagen}`;
  }

  reproducirSonido() {
    const audio = new Audio(this.sonido);
    audio.load();
    audio.play();
  }
}


class Leon extends Animal {
  constructor(edad, comentarios) {
    super("León", edad, comentarios, "Rugido.mp3", "Leon.png");
  }
}

class Lobo extends Animal {
  constructor(edad, comentarios) {
    super("Lobo", edad, comentarios, "Aullido.mp3", "Lobo.jpg");
  }
}

class Oso extends Animal {
  constructor(edad, comentarios) {
    super("Oso", edad, comentarios, "Grunido.mp3", "Oso.jpg");
  }
}

class Serpiente extends Animal {
  constructor(edad, comentarios) {
    super("Serpiente", edad, comentarios, "Siseo.mp3", "Serpiente.jpg");
  }
}

class Aguila extends Animal {
  constructor(edad, comentarios) {
    super("Águila", edad, comentarios, "Chillido.mp3", "Aguila.png");
  }
}
function crearAnimal(tipo, edad, comentarios) {
  switch (tipo) {
    case 'Leon':
      return new Leon(edad, comentarios);
    case 'Lobo':
      return new Lobo(edad, comentarios);
    case 'Oso':
      return new Oso(edad, comentarios);
    case 'Serpiente':
      return new Serpiente(edad, comentarios);
    case 'Aguila':
      return new Aguila(edad, comentarios);
    default:
      return null;
  }
}

function mostrarImagenPrevia() {
  const tipo = document.getElementById("animal").value;
  const edad = document.getElementById("edad").value;
  const preview = document.getElementById("preview");

  if (tipo && edad) {
    const animal = crearAnimal(tipo, edad, "");
    preview.innerHTML = `<img src="${animal.imagen}" alt="${animal.nombre}" class="img-fluid" style="max-width: 150px;" />`;
  } else {
    preview.innerHTML = "";
  }
}

function validarFormulario(tipo, edad, comentarios) {
  return tipo && edad && comentarios;
}

function agregarAnimal() {

  const tipo = document.getElementById("animal").value;
  const edad = document.getElementById("edad").value;
  const comentarios = document.getElementById("comentarios").value;

  if (!validarFormulario(tipo, edad, comentarios)) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const animal = crearAnimal(tipo, edad, comentarios);

  mostrarAnimalEnInvestigacion(animal);

  document.getElementById("formAnimal").reset();
  document.getElementById("preview").innerHTML = "";
}

function mostrarAnimalEnInvestigacion(animal) {
  const contenedorAnimales = document.getElementById("Animales");
  const animalCard = document.createElement("div");
  animalCard.classList.add("card", "m-2", "bg-secondary", "text-white");
  animalCard.style.width = "150px";

  animalCard.innerHTML = `
    <img src="${animal.imagen}" alt="${animal.nombre}" class="card-img-top" style="cursor: pointer;" />
    <div class="card-body p-2">
      <h5 class="card-title">${animal.nombre}</h5>
      <p class="card-text">${animal.edad}</p>
      <button class="btn btn-light btn-sm w-100" onclick="reproducirSonido('${animal.sonido}')">🔊</button>
    </div>
  `;

  animalCard.querySelector("img").addEventListener("click", () => mostrarModal(animal));

  contenedorAnimales.appendChild(animalCard);
}

function reproducirSonido(sound) {
  const audio = new Audio(sound);
  audio.load();
  audio.play();
}

function mostrarModal(animal) {
  const modal = document.getElementById("exampleModal");
  modal.querySelector(".modal-body").textContent = animal.comentarios;
  $(modal).modal("show");
}
document.getElementById("animal").addEventListener("change", mostrarImagenPrevia);
document.getElementById("edad").addEventListener("change", mostrarImagenPrevia);

document.getElementById("btnRegistrar").addEventListener("click", agregarAnimal);


