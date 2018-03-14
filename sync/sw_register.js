if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('sw.js')
  .then(console.log)
  .catch(console.error);
}

if('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then( sw => {
        return sw.sync.register('identificador')
                  .then( r => {
                      //Sincronización registrada. Actualizar algo en la pantalla?
                  })
    });
}