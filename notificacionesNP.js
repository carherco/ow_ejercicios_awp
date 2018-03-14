if (Notification.permission === 'granted') {
  mostrarNotificacion();
} 

if (Notification.permission !== 'denied') {
  Notification.requestPermission().then( p => {
    if(p === 'granted') mostrarNotificacion();
  });
} 


function mostrarNotificacion() {
  var n = new Notification('Título de la notificación',{
    body: 'Texto del notificación',
    badge: '',
    icon: '',
    image: '',
    tag: 'etiqueta',
    renotify: false,
    data: {  },
    requireInteraction: false,
    // actions: [{
    //     action: 'identificador',
    //     title: 'Action Title',
    //     icon: 'path/icono'
    // }],
    silent: false,
    sound: '/path/to/adiofile',
    vibrate: [200, 100, 200],
    dir: 'ltr',
    lang: 'es-ES',
    timestamp: Date.now(),
  });

  n.addEventListener('error', evento => {
    console.log('Se ha producio un error', evento);
  });

  n.addEventListener('click', evento => {
    console.log('Se ha producio un error', evento);
  });

  n.close();
}
