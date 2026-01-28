// Search form - now always new tab (since iframe blocked)
const form = document.getElementById('searchForm');
const queryInput = document.getElementById('query');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let q = queryInput.value.trim();
    if (!q) return;

    q = encodeURIComponent(q + ' unblocked html5 games');
    window.open(`https://duckduckgo.com/?q=${q}`, '_blank');
    queryInput.value = ''; // Clear input
  });
}

// Load game in iframe
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

// Close game button
document.addEventListener('click', (e) => {
  if (e.target.id === 'close-game') {
    const container = document.getElementById('game-container');
    const iframe = document.getElementById('game-iframe');
    if (container && iframe) {
      iframe.src = ''; // Stop loading
      container.style.display = 'none';
    }
  }
});

// Fullscreen toggle
document.addEventListener('click', (e) => {
  if (e.target.id === 'fullscreen-btn') {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) { // Safari
        iframe.webkitRequestFullscreen();
      }
    }
  }
});
