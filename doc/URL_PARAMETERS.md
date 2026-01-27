# Parámetros de URL para SIM TIM

Este documento detalla los parámetros "query string" que se utilizan en la URL para transmitir la información seleccionada de una SIM TIM (como la región y la cantidad de GB) hacia la página de detalle del producto.

## Parámetros Principales

| Parámetro     | Descripción                                                                 | Ejemplo               |
| :------------ | :-------------------------------------------------------------------------- | :-------------------- |
| `productId`   | ID único del producto en el backend.                                        | `123`                 |
| `price`       | Precio numérico del producto (o variante seleccionada).                     | `57.5`                |
| `gb`          | Cantidad de datos del plan. Se extrae del tag o variante del producto.      | `10GB`                |
| `region`      | Nombre legible de la región o país seleccionado.                            | `Sur América`         |
| `regionCode`  | Código ISO o identificador de la región/país.                               | `GLOBAL`              |
| `flagUrl`     | URL de la imagen de la bandera correspondiente a la región/país.            | `/images/flags/sa.svg`|

## Ejemplo de URL Completa

```
https://encriptados.io/es/our-products/sim-card-tim?productId=123&price=57.5&gb=10GB&region=Sur+América&regionCode=GLOBAL
```

## Lógica de Construcción

La URL se construye en el componente `CardProduct.tsx` de la siguiente manera:

```typescript
const params = new URLSearchParams();
params.set("productId", String(id));

// Precio
if (numericPrice != null) params.set("price", String(numericPrice));

// Cantidad de GB (Tag)
if (badges?.tag) params.set("gb", badges.tag);

// Información de Región/País
if (badges?.country?.label) params.set("region", badges.country.label);
if (badges?.country?.code) params.set("regionCode", badges.country.code);
if (badges?.country?.flagUrl) params.set("flagUrl", badges.country.flagUrl);

const finalUrl = `${baseUrl}?${params.toString()}`;
```

## Consumo de Parámetros

En la página de destino (`ProductByIdPage.tsx` o componentes hijos), estos parámetros se pueden leer utilizando el hook `useSearchParams` de Next.js:

```typescript
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const gb = searchParams.get("gb");       // "10GB"
const region = searchParams.get("region"); // "Sur América"
```
