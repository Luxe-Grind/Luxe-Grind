const products = [
  {
    id: 1,
    name: "Luxe Logo Tee",
    cat: "tees",
    price: 170,
    usd: 25,
    style: "black",
    image: "images/05-luxe-grind-signature-tee-black.png"
  },
  {
    id: 2,
    name: "Heavyweight Oversized Tee",
    cat: "tees",
    price: 200,
    usd: 30,
    style: "cream",
    image: "images/07-luxe-grind-legacy-tee-beige-back.png"
  },
  {
    id: 3,
    name: "Essential Hoodie",
    cat: "hoodies",
    price: 340,
    usd: 50,
    style: "black",
    image: "images/01-luxe-grind-signature-hoodie-black.png"
  },
  {
    id: 4,
    name: "Signature Tracksuit",
    cat: "tracksuits",
    price: 680,
    usd: 100,
    style: "gold",
    image: "images/luxe-grind-performance-tracksuit.png"
  },
  {
    id: 5,
    name: "Premium Cap",
    cat: "accessories",
    price: 120,
    usd: 18,
    style: "black",
    image: "images/premium-cap.jpg"
  },
  {
    id: 6,
    name: "Crossbody Bag",
    cat: "accessories",
    price: 180,
    usd: 27,
    style: "black",
    image: "images/luxe-grind-crossbody-bag.png"
  }
];

function renderProducts(list=products){
  productsEl.innerHTML = list.filter(p=>currentFilter==="all"||p.cat===currentFilter).map(p=>`
    <article class="product ${p.style}">
      <div class="product-img">
  <img src="${p.image}" alt="${p.name}" loading="lazy">
  <span class="badge">NEW</span>
</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">TT$${p.price.toFixed(2)} <span>US$${p.usd.toFixed(2)}</span></div>
        <button class="add" onclick="addToCart(${p.id})">ADD TO BAG</button>
      </div>
    </article>`).join("");
}
function save(){localStorage.setItem("luxeGrindCart",JSON.stringify(cart));}
function addToCart(id){
  const found=cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({id,qty:1});
  save(); renderCart(); updateCount();
  document.getElementById("drawer").classList.add("open");
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart();updateCount();}
function renderCart(){
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<p style="color:#777;font-size:12px;padding:30px 0">Your bag is empty. Start with The Foundation Collection.</p>';document.getElementById("cartTotal").textContent="TT$0.00";return;}
 let total=0;
 el.innerHTML=cart.map(item=>{
   const p=products.find(x=>x.id===item.id); total+=p.price*item.qty;
   return `<div class="cart-row"><div class="cart-thumb">LG</div><div><h4>${p.name}</h4><small>TT$${p.price.toFixed(2)} × ${item.qty}<br>US$${p.usd.toFixed(2)} each</small></div><button class="remove" onclick="removeFromCart(${p.id})">×</button></div>`;
 }).join("");
 document.getElementById("cartTotal").textContent=`TT$${total.toFixed(2)}`;
}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((a,b)=>a+b.qty,0);}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 currentFilter=btn.dataset.filter;renderProducts();
}));
document.getElementById("cartBtn").onclick=()=>document.getElementById("drawer").classList.add("open");
document.getElementById("closeCart").onclick=()=>document.getElementById("drawer").classList.remove("open");
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchOverlay").classList.add("open");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchOverlay").classList.remove("open");
document.getElementById("searchInput").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase(); renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)));
});
document.getElementById("whatsappCheckout").onclick=()=>{
 if(!cart.length)return alert("Your bag is empty.");
 let msg="LUXE GRIND ORDER REQUEST%0A%0A";
 cart.forEach(i=>{const p=products.find(x=>x.id===i.id);msg+=`${encodeURIComponent(p.name)} x ${i.qty} — TT$${(p.price*i.qty).toFixed(2)}%0A`});
 msg+="%0APlease confirm my order, sizes, colors, delivery and payment options.";
 window.open("https://wa.me/18683469138?text="+msg,"_blank");
};
document.getElementById("newsletter").addEventListener("submit",e=>{
 e.preventDefault();document.getElementById("newsletterMsg").textContent="You're on the list. Welcome to the Grind.";
 e.target.reset();
});
document.querySelectorAll(".drawer,.search-overlay").forEach(x=>x.addEventListener("click",e=>{if(e.target===x)x.classList.remove("open")}));
renderProducts();renderCart();updateCount();
// MOBILE MENU
const menuBtn = document.querySelector(".menu-btn");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    document.querySelector(".desktop-nav").classList.toggle("mobile-open");
  });
}

// Close mobile menu when a navigation link is selected
document.querySelectorAll(".desktop-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".desktop-nav").classList.remove("mobile-open");
  });
});

// SORT PRODUCTS
document.getElementById("sortBtn").addEventListener("click", () => {
  const button = document.getElementById("sortBtn");

  if (button.dataset.sort === "low") {
    button.dataset.sort = "high";
    button.textContent = "SORT: PRICE HIGH ↕";

    const sorted = [...products].sort((a,b) => b.price - a.price);
    renderProducts(sorted);
  } else {
    button.dataset.sort = "low";
    button.textContent = "SORT: PRICE LOW ↕";

    const sorted = [...products].sort((a,b) => a.price - b.price);
    renderProducts(sorted);
  }
});
