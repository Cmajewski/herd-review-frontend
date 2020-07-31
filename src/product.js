class Product {
    constructor (data){
        this.id=data.id;
        this.name=data.name;
        this.brand=data.brand;
        this.category=data.category;
        this.description=data.description;
        this.image_url=data.image_url;
        this.reviews=data.reviews
        this.likes=data.likes;
        Product.all.push(this)
    }

    createProductCard(){
        const productContainer=document.querySelector("#product-collection");
        let card=document.createElement("div");
        card.setAttribute("class","card");
    
        let name=document.createElement("h3")
        name.innerText=this.name
    
        let brand=document.createElement("h4")
        brand.innerText=this.brand
    
        let category=document.createElement("p");
        category.innerText=this.category
        category.setAttribute("class","card-format")
    
        let img=document.createElement("img");
        img.src=this.image_url;
        img.setAttribute("class","product-avatar");
    
        let description=document.createElement("p");
        description.innerText=this.description
    
        let upButton=document.createElement("button");
        upButton.innerText="▲";
        upButton.setAttribute("class","up-btn");
        upButton.setAttribute("id",this.id);
        
        let downButton=document.createElement("button");
        downButton.innerText="▼";
        downButton.setAttribute("class","down-btn");
        downButton.setAttribute("id",this.id);

        upButton.addEventListener("click",e=> updateLikes(e));
        downButton.addEventListener("click", e=>updateLikes(e));
        
        let like=document.createElement("p");
        like.innerText=`${this.likes} like`;
        like.setAttribute("class","like");
        like.setAttribute("id",`like-${this.id}`);
    
        let reviews=document.createElement("p")
        reviews.innerText=`${this.reviews.length} Reviews`;
        reviews.setAttribute("class","card-format")
          
        card.append(name,brand,category,description,img,reviews,upButton,like,downButton);
        productContainer.append(card);
      }

    
    static findById(id){
        return this.all.find(product=>product.id===id);
    }

}

Product.all=[];