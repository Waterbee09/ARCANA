document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('regForm');
  const togglePw = document.getElementById('togglePw');

  // toggle password show/hide
  togglePw.addEventListener('click', () => {
    const pw = document.getElementById('password');
    const pressed = togglePw.getAttribute('aria-pressed') === 'true';
    if (pressed) {
      pw.type = 'password';
      togglePw.textContent = 'Show';
      togglePw.setAttribute('aria-pressed', 'false');
    } else {
      pw.type = 'text';
      togglePw.textContent = 'ซ่อน';
      togglePw.setAttribute('aria-pressed', 'true');
    }
  });

  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // reset error ทุกอัน
    ['err-firstname','err-birthday','err-password','err-confirm'].forEach(id=>showError(id,''));

    // ค่า input
    const first = document.getElementById('firstname').value.trim();
    const birthday = document.getElementById('birthday').value;
    const pw = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    let ok = true;

    if (!first) { showError('err-firstname','กรุณาใส่ชื่อ'); ok = false; }
    if (!birthday) { showError('err-birthday','กรุณาเลือกวันเดือนปีเกิด'); ok = false; }
    if (!pw || pw.length < 8) { showError('err-password','รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'); ok = false; }
    if (pw !== confirm) { showError('err-confirm','รหัสผ่านไม่ตรงกัน'); ok = false; }

    if (!ok) return;

    try {
      const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
      // เช็คชื่อซ้ำ (หรือจะใช้ birthday เป็น unique key ก็ได้)
      if (users.some(u => u.firstname === first)) {
        showError('err-firstname','ชื่อนี้ถูกใช้งานแล้ว');
        return;
      }

      users.push({
        firstname: first,
        birthday,
        password: pw,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('demo_users', JSON.stringify(users));

      alert('ลงทะเบียนเรียบร้อย! โปรดเข้าสู่ระบบใหม่');
      window.location.href = 'login.html';
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
  });
});