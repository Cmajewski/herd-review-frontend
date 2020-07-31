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
      product.forEach(product=>createproductCard(product)) 
    })
  }

  function createproductCard(){
   
  }

  function formHandler(e){
    event.preventDefault()
    const name=document.querySelector(".add-product-form").name.value
    const brand=document.querySelector(".add-product-form").brand.value
    const category=document.querySelector(".add-product-form").category.value
    const description=document.querySelector(".add-product-form").description.value
    const image=document.querySelector(".add-product-form").image.value
    postFetch(name,brand,image,description)
  }

  function postFetch(name,brand,category,description,image_url){
    fetch("http://localhost:3000/products",{
      method: "Post",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        brand:brand,
        category: category,
        description: description,
        image_url: image_url,
        likes: 0
      })
    });
     
  }


// -----------


// function createproductCard(product){
  //   const productCollection = document.querySelector("#product-collection");
  //   let card=document.createElement("div");
  //   card.setAttribute("class","card");
  
  //   let h2=document.createElement("h2");
  //   h2.innerText=product.name;
  
  //   let img=document.createElement("img");
  //   img.src=product.image_url;
  //   img.setAttribute("class","product-avatar");
  
  //   let p=document.createElement("p");
  //   p.innerText=`${product.likes} like`;
  
  //   let button=document.createElement("button");
  //   button.innerText="Like";
  //   button.setAttribute("class","like-btn");
  //   button.setAttribute("id",product.id);
  
  //   button.addEventListener("click", event=>{
    //     updateLikes(event);
    //   });
    
    //   card.append(h2,img,p,button);
    //   productCollection.append(card);
    
    
    // };
    
    
    
    
    // function postproduct(newproduct) { 
      //   fetch("http://localhost:3000/products",{
        //     method: "POST",
        //     headers: {
          //       "Content-Type": "application/json",
          //       "Accept": "application/json"
          //     },
          //       body: JSON.stringify({
            //         name: newproduct.name,
            //         image: newproduct.image_url,
            //         likes: 0
            //       })
            // })
            //     .then(function(response){
              //       return response.json();
              //     })
              //     .then(function(object){
                //       console.log(object);
                //       createproductCard(object);
                //     })
                
                //   }
                
                // function updateLikes(e){
                  //   e.preventDefault();
                  //   let newNumber=parseInt(e.target.previousElementSibling.innerText)+1
                  //   fetch(`http://localhost:3000/products/${e.target.id}`,{
                    //     method:"PATCH",
//     headers:{
  //       "Content-Type":"application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
    //       likes: newNumber
//     })
//   })
//   .then(function(response){
  //     response.json();
  //   })
  //   .then(function(object){
    //     e.target.previousElementSibling.innerText=`${newNumber} likes`
    //   })
    // }
    
    // document.addEventListener("DOMContentLoaded", () => {
      //   getproducts(); 
      
      //   let form=document.querySelector(".add-product-form");
      
      //   form.addEventListener("submit",function(event){
        //     event.preventDefault();
        //     let newproduct=Object.assign({},{name:event.target[0].value},{image_url: event.target[1].value},{likes:0})
        //     createproductCard(newproduct);
        //     event.target[0].value=""
        //     event.target[1].value=""
        
        //   })
        
   
        // const addProductBtn = document.querySelector("#new-product-btn");
        
        // const container = document.querySelector(".container");
        
        // addProductBtn.addEventListener("click", () => {
        //   btnStatus = !btnStatus;
        //   if (btnStatus) {
        //     container.style.display = "block";
        //   } else {
        //     container.style.display = "none";
        //   }
        // });

// });