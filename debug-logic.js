const { deriveProductFamily, deriveProductFormat, deriveProductSlug } = require('./src/app/[locale]/sim/[slug]/simProductConfig.ts');

// Mock the types since we are running in node with require and TS files might fail if not compiled, 
// but let's try to just replicate the logic since I cannot easily run TS file directly without ts-node.

function testLogic(provider, type) {
    const prov = (provider || "").toLowerCase();
    let family = "encrypted";
    if (prov === "encrypted" || prov.includes("encript")) family = "encrypted";
    else if (prov === "tim" || prov.includes("tim")) family = "tim";
    
    const tp = (type || "").toLowerCase();
    let format = "physical";
    if (tp === "digital") format = "digital";
    
    console.log(`Provider: "${provider}" -> Family: ${family}`);
    console.log(`Type: "${type}" -> Format: ${format}`);
    
    // Slug logic
    let slug = "";
    if (family === "encrypted") {
        slug = format === "digital" ? "esim-encriptada" : "sim-encriptada";
    } else {
        slug = format === "digital" ? "esim-tim" : "tim-sim";
    }
    console.log(`Slug: ${slug}`);
}

testLogic("encrypted", "digital");
