
// Récupération des produits de l'api
//------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")

  // changer la réponse reçue en json
  .then((res) => res.json())

  // ce qui a été reçu et qui a été traité en json 
  .then((productObjects) => {

  // pour obtenir des informations dans la console.
    console.table(productObjects);

  // pour appeler la fonction d'affichage du produit.
    kanap(productObjects);
  })

  // dans le cas d'une erreur 
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

    //affichage des produits api sur la page d'index
function kanap(index) {

  // déclaration de variable de la zone d'article
  let articleZone = document.querySelector("#items");

  // boucle pour chaque indice(nommé 'article') dans index
  for (let product of index) {
    articleZone.innerHTML += `<a href="./product.html?_id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;
  }
}