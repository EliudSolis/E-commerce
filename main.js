const addToShoppingCartButtons = document.querySelectorAll(".btn")
const cartDiv = document.querySelector(".add-by-buttons")
const buyButton = document.querySelector(".buy-button")

buyButton.addEventListener("click", buyButtonClicked)
const cartCreatedElement = cartDiv.getElementsByClassName(".cart-content");


addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener("click", addToCartClicked);
} )


function addToCartClicked (event) {
    const button = event.target;
   const item = button.closest(".card-product");
   
   
   const itemName = item.querySelector(".tittle").textContent;
   const itemPrice = item.querySelector(".price").textContent; 
   const itemImage = item.querySelector(".bike-photo").src; 
   
   addItemToShoppingCart(itemName, itemPrice, itemImage)
}


function addItemToShoppingCart (itemName, itemPrice, itemImage){
const elementsTitle = cartDiv.getElementsByClassName(".nameproduct-car")
 console.log(elementsTitle)

    for (let i = 0 ; i < elementsTitle.length; i++){
        if (elementsTitle[i].innerText === itemName) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.querySelector(".quantity");
            elementQuantity.value++;
            return;
        }
    }
    
   const shoppingCartElement = document.createElement('div');
   const shoppingCartContent = `
   <div class="cart-content">
                <div class="src-image" id="product-car">
                    <img src=${itemImage} class="shopping-cart-image"></img>
                </div>
                <div class="nameproduct-car">${itemName}

                </div>
                <div class="price-cart">${itemPrice}

                </div>  
                <input class="quantity" type="number"
                value="1">
                <button class="buttonDelete" type="button">X</button>

                </input>

                
            </div>
      `;
   shoppingCartElement.innerHTML = shoppingCartContent
    cartDiv.append(shoppingCartElement)
    shoppingCartElement.querySelector(".buttonDelete").addEventListener("click" , removeShoppingCartItem)

    shoppingCartElement.querySelector(".quantity").addEventListener("change", quantityChanged)
    updateShoppingCartTotal()
}


function updateShoppingCartTotal () {
    let total = 0;
    const shoppingCartTotal = document.querySelector(".total")
    
    const shoppingCartItems = document.querySelectorAll(".cart-content")
   
    shoppingCartItems.forEach( (shoppingCartItem) =>{
       const shoppingCartItemPriceContent = shoppingCartItem.querySelector(".price-cart")
       const shoppingCartItemPrice = Number(shoppingCartItemPriceContent.textContent.replace(',',''))
       const shoppingCartItemQuantityContent = shoppingCartItem.querySelector(".quantity");
       const shoppingCartItemQuantity = Number(shoppingCartItemQuantityContent.value)
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity 

        
    })

    shoppingCartTotal.innerHTML = `$${total}.00`

    
}


function removeShoppingCartItem(event) {
    const buttonClicked = event.target
    buttonClicked.closest(".cart-content").remove();
    updateShoppingCartTotal();

}


function quantityChanged (event) {
    const input = event.target
    if (input.value <=0) {
        throw alert ("El valor no puede ser menor a 1")
        (input.value = 1)
        
    }updateShoppingCartTotal()
}

function buyButtonClicked () {
    
    cartDiv.innerHTML = ''   
    updateShoppingCartTotal()
}