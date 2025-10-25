(function () {
  const els = {
    searchInput: document.getElementById('search'),
    searchButton: document.getElementById('search-button'),
    clearButton: document.getElementById('clear-button'),
    locationSelect: document.getElementById('filter-location'),
    categorySelect: document.getElementById('filter-category'),
    sortSelect: document.getElementById('sort-by'),
    resourcesList: document.getElementById('resources-list'),
    resultsCount: document.getElementById('results-count'),
  };

  const state = { query: '', location: '', category: '', sort: 'name-asc' };

  function debounce(fn, delay = 250) {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(null, args), delay); };
  }

  function getUniqueLocations(data) {
    return Array.from(new Set(data.map(r => r.location))).sort((a, b) => a.localeCompare(b));
  }
  function getUniqueCategories(data) {
    return Array.from(new Set(data.map(r => r.category))).sort((a, b) => a.localeCompare(b));
  }

  function filterResources(data, query, location, category) {
    const q = query.trim().toLowerCase();
    return data.filter(r => {
      const inTags = Array.isArray(r.tags) && r.tags.some(t => String(t).toLowerCase().includes(q));
      const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || inTags;
      const matchesLocation = !location || r.location === location;
      const matchesCategory = !category || r.category === category;
      return matchesQuery && matchesLocation && matchesCategory;
    });
  }

  function updateResultsCount(n) {
    els.resultsCount.textContent = n ? `${n} result${n === 1 ? '' : 's'} found` : 'No results';
  }

  function sortResources(data, sortKey) {
    const [key, dir] = sortKey.split('-');
    const mult = dir === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => {
      let av = '', bv = '';
      if (key === 'name') { av = a.name; bv = b.name; }
      else if (key === 'location') { av = a.location; bv = b.location; }
      else if (key === 'category') { av = a.category; bv = b.category; }
      return av.localeCompare(bv) * mult;
    });
  }

  function resourceCardTemplate(r) {
    const phoneLink = r.contact?.phone ? `<a href="tel:${r.contact.phone}" aria-label="Call ${r.name}">Call</a>` : '';
    const webLink = r.contact?.website ? `<a href="${r.contact.website}" target="_blank" rel="noopener" aria-label="Visit website of ${r.name}">Website</a>` : '';
    const emailLink = r.contact?.email ? `<a href="mailto:${r.contact.email}" aria-label="Email ${r.name}">Email</a>` : '';
    const tags = Array.isArray(r.tags) ? r.tags.map(t => `<button class="chip" type="button" data-tag="${String(t)}">${String(t)}</button>`).join('') : '';
    return `
      <article class="resource-card" role="listitem" tabindex="0">
        <h3>${r.name}</h3>
        <p>${r.description}</p>
        <div class="resource-meta" aria-label="Meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
          <span>${r.location}</span>
          &nbsp;•&nbsp;
          <span class="badge" aria-label="Category">${r.category}</span>
        </div>
        ${tags ? `<div class="tags" aria-label="Tags">${tags}</div>` : ''}
        <div class="resource-contact">
          ${phoneLink}
          ${webLink}
          ${emailLink}
        </div>
      </article>
    `;
  }

  function displayResources(data) {
    els.resourcesList.innerHTML = '';
    if (!data.length) {
      els.resourcesList.innerHTML = '<p role="status">No resources found.</p>';
      updateResultsCount(0);
      return;
    }
    const frag = document.createDocumentFragment();
    data.forEach(r => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = resourceCardTemplate(r).trim();
      frag.appendChild(wrapper.firstElementChild);
    });
    els.resourcesList.appendChild(frag);
    updateResultsCount(data.length);
  }

  function populateFilters() {
    const locations = getUniqueLocations(resources);
    locations.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc; opt.textContent = loc;
      els.locationSelect.appendChild(opt);
    });
    const categories = getUniqueCategories(resources);
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      els.categorySelect.appendChild(opt);
    });
  }

  function applyFilters() {
    const filtered = filterResources(resources, state.query, state.location, state.category);
    const sorted = sortResources(filtered, state.sort);
    displayResources(sorted);
  }

  function clearFilters() {
    state.query = ''; state.location = '';
    els.searchInput.value = '';
    els.locationSelect.value = '';
    applyFilters();
    els.searchInput.focus();
  }

  function initEvents() {
    const handleInput = debounce((e) => { state.query = e.target.value; applyFilters(); }, 200);
    els.searchInput.addEventListener('input', handleInput);

    els.searchButton.addEventListener('click', () => {
      state.query = els.searchInput.value; applyFilters();
    });

    els.clearButton.addEventListener('click', clearFilters);

    els.locationSelect.addEventListener('change', (e) => {
      state.location = e.target.value; applyFilters();
    });
    els.categorySelect.addEventListener('change', (e) => {
      state.category = e.target.value; applyFilters();
    });
    els.sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value; applyFilters();
    });

    els.resourcesList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tag]');
      if (btn) {
        const tag = btn.getAttribute('data-tag');
        state.query = tag;
        els.searchInput.value = tag;
        applyFilters();
      }
    });

    els.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); state.query = e.target.value; applyFilters(); }
    });
  }

  // Accessible custom select (combobox + listbox)
  function enhanceSelect(selectEl) {
    if (!selectEl) return;
    // Build wrapper UI next to the native select
    const id = selectEl.id || `select-${Math.random().toString(36).slice(2)}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'cs';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cs-button';
    btn.setAttribute('role', 'combobox');
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    const valueSpan = document.createElement('span');
    valueSpan.className = 'cs-value';
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '16');
    icon.setAttribute('height', '16');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.innerHTML = '<path fill="currentColor" d="M7 10l5 5 5-5z" />';
    btn.appendChild(valueSpan); btn.appendChild(icon);

    const list = document.createElement('ul');
    list.className = 'cs-list';
    list.id = `cs-list-${id}`;
    list.setAttribute('role', 'listbox');
    list.setAttribute('tabindex', '-1');
    list.hidden = true;
    btn.setAttribute('aria-controls', list.id);

    // Migrate options
    const opts = Array.from(selectEl.options).map((o) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.textContent = o.textContent;
      li.dataset.value = o.value;
      li.tabIndex = -1;
      if (o.selected) li.setAttribute('aria-selected', 'true');
      list.appendChild(li);
      return li;
    });
    const selectedIndex = selectEl.selectedIndex >= 0 ? selectEl.selectedIndex : 0;
    valueSpan.textContent = selectEl.options[selectedIndex]?.text || '';

    wrapper.appendChild(btn); wrapper.appendChild(list);
    selectEl.insertAdjacentElement('afterend', wrapper);

    // Hide native select from view and a11y tree; keep for state + change events
    selectEl.classList.add('sr-only');
    selectEl.setAttribute('aria-hidden', 'true');
    selectEl.tabIndex = -1;

    function open() { wrapper.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); list.hidden = false; const cur = opts.findIndex(li => li.getAttribute('aria-selected') === 'true'); setActive(cur >= 0 ? cur : 0); }
    function close() { wrapper.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); list.hidden = true; }

    let active = Math.max(0, opts.findIndex(li => li.getAttribute('aria-selected') === 'true'));
    function setActive(i) {
      if (i < 0 || i >= opts.length) return;
      opts[active]?.setAttribute('tabindex', '-1');
      active = i;
      opts[active].setAttribute('tabindex', '0');
      opts[active].focus({ preventScroll: true });
    }

    function commit(val) {
      selectEl.value = val;
      const selectedLi = opts.find(li => li.dataset.value === val) || opts[0];
      opts.forEach(li => li.setAttribute('aria-selected', li === selectedLi ? 'true' : 'false'));
      valueSpan.textContent = selectedLi.textContent;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    }

    btn.addEventListener('click', () => { (list.hidden ? open : close)(); });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    list.addEventListener('click', (e) => {
      const li = e.target.closest('li[role="option"]'); if (!li) return;
      commit(li.dataset.value);
      close(); btn.focus();
    });

    list.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); btn.focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, opts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
      else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
      else if (e.key === 'End') { e.preventDefault(); setActive(opts.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); commit(opts[active].dataset.value); close(); btn.focus(); }
    });

    document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) close(); });

    // Keep UI in sync if value changes externally
    selectEl.addEventListener('change', () => {
      const val = selectEl.value;
      const sel = opts.findIndex(li => li.dataset.value === val);
      if (sel >= 0) {
        opts.forEach(li => li.setAttribute('aria-selected', 'false'));
        opts[sel].setAttribute('aria-selected', 'true');
        valueSpan.textContent = opts[sel].textContent;
      }
    });
  }

  function init() {
    populateFilters();
    // Enhance selects after options are populated
    enhanceSelect(els.categorySelect);
    enhanceSelect(els.sortSelect);
    enhanceSelect(els.locationSelect);

    displayResources(sortResources(resources, state.sort));
    initEvents();
  }

  window.addEventListener('DOMContentLoaded', init);
})();
