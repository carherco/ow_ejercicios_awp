window.addEventListener("install", event => {
  console.log("Aplicación instalada");
});

window.addEventListener("beforeinstallprompt", event => {
  event.userChoice.then( choice => {
    var message = choice.outcome === 'dismissed' ? 'User cancelled' : 'User installed';
    console.log(message);
  });
});


// Podemos cancelar el evento y guardarlo en una variable global
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  promptEvent = event;
  return false;
});

// En otro lugar de la aplicación
if(promptEvent !== undefined) {
  promptEvent.prompt();
  promptEvent.userChoice.then(choice => {
    console.log(choice.outcome);
  });
}