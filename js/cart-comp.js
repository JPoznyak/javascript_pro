Vue.component('cart', {
    props: ['cart-items', 'visibility'],
    template: `<div class="cartBlock" v-show="visibility">
                <cart-item v-for="item of cartItems" :cart-item="item"></cart-item>
               </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>

                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$root.removeProduct(cartItem)">&times;</button>
                    </div>
               </div>`
});

Vue.component('goods-num', {
    props: ['cartItem'],
    template: `<span class="goodsNum">{{ cartItem.quantity }}
               </span>`
})
