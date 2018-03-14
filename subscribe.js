var publicKey  = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEHxcXE00sWZh3FSf09uIKCM8I-7CuuVB1IUWT7xWtoUfzAVR28uHYEDmcrkexEVi3k9pGZDl5CMCmGBCfQ74lgw";
// MHcCAQEEIKdUCnAzgIha1Rv62c4TMYuifvi7v56kU5upKcQXXoH4oAoGCCqGSM49AwEHoUQDQgAEHxcXE00sWZh3FSf09uIKCM8I-7CuuVB1IUWT7xWtoUfzAVR28uHYEDmcrkexEVi3k9pGZDl5CMCmGBCfQ74lgw

var notifyBtn = document.getElementById('subscribe-btn');
var sp;
// Tenemos un botón hidden y disabled
if('serviceWorker' in navigator && 'PushManager' in window) {
  
  // Quitamos el hidden del botón de suscripción
  notifyBtn.classList.remove('hidden');

  // Si el usuario todavía no ha denegado el permiso, le quitamos el disabled
  if(Notification.permission !== 'denied'){
    notifyBtn.disabled = false;
  } else {
    notifyBtn.innerHTML = 'Has bloqueado las notificaciones';
  }

  // Cuando el sw esté listo, obtenemos la instancia y la guardamos en el scope sp
  navigator.serviceWorker.ready.then( sw => {
    sp.sw = sw;

    // Buscamos las suscripción (si es que existe)
    sw.pushManager.getSubscription().then( subscription => {
      var isSubscribed = subscription !== null;
      notifyBtn.innerHTML = isSubscribed ? 'Ya estás suscrito' : 'Suscribirme';
    });
  });
}

notifyBtn.addEventListener('click', function (evt){
  // Para que no clicken varias veces seguidas
  this.disabled = true;

  // Teníamos al sw guardado en sp
  sp.sw.pushManager.getSubscription().then( subscription => {
    // Si han hecho click en el botón estando suscritos, nos desuscribimos
    if (subscription !== null) {
      subscription.unsuscribe();
      this.disabled = false;
    } else {
      sp.sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicKey)
      })
      .then( subscription => fetch('api/subscription',{
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(subscription)
      }))
      .then(res => {
        notifyBtn.innerHTML = 'Ya estás suscrito';
        this.disabled = false;
      });
    }
  });

});


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

