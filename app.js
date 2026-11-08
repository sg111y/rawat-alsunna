(function(){
var D=window.DATA,O=['الصحابة','الطبقة الثانية','الطبقة الثالثة','الطبقة الرابعة','الطبقة الخامسة','الطبقة السادسة','الطبقة السابعة','الطبقة الثامنة','الطبقة التاسعة','الطبقة العاشرة','الطبقة الحادية عشرة','الطبقة الثانية عشرة'];
var $=function(i){return document.getElementById(i)},S={v:'all'},DASH='<span class="d">ـــــــ</span>';
function tag(c){return'<span class="tag k'+c+'">'+O[c]+'</span>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function nm(s){return s.replace(/[\u064B-\u0652\u0670\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/\s+/g,'')}
function ar(n){return String(n).replace(/\d/g,function(d){return'٠١٢٣٤٥٦٧٨٩'[d]})}
var RED=/(يرسل|يدلس|ويدلس|ضعيف|ضعف|اختلط|تغير|تغيّر|مضطربة|اضطراب|وهم|أوهام|يخطئ|يخطيء|مدلس|الإرسال|لين|رمي|مختلف|ربما|مقرون|له أفراد)/g;
var idx={},dup={};D.forEach(function(r){r.id=(r.c+1)+'-'+r.n;var k=nm(r.name);if(idx[k]!==undefined)dup[k]=1;idx[k]=r.id});
function cat(r){var x=nm(r.r);if(!x)return'';if(/ضعيف|ضعف|مختلف/.test(x))return'فيه ضعف أو خلاف';if(x.indexOf('ثقة')==0||x.indexOf('ثقه')==0)return'ثقة';if(x.indexOf('صدوق')==0)return'صدوق';return'أخرى'}
var FEM={'مدنية':'مدني','بصرية':'بصري','كوفية':'كوفي','مكية':'مكي','شامية':'شامي','مصرية':'مصري','دمشقية':'دمشقي'};
function cities(b){var o=[];(b||'').split(/\s+/).forEach(function(c){if(!c||c=='ثم')return;if(c[0]=='و'&&c!='واسطي')c=c.slice(1);c=FEM[c]||c;if(o.indexOf(c)<0)o.push(c)});return o}
function fill(){var bs={},cs={};D.forEach(function(r){cities(r.b).forEach(function(c){bs[c]=(bs[c]||0)+1});var t=cat(r);if(t)cs[t]=1});
$('bal').innerHTML='<option value="">كل البلدان</option>'+Object.keys(bs).sort(function(a,b){return bs[b]-bs[a]}).map(function(c){return'<option>'+esc(c)+'</option>'}).join('');
$('rk').innerHTML='<option value="">كل المراتب</option>'+Object.keys(cs).map(function(c){return'<option>'+esc(c)+'</option>'}).join('');
var t='<button data-v="all">الكل</button>';O.forEach(function(o,i){t+='<button class="k'+i+'" data-v="'+i+'">'+o+'</button>'});t+='<button data-v="am">الأمصار</button>';$('tabs').innerHTML=t}
function rw(r){if(!r.w.length)return DASH;return r.w.map(function(x,i){var base=x.replace(/\s*\(.*?\)\s*/g,''),k=nm(base),h;
if(r.a)h='<span class="a">'+esc(x)+'</span>';else h=esc(x).replace(/(\([^()]*?(?:ضعيف|مضطربة|لم يسمع|واختلف|مقرون)[^()]*?\))/g,'<span class="r">$1</span>');
if(idx[k]!==undefined&&!dup[k])h='<a class="rw" href="#r'+idx[k]+'" data-go="'+idx[k]+'">'+(r.a?'<span class="a">'+esc(base)+'</span>':esc(base))+'</a>'+(r.a?'':esc(x.slice(base.length)));
return'<div>'+(r.w.length>1?ar(i+1)+'/ ':'')+h+'</div>'}).join('')}
function row(r){return'<tr id="r'+r.id+'"><td data-l="م">'+ar(r.n)+'</td><td data-l="الاسم" class="k'+r.c+'"><b>'+esc(r.name)+'</b><br>'+tag(r.c)+'</td><td data-l="الكنى">'+(esc(r.k)||DASH)+'</td><td data-l="البلد">'+(esc(r.b)||DASH)+'</td><td data-l="المرتبة">'+(r.r?esc(r.r).replace(RED,'<span class="r">$1</span>'):DASH)+'</td><td data-l="الرواة عنه">'+rw(r)+'</td><td data-l="الوفاة">'+(esc(r.d)||DASH)+'</td></tr>'}
function list(){var q=nm($('q').value),b=$('bal').value,k=$('rk').value;return D.filter(function(r){
if(S.v!='all'&&r.c!=S.v)return false;if(b&&cities(r.b).indexOf(b)<0)return false;if(k&&cat(r)!=k)return false;
return!q||nm([r.name,r.k,r.b,r.r,r.w.join(' ')].join(' ')).indexOf(q)>-1})}
function amsar(){var G={};D.forEach(function(r){cities(r.b).forEach(function(c){(G[c]=G[c]||[]).push(r)})});var ks=Object.keys(G).sort(function(a,b){return G[b].length-G[a].length});
return'<div class="leg">'+O.map(function(o,i){return tag(i)}).join('')+'</div><div class="chips">'+ks.map(function(c,i){return'<a href="#m'+i+'">'+esc(c)+' <b>'+ar(G[c].length)+'</b></a>'}).join('')+'</div>'+ks.map(function(c,i){return'<details id="m'+i+'" open><summary>'+esc(c)+' ('+ar(G[c].length)+')</summary><ul>'+G[c].map(function(r){return'<li><a href="#r'+r.id+'" data-go="'+r.id+'">'+esc(r.name)+'</a>'+tag(r.c)+'</li>'}).join('')+'</ul></details>'}).join('')}
function render(){document.querySelectorAll('nav button').forEach(function(b){b.classList.toggle('on',b.dataset.v==String(S.v))});
if(S.v=='am'){$('info').textContent='الأمصار';$('view').innerHTML=amsar();return}
var L=list();$('info').textContent=(S.v=='all'?'جميع الطبقات':O[S.v])+' — '+ar(L.length)+' راوياً';
$('view').innerHTML=L.length?'<table><colgroup><col style="width:5%"><col style="width:16%"><col style="width:10%"><col style="width:8%"><col style="width:17%"><col style="width:33%"><col style="width:11%"></colgroup><thead><tr><th>م</th><th>الاسم</th><th>الكُنى</th><th>البلد</th><th>المرتبة</th><th>الرواة عنه</th><th>الوفاة</th></tr></thead><tbody>'+L.map(row).join('')+'</tbody></table>':'<p class="info">لا نتائج</p>'}
function go(id){S.v='all';$('q').value='';$('bal').value='';$('rk').value='';render();var e=$('r'+id);if(e){e.scrollIntoView({block:'center'});e.classList.add('hl');setTimeout(function(){e.classList.remove('hl')},2500)}}
document.addEventListener('click',function(e){var t=e.target.closest('[data-go]');if(t){e.preventDefault();history.replaceState(null,'','#r'+t.dataset.go);go(t.dataset.go);return}
t=e.target.closest('nav button');if(t){var v=t.dataset.v;S.v=(v=='all'||v=='am')?v:+v;history.replaceState(null,'','#'+(v=='all'?'':v=='am'?'amsar':'c'+(S.v+1)));render();scrollTo(0,0)}});
['q','bal','rk'].forEach(function(i){$(i).addEventListener('input',function(){if(S.v=='am')S.v='all';render()})});
$('th').onclick=function(){var el=document.documentElement,d=el.dataset.t=='dark';if(d)delete el.dataset.t;else el.dataset.t='dark';try{localStorage.setItem('t',d?'':'dark')}catch(e){}};
try{if(localStorage.getItem('t')=='dark')document.documentElement.dataset.t='dark'}catch(e){}
addEventListener('scroll',function(){$('up').style.display=scrollY>600?'block':'none'});$('up').onclick=function(){scrollTo(0,0)};
function hh(){document.documentElement.style.setProperty('--hh',document.querySelector('header').offsetHeight+'px')}addEventListener('resize',hh);
$('stat').textContent=ar(D.length)+' راوياً في ١٢ طبقة';fill();
var h=location.hash,m;if(h=='#amsar')S.v='am';else if(m=h.match(/^#c(\d+)$/))S.v=+m[1]-1;render();hh();if(m=h.match(/^#r(.+)$/))go(m[1]);
})();
