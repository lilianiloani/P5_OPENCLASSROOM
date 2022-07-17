// pour différancier la page confirmation et panier
const page = document.location.href;
//----------------------------------------------------------------
// Récupération des produits de l'api
//----------------------------------------------------------------
// appel de la ressource api product (voir index.js) si on est sur la page panier
if (page.match("cart")) {
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((productObjects) => {
      console.log(productObjects);
      // appel de la fonction affichagePanier
      affichagePanier(productObjects);
  })
  .catch((err) => {
      document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + err);
  });
} else {
  console.log("sur page confirmation");
}
//--------------------------------------------------------------
// Fonction détermine les conditions d'affichage des produits du panier
//--------------------------------------------------------------
function affichagePanier(index) {
  // on récupère le panier converti
  let panier = JSON.parse(localStorage.getItem("panierStocké"));
  // si il y a un panier avec une taille differante de 0 (donc supérieure à 0)
   if (panier && panier.length != 0) {
    // zone de correspondance clef/valeur de l'api et du panier grâce à l'id produit choisit dans le localStorage
    for (let choix of panier) {
      console.log(choix);
      for (let g = 0, h = index.length; g < h; g++) {
        if (choix._id === index[g]._id) {
          // création et ajout de valeurs à panier qui vont servir pour les valeurs dataset
          choix.name = index[g].name;
          choix.prix = index[g].price;
          choix.image = index[g].imageUrl;
          choix.description = index[g].description;
          choix.alt = index[g].altTxt;
        }
      }
    }
    // on joue affiche,  panier a des clefs/valeurs ajoutés que l'on a pas remonté dans le local storage et sont pourtant réèlles
    // ici panier à les valeurs du local storage + les valeurs définies au dessus
    //on demande à affiche() de jouer avec les données panier 
    //les valeurs ajoutés à panier ont un scope agrandi puisque appelé via la fonction affiche() d'ailleur dans affiche() il n'y a pas d'appel à panier de local storage.
    affiche(panier);
  } else {
    // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
  // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
  modifQuantité();
  suppression();
}
//--------------------------------------------------------------
//Fonction d'affichage d'un panier (tableau)
//--------------------------------------------------------------
function affiche(indexé) {
  // on déclare et on pointe la zone d'affichage
  let zonePanier = document.querySelector("#cart__items");
  // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
  zonePanier.innerHTML += indexé.map((choix) => 
  `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.couleur}" data-quantité="${choix.quantité}" data-prix="${choix.prix}"> 
    <div class="cart__item__img">
      <img src="${choix.image}" alt="${choix.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${choix.name}</h2>
        <span>couleur : ${choix.couleur}</span>
        <p data-prix="${choix.prix}">${choix.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantité}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.couleur}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    ).join(""); //on remplace les virgules de jonctions des objets du tableau par un vide
  // reste à l'écoute des modifications de quantité pour l'affichage et actualiser les données
  totalProduit()
}

