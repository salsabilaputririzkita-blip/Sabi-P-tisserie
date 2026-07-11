


const products = [

{
id:1,
name:"Sabié Petite Love Cake",
category:"cake",
price:45000,
priceText:"Rp45.000 - Rp60.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/c5/78/8c/c5788c1b9e75be6d4e22ff503acff2c2.jpg"
},

{
id:2,
name:"Sabié Maison Macaron",
category:"dessert",
price:10000,
priceText:"Rp10.000 - Rp50.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/c6/28/cc/c628ccbd3e63a6473219a757360042b4.jpg"
},

{
id:3,
name:"Sabié Cupcake Bloom",
category:"cake",
price:25000,
priceText:"Rp25.000 - Rp60.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/1200x/04/9b/0d/049b0dcb075961e8b51c43fffd5b5c06.jpg"
},

{
id:4,
name:"Sabié Blush Pretzel",
category:"dessert",
price:15000,
priceText:"Rp15.000 - Rp30.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/1200x/85/76/96/8576960db7d3a3c9980b6510c1c729da.jpg"
},

{
id:5,
name:"Sabié Cloud Donut",
category:"dessert",
price:20000,
priceText:"Rp20.000 - Rp40.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/52/53/da/5253da8a8c89801db4d7f1b025ea13a7.jpg"
},

{
id:6,
name:"Sabié Sugar Art Cookies",
category:"dessert",
price:10000,
priceText:"Rp10.000 - Rp50.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/1200x/d7/22/c0/d722c06729159b52bcbda52f69ca908f.jpg"
},

{
id:7,
name:"Sabié Signature Chunk Cookie",
category:"dessert",
price:35000,
priceText:"Rp35.000 - Rp90.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/85/31/22/853122abc5d9bc44b643e613f06b73c4.jpg"
},

{
id:8,
name:"Sabié Fruit Tart",
category:"dessert",
price:45000,
priceText:"Rp45.000 - Rp60.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/9b/4a/ec/9b4aec1adac031eb255a484783fcd3b1.jpg"
},

{
id:9,
name:"Sabié Mochi Amour",
category:"dessert",
price:80000,
priceText:"Rp80.000 - Rp100.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/63/e9/2d/63e92dfa050b5bef8d83011022f6df99.jpg"
},

{
id:10,
name:"Sabié Chocolate Atelier Brownies",
category:"cake",
price:45000,
priceText:"Rp45.000 - Rp60.000",
custom:true,
desc:"🎀 Harga menyesuaikan request dekorasi customer",
img:"https://i.pinimg.com/736x/ce/3f/12/ce3f12279e485ec65f3daf16763b8a81.jpg"
}

];





let cart = JSON.parse(localStorage.getItem("cart")) || [];






function displayProducts(data){


let area =
document.getElementById("productList");


area.innerHTML="";



data.forEach(product=>{


area.innerHTML +=`

<div class="swiper-slide">

<div class="card">

<img src="${product.img}">

<h3>${product.name}</h3>

<p>${product.desc}</p>

<p class="price">
${product.priceText || "Rp " + product.price.toLocaleString("id-ID")}
</p>

<button class="btn"
onclick="addCart(${product.id})">
Tambah Cart
</button>


</div>

</div>

`;


});


}



if(document.getElementById("productList")){

displayProducts(products);

}








// SEARCH


if(document.getElementById("search")){

document
.getElementById("search")
.addEventListener("keyup",function(){

let hasil =
products.filter(p=>

p.name.toLowerCase()
.includes(this.value.toLowerCase())

);

displayProducts(hasil);

});

}








// FILTER CATEGORY


if(document.getElementById("category")){

document
.getElementById("category")
.onchange=function(){


if(this.value=="all"){


displayProducts(products);


}else{


displayProducts(

products.filter(
p=>p.category==this.value
)

);


}


};

}





// CART


function addCart(id){


let product =
products.find(
p=>p.id==id
);



let check =
cart.find(
p=>p.id==id
);



if(check){

check.qty++;

}else{


cart.push({

...product,

qty:1

});


}



saveCart();

showToast();


}




function saveCart(){

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

showCart();

updateCartCount();

}



function showCart(){

let area=document.getElementById("cartList");

if(!area){

return;

}



cart=JSON.parse(localStorage.getItem("cart"))||[];

area.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total+=item.price*item.qty;

area.innerHTML+=`

<div class="cart-item">

<img src="${item.img}" class="cart-img">

<div class="cart-info">

<h3>${item.name}</h3>

<p class="cart-price">

Rp ${item.price.toLocaleString("id-ID")}

</p>

<p class="product-tag">
🎀 Handmade • Custom Request Available
</p>

<p>

Jumlah :

<button class="qty-btn" onclick="minus(${index})">

−

</button>

<strong>${item.qty}</strong>

<button class="qty-btn" onclick="plus(${index})">

+

</button>

</p>

<button class="remove-btn" onclick="removeCart(${index})">

🗑️ Hapus

</button>

</div>

</div>

`;

});

