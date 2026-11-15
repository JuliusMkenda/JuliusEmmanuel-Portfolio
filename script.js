document.documentElement.classList.add("js");
var EMAIL="juliusmkenda09@gmail.com";
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
var D=[
 {t:"Web development",s:"End to end, from sketch to live site",i:["Planning around your goals","Layout and visual design","Front-end and back-end development","Fast, mobile-friendly, search-ready builds","Launch and ongoing support"]},
 {t:"App development",s:"iOS apps built around one clear job",i:["Idea and feature planning","Screens and user flows","iOS app development","Testing on real devices","Release and updates"]},
 {t:"UI/UX design",s:"Interfaces people understand at a glance",i:["User flows and research","Wireframes and prototypes","Visual interface design","Design handoff for developers","Usability checks"]},
 {t:"Graphic design",s:"Brand visuals that stay consistent",i:["Logos and brand identity","Social media creatives","Posters and flyers","Pitch decks and presentations","Simple brand guidelines"]}];
/* clock */
function tick(){try{var n=new Date(),o={timeZone:"Africa/Dar_es_Salaam"};var t=n.toLocaleTimeString("en-US",Object.assign({hour:"numeric",minute:"2-digit"},o)).replace(" ","").toLowerCase();$("#tm").textContent=t;$("#tm2").textContent=t;$("#dt").textContent=n.toLocaleDateString("en-GB",Object.assign({day:"numeric",month:"long",year:"numeric"},o))}catch(e){}}
tick();setInterval(tick,20000);
/* flipping job title */
var W=["Web Developer","App Developer","UI/UX Designer","Graphic Designer"],wi=0,we=$("#word");
setInterval(function(){
  wi=(wi+1)%W.length;
  var set=function(){we.textContent=W[wi];$("#wn").textContent="0"+(wi+1)+" / 04"};
  if(RM||!we.animate){set();return}
  we.animate([{transform:"rotateX(0)",opacity:1},{transform:"rotateX(-90deg)",opacity:0}],{duration:320,easing:"ease-in"}).finished.then(function(){set();we.animate([{transform:"rotateX(90deg)",opacity:0},{transform:"rotateX(0)",opacity:1}],{duration:380,easing:"cubic-bezier(.2,.8,.2,1)"})});
},2600);
/* doors */
var doors=$$(".dw"),panel=$("#pn"),cur=-1,wide=function(){return matchMedia("(min-width:760px)").matches};
function layout(){
  doors.forEach(function(d,k){d.classList.toggle("open",k===cur);d.classList.toggle("dim",cur>-1&&k!==cur);d.setAttribute("aria-expanded",String(k===cur));d.style.gridColumn="";d.style.gridRow=""});
  panel.style.gridColumn="";panel.style.gridRow="";
  if(cur>-1&&wide()){var c=2;doors.forEach(function(d,k){d.style.gridRow=1;d.style.gridColumn=k===cur?1:c++});panel.style.gridRow=1;panel.style.gridColumn="2 / 5"}
}
function closeDoor(){var f=doors.map(function(d){return d.getBoundingClientRect()});cur=-1;panel.hidden=true;layout();flip(f)}
function flip(f){if(RM)return;doors.forEach(function(d,k){var r=d.getBoundingClientRect(),dx=f[k].left-r.left,dy=f[k].top-r.top;if(dx||dy)d.animate([{transform:"translate("+dx+"px,"+dy+"px)"},{transform:"none"}],{duration:650,easing:"cubic-bezier(.3,.7,.2,1)"})})}
function openDoor(i){
  if(i===cur)return closeDoor();
  var f=doors.map(function(d){return d.getBoundingClientRect()});
  cur=i;var x=D[i];
  panel.innerHTML="<h3>"+x.t+'</h3><div class="mono">'+x.s+"</div><ul>"+x.i.map(function(s,n){return '<li style="--i:'+n+'">'+s+"</li>"}).join("")+'</ul><div class="row"><button class="pill" data-hire data-need="'+["Website or web app","iOS or mobile app","UI/UX design for a product","Brand or graphic design"][i]+'">Hire me <i>→</i></button><button class="ghost" id="pc">Close the door</button></div>';
  panel.hidden=false;layout();flip(f);
  if(!wide())panel.scrollIntoView({behavior:RM?"auto":"smooth",block:"nearest"});
}
doors.forEach(function(d,k){d.onclick=function(){openDoor(k)}});
addEventListener("resize",layout);
document.addEventListener("click",function(e){
  var h=e.target.closest("[data-hire]");if(h){e.preventDefault();openHire(h.getAttribute("data-need"));return}
  if(e.target.id==="pc"){closeDoor();return}
  var a=e.target.closest("[data-door]");if(a){e.preventDefault();$("#work").scrollIntoView({behavior:RM?"auto":"smooth"});setTimeout(function(){if(cur!==+a.dataset.door)openDoor(+a.dataset.door)},RM?0:600)}
});
/* story */
var ti=$$(".ti"),yr=$("#yr");
function act(n){
  ti.forEach(function(t,k){t.classList.toggle("act",k===n)});
  var y=ti[n].dataset.year;
  if(yr.textContent!==y){var s=function(){yr.textContent=y};if(RM||!yr.animate)s();else yr.animate([{transform:"none",opacity:1},{transform:"translateY(-30px)",opacity:0}],{duration:200}).finished.then(function(){s();yr.animate([{transform:"translateY(30px)",opacity:0},{transform:"none",opacity:1}],{duration:350,easing:"cubic-bezier(.2,.8,.2,1)"})})}
  $("#rng").textContent=ti[n].dataset.range;$("#cnt").textContent="0"+(n+1);$("#prog").style.width=((n+1)/ti.length*100)+"%";
}
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)act(ti.indexOf(e.target))})},{rootMargin:"-35% 0px -45% 0px"});
  ti.forEach(function(t){io.observe(t)});
  var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)}})},{threshold:.15});
  $$(".rv").forEach(function(r){rv.observe(r)});
}else{$$(".rv").forEach(function(r){r.classList.add("in")})}
/* theme cord */
var root=document.documentElement;
$("#cord").onclick=function(){
  var c=this;c.classList.remove("pull");void c.offsetWidth;c.classList.add("pull");
  var dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
  root.dataset.theme=dark?"light":"dark";
};
/* hire form */
var NEEDS=["Website or web app","iOS or mobile app","UI/UX design for a product","Brand or graphic design","I have a question about this website"],dlg=$("#dlg"),chips=$("#chips");
NEEDS.forEach(function(n,i){var l=document.createElement("label");l.innerHTML='<input type="radio" name="need" value="'+n+'"'+(i?"":" checked")+"><span>"+n+"</span>";chips.appendChild(l)});
function show(d){d.showModal?d.showModal():d.setAttribute("open","")}
function hide(d){d.close?d.close():d.removeAttribute("open")}
function openHire(n){$("#form").hidden=false;$("#done").hidden=true;if(n)$$("input",chips).forEach(function(i){i.checked=i.value===n});show(dlg)}
$("#cancel").onclick=function(){hide(dlg)};$("#close2").onclick=function(){hide(dlg)};
$("#send").onclick=function(){
  var need=($("input[name=need]:checked")||{}).value||NEEDS[0],name=$("#nm").value.trim(),msg=$("#msg").value.trim();
  var url="mailto:"+EMAIL+"?subject="+encodeURIComponent("Project enquiry: "+need)+"&body="+encodeURIComponent("Hi Julius,\n\nI’m looking for help with: "+need+".\n\n"+(msg?msg+"\n\n":"")+"Thanks,\n"+name);
  var a=$("#mail");a.textContent=EMAIL;a.href=url;$("#form").hidden=true;$("#done").hidden=false;
  try{location.href=url}catch(e){}
};
/* ability card */
$("#abl").innerHTML=D.map(function(x){return "<dt>"+x.t+"</dt><dd>"+x.s+"</dd>"}).join("");
$("#abBtn").onclick=function(){show($("#abd"))};$("#abx").onclick=function(){hide($("#abd"))};
