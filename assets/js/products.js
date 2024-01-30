
const productsDOM = document.querySelector('.products-section');

// cart 
let cart = [];
//buttons
let buttonsDOM = [];

//getting the products
class Products{
    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item.fields;
                const id = item.id;
                const image = item.fields.image;
                const category = item.fields.category;
                return {title,price,id,image,category};
            })
            return products;
        }
        catch(error){
            console.log(error);
        }
    }    
}

class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            const { title, price,image, category } = product;
            
            // Convert the array of categories into a single string
            const categoryString = Array.isArray(category) ? category.join(' ') : category;

            result += `
                <div class="product">
                    <img src=${image} alt="">
                    <div class="product-info">
                        <div class="product-info-left">
                            <p class="product-category">${categoryString}</p>
                            <p class="product-name">${title}</p>
                            <p class="product-price">${price}</p>
                        </div>
                        <div class="product-info-right">
                        <button class="bag-btn" data-id=${product.id}>
                        <svg class="icon cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                        Add to cart
                        </button>
                        </div>
                    </div>
                </div>
            `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        console.log(buttons);
        
        // buttonsDOM = buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id == id);
            if(inCart){
                button.innerText = "In Cart";
                button.disabled = true;
            }
                button.addEventListener("click",(event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    // get product from products
                    let cartItem = {...Storage.getProduct(id), amount : 1};
                    // add product to the cart
                    cart = [...cart,cartItem];
                    //save cart in local storage
                    Storage.saveCart(cart);
                    //set cart values
                    this.setCartValues(cart);
                    //display cart item
                    // this.addCartItem(cartItem)
                    //show the cart
                    // this.showCart()
                });
        });
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
       }
       addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${item.image} alt="product">
            <div>
                <h4>${item.title}</h4>
                <h5>$${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
        `
        cartContent.appendChild(div);
    }
}

//Local Storage

class Storage{
    static saveProduct(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id == id);
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
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
        Storage.saveProduct(products);
    }).then(()=>{
        ui.getBagButtons();
    }); 

})