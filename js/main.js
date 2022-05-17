var app = new Vue({
    el: '#app, .items, .item, .main',
    data: {
        products:[
            {id:1, title:"Abkhaz", short_text:"Not too sweet, with a refreshing sourness and a pronounced aroma", image:"Abkhaz.jpeg", desc:"Not too sweet, with a refreshing sourness and a pronounced aroma. The peel of the 'Abkhazians' is light, yellow, the flesh is practically pitted."},
            {id:2, title:"Turkish", short_text:"Small fruits, with a yellowish peel and pulp with a sour taste. Contains many bones.", image:"Turkish.jpeg", desc:"Small fruits, with a yellowish peel and pulp with a sour taste. Contains many bones."},
            {id:3, title:"Spanish", short_text:"Large, often 'loose' fruits with a thick peel with large pores", image:"Spanish.jpeg", desc:"Large, often 'loose' fruits with a thick peel with large pores. Juicy and sweet, but they usually have a lot of seeds."},
            {id:4, title:"Moroccan", short_text:"The fruits are not round, but slightly flattened in shape. Sweet, but not sugary flesh", image:"Moroccan.jpeg", desc:"The fruits are not round, but slightly flattened in shape. Sweet, but not sugary flesh with a thin bright orange, sometimes even reddish skin. The skin is thin and easy to peel. There are practically no bones."},
            {id:5, title:"Clementine (Algerian tangerine)", short_text:"Fruits juicy, with a pleasant tart taste, usually without seeds.", image:"Clementine_Algerian_tangerine.jpeg", desc:"Fruits with a yellow-orange skin that is easy to peel, quite large, juicy, with a pleasant tart taste, usually without seeds."}
        ],
        product:[],
        cart:[],
        cartIds:[],
        contactFields:[],
        btnVisible: 0,
        orderVisible: 0
    },
    mounted:function() {
        this.getProducts();
        this.checkInCart();
        this.getCart();
        console.log(this.cartIds);
        console.log(this.contactFields);
    },
    methods: {
        addItem:function(id){
            window.localStorage.setItem('prod',id)
        },
        getProducts:function(){
            if(window.location.hash) {
                var id = window.location.hash.replace('#','');
                if(this.products && this.products) {
                   for(i in this.products) {
                       if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                   } 
                }
            }
        },
        addToCart:function(id) {
            var cart = [];
            if(window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id))==-1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible=1;
            }
        },
        checkInCart:function() {
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !=-1 ) this.btnVisible=1;
        },
        getCart:function() {
            for(i in localStorage.getItem('cart')) {
                for(p in this.products) {
                    if(this.products[p].id == localStorage.getItem('cart').split(',')[i]) {
                       this.cart.push(this.products[p]);
                       this.cartIds.push(this.products[p].id);
                    }
                }
            }
        },
        removeFromCart:function(id) {
            for(i in this.cart) {
                if(this.cart[i].id == id) {
                    this.cart.splice(i, 1);
                    this.cartIds.splice(i, 1);
                    window.localStorage.setItem('cart', this.cartIds.join());
                }
            }
        },
        makeOrder:function() {
            this.orderVisible = 1;
            this.cart = [];
            this.cartIds = [];
            window.localStorage.removeItem('cart');
        }
    }
});
