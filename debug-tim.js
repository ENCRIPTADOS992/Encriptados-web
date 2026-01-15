const axios = require('axios');

async function checkTim() {
  try {
    const url = 'https://encriptados.es/wp-json/encriptados/v1/products/by-category-language?category_id=40&lang=es&provider=tim';
    console.log('Fetching:', url);
    const res = await axios.get(url);
    const products = res.data.products;
    
    // Find product 59835
    let found = false;
    for (const key in products) {
        const p = products[key];
        if (p.id == 59835) {
            console.log('--- FOUND 59835 in TIM list ---');
            console.log('ID:', p.id);
            console.log('Name:', p.name);
            console.log('Provider:', p.provider);
            found = true;
        }
    }
    
    if (!found) console.log('Product 59835 not found in TIM list');

  } catch (e) {
    console.error(e.message);
  }
}

checkTim();