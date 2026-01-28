const axios = require('axios');

async function checkApi() {
    try {
        console.log("Checking product 454...");
        const pRes = await axios.get('https://encriptados.es/wp-json/encriptados/v1/products/454?lang=es');
        const p = pRes.data;
        console.log(`Product 454: Name=${p.name}, Provider=${p.provider}, Type=${p.type_product}`);
        console.log(`Product 454 Variants: ${p.variants ? p.variants.length : 'undefined'}`);
        if (p.variants && p.variants.length > 0) {
            console.log("Variants list (" + p.variants.length + "):");
            p.variants.forEach((v, i) => {
                console.log(`[${i}] ${v.name} | GB: ${v.gb} | ID: ${v.id} | Price: ${v.price}`);
            });
        }

        console.log("\nChecking getAllProducts (region=global)...");
        const allRes = await axios.get('https://encriptados.es/wp-json/encriptados/v1/products/by-category-language', {
            params: { category_id: 40, lang: 'es', sim_region: 'global' }
        });
        const productsMap = allRes.data.products;
        const products = Object.values(productsMap);
        console.log(`Total products: ${products.length}`);

        const pInAll = products.find(prod => String(prod.id) === '454');
        if (pInAll) {
            console.log(`Product 454 found in getAllProducts.`);
            console.log(`Product 454 (All) Variants: ${pInAll.variants ? pInAll.variants.length : 'undefined'}`);
            if (pInAll.variants) {
                pInAll.variants.forEach((v, i) => {
                    if (v.gb === "15 GB" || v.name.includes("15 GB")) {
                        console.log(`!!! FOUND 15 GB VARIANT: ID=${v.id}, Scope=${v.scope?.code}, Price=${v.price}`);
                    }
                    console.log(`(ALL) [${i}] ${v.name} | GB: ${v.gb} | ID: ${v.id} | Price: ${v.price || v.cost || v.regular_price} | Scope: ${v.scope?.code}`);
                });
            }
        } else {
            console.log("Product 454 NOT found in getAllProducts result.");
        }

    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) console.error("Response data:", err.response.data);
    }
}

checkApi();
