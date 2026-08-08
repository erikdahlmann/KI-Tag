(function(){
  // Kopieren mit Rückfallebene für unsichere Kontexte
  function legacy(t){
    try{var a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');
      a.style.cssText='position:fixed;top:-1000px;opacity:0';document.body.appendChild(a);
      a.focus();a.select();var ok=document.execCommand('copy');document.body.removeChild(a);return ok;
    }catch(e){return false;}
  }
  function copy(t){
    if(navigator.clipboard && window.isSecureContext){
      return navigator.clipboard.writeText(t).catch(function(){
        return legacy(t)?Promise.resolve():Promise.reject();});
    }
    return legacy(t)?Promise.resolve():Promise.reject();
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-copy]');
    if(b){
      var c=b.parentElement.querySelector('code');
      var lbl=b.dataset.lbl||b.textContent; b.dataset.lbl=lbl;
      copy(c?c.innerText:'').then(function(){
        b.textContent='Kopiert'; b.classList.add('done');
        setTimeout(function(){b.textContent=lbl;b.classList.remove('done');},1600);
      }).catch(function(){
        b.textContent='Bitte markieren';
        setTimeout(function(){b.textContent=lbl;},2000);
      });
    }
    var g=e.target.closest('[data-burger]');
    if(g){
      var n=document.querySelector('[data-nav]');
      var open=n.classList.toggle('open');
      g.setAttribute('aria-expanded',open?'true':'false');
    }
  });
  // Einblenden beim Scrollen. IntersectionObserver, kein Scroll-Listener.
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('[data-r]');
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(el){el.classList.add('in');}); return;
  }
  // Sicherheitsnetz: falls der Observer nicht greift, nach 2 s alles zeigen.
  setTimeout(function(){els.forEach(function(el){el.classList.add('in');});},2000);
  var io=new IntersectionObserver(function(en){
    en.forEach(function(x){ if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);} });
  },{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(el){io.observe(el);});
})();
