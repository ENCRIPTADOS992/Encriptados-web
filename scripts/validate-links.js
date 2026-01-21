const BASE_URL = process.env.BASE_URL || "http://localhost:3001/es";

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
  console.log(`Iniciando validación de enlaces contra: ${BASE_URL}`);
  let hasErrors = false;

  for (const link of links) {
    try {
      const url = `${BASE_URL}${link}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "text/html" },
        signal: controller.signal,
        redirect: "follow",
      }).finally(() => clearTimeout(timeoutId));

      if (response.status >= 200 && response.status < 300) {
        console.log(`OK: ${link} (${response.status})`);
      } else {
        console.error(`ERROR: ${link} devolvió ${response.status}`);
        hasErrors = true;
      }
    } catch (error) {
      const message = error?.name === "AbortError" ? "timeout" : (error?.message || String(error));
      console.error(`EXCEPTION: ${link} falló (${message})`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("\nSe encontraron errores en algunos enlaces.");
    process.exit(1);
  } else {
    console.log("\nTodos los enlaces funcionan correctamente.");
  }
}

checkLinks();
