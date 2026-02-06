document.addEventListener('DOMContentLoaded',function(){
  // year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // mobile nav toggle
  const nav = document.getElementById('siteNav');
  const btn = document.getElementById('navToggle');
  btn.addEventListener('click',()=>{
    if(nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });

  // simple contact form validation
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const fm = new FormData(form);
    if(!fm.get('name')||!fm.get('email')||!fm.get('message')){
      alert('Please complete all fields.');
      return;
    }
    // fake send
    alert('Thanks! We received your message.');
    form.reset();
  });

  // image fallback loader: tries declared src then data-fallbacks in order
  function tryImageCandidates(imgEl){
    const declared = imgEl.getAttribute('src') || '';
    const raw = imgEl.getAttribute('data-fallbacks') || '';
    const listed = raw.split(',').map(s=>s.trim()).filter(Boolean);
    const candidates = [];
    if(declared) candidates.push(declared);
    for(const c of listed){ if(c && !candidates.includes(c)) candidates.push(c); }
    if(candidates.length === 0) return;

    function attempt(list){
      if(list.length === 0){ imgEl.src = 'images/placeholder.svg'; return; }
      const candidate = list.shift();
      const tester = new Image();
      tester.onload = function(){ imgEl.src = candidate; };
      tester.onerror = function(){ attempt(list); };
      tester.src = candidate;
    }

    attempt(candidates.slice());
  }

  document.querySelectorAll('.dish-img').forEach(img=>tryImageCandidates(img));
});
