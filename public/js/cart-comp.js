Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find( el => el.id_product === product.id_product );
            if ( find ) {
                this.$parent.putFile( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 } )
                    .then( data => {
                        if ( data.result ) {
                            find.quantity++;
                        }
                    } )
            } else {
                let prod = Object.assign( { quantity: 1 }, product );
                this.$parent.postFile( `api/cart/${ product.id_product }/${ product.product_name }`, prod )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.push( prod );
                        }
                    } )
            }
        },
        remove(product) {
            if ( product.quantity > 1 ) {
                this.$parent.putFile( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 } )
                    .then( data => {
                        if ( data.result ) {
                            product.quantity--;
                        }
                    } )
            } else {
                this.$parent.delFile( `/api/cart/${ product.id_product }/${ product.product_name }`, product )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.splice( this.cartItems.indexOf( product ), 1 );
                        } else {
                            console.log('error');
                        }
                    } )
            }
        },
    },
    mounted() {
        this.$parent.getFile(`/api/cart`)
            .then( data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: `<div>
                <button class="btnCart" type="button" @click='showCart = !showCart'>
                <img class="cartIcon" src="images/cart.svg" alt="cart-icon">Корзина</button>
                <div class="cartBlock" v-show="showCart">
                    <p class="cart-data" v-if="!cartItems.length">Нет данных</p>
                    <cart-item 
                    v-for="item of cartItems" 
                    :cart-item="item"
                    @remove="remove"></cart-item>
                </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="cart-item">
                <div class="product-bio">
                    <div class="product-desc">
                        <p class="product-title">{{cartItem.product_name}}</p>
                        <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                        <p class="product-single-price">{{cartItem.price}} руб. за шт.</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">Всего: {{cartItem.quantity*cartItem.price}} руб.</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>`
})