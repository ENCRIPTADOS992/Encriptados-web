const axios = require('axios');

async function checkAll() {
  try {
    const url = 'https://encriptados.es/wp-json/encriptados/v1/products/by-category-language?category_id=40&lang=es';
    console.log('Fetching:', url);
    const res = await axios.get(url);
    const products = res.data.products;
    
    // Find product 59835
    let found = false;
    for (const key in products) {
        const p = products[key];
        if (p.id == 59835) {
            console.log('--- FOUND 59835 ---');
            console.log('ID:', p.id);
            console.log('Name:', p.name);
            console.log('Provider:', p.provider);
            console.log('Type:', p.type_product);
            found = true;
        }
    }
    
    if (!found) console.log('Product 59835 not found in category 40 list');

  } catch (e) {
    console.error(e.message);
  }
}

checkAll();