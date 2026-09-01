const defaults=[
{id:1,name:'Traditional Bodo Aronai',category:'Aronai',price:1299,old:1599,stock:10,emoji:'🧣',description:'Traditional handwoven Bodo Aronai.'},
{id:2,name:'Bodo Dokhona',category:'Dokhona',price:1199,old:1499,stock:10,emoji:'🥻',description:'Traditional Bodo Dokhona.'},
{id:3,name:'Bodo Stole',category:'Stole',price:699,old:899,stock:10,emoji:'🧵',description:'Handwoven Bodo stole.'},
{id:4,name:'Dress Material Set',category:'Dress Material',price:1499,old:1799,stock:10,emoji:'👗',description:'Traditional dress material set.'},
{id:5,name:'Handmade Bodo Bag',category:'Accessories',price:899,old:1099,stock:10,emoji:'👜',description:'Handmade traditional bag.'},
{id:6,name:'Aronai Muffler',category:'Aronai',price:599,old:799,stock:10,emoji:'🧣',description:'Traditional Aronai muffler.'},
{id:7,name:'Bodo Traditional Scarf',category:'Stole',price:749,old:999,stock:10,emoji:'🧣',description:'Traditional Bodo scarf.'},
{id:8,name:'Handwoven Gift Set',category:'New Arrivals',price:999,old:1299,stock:10,emoji:'🎁',description:'Handwoven gift set.'}
];
function get(){return JSON.parse(localStorage.getItem('ms_products')||'null')||defaults}
function put(p){localStorage.setItem('ms_products',JSON.stringify(p))}
function money(n){return '₹'+Number(n||0).toLocaleString('en-IN')}
let editingId=null;
function render(){
 const q=(document.getElementById('adminSearch')?.value||'').toLowerCase().trim();
 const cat=document.getElementById('adminCategory')?.value||'';
 const p=get().filter(x=>(!q||x.name.toLowerCase().includes(q)||String(x.category).toLowerCase().includes(q))&&(!cat||x.category===cat));
 document.getElementById('pc').textContent=get().length;
 document.getElementById('table').innerHTML=p.length?p.map(x=>`<tr><td>${x.image?`<img class="product-thumb" src="${x.image}" alt="${x.name}">`:`<span class="product-thumb" style="display:grid;place-items:center;font-size:28px">${x.emoji||'🧵'}</span>`}</td><td><b>${x.name}</b><br><small>${x.description||''}</small></td><td>${x.category||'Aronai'}</td><td>${money(x.price)}<br><small>${x.old?`MRP ${money(x.old)}`:''}</small></td><td><input type="number" min="0" value="${Number(x.stock||0)}" onchange="setStock(${x.id},this.value)" style="width:75px;padding:7px"><br><small>${Number(x.stock||0)>0?'In stock':'Out of stock'}</small></td><td><button onclick="editProduct(${x.id})">Edit</button> <button class="del" onclick="del(${x.id})">Delete</button></td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;padding:30px">No products found.</td></tr>';
}
function openForm(id=null){
 editingId=id;document.getElementById('modal').classList.add('show');document.getElementById('modalTitle').textContent=id?'Edit Product':'Add Product';
 if(id){const x=get().find(p=>p.id===id);if(!x)return;document.getElementById('name').value=x.name;document.getElementById('category').value=x.category;document.getElementById('price').value=x.price;document.getElementById('old').value=x.old||'';document.getElementById('stock').value=x.stock??0;document.getElementById('description').value=x.description||'';document.getElementById('preview').src=x.image||''}else{['name','price','old','stock','description'].forEach(id=>document.getElementById(id).value='');document.getElementById('stock').value=0;document.getElementById('category').value='Aronai';document.getElementById('preview').src=''}
}
function editProduct(id){openForm(id)}
function closeForm(){document.getElementById('modal').classList.remove('show');editingId=null;document.getElementById('photo').value='';document.getElementById('preview').src=''}
function preview(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>document.getElementById('preview').src=r.result;r.readAsDataURL(f)}
function saveProduct(){
 const n=document.getElementById('name').value.trim(),cat=document.getElementById('category').value,pr=Number(document.getElementById('price').value),old=Number(document.getElementById('old').value)||0,stock=Math.max(0,Number(document.getElementById('stock').value)||0),description=document.getElementById('description').value.trim(),f=document.getElementById('photo').files[0];
 if(!n||pr<=0)return alert('Product name and valid price are required');
 const finish=(img)=>{let p=get();if(editingId){const i=p.findIndex(x=>x.id===editingId);if(i>=0)p[i]={...p[i],name:n,category:cat,price:pr,old,stock,description,image:img||p[i].image||''}}else p.push({id:Date.now(),name:n,category:cat,price:pr,old,stock,description,image:img||'',emoji:'🧵'});put(p);render();closeForm();alert(editingId?'Product updated successfully':'Product added successfully')};
 if(f){const r=new FileReader();r.onload=()=>finish(r.result);r.readAsDataURL(f)}else finish('')
}
function setStock(id,value){let p=get();const x=p.find(x=>x.id===id);if(x){x.stock=Math.max(0,Number(value)||0);put(p);render()}}
function del(id){if(!confirm('Delete this product?'))return;put(get().filter(x=>x.id!==id));render()}
render();
