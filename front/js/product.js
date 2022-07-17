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

// choix couleur dynamique
//------------------------------------------------------------------------

// définition des variables
let choixCouleur = document.querySelector("#colors");

// écoute ce qu'il se passe dans #colors
choixCouleur.addEventListener("input", (ec) => {
  let couleurProduit;

  // on récupère la valeur de la cible de l'évenement dans couleur
  couleurProduit = ec.target.value;

  // on ajoute la couleur à l'objet panierClient
  articleClient.couleur = couleurProduit;

  // reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(couleurProduit);
});

// choix quantité dynamique
//------------------------------------------------------------------------

// définition des variables
let choixQuantité = document.querySelector('input[id="quantity"]');
let quantitéProduit;

// écoute ce qu'il se passe dans input[name="itemQuantity"]
choixQuantité.addEventListener("input", (eq) => {

  // récupère la valeur de la cible de l'évenement dans couleur
  quantitéProduit = eq.target.value;

  // ajoute la quantité à l'objet panierClient
  articleClient.quantité = quantitéProduit;

  // reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantitéProduit);
});

// conditions de validation du clic via le bouton ajouter au panier
//------------------------------------------------------------------------

// déclaration variable
let choixProduit = document.querySelector("#addToCart");

// On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action :
choixProduit.addEventListener("click", () => {

  //conditions de validation du bouton ajouter au panier
  if (
    // les valeurs sont créées dynamiquement au click, et à l'arrivée sur la page, tant qu'il n'y a pas d'action sur la couleur et/ou la quantité, c'est 2 valeurs sont undefined.
    articleClient.quantité < 1 ||
    articleClient.quantité > 100 ||
    articleClient.quantité === undefined ||
    articleClient.couleur === "" ||
    articleClient.couleur === undefined
  ) {

    // joue l'alerte
    alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");

    // si ça passe le controle
  } else {

    // joue panier
    Panier();
    console.log("clic effectué");

    //effet visuel d'ajout de produit
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
});