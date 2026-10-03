let locationUrl = '';
const clock = document.getElementById('clock');
const now = () => new Date().toLocaleString('es-CL', { dateStyle: 'full', timeStyle: 'medium' });
const tick = () => { clock.textContent = '🕐 ' + now(); };
tick(); setInterval(tick, 1000);
document.getElementById('location-button').addEventListener('click', () => {
  const button = document.getElementById('location-button');
  const status = document.getElementById('location-status');
  if (!navigator.geolocation) { status.textContent = 'Tu navegador no permite obtener la ubicación.'; return; }
  button.disabled = true; status.textContent = 'Buscando tu ubicación…';
  navigator.geolocation.getCurrentPosition(position => {
    locationUrl = 'https://maps.google.com/?q=' + position.coords.latitude + ',' + position.coords.longitude;
    status.textContent = 'Ubicación lista para incluir en el reporte.'; button.disabled = false;
  }, () => { status.textContent = 'No fue posible obtener tu ubicación. Puedes enviar el reporte igualmente.'; button.disabled = false; }, { timeout: 15000 });
});
let previewUrl;
document.getElementById('photo-input').addEventListener('change', event => {
  const file = event.target.files[0];
  const preview = document.getElementById('photo-preview');
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  preview.hidden = !file;
  if (file) { previewUrl = URL.createObjectURL(file); preview.src = previewUrl; }
});
document.getElementById('report-button').addEventListener('click', () => {
  let message = 'Hola, encontré a Pluto Turres 🐾\n\n📍 Ubicación: ' + (locationUrl || 'No compartida') + '\n🕐 Hora: ' + now();
  if (document.getElementById('photo-input').files.length) message += '\nTengo una foto; la adjuntaré en WhatsApp.';
  window.open('https://wa.me/56966329116?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
