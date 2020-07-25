fetch("http://localhost:3000/products")
.then(response=>response.json())
.then(console.log())




let addproduct = false;

function createproductCard(product){
  const productCollection = document.querySelector("#product-collection");
  let card=document.createElement("div");
  card.setAttribute("class","card");

  let h2=document.createElement("h2");
  h2.innerText=product.name;

  let img=document.createElement("img");
  img.src=product.image;
  img.setAttribute("class","product-avatar");

  let p=document.createElement("p");
  p.innerText=`${product.likes} like`;

  let button=document.createElement("button");
  button.innerText="Like";
  button.setAttribute("class","like-btn");
  button.setAttribute("id",product.id);

  button.addEventListener("click", event=>{
    updateLikes(event);

  });

  card.append(h2,img,p,button);
  productCollection.append(card);

};

function getproducts(){
  fetch ("http://localhost:3000/products")
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    object.forEach(product=> {
      createproductCard(product);
    })
  });

};



function postproduct(newproduct) { 
  fetch("http://localhost:3000/products",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({
        name: newproduct.name,
        image: newproduct.image,
        likes: 0
      })
})
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      console.log(object);
      createproductCard(object);
    })

  }

function updateLikes(e){
  e.preventDefault();
  let newNumber=parseInt(e.target.previousElementSibling.innerText)+1
  fetch(`http://localhost:3000/products/${e.target.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newNumber
    })
  })
  .then(function(response){
    response.json();
  })
  .then(function(object){
    e.target.previousElementSibling.innerText=`${newNumber} likes`
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getproducts();

  let form=document.querySelector(".add-product-form");

  form.addEventListener("submit",function(event){
    event.preventDefault();
    let newproduct=Object.assign({},{name:event.target[0].value},{image: event.target[1].value})
    postproduct(newproduct);
  })

  const addBtn = document.querySelector("#new-product-btn");
  const productFormContainer = document.querySelector(".container");
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addproduct = !addproduct;
    if (addproduct) {
      productFormContainer.style.display = "block";
    } else {
      productFormContainer.style.display = "none";
    }
  });

});