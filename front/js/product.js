//--------------------------------------------------------------------------
// Récupération de l'id du produit via l' URL
//--------------------------------------------------------------------------

//la variable params récupère l'url de la page  
const params = new URLSearchParams(document.location.search); //console.log(document.location);

// la variable id va récupérer la valeur du paramètre _id
const id = params.get("_id");
console.log(id); 

// Récupération des produits de l'api et traitement des données (voir index.js)

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((productObjects) => {

    // execution de la fontion lesProduits
    lesProduits(productObjects);
  })
  .catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api: " + err);
  });

// Création d'objet articleClient
//------------------------------------------------------------------------

// déclaration objet articleClient prêt à être modifiée par les fonctions suivantes d'évènements
let articleClient = {};

// id du procuit
articleClient._id = id;

// fonction d'affichage du produit de l'api
//------------------------------------------------------------------------
function lesProduits(produit) {
  // déclaration des variables pointage des éléments
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors");

  // boucle for pour chercher un indice
  for (let choix of produit) {

    //si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice de tableau qui sert pour les éléments produit à ajouter
    if (id === choix._id) {

      //éléments ajoutés dynamiquement
      imageAlt.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
      titre.textContent = `${choix.name}`;
      prix.textContent = `${choix.price}`;
      description.textContent = `${choix.description}`;

      // boucle pour chercher les couleurs pour chaque produit en fonction de sa clef/valeur (la logique: tableau dans un tableau = boucle dans boucle)
      for (let couleur of choix.colors) {

        // ajout des balises d'option couleur avec leur valeur
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
      }
    }
  }
  console.log("affichage effectué");
}

