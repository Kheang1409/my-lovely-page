// ------------------------
// Utility and Message Code
// ------------------------

// Switches between day and night themes
function updateTheme() {
    const options = { timeZone: 'Asia/Phnom_Penh', hour: '2-digit', hour12: false };
    const cambodiaHour = new Intl.DateTimeFormat('en-US', options).format(new Date());
    const currentHour = parseInt(cambodiaHour, 10);
    if (currentHour >= 6 && currentHour > 18) {  // 6 AM - 5:59 PM -> Day Mode
        document.body.classList.add('day');
        document.body.classList.remove('night');
    } else { // 6 PM - 5:59 AM -> Night Mode
        document.body.classList.add('night');
        document.body.classList.remove('day');
    }
}

// Date start (the day you began being together)
const startDate = new Date('2020-09-14');
  
// Special Dates for Messages
const specialDates = {
    "09/14": "Happy Anniversary!",
    "03/27": "Happy Wedding Anniversary!",
    "05/27": "Happy Birthday to My Wife!",
    "12/21": "Happy Birthday to Me!",
    "02/14": "Happy Valentine's Day!",
    "03/08": "Happy International </br> Women's Day, my love!",
};
  
// Calculate time together (years, months, days)
function calculateTimeTogether() {
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();
  
    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
}
  
// Update the special message based on today’s date
function updateSpecialMessage() {
    const currentDate = getCambodiaDate();
    const currentDateString = currentDate.substring(0,5);
    const messageElement = document.getElementById("specialMessage");
    if (specialDates[currentDateString]) {
      messageElement.innerHTML = specialDates[currentDateString];
    } else {
      const { years, months, days } = calculateTimeTogether();
      messageElement.innerHTML = `We've been together for </br>${years} years, ${months} months, and ${days} days.`;
    }
}
  
// Get the current date in Cambodia timezone (UTC+7)
function getCambodiaDate() {
    const options = { timeZone: 'Asia/Phnom_Penh', year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date().toLocaleDateString('en-US', options);
}

// ------------------------
// Firework Animation Code
// ------------------------
  
// Creates a firework element and animates it upward
function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');

    const left = Math.random() * window.innerWidth;
    firework.style.left = left + "px";
    firework.style.bottom = "0px";

    document.body.appendChild(firework);

    // Limit explosion height within visible range (20vh - 50vh)
    const explosionHeightVH = Math.random() * 30 + 20;
    const explosionHeightPx = window.innerHeight * explosionHeightVH / 100;

    firework.style.setProperty('--explodeHeight', explosionHeightPx + 'px');

    // Animate upward
    const duration = 1000;
    const startTime = Date.now();
    animateFirework(firework, startTime, duration, 0, explosionHeightPx);
}
  
// Animate the firework upward
function animateFirework(firework, startTime, duration, startBottom, endBottom) {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
  
    // Update bottom position and scale for a "shooting" effect
    const currentBottom = startBottom + (endBottom - startBottom) * progress;
    firework.style.bottom = currentBottom + "px";
    firework.style.transform = `scale(${1 + 0.8 * progress})`;
  
    if (progress < 1) {
      requestAnimationFrame(() => animateFirework(firework, startTime, duration, startBottom, endBottom));
    } else {
      // Once complete, trigger explosion at firework's final position
      const rect = firework.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top;
      firework.remove();
      explodeFirework(centerX, centerY);
    }
}
  
function explodeFirework(centerX, centerY) {
    // Create a full-page container for the explosion
    const explosionContainer = document.createElement('div');
    explosionContainer.style.position = 'absolute';
    explosionContainer.style.left = '0';
    explosionContainer.style.top = '0';
    explosionContainer.style.width = '100%';
    explosionContainer.style.height = '100%';
    explosionContainer.style.zIndex = '9999';
    explosionContainer.style.pointerEvents = 'none'; // Disable interactions with the container
    document.body.appendChild(explosionContainer);

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const particleCount = 100; // Increase particles for better effect

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('explosion');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random explosion directions with a wider range
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 300 + 50; // Make explosion radius 50-350px (wider explosion)
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);

        // Position particle at the center
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        explosionContainer.appendChild(particle);
    }

    // Remove explosion container after animations
    setTimeout(() => explosionContainer.remove(), 1500);
}

  
// ------------------------
// Flower Animation Code
// ------------------------

function createFlower() {
    const flower = document.createElement('i');
    flower.classList.add('fas', 'fa-spa', 'flower');
    flower.style.position = "absolute";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.setProperty('--x', Math.random());
    flower.style.animationDuration = Math.random() * 3 + 2 + "s";
    flower.style.fontSize = Math.random() * 20 + 10 + "px";
    flower.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    document.body.appendChild(flower);
    flower.addEventListener('animationend', () => {
      flower.remove();
    });
}

// ------------------------
// Initialization and Intervals
// ------------------------
updateSpecialMessage();
updateTheme();

// Start creating fireworks and flowers at intervals
setInterval(createFirework, 2500); // Launch a firework every 2 seconds
setInterval(createFlower, 1500);   // Create a floating flower every 3 seconds
setInterval(updateTheme, 60000*2); // refreshing every 2 min