/* FUNCIONES (JavaScript): productos, carrito, portada, login y páginas de detalle */
const P=[
 ["Erba Pura EDP","Xerjoff","Nicho",649,899,"#167f86"],
 ["Dior Sauvage EDP","Dior","Diseñador",399,549,"#a4476b"],
 ["Khamrah Qahwa EDP","Lattafa","Árabes",249,399,"#3b2a14"],
 ["Valentino Uomo Born in Roma Intense","Valentino","Diseñador",499,699,"#2f3a5c"],
 ["Mandarin Sky","French Avenue","Árabes",199,329,"#b58a2a"],
 ["Montale Paris Arabian Tonka EDP","Montale","Nicho",579,799,"#8a8f99"],
 ["Asad Bourbon","Lattafa","Árabes",289,449,"#7a3b1d"],
 ["Versace Eros EDP","Versace","Diseñador",349,499,"#4d7a6a"]
];
const PRODUCT_IMAGES = {
0:["imagenes/perfumes%20nicho/erbapuraminiatura.jpeg","imagenes/perfumes%20nicho/erbapura2.jpeg","imagenes/perfumes%20nicho/erbapura3.jpeg","imagenes/perfumes%20nicho/erbapura4.jpeg"],
1:["imagenes/perfumes%20dise%C3%B1ador/Diorsauvageminiatura.jpeg","imagenes/perfumes%20dise%C3%B1ador/Diorsauvage2.jpeg","imagenes/perfumes%20dise%C3%B1ador/Diorsauvage3.jpeg","imagenes/perfumes%20dise%C3%B1ador/Diorsauvage4.jpeg"],
2:["imagenes/perfumes%20arabes/khamrahqahwaminiatura.jpeg","imagenes/perfumes%20arabes/khamrahqahwa2.jpeg","imagenes/perfumes%20arabes/khamrahqahwa3.jpeg","imagenes/perfumes%20arabes/khamrahqahwa4.jpeg"],
3:["imagenes/perfumes%20dise%C3%B1ador/ValentinoUomoBorninRoma%20IntenseMiniatura.jpeg","imagenes/perfumes%20dise%C3%B1ador/ValentinoUomoBorninRoma%20Intense2.jpeg","imagenes/perfumes%20dise%C3%B1ador/ValentinoUomoBorninRoma%20Intense3.jpeg","imagenes/perfumes%20dise%C3%B1ador/ValentinoUomoBorninRoma%20Intense4.jpeg"],
4:["imagenes/perfumes%20arabes/mandarinskyminiatura.jpeg","imagenes/perfumes%20arabes/mandarinsky2.jpeg","imagenes/perfumes%20arabes/mandarinsky3.jpeg","imagenes/perfumes%20arabes/mandarinsky4.jpeg"],
5:["imagenes/perfumes%20nicho/MontaleParis%20ArabiansTonkaEDPminiatura.jpeg","imagenes/perfumes%20nicho/MontaleParis%20ArabiansTonkaEDP2.jpeg","imagenes/perfumes%20nicho/MontaleParis%20ArabiansTonkaEDP3.jpeg","imagenes/perfumes%20nicho/MontaleParis%20ArabiansTonkaEDP4.jpeg"],
6:["imagenes/perfumes%20arabes/asadbourbonminiatura.jpeg","imagenes/perfumes%20arabes/asadbourbon2.jpeg","imagenes/perfumes%20arabes/asadbourbon3.jpeg","imagenes/perfumes%20arabes/asadbourbon4.jpeg"],
7:["imagenes/perfumes%20dise%C3%B1ador/VersaceErosEDPminiatura.jpeg","imagenes/perfumes%20dise%C3%B1ador/VersaceErosEDP2.jpeg","imagenes/perfumes%20dise%C3%B1ador/VersaceErosEDP3.jpeg","imagenes/perfumes%20dise%C3%B1ador/VersaceErosEDP4.jpeg"]};
const cats=["Todos","Lanzamientos","Nicho","Diseñador","Árabes"];
const $=s=>document.querySelector(s);
const money=n=>"S/ "+n.toFixed(2);
let cart={},cat="Todos";
function bottle(c){return `<svg viewBox="0 0 100 120" width="46%" aria-hidden="true"><rect x="40" y="6" width="20" height="14" rx="2" fill="#b8924a"/><rect x="44" y="20" width="12" height="8" fill="#8a6c34"/><rect x="22" y="28" width="56" height="86" rx="8" fill="${c}"/><rect x="30" y="38" width="8" height="60" rx="4" fill="#fff" opacity=".22"/><rect x="38" y="62" width="34" height="22" rx="2" fill="#f3ecdc" opacity=".85"/></svg>`}
function renderFilters(){$("#filters").innerHTML=cats.map(c=>`<button class="chip ${c===cat?"on":""}" data-c="${c}">${c}</button>`).join("")}
const card=(p,i)=>`
   <div class="card rv"><a class="pic" href="#perfume-${i}"><img src="${PRODUCT_IMAGES[i][0]}" alt="${p[0]}" onerror="this.remove()"><span class="tag">-${Math.round((1-p[3]/p[4])*100)} %</span>${bottle(p[5])}</a>
   <div class="brand">${p[1]}</div><a class="name" href="#perfume-${i}">${p[0]}</a>
   <div><span class="old">${money(p[4])}</span><span class="now">${money(p[3])}</span></div>
   <div class="cuotas">6 cuotas de ${money(p[3]/6)} sin interés</div>
   <button class="btn" data-add="${i}">Añadir al carrito</button></div>`;
