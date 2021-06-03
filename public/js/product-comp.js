Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
        }
    },

    mounted() {
        this.$parent.getFile(`api/products`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
        });
    },

    methods: {
        filter(searchLine){
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(item => regexp.test(item.product_name));
        }
    },

   template: `<div class="products">
                <product v-for="product of filtered"
                :img="product.img"
                :product = "product"></product>
            </div>`
});


Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                    <img class="product-img" :src="img" :alt="product.product_name">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}}</p>
                        <button class="buyBtn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                    </div>    
               </div>`
})