//header
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
 menu.classList.toggle('fa-times');
 navbar.classList.toggle('active')
}

window.onscroll = () => {
 menu.classList.remove('fa-times');
 navbar.classList.remove('active');
}

document.querySelector('#search-icon').onclick = () => {
 document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
 document.querySelector('#search-form').classList.remove('active');
}


//home typeit
new TypeIt("#type1", {
 speed: 250,
 loop: true,
 waitUntilVisible: true,
})
.type("taste the difference", { delay: 400 })
.pause(500)
.delete(9)
.go()

//special dishes swipe
var swiper = new Swiper(".special-slider", {
 spaceBetween: 30,
 centeredSlides: true,
 autoplay: {
   delay: 7500,
   disableOnInteraction: false,
 },
 pagination: {
   el: ".swiper-pagination",
   clickable: true,
 },
 loop: true,
});

/*
var swiper = new Swiper(".review-slider", {
 spaceBetween: 20,
 centeredSlides: true,
 autoplay: {
   delay: 7500,
   disableOnInteraction: false,
 },
 loop: true,
 breakpoints: {
  0: {
   slidesPerView: 1,
  },
  640: {
   slidesPerView: 2,
  },
  768: {
   slidesPerView: 2,
  },
  1024: {
   slidesPerView: 3,
  },
 },
}); */


//customer review
const glide = document.querySelector(".glide");

if (glide)
new Glide(glide, {
 type: "carousel", 
 startAt: 0,
 perView: 3,
 gap: 30,
 hoverpause: true,
 autoplay: 2000,
 animationDuration: 800,
 animationTimingFunc: "ease-in-out",
 breakpoints: {
  996: {
   perView: 2,
  },
  768: {
   perView: 1,
  },
 },
}).mount();


/* others order */

let optionValue = document.querySelector('#dropdown');
let othersInput = document.querySelector('#others-input');
let form = document.querySelector('#form');


optionValue.addEventListener('change', (e) => {
  if(e.target.value == 'others'){
    othersInput.classList.remove('hidden');
  } else {
    othersInput.classList.add('hidden');
    othersInput.value='';
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let othersValue = e.target.querySelector('#others').value;
  let selectorValue = e.target.querySelector('#dropdown').value;
  let name = e.target.querySelector('#name').value;  
  alert(`Hello ${name} order for ${othersValue} was received thank you!` + '\n' + `Hello ${name} order for ${selectorValue} was received thank you!`);
});


/* shopping cart */
var removeCartItemButtons = document.getElementsByClassName('btn-danger');

for (i = 0; i < removeCartItemButtons.length; i++) {
  console.log(removeCartItemButtons[i])
removeCartItemButtons[i].addEventListener('click', removeCartItem)
}

const removeCartItem = (e) => {
  let buttonClicked = e.target
buttonClicked.parentElement.parentElement.remove()
updateCartTotal()
} 

let addToCartButtons = document.getElementsByClassName('shop-item-button')
for(let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i]
  button.addEventListener('click', addCartItem)
}

function addCartItem(e) {
  var button = e.target
  alert('item added to cart')
  var shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price,imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement('div')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  let cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
  for(let i = 0; i < cartItemsNames.length; i++) {
    if(cartItemsNames[i].innerText === title) {
      alert('this item has already been added')
      return
    }
  }
  let cartRowContent = `
  <div class="cart-row">
          <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
        </div>`
        cartRow.innerHTML = cartRowContent
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

 let quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
  let input = quantityInputs[i]
  input.addEventListener('change', quantityChanged)
}

function quantityChanged(e) {
  var input = e.target
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

function purchaseClicked() {
  alert('Thanks for your purchase!')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0]
  let cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart-price')[0]
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    let price = parseFloat(priceElement.innerText.replace('$', ''))
    let quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) /100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

/* modal */
let cartModal = document.getElementById('cartModal');
let likedModal = document.getElementById('likedModal');
let cartBtn = document.getElementById('cartBtn');
let likedBtn = document.getElementById('likedBtn');
let closeBtn = document.getElementsByClassName('close-btn')[0];
let closeLikedBtn = document.getElementsByClassName('close-liked-btn')[0];

cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'block';
})

likedBtn.addEventListener('click', () => {
  likedModal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
})

closeLikedBtn.addEventListener('click', () => {
  likedModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
  if(e.target == cartModal) {
    cartModal.style.display = 'none';
  };
})

window.addEventListener('click', (e) => {
  if(e.target == likedModal) {
    likedModal.style.display = 'none';
  };
})

/* liked items */

let removeLikedItemButtons = document.getElementsByClassName('btn-danger');

for (i = 0; i < removeLikedItemButtons.length; i++) {
  console.log(removeLikedItemButtons[i])
removeLikedItemButtons[i].addEventListener('click', removeLikedItem)
}

const removeLikedItem = (e) => {
  let buttonClicked = e.target
buttonClicked.parentElement.parentElement.remove()
} 

let addToLikedButtons = document.getElementsByClassName('liked-item')
for(let i = 0; i < addToLikedButtons.length; i++) {
  let button = addToLikedButtons[i]
  button.addEventListener('click', addLikedItem)
}

function addLikedItem(e) {
  var button = e.target
  alert('Liked item added')
  var shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  let desc = shopItem.getElementsByClassName('shop-item-desc')[0].innerText
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToLike(title, desc,imageSrc)
}

function addItemToLike(title, desc, imageSrc) {
  let likedRow = document.createElement('div')
  let likedItems = document.getElementsByClassName('liked-items')[0]
  let likedItemsNames = likedItems.getElementsByClassName('cart-item-title')
  for(let i = 0; i < likedItemsNames.length; i++) {
    if(likedItemsNames[i].innerText === title) {
      alert('this item has already been added')
      return
    }
  }
  let likedRowContent = `
  <div class="cart-row">
          <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${desc}</span>
          <div class="cart-quantity cart-column">
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
        </div>`
        likedRow.innerHTML = likedRowContent
  likedItems.append(likedRow)
  likedRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeLikedItem)
}

