const home = document.getElementById('home');
const detail = document.getElementById('detail');
const detailTitle = document.getElementById('detailTitle');
const backBtn = document.getElementById('backBtn');

const titles = {
  standard: 'پرس پا',
  wide: 'پرس پا با جای پا باز',
  narrow: 'پرس پا با جای پا جمع'
};

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    detailTitle.textContent = titles[btn.dataset.open] || titles.standard;
    home.classList.remove('active-page');
    detail.classList.add('active-page');
    window.scrollTo({top:0, behavior:'instant'});
  });
});

backBtn.addEventListener('click', () => {
  detail.classList.remove('active-page');
  home.classList.add('active-page');
  window.scrollTo({top:0, behavior:'smooth'});
});

// Fake video player: designed to reproduce the recording's visible interactions
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const current = document.getElementById('current');
const remain = document.getElementById('remain');
let playing = true;
let elapsed = 0;
const duration = 20;

function formatTime(s){
  s = Math.max(0, Math.floor(s));
  return `0:${String(s).padStart(2,'0')}`;
}
function renderVideo(){
  const pct = Math.min(100, elapsed/duration*100);
  progress.style.width = pct + '%';
  current.textContent = formatTime(elapsed);
  remain.textContent = '-' + formatTime(duration-elapsed);
  playBtn.querySelector('span').textContent = playing ? 'Ⅱ' : '▶';
}
setInterval(() => {
  if(!playing) return;
  elapsed += .1;
  if(elapsed >= duration) elapsed = 0;
  renderVideo();
},100);
playBtn.addEventListener('click',()=>{playing=!playing;renderVideo()});
document.querySelector('.skip-back').addEventListener('click',()=>{elapsed=Math.max(0,elapsed-10);renderVideo()});
document.querySelector('.skip-forward').addEventListener('click',()=>{elapsed=Math.min(duration,elapsed+10);renderVideo()});
document.querySelector('.progress').addEventListener('click',e=>{
  const r=e.currentTarget.getBoundingClientRect();
  elapsed=((e.clientX-r.left)/r.width)*duration;
  renderVideo();
});
document.querySelector('.more').addEventListener('click',()=>alert('گزینه‌های بیشتر ویدئو'));

document.querySelectorAll('.muscle-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.muscle-tabs button').forEach(x=>x.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('quadGlow').style.opacity = btn.dataset.muscle==='quad' ? '1':'0';
    document.getElementById('gluteGlow').style.opacity = btn.dataset.muscle==='glute' ? '1':'0';
    document.getElementById('hamGlow').style.opacity = btn.dataset.muscle==='ham' ? '1':'0';
  });
});

renderVideo();
