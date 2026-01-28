// DuckDuckGo search embedded in iframe on the page
const form = document.getElementById('searchForm');
const queryInput = document.getElementById('query');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let q = queryInput.value.trim();
    if (!q) return;

    // Add keywords to focus on games/unblocked
    q = encodeURIComponent(q + ' unblocked html5 games');

    const frame = document.getElementById('resultsFrame');
    const resultsDiv = document.getElementById('search-results');
    const note = document.getElementById('search-note');

    // Load directly in iframe
    frame.src = `https://duckduckgo.com/?q=${q}&kp=1&kl=us-en&ia=web`;
    resultsDiv.style.display = 'block';
    note.style.display = 'none';

    // Detect if iframe is blank/failed to load content (school block or error)
    frame.onload = function() {
      try {
        const content = frame.contentDocument || frame.contentWindow.document;
        if (content && content.body.innerHTML.length < 500) {  // Rough check for empty or minimal page
          note.style.display = 'block';
        }
      } catch (err) {
        // Cross-origin or block error - show note
        note.style.display = 'block';
      }
    };

    queryInput.value = '';  // Clear the input
  });
}

// Load game in the on-page UI (iframe container)
function loadGame(url, title) {
  const container = document.getElementById('game-container');
  const iframe = document.getElementById('game-iframe');
  const titleEl = document.getElementById('game-title');

  if (container && iframe && titleEl) {
    titleEl.textContent = title;
    iframe.src = url;  // Set src to the embeddable game URL
    container.style.display = 'block';

    // Gentle scroll to the game container (starts from its top, no full page jump)
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);  // Delay lets iframe start loading first
  }
}

// Close game button listener
document.addEventListener('click', (e) => {
  if (e.target.id === 'close-game') {
    const container = document.getElementById('game-container');
    const iframe = document.getElementById('game-iframe');
    if (container && iframe) {
      iframe.src = '';  // Clear src to stop game
      container.style.display = 'none';
    }
  }
});

// Fullscreen toggle for game iframe
document.addEventListener('click', (e) => {
  if (e.target.id === 'fullscreen-btn') {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {  // Safari/iOS
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {  // IE/Edge legacy
        iframe.msRequestFullscreen();
      }
    }
  }
});
