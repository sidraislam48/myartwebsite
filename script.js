const fallbackImg = "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Use backend proxy endpoint to avoid exposing the Harvard API key in client-side code
const harvardEndpoint = 'http://localhost:5000/api/harvard-art';


const metSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=portrait";
const metObjectUrl = id => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

document.addEventListener("DOMContentLoaded", () => {
  loadHarvardArt();
  loadMetHighlights();
  loadQuote();
  wireNewsletter();

  document.getElementById("refresh-art")?.addEventListener("click", loadHarvardArt);
  document.getElementById("refresh-met")?.addEventListener("click", loadMetHighlights);

  // Auth wiring
  initAuth();
});

// ------------------ AUTH CLIENT ------------------
const apiBase = 'http://localhost:5000'; // Same server

function setToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function clearToken() {
  localStorage.removeItem('token');
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

async function fetchMe() {
  return getUser();
}

async function initAuth() {
  // update nav
  const auth = await fetchMe();
  renderAuthInNav(auth);

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('signupName')?.value;
      const email = document.getElementById('signupEmail')?.value;
      const password = document.getElementById('signupPassword')?.value;
      try {
        const res = await fetch(`${apiBase}/api/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw data;
        setToken(data.token);
        setUser(data.user);
        alert('Signup successful! Redirecting...');
        window.location.href = 'index.html';
      } catch (err) {
        alert(err?.message || 'Signup failed');
      }
    });
  }

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value.trim();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: email, password })
      });

      const data = await res.json();
      if (!res.ok) throw data;

      setToken(data.token);
      setUser(data.user);
      window.location.href = 'index.html';
    } catch (err) {
      alert(err?.message || 'Login failed');
    }
  });
}
}

function renderAuthInNav(user) {
  const right = document.querySelector('.nav-right');
  if (!right) return;
  if (user) {
    right.innerHTML = `
      <span class="user-name">Hello, ${user.username}</span>
      <a href="#" id="logoutBtn" class="pill-btn">Logout</a>
      <a href="product.html" class="cart-link" id="cartLink">
        <i class="bx bx-shopping-bag"></i>
        <span class="cart-badge" id="cartBadge">0</span>
      </a>
    `;
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      clearToken();
      localStorage.removeItem('user');
      window.location.reload();
    });
  } else {
    right.innerHTML = `
      <a href="signup.html" class="pill-btn">Join</a>
      <a href="product.html" class="cart-link" id="cartLink">
        <i class="bx bx-shopping-bag"></i>
        <span class="cart-badge" id="cartBadge">0</span>
      </a>
    `;
  }
}


async function loadHarvardArt() {
  const artGrid = document.querySelector(".art-grid");
  if (!artGrid) return;
  artGrid.innerHTML = `<div class="placeholder-card">Loading gallery...</div>`;

  try {
    const response = await fetch(harvardEndpoint);
    const data = await response.json();
    const artworks = data.records || [];
    
    console.log('Harvard data:', data);
    console.log('Artworks:', artworks);
    
    if (!artworks.length) throw new Error("No artworks found");

    artGrid.innerHTML = "";
    artworks.forEach(art => {
      const imageUrl = art.primaryImage || art.displayImage || art.images?.[0]?.baseimageurl || fallbackImg;
      
      const card = document.createElement("div");
      card.classList.add("art-card");
      card.innerHTML = `
        <img src="${imageUrl}" alt="${art.title || "Artwork"}" onerror="this.src='${fallbackImg}'" />
        <h3>${art.title || "Untitled"}</h3>
        <p>${art.technique || art.period || "Mixed Media"}</p>
      `;
      artGrid.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching artworks:", err);
    artGrid.innerHTML = `<div class="placeholder-card">We couldn't reach Harvard's gallery right now. Please try again.</div>`;
  }
}

async function loadMetHighlights() {
  const grid = document.querySelector(".museum-grid");
  if (!grid) return;
  grid.innerHTML = `<div class="placeholder-card">Fetching highlights...</div>`;

  try {
    const search = await fetch(metSearchUrl);
    const searchData = await search.json();
    const ids = (searchData.objectIDs || []).slice(0, 20);
    if (!ids.length) throw new Error("No ids returned");

    const picks = pickRandom(ids, 3);
    const details = await Promise.all(picks.map(id => fetch(metObjectUrl(id)).then(res => res.json())));

    grid.innerHTML = "";
    details.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("museum-card");
      card.innerHTML = `
        <img src="${item.primaryImageSmall || fallbackImg}" alt="${item.title || "Museum artwork"}">
        <div class="content">
          <h4>${item.title || "Untitled"}</h4>
          <p>${item.artistDisplayName || "Unknown artist"} • ${item.department || "Met Collection"}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Met API error:", err);
    grid.innerHTML = `<div class="placeholder-card">Museum highlights are offline. Try again soon.</div>`;
  }
}

function pickRandom(arr, count) {
  const copy = [...arr];
  const result = [];
  while (result.length < count && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

async function loadQuote() {
  const quoteEl = document.querySelector(".quote-text");
  const authorEl = document.querySelector(".quote-author");
  if (!quoteEl || !authorEl) return;

  try {
    const res = await fetch("https://api.quotable.io/random?tags=art");
    const data = await res.json();
    quoteEl.textContent = data.content || "Art is the journey of a free soul.";
    authorEl.textContent = data.author ? `— ${data.author}` : "— Unknown";
  } catch (err) {
    console.error("Quote error:", err);
    quoteEl.textContent = "Art is the journey of a free soul.";
    authorEl.textContent = "— Unknown";
  }
}

function wireNewsletter() {
  const form = document.querySelector(".newsletter-form");
  const status = document.querySelector(".form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email?.value;
    if (!email) return;

    status.textContent = "Saving your preference...";
    status.style.color = "#d4b06a";

    try {
     
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      status.textContent = "You're in! Expect weekly drops from our curators.";
      status.style.color = "#6dd67d";
      form.reset();
    } catch (err) {
      console.error("Newsletter error:", err);
      status.textContent = "We had trouble subscribing you. Please retry in a bit.";
      status.style.color = "#ff9a9a";
    }
  });
}

