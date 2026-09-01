const defaultProducts=[
  {id:1,name:'Traditional Bodo Aronai',category:'Aronai',price:1299,old:1599,emoji:'🧣'},
  {id:2,name:'Bodo Dokhona',category:'Dokhona',price:1199,old:1499,emoji:'🥻'},
  {id:3,name:'Bodo Stole',category:'Stole',price:699,old:899,emoji:'🧵'},
  {id:4,name:'Dress Material Set',category:'Dress Material',price:1499,old:1799,emoji:'👗'},
  {id:5,name:'Handmade Bodo Bag',category:'Accessories',price:899,old:1099,emoji:'👜'},
  {id:6,name:'Aronai Muffler',category:'Aronai',price:599,old:799,emoji:'🧣'},
  {id:7,name:'Bodo Traditional Scarf',category:'Stole',price:749,old:999,emoji:'🧣'},
  {id:8,name:'Handwoven Gift Set',category:'New Arrivals',price:999,old:1299,emoji:'🎁'}
];
const products=JSON.parse(localStorage.getItem('ms_products')||'null')||defaultProducts;
let c=JSON.parse(localStorage.getItem('ms_cart')||'[]');
let activeCategory='';
function save(){localStorage.setItem('ms_cart',JSON.stringify(c))}
function money(n){return '₹'+Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})}
function render(){
  const q=(document.getElementById('search').value||'').toLowerCase().trim();
  const list=products.filter(p=>(!activeCategory||p.category===activeCategory)&&(!q||p.name.toLowerCase().includes(q)||String(p.category||'').toLowerCase().includes(q)));
  document.getElementById('grid').innerHTML=list.length?list.map(p=>`<article class="card"><div class="photo">${p.image?`<img src="${p.image}" alt="${p.name}">`:`<span class="product-art">${p.emoji||'🧵'}</span>`}</div><div class="info"><h3>${p.name}</h3><div class="rating">★★★★★ <span>(12)</span></div><p class="price">${money(p.price)} <span class="old">${money(p.old||0)}</span></p><button class="add" onclick="add(${p.id})">Add to Cart</button></div></article>`).join(''):'<p style="grid-column:1/-1;text-align:center;padding:40px">No products found.</p>';
}
function filterCategory(cat){activeCategory=cat;render()}
function clearCategory(){activeCategory='';document.getElementById('search').value='';render()}
function add(id){const p=products.find(x=>x.id===id);if(p){c.push(p);save();update();cart(true)}}
function update(){document.getElementById('count').textContent=c.length;document.getElementById('items').innerHTML=c.length?c.map((p,i)=>`<div class="row">${p.image?`<img class="row-thumb" src="${p.image}" alt="">`:`<span class="row-thumb" style="display:grid;place-items:center;font-size:28px">${p.emoji||'🧵'}</span>`}<div><b>${p.name}</b><br>${money(p.price)}<br><button onclick="removeItem(${i})">Remove</button></div></div>`).join(''):'<p>Your cart is empty.</p>';document.getElementById('total').textContent='Total: '+money(c.reduce((s,p)=>s+Number(p.price||0),0))}
function removeItem(i){c.splice(i,1);save();update()}
function cart(openOnly=false){const d=document.getElementById('drawer'),s=document.getElementById('shade');if(openOnly||!d.classList.contains('open')){d.classList.add('open');s.classList.add('show')}else{d.classList.remove('open');s.classList.remove('show')}update()}
function checkout(){alert('Online payment checkout placeholder. Connect Razorpay/Stripe/payment API for live payments. COD is disabled.')}
render();update();
