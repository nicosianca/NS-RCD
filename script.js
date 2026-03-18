function toggleNav(){ document.getElementById('navOverlay').classList.toggle('open'); }
  function closeNav(){ document.getElementById('navOverlay').classList.remove('open'); }

  function filtrar(e,cat){
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('.proy-entry').forEach(item=>{
      const show=cat==='todos'||item.dataset.cat===cat;
      item.style.opacity=show?'1':'0.15';
      item.style.pointerEvents=show?'all':'none';
    });
  }

  let lbImgs=[],lbIdx=0;
  function openLB(imgs,idx){
    lbImgs=imgs; lbIdx=idx;
    document.getElementById('lbImg').src=lbImgs[lbIdx];
    document.getElementById('lbCounter').textContent=(lbIdx+1)+' / '+lbImgs.length;
    document.getElementById('lightbox').classList.add('open');
  }
  function closeLB(){ document.getElementById('lightbox').classList.remove('open'); }
  function lbMove(dir){
    lbIdx=(lbIdx+dir+lbImgs.length)%lbImgs.length;
    document.getElementById('lbImg').src=lbImgs[lbIdx];
    document.getElementById('lbCounter').textContent=(lbIdx+1)+' / '+lbImgs.length;
  }
  document.getElementById('lightbox').addEventListener('keydown', e => {
    if(e.key==='Escape') closeLB();
    if(e.key==='ArrowLeft') lbMove(-1);
    if(e.key==='ArrowRight') lbMove(1);
  });

  // Sliders de proyecto
  document.querySelectorAll('.proy-slider').forEach(slider => {
    const track = slider.querySelector('.proy-slider-track');
    if (!track) return;
    const imgs = track.querySelectorAll('img');
    if (imgs.length <= 1) return;
    let cur = 0;
    const count = slider.querySelector('.proy-slider-count');
    const updateCount = () => { if(count) count.textContent = (cur+1) + ' / ' + imgs.length; };
    slider.querySelector('.proy-slider-btn.prev')?.addEventListener('click', e => {
      e.stopPropagation();
      cur = (cur - 1 + imgs.length) % imgs.length;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      updateCount();
    });
    slider.querySelector('.proy-slider-btn.next')?.addEventListener('click', e => {
      e.stopPropagation();
      cur = (cur + 1) % imgs.length;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      updateCount();
    });
    updateCount();
  });