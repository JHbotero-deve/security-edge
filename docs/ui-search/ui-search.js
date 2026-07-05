(function(){
  const qEl = document.getElementById('q');
  const tagEl = document.getElementById('tag');
  const resultsEl = document.getElementById('results');
  const clearEl = document.getElementById('clear');
  
  let index = null;
  function render(list) {
    resultsEl.innerHTML = '';
    if (!list || !list.length) { resultsEl.innerHTML = '<p>Sin resultados</p>'; return; }
    const ul = document.createElement('ul');
    list.forEach(item => {
      const li = document.createElement('li');
      const path = document.createElement('div'); path.className='path'; path.textContent = item.path;
      const tags = document.createElement('div'); tags.className='tags'; tags.textContent = 'Etiquetas: ' + item.tags.join(', ');
      li.appendChild(path);
      li.appendChild(tags);
      if (item.snippets && item.snippets.length) {
        const pre = document.createElement('pre');
        pre.textContent = item.snippets.map(s=>s.line+': '+s.text).join('\n');
        li.appendChild(pre);
      }
      ul.appendChild(li);
    });
    resultsEl.appendChild(ul);
  }
  
  function filter() {
    const q = qEl.value.trim().toLowerCase();
    const t = tagEl.value.trim().toLowerCase();
    const list = index.results.filter(item => {
      if (t && !item.tags.some(tt=>tt.toLowerCase().includes(t))) return false;
      if (q) {
        if (item.path.toLowerCase().includes(q)) return true;
        if (item.snippets && item.snippets.some(s=>s.text.toLowerCase().includes(q))) return true;
        return false;
      }
      return true;
    });
    render(list);
  }
  
  clearEl.addEventListener('click', ()=>{ qEl.value=''; tagEl.value=''; filter(); });
  qEl.addEventListener('input', filter);
  tagEl.addEventListener('input', filter);
  
  fetch('ui-index.json').then(r=>r.json()).then(j=>{ index=j; render(index.results); }).catch(()=>{ resultsEl.innerHTML='<p>Índice no encontrado. Ejecuta <code>npm run build-ui-index</code> o añade docs/ui-search/ui-index.json</p>'; });
})();
