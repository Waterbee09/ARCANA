const loader = document.getElementById('loader');
const center = document.getElementById('center');
const errorPopup = document.getElementById('errorPopup');
const closeBtn = document.getElementById('closeBtn');
const crashTrigger = document.getElementById('crashTrigger');

function startLoading() {
  loader.style.display = 'block';
  center.style.display = 'none';
  errorPopup.style.display = 'none';
}

function showErrorPopup() {
  loader.style.display = 'none';
  center.style.display = 'none';
  errorPopup.style.display = 'flex';
}

// ปุ่ม CLOSE
closeBtn.addEventListener('click', () => {
  location.reload();
});

// ปุ่มจำลองเว็บล่ม
crashTrigger.addEventListener('click', () => {
  startLoading();

  // แสดง loader 1.5 วินาที แล้วโชว์ error popup
  setTimeout(() => {
    showErrorPopup();
  }, 1500);
});
