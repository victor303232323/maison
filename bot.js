/* ===== ASISTENTE VIRTUAL (logo MA) =====
   Responde con la información de tu tienda. Edita los textos de la lista KB.
   Para conectarlo a una IA real, pon la URL de tu servidor en BOT_URL. */
const BOT_URL="";
const WA="https://wa.me/51900000000";
const norm=t=>t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const esc=t=>t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const lev=(a,b)=>{if(Math.abs(a.length-b.length)>1)return 9;const m=[...Array(a.length+1)].map((_,i)=>[i]);for(let j=1;j<=b.length;j++)m[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]};
const DEF=["¿Cuánto demora el envío?","¿Qué formas de pago hay?","¿Son originales?","Recomiéndame un perfume","¿Tienen cupón?"];
const KB=[
 [["hola","buenas","buenos dias","buenas tardes","buenas noches","hey"],"¡Hola! Soy el asistente de Maison Aura. Puedo ayudarte con envíos, pagos, cupones y recomendarte un perfume. ¿Qué necesitas?",3],
 [["como comprar","como compro","como pedir","como hago mi pedido","como hago un pedido"],"Es muy sencillo: elige tu perfume, pulsa «Añadir al carrito» y finaliza tu pedido por WhatsApp. Te confirmamos el pago y el envío."],
 [["envio","delivery","demora","demoran","entrega","despacho","llega","provincia","recojo","agencia"],"Tu pedido sale en menos de 24 horas y el envío es gratis a todo el Perú. Puedes recibirlo en tu domicilio o recogerlo en una agencia."],
 [["pago","pagos","pagar","yape","tarjeta","cuota","cuotas","credito","debito","transferencia"],"Aceptamos tarjetas de crédito y débito, y Yape. En los productos con cuotas puedes pagar hasta en 6 cuotas sin interés."],
 [["original","autentic","falso","legitim","garantia","imitacion"],"Todos nuestros perfumes son 100 % originales y nuevos, en su empaque de fábrica y adquiridos a distribuidores autorizados."],
 [["cupon","descuento","oferta","promocion","aura5"],"Usa el cupón <b>AURA5</b> y obtén 5 % de descuento. Además, cada perfume muestra su precio de oferta frente al precio anterior."],
 [["diferencia","parfum","eau de","edp","edt","concentracion"],"Es la concentración de esencia: el Parfum es el más concentrado y dura más, el Eau de Parfum (EDP) tiene intensidad media-alta y el Eau de Toilette (EDT) es más ligero y fresco."],
 [["durar","dure","dura","duran","duracion","fijacion","aplicar","rociar"],"Para que dure más, aplícalo sobre la piel hidratada, en muñecas y cuello, sin frotar. Guarda el frasco lejos del calor y la luz."],
 [["contacto","whatsapp","telefono","correo","asesor","humano"],`Con gusto te atiende una persona. Escríbenos por <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a> o a hola@maisonaura.pe.`],
 [["gracias","genial","perfecto"],"¡Con gusto! Si necesitas algo más, aquí estoy.",3]
];
let lastP=null,busy=false,CH=null;
const hora=()=>new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"});
const AV='<span class="av sm"><i class="mal"></i></span>';
const pcard=(i,x)=>`<div class="pc"><div class="pc-i">${bottle(P[i][5])}</div><div class="pc-t"><b>${P[i][0]}</b><span>${P[i][2]} · ${money(P[i][3])}${x?" · "+x:""}</span><div class="pc-a"><a href="#perfume-${i}">Ver detalle</a><button data-bot-add="${i}">Añadir</button></div></div></div>`;
const ficha=i=>{lastP=i;CH=["Añadir al carrito","Ver otras recomendaciones","Hablar con un asesor"];const p=P[i],d=D[i];return `Esto es lo que sé de este perfume:${pcard(i)}${d[0]}<small>Salida: ${d[6].join(", ")} · Corazón: ${d[7].join(", ")} · Fondo: ${d[8].join(", ")}.<br>Antes ${money(p[4])} · 6 cuotas de ${money(p[3]/6)} sin interés.</small>`};
function local(raw){
 const q=norm(raw),T=q.split(/[^a-z0-9]+/).filter(Boolean);
 const has=l=>l.some(w=>w.includes(" ")?q.includes(w):T.some(t=>t===w||(w.length>=5&&(t.startsWith(w)||(t.length>=5&&lev(t,w)<=1)))));
 const pi=P.findIndex(p=>q.includes(norm(p[0].replace(/ (EDP|EDT|Parfum).*/,"")))||q.includes(norm(p[1])));
 if(pi>=0)return ficha(pi);
 for(const [k,a,m] of KB)if(has(k)&&(!m||T.length<=m))return a;
 if(has(["comprar","comprarlo","anadir","anadelo","agregar","agregalo","llevo","pedir","lo quiero"])){
  if(lastP===null)return "¡Claro! Dime el nombre del perfume que quieres llevar y lo añado a tu carrito, o pídeme una recomendación.";
  cart[lastP]=(cart[lastP]||0)+1;renderCart();CH=["Ver otras recomendaciones","Hablar con un asesor"];
  return `Listo, añadí <b>${P[lastP][0]}</b> a tu carrito.<br><button class="bot-btn" data-bot-cart>Ver carrito</button>`;
 }
 const S=P.map((p,i)=>({i,n:0,d:D[i]})),add=(f,n)=>S.forEach(o=>{if(f(o))o.n+=n});
 const acc=(o,x)=>o.d[1].some(a=>a[0]===x),nt=(o,x)=>[...o.d[6],...o.d[7],...o.d[8]].some(y=>norm(y).includes(x)),u=(o,x)=>norm(o.d[9].join(" ")).includes(x);
 if(has(["hombre","masculino","caballero","novio","esposo","papa","padre"])){add(o=>o.d[2]<=55,1);add(o=>o.d[2]<=34,1)}
 if(has(["mujer","femenino","dama","novia","esposa","mama","madre"])){add(o=>o.d[2]>=45,1);add(o=>o.d[2]>=67,1)}
 if(has(["noche","salir","fiesta","cita","cena"]))add(o=>u(o,"noche"),2);
 if(has(["dia","oficina","trabajo","diario","universidad"]))add(o=>u(o,"dia"),2);
 if(has(["verano","calor","primavera","playa"]))add(o=>u(o,"verano"),2);
 if(has(["invierno","frio","otono"]))add(o=>u(o,"invierno"),2);
 if(has(["fresco","fresca","ligero","ligera","suave"])){add(o=>acc(o,"Fresco"),2);add(o=>o.d[5]<=55,1)}
 if(has(["dulce","vainilla","miel","goloso","golosa"])){add(o=>acc(o,"Dulce"),2);add(o=>nt(o,"vainilla")||nt(o,"miel"),1)}
 if(has(["floral","flores","flor","rosa","jazmin"]))add(o=>acc(o,"Floral"),2);
 if(has(["madera","amaderado","amaderada"]))add(o=>acc(o,"Amaderado"),2);
 if(has(["arabe","arabes","oud","oriental"]))add(o=>P[o.i][2]==="Árabes",3);
 if(has(["nicho"]))add(o=>P[o.i][2]==="Nicho",3);
 if(has(["disenador"]))add(o=>P[o.i][2]==="Diseñador",3);
 if(has(["fuerte","intenso","intensa","duradero","duradera","potente"])){add(o=>o.d[5]>=75,2);add(o=>o.d[3]>=85,1)}
 const cheap=has(["barato","economico","economica","presupuesto"]),ask=has(["recomienda","recomiendame","recomendar","recomendacion","recomendaciones","sugerencia","sugieres","cual","busco","regalo","regalar","quiero"]);
 let best=S.filter(o=>o.n>0);
 if(best.length||cheap||ask){
  if(!best.length)best=S.slice().sort((a,b)=>P[a.i][3]/P[a.i][4]-P[b.i][3]/P[b.i][4]);
  best=best.sort((a,b)=>cheap?P[a.i][3]-P[b.i][3]:b.n-a.n).slice(0,3);lastP=best[0].i;
  CH=["Uno más barato","Algo para la noche","Hablar con un asesor"];
  return "Estas opciones encajan con lo que buscas:"+best.map(o=>pcard(o.i,o.d[1].slice(0,2).map(a=>a[0]).join(", "))).join("")+"Pregúntame por cualquiera para ver sus notas.";
 }
 if(has(["precio","precios","cuesta","cuanto","costo","valor"])){const pr=P.map(p=>p[3]);return `Nuestros perfumes van desde <b>${money(Math.min(...pr))}</b> hasta <b>${money(Math.max(...pr))}</b>. Mira todos en <a href="#todos-los-productos">Todos los productos</a> o dime cuál te interesa.`}
 CH=["Recomiéndame un perfume","Hablar con un asesor","¿Qué formas de pago hay?"];
 return `No estoy seguro de haberte entendido. Puedes preguntarme por envíos, pagos o cupones, o pedirme una recomendación. También puedes hablar con un asesor por <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a>.`;
}
async function reply(raw){
 if(BOT_URL){try{const r=await fetch(BOT_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:raw})});const d=await r.json();if(d.answer)return esc(d.answer)}catch(e){}}
 return local(raw);
}
const bm=g("bot-m");
function say(html,who){const r=document.createElement("div");r.className="r "+who;r.innerHTML=(who==="b"?AV:"")+`<div class="bw"><div class="msg-${who}"></div><time>${hora()}</time></div>`;const m=r.querySelector(".msg-"+who);if(who==="u")m.textContent=html;else m.innerHTML=html;bm.appendChild(r);bm.scrollTop=bm.scrollHeight;return m}
function chips(l){const q=g("bot-q");q.innerHTML="";l.forEach(t=>{const b=document.createElement("button");b.textContent=t;b.onclick=()=>ask(t);q.appendChild(b)})}
async function ask(t){t=t.trim();if(!t||busy)return;busy=true;say(t,"u");g("bot-i").value="";chips([]);const w=say('<span class="typ"><i></i><i></i><i></i></span>',"b");CH=null;const a=await reply(t);setTimeout(()=>{w.innerHTML=a;chips(CH||DEF);bm.scrollTop=bm.scrollHeight;busy=false},500+Math.min(a.length*2,600))}
function welcome(){bm.innerHTML="";lastP=null;say("¡Hola! Soy el asistente virtual de <b>Maison Aura</b>. Puedo ayudarte con envíos, pagos, cupones y recomendarte el perfume ideal. ¿En qué te ayudo?","b");chips(DEF)}
function openBot(){g("bot-tip").hidden=true;g("bot").hidden=false;g("bot-open").hidden=true;if(!bm.children.length)welcome();g("bot-i").focus()}
function closeBot(){g("bot").hidden=true;g("bot-open").hidden=false}
g("bot-open").onclick=openBot;g("bot-x").onclick=closeBot;g("bot-r").onclick=welcome;
g("bot-s").onclick=()=>ask(g("bot-i").value);
g("bot-i").addEventListener("keydown",e=>{if(e.key==="Enter")ask(e.target.value)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!g("bot").hidden)closeBot()});
g("bot-tip").onclick=e=>{if(e.target.id==="tip-x")g("bot-tip").hidden=true;else openBot()};
setTimeout(()=>{if(g("bot").hidden){g("bot-tip").hidden=false;setTimeout(()=>g("bot-tip").hidden=true,9000)}},4000);
document.addEventListener("click",e=>{
 const a=e.target.closest("[data-bot-add]");
 if(a){const i=+a.dataset.botAdd;cart[i]=(cart[i]||0)+1;renderCart();lastP=i;say(`Añadí <b>${P[i][0]}</b> a tu carrito.<br><button class="bot-btn" data-bot-cart>Ver carrito</button>`,"b");return}
 if(e.target.closest("[data-bot-cart]"))g("drawer").classList.add("open");
});