const list=c=>P.map((p,i)=>({p,i})).filter(o=>c==="Todos"||o.p[2]===c||(c==="Lanzamientos"&&o.i>=4));
function renderGrid(){$("#grid").innerHTML=list(cat).map(o=>card(o.p,o.i)).join("");watch()}
function renderCart(){
  const ids=Object.keys(cart);let n=0,t=0;
  $("#items").innerHTML=ids.length?ids.map(i=>{const q=cart[i],p=P[i];n+=q;t+=q*p[3];
    return `<div class="it"><div>${p[0]}<br><small>${money(p[3])}</small></div><div><button data-m="${i}">−</button> ${q} <button data-p="${i}">+</button></div></div>`}).join(""):`<div class="empty">Tu carrito está vacío</div>`;
  $("#cnt").textContent=n;$("#total").textContent=money(t);
  const msg=ids.map(i=>`${cart[i]} x ${P[i][0]}`).join(", ");
  $("#pay").href="https://wa.me/51900000000?text="+encodeURIComponent("Hola, quiero pedir: "+msg+". Total: "+money(t));
}
const drawer=$("#drawer");
document.addEventListener("click",e=>{
  const t=e.target;
  if(t.dataset.c){cat=t.dataset.c;renderFilters();renderGrid()}
  if(t.dataset.go){cat=t.dataset.go;renderFilters();renderGrid()}
  if(t.dataset.add){cart[t.dataset.add]=(cart[t.dataset.add]||0)+1;renderCart();drawer.classList.add("open")}
  if(t.dataset.p){cart[t.dataset.p]++;renderCart()}
  if(t.dataset.m){if(--cart[t.dataset.m]<=0)delete cart[t.dataset.m];renderCart()}
});
$("#open").onclick=()=>drawer.classList.add("open");
$("#close").onclick=()=>drawer.classList.remove("open");
const io=new IntersectionObserver(es=>{es.forEach((en,k)=>{if(en.isIntersecting){const el=en.target;el.style.transitionDelay=(k%4)*90+"ms";el.classList.add("in");setTimeout(()=>el.style.transitionDelay="",1000);io.unobserve(el)}})},{threshold:.12});
function watch(){document.querySelectorAll(".rv:not(.in)").forEach(e=>io.observe(e))}
document.querySelectorAll(".trust>div,.cat,.step,h2,.marq,.filters,.row,.about-t").forEach(e=>e.classList.add("rv"));
const slides=[...document.querySelectorAll(".slide")],dots=document.querySelector(".dots");let cur=0,timer;
slides.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Diapositiva "+(i+1));b.onclick=()=>{go(i);restart()};dots.appendChild(b)});
function go(i){cur=i;slides.forEach((s,k)=>s.classList.toggle("on",k===i));[...dots.children].forEach((d,k)=>d.classList.toggle("on",k===i))}
function restart(){clearInterval(timer);timer=setInterval(()=>go((cur+1)%slides.length),5000)}
go(0);restart();
const bar=document.getElementById("bar"),msgs=[bar.innerHTML,"Entrega en menos de 24 horas · <b>6 cuotas sin interés</b>","Paga con tarjeta o <b>Yape</b> · Compra 100 % segura"];let mi=0;
setInterval(()=>{bar.style.opacity=0;setTimeout(()=>{mi=(mi+1)%msgs.length;bar.innerHTML=msgs[mi];bar.style.opacity=1},400)},4000);
let mode="in",user=null;
const M=document.getElementById("modal"),g=id=>document.getElementById(id);
function setMode(m){mode=m;document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.t===m));g("r-name").hidden=g("r-pass2").hidden=m==="in";g("go").textContent=m==="in"?"Iniciar sesión":"Crear cuenta";g("msg").textContent=""}
function view(){g("v-form").hidden=!!user;g("v-out").hidden=!user;if(user)g("who").textContent="Sesión iniciada como "+user;g("login-open").textContent=user?"Hola, "+user.split(" ")[0]:"Ingresar"}
g("login-open").onclick=()=>{view();M.classList.add("open")};
g("mx").onclick=()=>M.classList.remove("open");
M.onclick=e=>{if(e.target===M)M.classList.remove("open")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")M.classList.remove("open")});
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>setMode(t.dataset.t));
g("go").onclick=()=>{const n=g("i-name").value.trim(),m=g("i-mail").value.trim(),p=g("i-pass").value,s=g("msg");s.className="msg";
 if(mode==="up"&&!n)return s.textContent="Escribe tu nombre.";
 if(!/^\S+@\S+\.\S+$/.test(m))return s.textContent="Ingresa un correo válido.";
 if(p.length<6)return s.textContent="La contraseña debe tener al menos 6 caracteres.";
 if(mode==="up"&&p!==g("i-pass2").value)return s.textContent="Las contraseñas no coinciden.";
 user=n||m.split("@")[0];g("i-pass").value=g("i-pass2").value="";s.className="msg ok";s.textContent=mode==="up"?"¡Cuenta creada!":"¡Bienvenido!";
 setTimeout(()=>{view();M.classList.remove("open")},700)};
