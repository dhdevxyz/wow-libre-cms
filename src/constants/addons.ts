/*
  addonsAvailable: Lista de objetos que representan addons disponibles para mostrar en tarjetas.

  Cada objeto debe tener las siguientes propiedades:
  - image: URL de la imagen representativa del addon.
  - CardTitle: Título que se mostrará en la tarjeta.
  - titleHref: Enlace al que redirige el título.
  - btnHref: Enlace que usará el botón.
  - CardDescription: Descripción corta del addon.
  - Button: Texto que se mostrará en el botón de acción.

  Si tienes dudas sobre cómo agregar o modificar addons,
  visita la wiki: https://github.com/ManuChitiva/wow-libre-web/wiki/Agregar-m%C3%A1s-addons-para-descargar
*/
export const addonsAvailable = [
    {
        image: "https://bnetcmsus-a.akamaihd.net/cms/blog_header/it/IT3NWTCQWD821613777910714.jpg",
        CardTitle: "Addon Control Panel",
        titleHref: "https://foro.ultimowow.com/files/file/10-addon-control-panel/?do=download&csrfKey=1c891ffb7678e360d23453dc7e50fc87",
        btnHref: "https://foro.ultimowow.com/files/file/10-addon-control-panel/?do=download&csrfKey=1c891ffb7678e360d23453dc7e50fc87",
        CardDescription: "Te permite administrar tus addons en el juego, con una interfaz muy cómoda.",
        Button: "Descargar addons"
    },
    {
        image: "https://cl2.buscafs.com/www.levelup.com/public/uploads/images/841103/841103.jpg",
        CardTitle: "Mas addons",
        titleHref: "https://www.curseforge.com/wow",
        btnHref: "https://www.curseforge.com/wow",
        CardDescription: "Busca y descarga más addons desde la página oficial de CurseForge.",
        Button: "Ir a CurseForge"
    },
    {
        image: "https://static.wixstatic.com/media/5dd8a0_8c5b7a3a15014ad599ca7a0d6d6dfa35~mv2.jpg",
        CardTitle: "Launcher",
        titleHref: "",
        btnHref: "",
        CardDescription: "Accede a tu cuenta de juego y descarga el cliente de juego desde aquí.",
        Button: "Descargar"
    }
];
