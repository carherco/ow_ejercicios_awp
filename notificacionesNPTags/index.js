// Solicitar permiso al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Tu navegador no soporta notificaciones'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

//Función asociada al botón del html
function mostrarNotificacion() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var i = 0;

    var interval = setInterval(() => {
        var n = new Notification('Title '+i, {tag: 'distinto'+i});
        if(i++ > 9) {
            window.clearInterval(interval);
        }
    },1250);
  }
}

// function mostrarNotificacion() {
//   if (Notification.permission !== "granted")
//     Notification.requestPermission();
//   else {
//     var i = 0;

//     var interval = setInterval(() => {
//         var n = new Notification('Title '+i, {tag: 'una tag'});
//         if(i++ > 9) {
//             window.clearInterval(interval);
//         }
//     },1250);

//   }
// }

// function mostrarNotificacion() {
//   if (Notification.permission !== "granted")
//     Notification.requestPermission();
//   else {
//     var i = 0;

//     var interval = setInterval(() => {
//         var t = i % 2 ? 'par':'impar'; 
//         var n = new Notification('Title '+i, {tag: t});
//         if(i++ > 9) {
//             window.clearInterval(interval);
//         }
//     },1250);

//   }
// }


