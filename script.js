// For the search form on Home
const form = document.getElementById('searchForm');
const queryInput = document.getElementById('query');
const frame = document.getElementById('resultsFrame');

if (form) {  // Only run if elements exist (so it doesn't break on apps.html)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let q = queryInput.value.trim();
    if (!q) return;

    q = encodeURIComponent(q + ' games unblocked html5');

    // In-screen iframe option
    frame.src = `https://duckduckgo.com/?q=${q}&kp=1`;
    frame.style.display = 'block';
  });
}

// For loading embedded games
function loadGame(url, title) {
  const container = document.getElementById('game-container');
  const iframe = document.getElementById('game-iframe');
  const titleEl = document.getElementById('game-title');

  if (container && iframe && titleEl) {
    titleEl.textContent = title;
    iframe.src = url;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
  }
}
