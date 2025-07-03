import ContactosLayout from "./Layout/ContactosLayout";
//array de contactos
const contactos = [
  {
    nombre: "GIANFRANCO PEDRAZZANI",
    github: "https://github.com/GianPedr",
    imagen: "https://avatars.githubusercontent.com/u/167658333?v=4"
  },
  {
    nombre: "MATÍAS EMANUEL VARGAS",
    github: "https://github.com/MatiasVargasDev",
    imagen: "https://avatars.githubusercontent.com/u/209666156?v=4"
  },
  {
    nombre: "BRISA ANAHÍ BARRO",
    github: "https://github.com/BarroBrisa",
    imagen: "https://avatars.githubusercontent.com/u/131416953?v=4"
  },
  {
    nombre: "DARIO ABEL MARTINEZ",
    github: "https://github.com/martinezcabj12",
    imagen: "https://avatars.githubusercontent.com/u/115888661?v=4"
  }
];
export default function Contactos() {
    //renderizado
    return <ContactosLayout contactos={contactos} />;
}