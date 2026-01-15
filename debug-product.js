const axios = require('axios');

async function check() {
  try {
    const url = 'https://encriptados.es/wp-json/encriptados/v1/products/59835?lang=es';
    console.log('Fetching:', url);
    const res = await axios.get(url);
    const p = res.data;
    console.log('ID:', p.id);
    console.log('Name:', p.name);
    console.log('Provider:', p.provider);
    console.log('Type:', p.type_product);
  } catch (e) {
    console.error(e.message);
  }
}

check();