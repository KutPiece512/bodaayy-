/* ============================================================
   Birthday Website — script.js
   ============================================================ */

// ---- FALLING PETALS ----
(function () {
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Petal(init) {
    this.reset(init);
  }

  Petal.prototype.reset = function (init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : -20;
    this.size = 6 + Math.random() * 10;
    this.speedY = 0.5 + Math.random() * 1.2;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.opacity = 0.3 + Math.random() * 0.45;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.sway = Math.random() * Math.PI * 2;
  };

  Petal.prototype.update = function () {
    this.y += this.speedY;
    this.sway += 0.02;
    this.x += this.speedX + Math.sin(this.sway) * 0.4;
    this.rotation += this.rotSpeed;
    if (this.y > canvas.height + 30) this.reset(false);
  };

  Petal.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.45, this.size, 0, 0, Math.PI * 2);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
    g.addColorStop(0, '#f5c5c0');
    g.addColorStop(1, '#e8a09a');
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  };

  var petals = [];
  for (var i = 0; i < 28; i++) petals.push(new Petal(true));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();





// ---- CUSTOMIZE BAR ----
document.getElementById('name-input').addEventListener('input', function () {
  var name = this.value.trim();
  document.getElementById('her-name-display').textContent = name || 'My Love';
});

document.getElementById('sender-input').addEventListener('input', function () {
  var sender = this.value.trim();
  document.getElementById('sig-display').textContent = sender
    ? '— With all my love, ' + sender + ' 🌹'
    : '— With all my love 🌹';
});

document.getElementById('close-bar-btn').addEventListener('click', function () {
  document.getElementById('customize-bar').style.display = 'none';
});


// ---- HER PHOTO UPLOAD ----
document.getElementById('her-photo-input').addEventListener('change', function (e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function (evt) {
    var preview = document.getElementById('her-photo-preview');
    // Set image source
    preview.src = evt.target.result;
    // Show image
    preview.style.cssText = 'display:block !important; position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:4px; z-index:2;';
    // Hide placeholder text & icon
    var box = document.getElementById('her-photo-box');
    var icon = box.querySelector('.upload-icon');
    var txt  = box.querySelector('.upload-text');
    if (icon) icon.style.display = 'none';
    if (txt)  txt.style.display  = 'none';
  };
  reader.readAsDataURL(file);
});





// ---- SCROLL REVEAL ----
(function () {
  var reveals = document.querySelectorAll('.reveal');

  function check() {
    var windowHeight = window.innerHeight;
    for (var i = 0; i < reveals.length; i++) {
      var rect = reveals[i].getBoundingClientRect();
      if (rect.top < windowHeight - 80) {
        reveals[i].classList.add('visible');
      }
    }
  }

  window.addEventListener('scroll', check);
  window.addEventListener('resize', check);
  check(); // run once on load
})();
