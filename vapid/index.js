//Función asociada al botón del html
function generar() {
  var token = new VapidToken('carherco@gmail.com');
  var keys = token.generate_keys().then( keys => {
    token.sign().then( k => console.info('Private: ',k) );
  });
}

