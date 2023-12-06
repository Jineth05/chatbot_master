const qrcode = require('qrcode-terminal');
const country_code = "57";
const number = "3112040300";
const msg = "Hola ❤️!!!!";

//Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Event handler for when the client is ready
client.on('ready', () => {
    console.log('Cliente está listo!');
  
    let chatID = country_code + number + "@c.us";
  
    client.sendMessage(chatID, msg).then(response => {
      if (response.id.fromMe) {
        console.log('El mensaje fue enviado');
      }
    });
});

// Event handler for incoming messages
client.on('message', (message) => {
    if (message.body === 'Hola') {
      return client.sendMessage(message.from, 'Hola buen día!');
    }
    if (message.body === 'Buenas tardes') {
      return client.sendMessage(message.from, 'Buenas tardes señorita!');
    }

    // Agrega un comando para salir
    if (message.body.toLowerCase() === 'salir') {
      console.log('Saliendo del programa...');
      client.destroy(); // Cierra la conexión de WhatsApp Web
      process.exit(); // Sale del proceso de Node.js
    }
  
    return client.sendMessage(message.from, 'Opción no disponible!');
});

client.initialize();
