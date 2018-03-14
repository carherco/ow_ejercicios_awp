if (Notification.permission === 'granted') {
  mostrarNotificacion();
} 

if (Notification.permission !== 'denied') {
  Notification.requestPermission().then( p => {
    if(p === 'granted') mostrarNotificacion();
  });
} 


function mostrarNotificacion() {
  self.registration.showNotification('Título de la notificación',{
    body: 'Texto del notificación',
    badge: '',
    icon: '',
    image: '',
    tag: 'etiqueta',
    renotify: false,
    data: {  },
    requireInteraction: false,
    actions: [{
        action: 'identificador',
        title: 'Action Title',
        icon: 'path/icono'
    }],
    silent: false,
    sound: '/path/to/adiofile',
    vibrate: [200, 100, 200],
    dir: 'ltr',
    lang: 'es-ES',
    timestamp: Date.now(),
  });

  self.addEventListener('notificationclick', evento => {
    if(!evento.action){
      console.log('El usuario hizo click en el body');
      return;
    }
    switch(evento.action) {
      case 'view':
        //...
        break;
      case 'buy':
        //...
        break;
      default: 
        console.warn(`${evento.action} clicked`);
        break;
    }
  });

  self.addEventListener('notificationclose', evento => {
    console.log('El usuario ha cerrado la notificación con la x');
  });

  
}


