const AUTOCONFIG_XML = `<?xml version="1.0" encoding="UTF-8"?>
<clientConfig version="1.1">
  <emailProvider id="encriptados.io">
    <domain>encriptados.io</domain>
    <displayName>Encriptados</displayName>
    <displayShortName>Encriptados</displayShortName>
  </emailProvider>
</clientConfig>
`;

export function GET() {
  return new Response(AUTOCONFIG_XML, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
