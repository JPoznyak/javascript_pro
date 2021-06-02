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
        imgProduct: 'images/comp_stuff.png',
        dataError: false
    },

    methods: {
        getFile(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.dataError = true;
                })
        },
            
        addProduct(item){
            this.getFile(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                         let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
        },

        removeProduct(item){
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

        filterGoods(searchLine){
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
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

        this.getFile(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
        })
    }
});