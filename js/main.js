'use strici'

let btnCart = document.querySelector('.btnCart');
let cartGoodsList = document.getElementById('cartGoodsList');
let buyBtn = document.querySelector('.buyBtn')
let removeCartItem = document.querySelector('.goodsListDelete');

class productList {     
    constructor (container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }  

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000, foto: 'images/notebook.jpeg'},
            {id: 2, title: 'Mouse', price: 20, foto: 'images/mouse.jpeg'},
            {id: 3, title: 'Keyboard', price: 200, foto: 'images/keyboard.jpeg'},
            {id: 4, title: 'Gamepad', price: 50, foto: 'images/gamepad.jpeg'},
        ]
    }
    
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods) {
            const productObj = new productItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class productItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.foto = product.foto;
        this.id = product.id;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}"> 
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <img class="product-image" src="${this.foto}" alt="Product foto">
                <button class="buyBtn">Купить</button>
            </div>`
    }
}

const list = new productList();
list.render();

//Создаем класс корзина Cart
class Cart {
    constructor () {
        this.goods = [];
    }

    //метод добавления товара в корзину
    addCartItem(cartItem) {
        this.goods.push(cartItem);
    }

    // Метод удаления товара из корзины
    removeCartItem(cartItem) {
        delete this.goods[this.product.id];
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goodsListTotal'); 
        let sum = 0;
        this.goods.forEach (good => { 
            sum += good.price
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    // Метод для вывода списка товаров. Для каждого элемента массива goods будем создавать экземпляр
    // класса ProductItem и запрашивать его разметку
    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goodsListProductBox'); 
        
        this.goods.forEach (good => {
            const goodItem = new ProductItem (good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        goodsList.innerHTML = listHtml;
    }
}


const cart = new Cart();

let renderCart = () => {
    
    list._fetchProducts();
    cart.addCartItem(list.goods[0]);
    cart.addCartItem(list.goods[1]);
    cart.addCartItem(list.goods[2]);
    cart.render();

    cart.totalCartPrice();
    cartGoodsList.style.display = 'block';
};

btnCart.addEventListener('click', renderCart);
buyBtn.addEventListener('click', cart.addCartItem);
removeCartItem.addEventListener('click', cart.removeCartItem);

