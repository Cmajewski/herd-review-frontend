let btnStatus = false;

document.addEventListener("DOMContentLoaded",()=>{
  getProducts();
  const form=document.querySelector(".add-product-form");
  const addProductBtn = document.querySelector("#new-product-btn");
  const container = document.querySelector(".container");
 
        
  form.addEventListener("submit",e=>{
  formHandler(e)
  })

  addProductBtn.addEventListener("click", () => {

    btnStatus = !btnStatus;
    if (btnStatus) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
       
})

 
function getProducts(){
    fetch ("http://localhost:3000/products")
    .then(response=>response.json())
    .then(product=>{
      product.forEach(product=>{
        let newProduct = new Product(product);
        newProduct.createProductCard();
      }) 
    })
  }


  function formHandler(e){
    event.preventDefault()
    const form=document.querySelector(".add-product-form");
    const name=form.name.value
    const brand=form.brand.value
    const category=form.category.value
    const description=form.description.value
    const image=form.image.value
    const likes=0
    postFetch(name,brand,category,description,image,likes)
    form.reset()
  }

  function postFetch(name,brand,category,description,image_url,likes){
    const bodyData={name, brand, category, description, image_url,likes}
    fetch("http://localhost:3000/products",{
      method: "Post",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(response=>response.json()) 
    .then(product=>{
      let newProduct = new Product(product);
        newProduct.createProductCard();
    })
  }

  
  function updateLikes(e){
    e.preventDefault();
    const id=parseInt(e.target.id)
    const product=Product.findById(id)
    if (e.target.className="up-btn"){
      product.likes+=1;
    } else if(e.target.className="down-btn"){
      product.likes=-1;
      debugger;
    } else {
      product.likes
    }

    fetch(`http://localhost:3000/products/${product.id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
            "Accept": "application/json"
          },
            body: JSON.stringify(product)
           })
             .then(response=>response.json())
             .then(function(product){
               document.querySelector(`#like-${product.id}`).innerText=`${product.likes} likes`;
              })
  }

