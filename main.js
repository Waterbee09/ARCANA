const center = document.getElementById('center');
const form = document.getElementById('composer');
const input = document.getElementById('input');

// ฟังก์ชันแสดงไพ่ + ข้อความทีละใบ
function showCards(cards, predictionMessage, specialCase=false) {
  const cardHTML = cards.map(file => `
    <div class="card">
      <div class="card-face card-back">
      <img src="cards/back.png" class="card-img" alt="card back" style="width:100%;height:100%;border-radius:2px;">
      </div>
      <div class="card-face card-front">
        <img src="cards/${file}" class="card-img" alt="${file}" style="width:100%;height:100%;border-radius:2px;">
      </div>
    </div>
  `).join('');

  center.innerHTML = `
    <div class="card-result">${cardHTML}</div>
    <div class="funny-text-container"></div>
  `;

  const cardsEl = document.querySelectorAll('.card');
  const funnyTextEl = document.createElement('div');
  funnyTextEl.className = 'funny-text';
  center.querySelector('.funny-text-container').appendChild(funnyTextEl);

  if (specialCase) {
    // แยกข้อความเป็นสองส่วน
    const firstLines = [
      'คุณซีโร่มีประสบการณ์ทำงานเกี่ยวกับความตาย',
      'และมีการต่อสู้'
    ];
    const finalLine = 'คุณเป็นคนที่น่าสนใจนะ';

    cardsEl.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('flipped');

        if (i < 2) {
          // ไพ่ใบ 1 และ 2 → แสดงข้อความแรก
          const lineEl = document.createElement('div');
          lineEl.textContent = firstLines[i];
          lineEl.style.opacity = 0;
          lineEl.style.transition = 'opacity 0.6s ease';
          funnyTextEl.appendChild(lineEl);
          setTimeout(() => lineEl.style.opacity = 1, 450);
        } else {
          // ไพ่ใบ 3 → ลบข้อความก่อนหน้าแล้วแสดงข้อความสุดท้าย
          setTimeout(() => {
            funnyTextEl.innerHTML = '';
            const lineEl = document.createElement('div');
            lineEl.textContent = finalLine;
            lineEl.style.opacity = 0;
            lineEl.style.transition = 'opacity 0.6s ease';
            funnyTextEl.appendChild(lineEl);
            setTimeout(() => lineEl.style.opacity = 1, 250);
          }, 1000);
        }
      }, i * 600);
    });

  } else {
    // กรณีทั่วไป ใช้แบบเดิม
    const lines = predictionMessage.split('\n');
    cardsEl.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('flipped');
        if (lines[i]) {
          const lineEl = document.createElement('div');
          lineEl.textContent = lines[i];
          lineEl.style.opacity = 0;
          lineEl.style.transition = 'opacity 0.6s ease';
          funnyTextEl.appendChild(lineEl);
          setTimeout(() => lineEl.style.opacity = 1, 350);
        }
      }, i * 600);
    });
  }
}

// ปุ่มสุ่มไพ่เป็น 🔮
function showDrawButton(cards, predictionMessage, specialCase=false) {
  center.innerHTML = `
    <div class="draw-orb" style="font-size:80px; cursor:pointer;">🔮</div>
  `;
  
  const btn = center.querySelector('.draw-orb');
  btn.addEventListener('click', () => showCards(cards, predictionMessage, specialCase));
}

// จัดการ submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  if (text.includes('ฉันทำงานอะไร')) {
    const fixedCards = ['10-of-wands.png', 'Five-of-swords.png', 'Death.png'];
    showDrawButton(fixedCards, '', true); // ใช้ specialCase

  } else if (text.includes('รู้อะไรเกี่ยวกับฉันอีกมั้ย')) {
    const fixedCards = ['The-hermit.png', 'Five-of-pentacles.png', 'Ten-of-cups.png'];
    const predictionMessage = 'คุณเติบโตขึ้นมาด้วยตัวของคุณเอง\nเพราะถูกทอดทิ้งอย่างไร้เยื่อใย\nไม่มีคำว่าครอบครัว สำหรับคุณ';
    showDrawButton(fixedCards, predictionMessage);

  } else if (text.includes('เมธัส')) {
    const fixedCards = ['Six-of-swords.png', 'Page-of-cups.png', 'Six-of-wands.png'];
    const predictionMessage = 'คุณซีโร่ลองเลิกยึดติดกับวิธีการเดิม ๆ\nใช้อะไรใหม่ ๆ เช่น\nอุปกรณ์ในการทำงาน แล้วจะนำไปสู่ผลลัพธ์ที่ดีขึ้น :)';
    showDrawButton(fixedCards, predictionMessage);

  } else if (text.includes('งานวันนี้จะเป็นยังไง')) {
    const fixedCards = ['The-sun.png', 'The-chariot.png', 'Nine-of-wands.png'];
    const predictionMessage = 'งานของคุณซีโร่สำเร็จแน่นอน\nแค่พุ่งไปตรง ๆ และแลกด้วยความเจ็บปวดอย่างมหันต์';
    showDrawButton(fixedCards, predictionMessage);

  } else if (text.includes('งานครั้งต่อไป เป้าหมายคือเชฟ มีคำแนะนำให้จบงานได้สำเร็จไหม')) {
    const fixedCards = ['The-chariot.png', 'The-fool.png', 'Eight-of-wands.png'];
    const predictionMessage = 'คุณซีโร่… ต้องสุดโต่งไปกับมันอย่างไร้แบบแผน\nปลุกไฟให้ลุกโชน!';
    showDrawButton(fixedCards, predictionMessage);

  } else if (text.includes('งานตอนนี้ผิดแผน ควรทำยังไง')) {
    const fixedCards = ['Six-of-cups.png', 'Three-of-swords.png', 'Ace-of-swords.png'];
    const predictionMessage = 'คุณซีโร่ควรเลี่ยงของเก่า ซ้ำซาก\nเพื่อนำไปสู่ชัยชนะในครั้งนี้';
    showDrawButton(fixedCards, predictionMessage);

  } else {
    const funnyReplies = [
      "ชอบใส่ใจหรอ ไม่ต้องใส่ใจเรื่องของเราหรอก555+",
      "เอ๊ะ! ทำไมสนใจขนาดนี้ 😏",
      "ไม่เกี่ยวกับคุณหรอกนะ 555+",
      "โอ้โห ขยันถามจริง ๆ เลย 🤣",
      "เฮ้ย อย่าใส่ใจเรื่องของเราเลย 555+",
      "ฮ่าๆๆ ลองถามเรื่องอื่นไหม?",
      "สงสัยอะไรอีกล่ะ 😆",
      "อุ๊ย! ข้อมูลลับนะจ๊ะ 😉"
    ];
    const randomText = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
    center.innerHTML = `<div class="funny-text">${randomText}</div>`;
  }
});