
const productsDOM = document.querySelector('.products-section');


//getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.id;
                const image = item.fields.image;
                category = item.fields.category;
                category = category.join(" ");
                return {title,price,id,image,category};
            })
            return products;
        }
        catch(error){
            console.log(error);
        }
    }    
}

//display products
class UI{
    displayProducts(products){
        if(products){
            console.log(products);
            
        }
        else{
            console.log("Not");
            
        }
        let result = '';
        products.forEach(product => {
            result += `
            <div class="product">
                <img src=${product.image} alt="">
                <p class="product-category">${product.category}</p>
                <p class="product-name">${product.title}</p>
                <p class="product-price">${product.price}</p>
            </div>
            `
        });
        productsDOM.innerHTML = result;
    }
}

document.addEventListener("DOMContentLoaded",() =>{
    
    const ui = new UI();
    const products = new Products();
    //setup app
    // ui.setupApp();
    // get all products
    products.getProducts().then(products =>{
        ui.displayProducts(products);
    }); 

})