g("logout").onclick=()=>{user=null;view();M.classList.remove("open")};
/* Datos de cada perfume (mismo orden que la lista P): descripción, acordes [nombre,%], género, duración, estela, intensidad (0-100), notas de salida, corazón y fondo, temporada y momento */
const CL={Ámbar:"#c58b2a",Especiado:"#a4552b",Amaderado:"#6b4a1c",Floral:"#d4608c",Dulce:"#8e6bd1",Frutal:"#7cb342",Oud:"#4a3320",Fresco:"#3fa6a0",Almizclado:"#9aa0a8",Cítrico:"#e0b72a"};
const D=[
["Erba Pura de Xerjoff: una fragancia de carácter frutal, vibrante y envolvente.",[["Frutal",55],["Dulce",25],["Almizclado",20]],60,85,80,75,["Notas frutales"],["Acorde frutal"],["Almizcle"],["Todo el año","Día y noche"]],
["Una fragancia floral elegante y femenina, con un corazón de rosas y un fondo suave y empolvado. Perfecta para el día a día y las ocasiones románticas.",[["Floral",50],["Dulce",30],["Frutal",20]],90,60,55,55,["Frambuesa","Lichi"],["Rosa","Peonía"],["Almizcle","Vainilla"],["Primavera · Verano","Día y noche"]],
["Un oud profundo y sofisticado de inspiración árabe, con matices resinosos y un fondo cálido que dura todo el día.",[["Oud",45],["Ámbar",30],["Especiado",25]],50,95,90,90,["Azafrán","Cardamomo"],["Oud","Rosa"],["Ámbar","Pachulí"],["Otoño · Invierno","Noche"]],
["Fragancia amaderada y moderna, con una salida fresca y un fondo elegante. Versátil para la oficina y las salidas.",[["Amaderado",45],["Fresco",35],["Especiado",20]],20,70,65,70,["Bergamota","Menta"],["Lavanda","Geranio"],["Cedro","Vetiver"],["Todo el año","Día y noche"]],
["Una fragancia dulce y luminosa con notas de ámbar dorado, miel y vainilla. Cálida, adictiva y de gran duración.",[["Dulce",45],["Ámbar",35],["Frutal",20]],55,90,85,80,["Mandarina","Dátil"],["Miel","Jazmín"],["Ámbar","Vainilla"],["Otoño · Invierno","Noche"]],
["Un floral blanco limpio y luminoso, con un toque de almizcle que deja una estela suave y refinada.",[["Floral",50],["Almizclado",30],["Cítrico",20]],80,50,45,45,["Pera","Limón"],["Jazmín","Azucena"],["Almizcle blanco","Cedro"],["Primavera · Verano","Día"]],
["Un oriental cremoso de vainilla y ámbar, con un fondo envolvente y reconfortante.",[["Ámbar",40],["Dulce",40],["Amaderado",20]],50,80,70,75,["Canela","Naranja"],["Vainilla","Haba tonka"],["Ámbar","Benjuí"],["Otoño · Invierno","Noche"]],
["Una rosa fresca y moderna, con acentos verdes y frutales y un fondo suave. Ligera y fácil de llevar.",[["Floral",40],["Fresco",35],["Frutal",25]],75,40,35,40,["Manzana verde","Grosella"],["Rosa","Té verde"],["Almizcle","Madera clara"],["Primavera · Verano","Día"]]
];
const F=["none","brightness(1.35)","saturate(.3)","hue-rotate(30deg)"];
function showP(i){
 const p=P[i],d=D[i],pr=p[3],nm=p[0].replace(/ (EDP|EDT|Parfum).*/,"");
 const sl=(t,v,L)=>`<div class="fc"><b>${t}</b><div class="sl"><i style="left:${v}%"></i></div><div class="lb">${L.map((x,k)=>`<span class="${k===(v<34?0:v<67?1:2)?"cur":""}">${x}</span>`).join("")}</div></div>`;
 const gallery=PRODUCT_IMAGES[i];
g("ppc").innerHTML=`<a class="back" href="#productos">← Volver a la tienda</a>
<div class="pgrid"><div><div class="gmain" id="gm"><img id="main-product-image" src="${gallery[0]}" alt="${p[0]}" onerror="this.remove()">${bottle(p[5])}</div>
<div class="thumbs">${gallery.map((src,k)=>`<button class="th${k?"":" on"}" data-gallery-src="${src}" aria-label="Ver fotografía ${k+1}"><img src="${src}" alt="Vista ${k+1} de ${p[0]}"></button>`).join("")}</div></div>
<div class="pinfo"><h1>${p[0]}</h1><div class="pr"><s>${money(p[4])}</s><b>${money(pr)}</b></div>
<div class="cuo"><b>Hasta 6 cuotas sin interés</b><small>desde ${money(pr/6)} al mes</small></div>
<span class="mut">Tarjetas de crédito Visa, BBVA, Interbank, Scotiabank y Diners.</span>
<div class="bds"><span class="bd dk">ÚLTIMAS UNIDADES</span><span class="bd">DESPACHO INMEDIATO</span><span class="bd">100 % ORIGINAL</span></div>
<button class="add" data-add="${i}">Añadir al carrito</button><p>${d[0]}</p></div></div>
<div class="fh"><div><span class="mut up">FICHA OLFATIVA</span><h2>¿A qué huele ${nm}?</h2></div>
<div class="pf"><span class="mut up">PERFIL OLFATIVO</span><div class="bar">${d[1].map(a=>`<i style="flex:${a[1]};background:${CL[a[0]]}"></i>`).join("")}</div><div class="leg">${d[1].map(a=>`<span><u style="background:${CL[a[0]]}"></u>${a[0]} ${a[1]} %</span>`).join("")}</div></div></div>
<div class="fgr">${sl("Género",d[2],["Masculino","Unisex","Femenino"])}${sl("Duración",d[3],["Corta","Media","Larga"])}${sl("Estela",d[4],["Íntima","Moderada","Fuerte"])}${sl("Intensidad",d[5],["Suave","Intensa","Muy intensa"])}</div>
<div class="two"><div class="bx"><span class="mut up">PIRÁMIDE DE NOTAS</span>${[["Salida",d[6]],["Corazón",d[7]],["Fondo",d[8]]].map(([t,n])=>`<div class="nt"><b>${t}</b>${n.map(x=>`<span>${x}</span>`).join("")}</div>`).join("")}</div>
<div class="bx"><span class="mut up">¿CUÁNDO USARLO?</span><div class="nt"><b>Temporada</b><span>${d[9][0]}</span></div><div class="nt"><b>Momento</b><span>${d[9][1]}</span></div></div></div>`;
}
document.addEventListener("click",e=>{
 const galleryThumb=e.target.closest("[data-gallery-src]");
 const filterThumb=e.target.closest("[data-f]");
 const t=galleryThumb||filterThumb;
 if(!t)return;
 document.querySelectorAll(".th").forEach(x=>x.classList.toggle("on",x===t));
 if(galleryThumb){
   const main=g("main-product-image");
   if(main)main.src=t.dataset.gallerySrc;
 }else{
   const bottleSvg=g("gm").querySelector("svg");
   if(bottleSvg)bottleSvg.style.filter=F[t.dataset.f];
 }
});
const PG={"#quienes-somos":"pg-nosotros","#preguntas-frecuentes":"pg-faq"};
const CAT={"#lanzamientos":["Lanzamientos","Las últimas novedades de nuestra tienda","Lanzamientos"],"#todos-los-productos":["Todos los productos","Todo nuestro catálogo","Todos"],"#nicho":["Nicho","Perfumería exclusiva de autor","Nicho"],"#disenador":["Diseñador","Las casas de moda más reconocidas","Diseñador"],"#arabes":["Árabes y Medio Oriente","Oud, ámbar y especias de gran duración","Árabes"]};
function route(){
 const hs=location.hash,m=/^#perfume-(\d+)$/.exec(hs),was=g("home").hidden;
 ["home","pp","pg-nosotros","pg-faq","pg-cat"].forEach(id=>g(id).hidden=true);
 if(m&&P[m[1]]){g("pp").hidden=false;showP(+m[1]);window.scrollTo(0,0)}
 else if(PG[hs]){g(PG[hs]).hidden=false;window.scrollTo(0,0)}
 else if(CAT[hs]){const c=CAT[hs];g("pg-cat").hidden=false;g("ct").textContent=c[0];g("cs").textContent=c[1];g("cgrid").innerHTML=list(c[2]).map(o=>card(o.p,o.i)).join("");watch();window.scrollTo(0,0)}
 else{g("home").hidden=false;if(was){if(cat!=="Todos"){cat="Todos";renderFilters();renderGrid()}if(hs){const t=document.querySelector(hs);if(t)t.scrollIntoView()}}}
}
addEventListener("hashchange",route);
renderFilters();renderGrid();renderCart();watch();route();