document.getElementById("total").innerHTML=

total.toLocaleString("id-ID");

document.getElementById("subtotal").innerHTML =
total.toLocaleString("id-ID");

}







showCart();







function plus(index){

cart[index].qty++;

saveCart();

}




function minus(index){


if(cart[index].qty>1){

cart[index].qty--;

}


saveCart();


}




function removeCart(index){


cart.splice(index,1);


saveCart();


}





// CHECKOUT



function finishPayment(){

let nomorPesanan = "SB" + Date.now();

localStorage.setItem("orderNumber", nomorPesanan);

localStorage.removeItem("cart");

window.location.href = "success.html";

}

function updateCartCount(){

let jumlah = 0;

cart.forEach(item=>{

jumlah += item.qty;

});

if(document.getElementById("cartCount")){

document.getElementById("cartCount").innerHTML = jumlah;

}

}






// GOOGLE ANALYTICS DUMMY


console.log(

"Google Analytics aktif"

);


function requestWA(productName){


let nomor = "083829807714"; // Ganti dengan nomor WhatsApp bisnis Anda


let pesan = 
"Halo Sabié Pâtisserie 🎀\n\nSaya ingin request produk: "
+
productName
+
"\n\nDetail request:";



let link = 
"https://wa.me/"
+
nomor
+
"?text="
+
encodeURIComponent(pesan);



window.open(link,"_blank");


}


console.log(

"Metrik: Bounce Rate, Conversion Rate, Page View"

);


if(document.getElementById("cartList")){

showCart();

}

updateCartCount();

function showToast(){

let toast = document.getElementById("toast");

if(!toast) return;

toast.classList.add("show");

setTimeout(function(){

toast.classList.remove("show");

},2000);

}function showOrderSummary(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let summary = document.getElementById("orderSummary");

if(cart.length==0){

summary.innerHTML="<b>Keranjang masih kosong.</b>";

return;

}

let html="<h3>🛍 Ringkasan Pesanan</h3>";

let total=0;

cart.forEach(item=>{

let subtotal=item.price*item.qty;

total+=subtotal;

html+=`

<p>

${item.name}

x ${item.qty}

<span style="float:right;">

Rp ${subtotal.toLocaleString("id-ID")}

</span>

</p>

`;

});

html+=`

<hr>

<h3>

Total

<span style="float:right;">

Rp ${total.toLocaleString("id-ID")}

</span>

</h3>

`;

summary.innerHTML=html;

}

function checkout(){

let nama=document.getElementById("customerName").value;

let alamat=document.getElementById("address").value;

let metode=document.getElementById("payment").value;

if(nama==""||alamat==""){

alert("Lengkapi data terlebih dahulu 🎀");

return;

}

let detail=document.getElementById("paymentDetail");

if(metode=="qris"){

detail.innerHTML=`

<div class="payment-card">

<h3>Scan QRIS</h3>

<img src="https://i.pinimg.com/736x/db/cf/dc/dbcfdc5292495d94ad9862a3fe6add20.jpg" class="qris-img">

<p>Silakan scan QR Code menggunakan aplikasi pembayaran.</p>

<button class="btn" onclick="finishPayment()">

Saya Sudah Bayar

</button>

</div>

`;

}

else if(metode=="va"){

detail.innerHTML=`

<div class="payment-card">

<h3>Virtual Account</h3>

<p><b>Bank BCA</b></p>

<h2>88081234567890</h2>

<button class="btn" onclick="finishPayment()">

Saya Sudah Bayar

</button>

</div>

`;

}

else if(metode=="bank"){

detail.innerHTML=`

<div class="payment-card">

<h3>Transfer Bank</h3>

<p><b>Bank Mandiri</b></p>

<h2>1234567890</h2>

<button class="btn" onclick="finishPayment()">

Saya Sudah Bayar

</button>

</div>

`;

}

else{

detail.innerHTML=`

<div class="payment-card">

<h3>Cash On Delivery</h3>

<p>Pembayaran dilakukan saat pesanan diterima.</p>

<button class="btn" onclick="finishPayment()">

Konfirmasi Pesanan

</button>

</div>

`;

}

}

function updateCartCount(){

let jumlah = 0;

cart.forEach(item=>{

jumlah += item.qty;

});

if(document.getElementById("cartCount")){

document.getElementById("cartCount").innerHTML = jumlah;

}

}

if(document.getElementById("orderSummary")){

showOrderSummary();

}

// ===== BACK TO TOP =====

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    // Tombol Back To Top
    if(backToTop){

        if(window.scrollY > 300){

            backToTop.style.display = "block";

        }else{

            backToTop.style.display = "none";

        }

    }

    // Navbar berubah saat scroll
    const header = document.querySelector("header");

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
