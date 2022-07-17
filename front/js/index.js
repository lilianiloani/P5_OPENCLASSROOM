//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")

  // changer la réponse reçue en json
  .then((res) => res.json())

  // ce qui a été reçu et qui a été traité en json sera appelé productObjects
  .then((productObjects) => {

    // pour obtenir des informations dans la console sur ce qui est récupéré en tant que tableau.
    console.table(productObjects);

    // pour appeler la fonction d'affichage du produit.
    lesKanaps(productObjects);
  })

  // dans le cas d'une erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et renvoit en console l'erreur.
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

    //affichage des produits api sur la page d'index
function lesKanaps(index) {

  // déclaration de variable de la zone d'article
  let zoneArticle = document.querySelector("#items");

  // boucle pour chaque indice(nommé 'article') dans index
  for (let article of index) {

    /* création et ajout des zones d'articles, insertion de l'adresse produit via chemin produit + paramètres(son id);
    la page index est http://127.0.0.1:5500/front/html/index.html donc la page du produit sera http://127.0.0.1:5500/front/html/product.html 
    (d'ou le ./product.html) pour rajouter son paramètre on met ? puis la clé (ici _id) associé (=) à sa valeur dynamique ${article._id} */
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}