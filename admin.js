function get(){return JSON.parse(localStorage.getItem('ms_products')||'null')||[
{id:1,name:'Traditional Bodo Aronai',category:'Aronai',price:1299,old:1599,emoji:'🧣'},
{id:2,name:'Bodo Dokhona',category:'Dokhona',price:1199,old:1499,emoji:'🥻'},
{id:3,name:'Bodo Stole',category:'Stole',price:699,old:899,emoji:'🧵'}]}
function put(p){localStorage.setItem('ms_products',JSON.stringify(p))}
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
function render(){let p=get();document.getElementById('pc').textContent=p.length;document.getElementById('table').innerHTML=p.map((x,i)=>`<tr><td>${x.image?`<img class="product-thumb" src="${x.image}" alt="">`:`<span class="product-thumb" style="display:grid;place-items:center;font-size:28px">${x.emoji||'🧵'}</span>`}</td><td><b>${x.name}</b></td><td>${x.category||'Aronai'}</td><td>${money(x.price)}</td><td><button class="del" onclick="del(${i})">Delete</button></td></tr>`).join('')}
function openForm(){document.getElementById('modal').classList.add('show')}
function closeForm(){document.getElementById('modal').classList.remove('show');document.getElementById('preview').src=''}
function preview(e){let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{document.getElementById('preview').src=r.result};r.readAsDataURL(f)}
function saveProduct(){let n=document.getElementById('name').value.trim(),cat=document.getElementById('category').value,pr=+document.getElementById('price').value,old=+document.getElementById('old').value||0,f=document.getElementById('photo').files[0];if(!n||!pr)return alert('Name and price required');let done=img=>{let p=get();p.push({id:Date.now(),name:n,category:cat,price:pr,old,image:img||'',emoji:'🧵'});put(p);render();closeForm()};if(f){let r=new FileReader();r.onload=()=>done(r.result);r.readAsDataURL(f)}else done('')}
function del(i){let p=get();if(confirm('Delete product?')){p.splice(i,1);put(p);render()}}render();
