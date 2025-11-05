const loader = document.getElementById('loader');
const center = document.getElementById('center');
const errorPopup = document.getElementById('errorPopup');
const closeBtn = document.getElementById('closeBtn');

function startLoading() {
  loader.style.display = 'block';
  center.style.display = 'none';
  errorPopup.style.display = 'none';
}

function finishLoading() {
  loader.style.display = 'none';
  center.style.display = 'flex';
}

function showErrorPopup() {
  loader.style.display = 'none';
  center.style.display = 'none';  // ✅ ปิด content เพื่อให้ popup เด่น
  errorPopup.style.display = 'flex';
}

// ปุ่ม "CLOSE"
closeBtn.addEventListener('click', () => {
  location.reload(); // รีโหลดหน้าใหม่
});

// จำลองโหลด (หรือใช้ตรวจจริงด้วย navigator.onLine)
function simulateLoad() {
  const online = navigator.onLine;

  setTimeout(() => {
    if (online) {
      finishLoading();
    } else {
      showErrorPopup();
    }
  }, 1500);
}

// เริ่มโหลดตอนเปิดหน้า
startLoading();
simulateLoad();