<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Valhalla Pantheon – Valhalla Coach</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400|Inter:400,700&display=swap" rel="stylesheet">
  <style>
    /* Your CSS styles (unchanged) */
  </style>
</head>
<body>
  <div class="god-selector-bar" id="god-selector"></div>
  <div class="valhalla-card" id="valhalla-card">
    <img id="god-logo" src="" alt="God Logo" style="width:98px;height:98px;border-radius:100px;box-shadow:0 2px 16px 2px #0002;margin-top:-65px;margin-bottom:2px;background:#181818;">
    <div class="god-title" id="god-title"></div>
    <div class="god-bio" id="god-bio"></div>
    <div class="chat-history" id="chat-history"></div>
    <div class="loader-runic" id="loader-runic" style="display:none;">ᚨ ᛟ ᚱ ᛃ ᚺ ᚠ ᚾ ᛏ</div>
    <form class="chat-input-row" id="chat-form" autocomplete="off">
      <input class="chat-input" id="chat-input" autocomplete="off" placeholder="Ask your guide anything...">
      <button class="chat-send-btn" type="submit">Send</button>
    </form>
    <div class="music-player-row" id="music-player">
      <button class="music-play-btn" id="musicPlayBtn" title="Play / Pause Music">🎵</button>
      <input type="range" min="0" max="1" step="0.01" value="0.25" class="music-slider" id="musicSlider" aria-label="Volume">
    </div>
  </div>
  <audio id="musicAudio" preload="auto" loop></audio>

  <script>
// Full pantheon.js logic

const GODS = [
  {
    key: 'odin',
    name: 'Odin',
    assistantId: 'asst_D0BXH8CTZycU0ku9PjkUmW3T',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_27_2025_02_47_18_PM.png?v=1751060934',
    color: '#1c64ff',
    music: 'https://cdn.pixabay.com/audio/2022/12/19/audio_12b0e71fa2.mp3',
    bio: 'Wisdom, vision, and strategy—the Allfather.'
  },
  {
    key: 'thor',
    name: 'Thor',
    assistantId: 'asst_JNie4vDtknbropUsbuXF4OpG',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jul_3_2025_04_31_31_PM.png?v=1751586454',
    color: '#e14b3d',
    music: 'https://cdn.pixabay.com/audio/2022/11/16/audio_125b5cfb62.mp3',
    bio: 'Strength, action, and resilience—the thunder god.'
  },
  {
    key: 'loki',
    name: 'Loki',
    assistantId: 'asst_hKdLlIlE66bKCjuuDzhwknFM',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_27_2025_02_51_28_PM.png?v=1751061104',
    color: '#0db18a',
    music: 'https://cdn.pixabay.com/audio/2022/11/16/audio_125b5cfb62.mp3',
    bio: 'Creativity, wit, and transformation—the trickster.'
  },
  {
    key: 'freya',
    name: 'Freya',
    assistantId: 'asst_A0oRwWmYijWwmRJuA2iO9JlR',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_30_2025_07_59_45_PM.png?v=1751338805',
    color: '#c5277e',
    music: 'https://cdn.pixabay.com/audio/2022/10/16/audio_125b985df9.mp3',
    bio: 'Healing, beauty, and abundance—the goddess of love.'
  },
  {
    key: 'oz',
    name: 'Oz',
    assistantId: 'asst_Hk4WoxgaWQr5wbagpEtmQbuY',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_27_2025_02_53_41_PM.png?v=1751061236',
    color: '#ff9200',
    music: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124b01b0b2.mp3',
    bio: 'Transformation, wisdom, and mastery—the digital wizard.'
  },
  {
    key: 'tyr',
    name: 'Tyr',
    assistantId: 'asst_5RBZdhN1br4dkpDB6g1cRBCg',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jul_3_2025_04_36_18_PM.png?v=1751586454',
    color: '#946140',
    music: 'https://cdn.pixabay.com/audio/2023/03/27/audio_1285ba08f4.mp3',
    bio: 'Justice, discipline, and sacrifice—the steadfast champion.'
  },
  {
    key: 'heimdall',
    name: 'Heimdall',
    assistantId: 'asst_5BTp4L16s3LSFZWyOwHL2Qow',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_30_2025_07_22_22_PM.png?v=1751338021',
    color: '#8653eb',
    music: 'https://cdn.pixabay.com/audio/2022/12/19/audio_12b0e71fa2.mp3',
    bio: 'Clarity, vigilance, and protection—the ever-watchful guardian.'
  },
  {
    key: 'skald',
    name: 'Skald',
    assistantId: 'asst_mDsnxmXYWK6VVR2TGlWgr0Db',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_30_2025_07_22_47_PM.png?v=1751338340',
    color: '#2b55e2',
    music: 'https://cdn.pixabay.com/audio/2022/10/16/audio_125b985df9.mp3',
    bio: 'Story, poetry, and inspiration—the bard of legend.'
  },
  {
    key: 'coach',
    name: 'Valhalla Coach',
    assistantId: 'asst_0b7Qdwscxs168I4YFX2gKSUd',
    avatar: 'https://cdn.shopify.com/s/files/1/0620/9958/7203/files/ChatGPT_Image_Jun_27_2025_03_01_06_PM.png?v=1751061688',
    color: '#ffe18d',
    music: 'https://cdn.pixabay.com/audio/2023/01/31/audio_12dbfc3fa1.mp3',
    bio: 'Motivation, discipline, and action—your ultimate Viking coach.'
  }
];

