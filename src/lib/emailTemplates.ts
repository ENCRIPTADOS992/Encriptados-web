
export const getLicenseEmailHtml = ({
  orderId,
  productName,
  licenseKey,
  qrCodeUrl,
  total = "450.00",
  currency = "USD",
  clientName = "Cliente",
}: {
  orderId: string | number;
  productName: string;
  licenseKey: string;
  qrCodeUrl?: string;
  total?: string;
  currency?: string;
  clientName?: string;
}) => {
  const primaryColor = "#000000";
  const secondaryColor = "#f3f4f6";
  const accentColor = "#10b4e7";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gracias por tu compra</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { padding: 40px 20px; text-align: center; background-color: #ffffff; }
    .success-icon { width: 48px; height: 48px; margin-bottom: 20px; }
    .order-id { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
    .title { font-size: 24px; font-weight: bold; color: #111827; margin: 0 0 30px; }
    .product-card { background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 30px; text-align: center; }
    .product-icon { width: 64px; height: 64px; margin-bottom: 10px; }
    .product-name { font-size: 18px; font-weight: bold; color: #111827; }
    .product-detail { font-size: 14px; color: #6b7280; }
    .license-box { background-color: #f3f4f6; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 20px; font-weight: bold; color: #111827; margin: 20px 0; letter-spacing: 2px; }
    .qr-section { text-align: center; margin: 30px 0; }
    .qr-image { max-width: 200px; height: auto; }
    .promo-banner { width: 100%; max-width: 600px; border-radius: 12px; overflow: hidden; margin-bottom: 20px; display: block; }
    .payment-footer { background-color: #f3f4f6; padding: 15px 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; max-width: 600px; box-sizing: border-box; }
    .payment-method { font-size: 14px; color: #374151; }
    .payment-total { font-size: 18px; font-weight: bold; color: #111827; }
    .help-link { text-align: center; margin-top: 30px; font-size: 14px; color: #111827; font-weight: bold; text-decoration: none; display: block; padding-bottom: 40px; }
    
    /* Responsive width fix */
    .content-width { width: 100%; max-width: 600px; margin: 0 auto; }
    
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; border-radius: 0; }
      .payment-footer { flex-direction: column; gap: 10px; text-align: center; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="text-align: center; margin-bottom: 20px;">
        <!-- Success Icon Checkmark -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b4e7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      
      <div class="order-id">ID de compra: ${orderId}</div>
      <h1 class="title">Gracias por tu compra</h1>
      
      <div class="product-card">
        <!-- Placeholder for product icon -->
        <div style="background-color: #10b4e7; width: 48px; height: 48px; border-radius: 12px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px;">
          ${productName.charAt(0)}
        </div>
        <div class="product-name">${productName}</div>
        <div class="product-detail">Licencia Digital</div>
      </div>
      
      <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">Datos de tu licencia ${productName}</p>
      
      <div style="font-weight: bold; font-size: 14px; color: #374151; margin-bottom: 5px;">Key:</div>
      <div class="license-box">
        ${licenseKey}
      </div>
      
      ${qrCodeUrl ? `
      <div class="qr-section">
        <div style="font-weight: bold; font-size: 14px; color: #374151; margin-bottom: 10px;">QR de Licencia:</div>
        <img src="${qrCodeUrl}" alt="QR Code" class="qr-image" />
      </div>
      ` : ''}
      
      <!-- Promo Banner -->
      <div class="content-width">
        <img src="https://encriptados.io/images/home/fondo-encriptados.webp" alt="SIM Card encriptada" class="promo-banner" style="width: 100%; height: auto; display: block;" />
      </div>
      
      <!-- Payment Footer with matching width -->
      <div class="content-width">
        <div class="payment-footer" style="width: 100%;">
          <div class="payment-method">Pago con Stripe</div>
          <div class="payment-total">${total} ${currency}</div>
        </div>
      </div>
      
      <a href="https://encriptados.io/contact" class="help-link">¿Necesitas ayuda?</a>
    </div>
  </div>
</body>
</html>
  `;
};
