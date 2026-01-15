function testLogic(provider, type) {
    const prov = (provider || "").toLowerCase();
    let family = "encrypted";
    // Exact logic from simProductConfig.ts
    if (prov === "encrypted" || prov.includes("encript")) family = "encrypted";
    else if (prov === "tim" || prov.includes("tim")) family = "tim";
    else family = "encrypted"; // fallback
    
    const tp = (type || "").toLowerCase();
    let format = "physical";
    if (tp === "digital") format = "digital";
    else format = "physical";
    
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