let selectedGod = GODS[8];
let chatHistory = [];

const godSelector = document.getElementById('god-selector');
const godLogo = document.getElementById('god-logo');
const godTitle = document.getElementById('god-title');
const godBio = document.getElementById('god-bio');
const chatHistoryDiv = document.getElementById('chat-history');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const valhallaCard = document.getElementById('valhalla-card');
const loaderRunic = document.getElementById('loader-runic');
const musicAudio = document.getElementById('musicAudio');
const musicPlayer = document.getElementById('music-player');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const musicSlider = document.getElementById('musicSlider');

function setThemeColor(hex) {
  document.documentElement.style.setProperty('--default-color', hex || '#ffe18d');
}

function renderGodSelector() {
  godSelector.innerHTML = '';
  GODS.forEach((god) => {
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'god-avatar' + (selectedGod.key === god.key ? ' selected' : '');
    avatarDiv.title = god.name;
    avatarDiv.style.borderColor = (selectedGod.key === god.key) ? god.color : '#333';
    avatarDiv.onclick = () => {
      selectedGod = god;
      setThemeColor(god.color);
      renderGodSelector();
      renderGod();
      chatHistory = [];
      renderChat();
      setupMusic();
    };
    const img = document.createElement('img');
    img.src = god.avatar;
    img.alt = god.name;
    avatarDiv.appendChild(img);
    godSelector.appendChild(avatarDiv);
  });
}

function renderGod() {
  godLogo.src = selectedGod.avatar;
  godTitle.innerText = selectedGod.name;
  godBio.innerText = selectedGod.bio;
  chatInput.placeholder = `Ask ${selectedGod.name} anything...`;
  setThemeColor(selectedGod.color);
}

function renderChat() {
  chatHistoryDiv.innerHTML = '';
  chatHistory.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg ' + (msg.from === 'user' ? 'user' : 'god');
    msgDiv.innerHTML = msg.text;
    chatHistoryDiv.appendChild(msgDiv);
  });
  chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
}

const runes = ['ᚨ','ᛟ','ᚱ','ᛃ','ᚺ','ᚠ','ᚾ','ᛏ'];
let runeIdx = 0, loaderInterval = null;
function showLoader() {
  loaderRunic.style.display = '';
  loaderRunic.textContent = runes[runeIdx];
  loaderInterval = setInterval(() => {
    runeIdx = (runeIdx + 1) % runes.length;
    loaderRunic.textContent = runes[runeIdx];
  }, 170);
}
function hideLoader() {
  loaderRunic.style.display = 'none';
  clearInterval(loaderInterval);
}

function setupMusic() {
  if (!selectedGod.music) {
    musicPlayer.style.display = 'none';
    musicAudio.pause();
    return;
  }
  musicPlayer.style.display = '';
  musicAudio.src = selectedGod.music;
  musicAudio.volume = musicSlider.value;
  musicAudio.pause();
  musicPlayBtn.classList.remove('active');
}
let musicPlaying = false;
musicPlayBtn.onclick = () => {
  if (!musicPlaying) {
    musicAudio.muted = false;
    musicAudio.play();
    musicPlayBtn.classList.add('active');
    musicPlaying = true;
  } else {
    musicAudio.pause();
    musicPlayBtn.classList.remove('active');
    musicPlaying = false;
  }
};
musicSlider.oninput = (e) => {
  musicAudio.volume = e.target.value;
};

function getThreadId(godKey) {
  const key = `valhalla_thread_${godKey}`;
  let id = localStorage.getItem(key);
  if (id) return Promise.resolve(id);
  return fetch('https://odin-assistant-starter.vercel.app/api/start-thread', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(key, data.threadId);
      return data.threadId;
    })
    .catch(err => {
      console.error('Thread ID error:', err);
      return null;
    });
}

chatForm.onsubmit = async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatHistory.push({from:'user', text});
  renderChat();
  chatInput.value = '';
  showLoader();
  try {
    const threadId = await getThreadId(selectedGod.key);
    if (!threadId) throw new Error('No thread ID');
    const response = await fetch('https://odin-assistant-starter.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assistantId: selectedGod.assistantId,
        message: text,
        threadId: threadId
      })
    });
    const data = await response.json();
    hideLoader();
    chatHistory.push({ from: 'god', text: data.reply || 'No reply from the gods.' });
    renderChat();
  } catch (err) {
    hideLoader();
    chatHistory.push({ from: 'god', text: '⚠️ Network error. Please try again.' });
    renderChat();
  }
};

// Init
renderGodSelector();
renderGod();
renderChat();
setupMusic();
chatInput.focus();
</script>
</body>
</html>
