const axios = require('axios');

const BASE_URL = 'http://localhost:3000/es';

const links = [
  // SIMs
  '/sim-encriptada',
  '/tim-sim',
  
  // Aplicaciones
  '/apps/silent-phone',
  '/apps/vaultchat',
  '/apps/armadillo-chat',
  '/apps/threema',
  '/apps/threema-work',
  '/apps/vnc-lagoon',
  '/apps/salt-app',
  '/apps/nord-vpn',

  // Sistemas
  '/apps/secure-mdm-iphone',
  '/apps/secure-mdm-android',
  '/apps/cryptcom',
  '/apps/renati',
  '/apps/chatmail',
  '/apps/armadillo', // System
  '/apps/vault-chat-v2', // System legacy alias check
  '/apps/ultra-x',
  '/apps/intact-phone',
  '/apps/dec-secure',
  '/apps/securecrypt',

  // Routers
  '/apps/router-camaleon'
];

async function checkLinks() {
  console.log('🚀 Iniciando validación de enlaces...');
  let hasErrors = false;

  for (const link of links) {
    try {
      const url = `${BASE_URL}${link}`;
      // Usar get con validateStatus para que axios no lance error en 404/500 automáticamente
      // y podamos manejarlo manualmente.
      const response = await axios.get(url, { 
        validateStatus: () => true, // Siempre resuelve, nunca lanza throw
        timeout: 5000, // Timeout de 5s
        headers: { 'Accept': 'text/html' } // Simular navegador
      });
      
      if (response.status === 200) {
        console.log(`✅ OK: ${link} (${response.status})`);
      } else {
        console.error(`❌ ERROR: ${link} devolvió ${response.status}`);
        hasErrors = true;
      }
    } catch (error) {
      console.error(`❌ EXCEPTION: ${link} falló con ${error.message}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('\n⚠️ Se encontraron errores en algunos enlaces.');
    process.exit(1);
  } else {
    console.log('\n✨ Todos los enlaces funcionan correctamente.');
  }
}

checkLinks();
