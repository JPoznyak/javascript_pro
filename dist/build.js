/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/cart-comp.js":
/*!********************************!*\
  !*** ./public/js/cart-comp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('cart', {\n  data() {\n    return {\n      showCart: false,\n      cartItems: []\n    };\n  },\n\n  methods: {\n    addProduct(product) {\n      let find = this.cartItems.find(el => el.id_product === product.id_product);\n\n      if (find) {\n        this.$parent.putFile(`/api/cart/${product.id_product}/${product.product_name}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result) {\n            find.quantity++;\n          }\n        });\n      } else {\n        let prod = Object.assign({\n          quantity: 1\n        }, product);\n        this.$parent.postFile(`api/cart/${product.id_product}/${product.product_name}`, prod).then(data => {\n          if (data.result) {\n            this.cartItems.push(prod);\n          }\n        });\n      }\n    },\n\n    remove(product) {\n      if (product.quantity > 1) {\n        this.$parent.putFile(`/api/cart/${product.id_product}/${product.product_name}`, {\n          quantity: -1\n        }).then(data => {\n          if (data.result) {\n            product.quantity--;\n          }\n        });\n      } else {\n        this.$parent.delFile(`/api/cart/${product.id_product}/${product.product_name}`, product).then(data => {\n          if (data.result) {\n            this.cartItems.splice(this.cartItems.indexOf(product), 1);\n          } else {\n            console.log('error');\n          }\n        });\n      }\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getFile(`/api/cart`).then(data => {\n      for (let el of data.contents) {\n        this.cartItems.push(el);\n      }\n    });\n  },\n\n  template: `<div>\n                <button class=\"btnCart\" type=\"button\" @click='showCart = !showCart'>\n                <img class=\"cartIcon\" src=\"images/cart.svg\" alt=\"cart-icon\">Корзина</button>\n                <div class=\"cartBlock\" v-show=\"showCart\">\n                    <p class=\"cart-data\" v-if=\"!cartItems.length\">Нет данных</p>\n                    <cart-item \n                    v-for=\"item of cartItems\" \n                    :cart-item=\"item\"\n                    @remove=\"remove\"></cart-item>\n                </div>\n                </div>`\n});\nVue.component('cart-item', {\n  props: ['cartItem'],\n  template: `<div class=\"cart-item\">\n                <div class=\"product-bio\">\n                    <div class=\"product-desc\">\n                        <p class=\"product-title\">{{cartItem.product_name}}</p>\n                        <p class=\"product-quantity\">Quantity: {{cartItem.quantity}}</p>\n                        <p class=\"product-single-price\">{{cartItem.price}} руб. за шт.</p>\n                    </div>\n                </div>\n                <div class=\"right-block\">\n                    <p class=\"product-price\">Всего: {{cartItem.quantity*cartItem.price}} руб.</p>\n                    <button class=\"del-btn\" @click=\"$emit('remove', cartItem)\">&times;</button>\n                </div>\n            </div>`\n});\n\n//# sourceURL=webpack://javascript_pro/./public/js/cart-comp.js?");

/***/ }),

/***/ "./public/js/error-comp.js":
/*!*********************************!*\
  !*** ./public/js/error-comp.js ***!
  \*********************************/
/***/ (() => {

eval("Vue.component('data-error', {\n  data() {\n    return {\n      errorMsg: '' // errorMsg: \"Не удалось выполнить запрос к серверу!\"\n\n    };\n  },\n\n  template: `<div class=\"error-data\" v-if=\"errorMsg\">\n                    <h3>\n                    <button class=\"close-btn\" @click=\"setText('')\">&times;</button>\n                    {{errorMsg}}</h3>\n                </div>`\n});\n\n//# sourceURL=webpack://javascript_pro/./public/js/error-comp.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const app = new Vue({\n  el: '#app',\n  methods: {\n    getFile(url) {\n      return fetch(url).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    },\n\n    postFile(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    },\n\n    putFile(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    },\n\n    delFile(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    }\n\n  }\n});\n\n//# sourceURL=webpack://javascript_pro/./public/js/main.js?");

/***/ }),

/***/ "./public/js/product-comp.js":
/*!***********************************!*\
  !*** ./public/js/product-comp.js ***!
  \***********************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      catalogUrl: '/catalogData.json',\n      filtered: [],\n      products: []\n    };\n  },\n\n  mounted() {\n    this.$parent.getFile(`api/products`).then(data => {\n      for (let item of data) {\n        this.products.push(item);\n        this.filtered.push(item);\n      }\n    });\n  },\n\n  methods: {\n    filter(searchLine) {\n      const regexp = new RegExp(searchLine, 'i');\n      this.filtered = this.products.filter(item => regexp.test(item.product_name));\n    }\n\n  },\n  template: `<div class=\"products\">\n                <product v-for=\"product of filtered\"\n                :img=\"product.img\"\n                :product = \"product\"></product>\n            </div>`\n});\nVue.component('product', {\n  props: ['product', 'img'],\n  template: `<div class=\"product-item\">\n                    <img class=\"product-img\" :src=\"img\" :alt=\"product.product_name\">\n                    <div class=\"desc\">\n                        <h3>{{product.product_name}}</h3>\n                        <p>{{product.price}}</p>\n                        <button class=\"buyBtn\" @click=\"$root.$refs.cart.addProduct(product)\">Купить</button>\n                    </div>    \n               </div>`\n});\n\n//# sourceURL=webpack://javascript_pro/./public/js/product-comp.js?");

/***/ }),

/***/ "./public/js/search-comp.js":
/*!**********************************!*\
  !*** ./public/js/search-comp.js ***!
  \**********************************/
/***/ (() => {

eval("Vue.component('search', {\n  data() {\n    return {\n      searchLine: ''\n    };\n  },\n\n  template: `<form action=\"#\" method=\"post\" class=\"search-form\"  @submit.prevent='$parent.$refs.products.filter(searchLine)'>\n                    <input type=\"text\" class=\"search-field\" v-model='searchLine'>\n                    <button type=\"submit\" class=\"btn-search\">\n                        <i class=\"fas fa-search\"></i>\n                    </button>\n                </form>`\n});\n\n//# sourceURL=webpack://javascript_pro/./public/js/search-comp.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/cart-comp.js"]();
/******/ 	__webpack_modules__["./public/js/error-comp.js"]();
/******/ 	__webpack_modules__["./public/js/search-comp.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/product-comp.js"]();
/******/ 	
/******/ })()
;