const products = [
    {id: 1, title: 'Notebook', price: 2000, foto: 'images/notebook.jpeg'},
    {id: 2, title: 'Mouse', price: 20, foto: 'images/mouse.jpeg'},
    {id: 3, title: 'Keyboard', price: 200, foto: 'images/keyboard.jpeg'},
    {id: 4, title: 'Gamepad', price: 50, foto: 'images/gamepad.jpeg'},
];
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-price">${item.price}</p>
                <img class="product-image" src="${item.foto}">
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    // document.querySelector('.products').innerHTML = productsList;
    document.querySelector('.products').insertAdjacentHTML('beforeend', productsList);
};

renderPage(products);