const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        isVisibleCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        products: [],
        imgProduct: 'images/comp_stuff.png'
    },

    methods: {
        getFile(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => 
                    console.log(error));
        },
            
        addProduct(item){
            this.getFile(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        // let productId = +element.dataset['id'];
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if(find){
                            find.quantity++;
                            // this._updat  eCart(find);
                        } else {
                            const prod = Object.assign({quantity: 1}, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
        },

        removeProduct(item){
            // this.getFile(`${API}/deleteFromBasket.json`)
            this.getFile(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        if(item.quantity > 1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },

        filterGoods(){
            const regexp = new RegExp(this.searchLine, 'i');
            // this.filtered = this.products.filterGoods(product => regexp.test(product.product_name));
            this.filtered = this.filtered.filterGoods(el => regexp.test(el.product_name));
        }

    },
   
    mounted(){
        this.getFile(`${API + this.cartUrl}`)
            .then(data => {
                for(let item of data.contents){
                    this.cartItems.push(item);
                }
            });
                
        this.getFile(`${API + this.catalogUrl}`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
    }
});