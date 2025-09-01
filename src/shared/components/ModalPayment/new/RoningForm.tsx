"use client";

import React from "react";
import Link from "next/link";
import {
  getStripe,
  createElements,
  mountPaymentElement,
  confirmPayment,
} from "@/payments/stripe";

const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json";
const API_BASE_URL = `${WP_API}/encriptados/v1`;

const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

type OrderType = "roaming" | "userid";

type Props = {
  quantity: number;
  email?: string;
  loading?: boolean;
  productId: number;
  orderType: OrderType;
  amountUsd: number;
  onPayCrypto?: (email: string) => Promise<void>;
  onPaid?: () => void;
};

export default function RoningForm({
  quantity,
  email = "",
  loading = false,
  productId,
  orderType,
  amountUsd,
  onPayCrypto,
  onPaid,
}: Props) {
  const [codes, setCodes] = React.useState<string[]>([]);
  const [emailVal, setEmailVal] = React.useState(email);
  const [terms, setTerms] = React.useState(true);
  const [method, setMethod] = React.useState<"card" | "crypto">("crypto");

  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [exp, setExp] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [postal, setPostal] = React.useState("");

  const reCode = /^[A-Z0-9-]{6,64}$/;

  React.useEffect(() => {
    setCodes((prev) => {
      const next = [...prev];
      if (quantity > prev.length) {
        next.push(...Array(quantity - prev.length).fill(""));
      } else if (quantity < prev.length) {
        next.length = quantity;
      }
      return next;
    });
  }, [quantity]);

  const [clientSecret, setClientSecret] = React.useState("");
  const [orderId, setOrderId] = React.useState<number | null>(null);
  const stripeRef = React.useRef<import("@stripe/stripe-js").Stripe | null>(
    null
  );
  const elementsRef = React.useRef<
    import("@stripe/stripe-js").StripeElements | null
  >(null);

  // Estados UI de Stripe
  const [stripeStatus, setStripeStatus] = React.useState<
    | "idle"
    | "ready"
    | "confirming"
    | "succeeded"
    | "processing"
    | "requires_action"
  >("idle");
  const [stripeError, setStripeError] = React.useState<string | undefined>(
    undefined
  );

  // Polling
  const [polling, setPolling] = React.useState(false);
  const pollRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = React.useRef<number>(0);

  const emailOk =
    /\S+@\S+\.\S+/.test(emailVal) &&
    emailVal.length <= 100 &&
    emailVal.length > 5;

  const errBorderFilled = (val: string, ok: boolean) =>
    `border-2 ${
      val.trim()
        ? ok
          ? "border-transparent"
          : "border-red-500"
        : "border-transparent"
    }`;

  const onlyLetters = (s: string) =>
    s.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]/g, "");

  const onlyDigits = (s: string, max = 99) =>
    s.replace(/\D/g, "").slice(0, max);

  const formatExpiry = (s: string) => {
    const d = s.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const isValidExpiry = (mmYY: string) => {
    if (!/^\d{2}\/\d{2}$/.test(mmYY)) return false;
    const [mmS, yyS] = mmYY.split("/");
    const mm = +mmS;
    if (mm < 1 || mm > 12) return false;

    const now = new Date();
    const yNow = now.getFullYear() % 100;
    const mNow = now.getMonth() + 1;
    const yy = +yyS;

    if (yy > yNow) return true;
    if (yy < yNow) return false;
    return mm >= mNow;
  };

  const isValidPostal = (cp: string) => {
    const s = cp.trim().toUpperCase();
    const patterns = [
      /^\d{5}(-\d{4})?$/, // US
      /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/, // CA
      /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/, // ES
      /^\d{5}$/, // generic 5
      /^\d{6}$/, // generic 6
      /^\d{7}$/, // JP (7)
      /^[A-HJ-NP-Z]\d{4}[A-Z]{3}$|^\d{4}$/, // MX (satélite) | generic 4
    ];
    return patterns.some((rx) => rx.test(s));
  };

  const digitsCard = (cardNumber ?? "").replace(/\D/g, "");
  const nameOk =
    cardName.trim().length > 0 &&
    /^[A-Za-zÀ-ÿ\u00f1\u00d1\s'.-]+$/.test(cardName);
  const numberOk = digitsCard.length >= 13 && digitsCard.length <= 19;
  const expOk = isValidExpiry(exp);
  const cvcOk = /^\d{3}$/.test(cvc);
  const postalOk = isValidPostal(postal);

  const canPay =
    terms &&
    emailOk &&
    (method === "crypto" || (nameOk && numberOk && expOk && cvcOk && postalOk));

  React.useEffect(() => {
    return () => {
      try {
        elementsRef.current?.getElement("payment")?.unmount();
      } catch {}
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Monta el Payment Element cuando ya exista clientSecret **y** el contenedor en el DOM
React.useEffect(() => {
  if (!clientSecret) return;                 // aún no hay intent
  if (elementsRef.current) return;           // ya está montado

  // El contenedor solo existe cuando method === "card" y clientSecret es truthy
  const mountPoint = document.querySelector("#roning-card-element");
  if (!mountPoint) return;                   // todavía no está pintado

  (async () => {
    try {
      setStripeError(undefined);
      await mountStripeElement(clientSecret); // esto hace setStripeStatus("ready")
    } catch (e: any) {
      setStripeError(e?.message || "No se pudo montar el formulario de tarjeta.");
    }
  })();
}, [clientSecret, method]); // si cambias a "card" después de crear el intent, también montará


  // === util opcional: enmascarar secrets en logs ===
  function maskSecret(secret: string, left = 10, right = 6) {
    if (!secret) return secret;
    if (secret.length <= left + right)
      return secret.replace(/.(?=.{0}$)/g, "•");
    return `${secret.slice(0, left)}…${secret.slice(-right)}`;
  }

  // Toggle de CORS (si tu WP no necesita cookies/nonce, deja en false)
  const USE_CREDENTIALS = false; // 👈 en dev pon false para evitar el error de CORS

  async function createOrderAndIntent(): Promise<{ order_id: number; client_secret: string }> {
  const url = `${API_BASE_URL}/orders/${orderType}`;

  const safeAmount = Math.max(Number(amountUsd || 0), 0.5);

  // Construimos body "form-urlencoded" para WordPress (lee $_POST/$_REQUEST)
  const form = new URLSearchParams();
  form.set("product_id", String(productId));
  form.set("email", emailVal.trim());

  // Campo que el backend exige explícitamente:
  form.set("payment_provider", "stripe");

  // Redundancias útiles (por si el handler mira otros nombres):
  form.set("order_type", orderType);
  form.set("quantity", String(quantity));
  form.set("qty", String(quantity));
  form.set("amount", String(safeAmount));
  form.set("amount_cents", String(Math.round(safeAmount * 100)));
  form.set("currency", "USD");
  form.set("provider", "stripe");
  form.set("method", "stripe");

  console.groupCollapsed("%c[orders] create", "color:#0aa");
  console.log("POST", url);
  console.log("credentials:", USE_CREDENTIALS ? "include" : "omit");
  console.log("payload(form):", Object.fromEntries(form.entries()));
  console.time("[orders] POST time");

  let respText = "";
  let status = 0;

  try {
    const r = await fetch(url, {
      method: "POST",
      credentials: USE_CREDENTIALS ? "include" : "omit",
      body: form, // 👈 importante: NO pongas headers Content-Type manuales
    });

    status = r.status;
    respText = await r.text();

    console.timeEnd("[orders] POST time");
    console.log("status:", status);

    let data: any;
    try {
      data = respText ? JSON.parse(respText) : {};
    } catch {
      data = { raw: respText };
    }
    console.log("response:", data);

    if (!r.ok) {
      throw new Error(
        (data && (data.message || data.error || data.raw)) ||
          `HTTP ${status} creando la orden`
      );
    }

    if (!data?.order_id || !data?.client_secret) {
      throw new Error("Respuesta inválida: falta order_id o client_secret");
    }

    console.log("order_id:", data.order_id);
    console.log(
      "client_secret:",
      typeof data.client_secret === "string"
        ? `${data.client_secret.slice(0, 10)}…${data.client_secret.slice(-6)}`
        : data.client_secret
    );
    console.groupEnd();

    return { order_id: data.order_id, client_secret: data.client_secret };
  } catch (err: any) {
    // No volvemos a hacer timeEnd aquí para evitar el warning de "Timer ... does not exist"
    console.error("fetch failed:", err?.message);
    console.log("status:", status);
    console.log("raw:", respText);
    console.groupEnd();

    throw new Error(
      err?.message?.includes("Failed to fetch")
        ? "Fallo de red/CORS (revisa CORS en el servidor o desactiva credenciales)."
        : err?.message || "No se pudo crear la orden"
    );
  }
}


  async function mountStripeElement(secret: string) {
    console.groupCollapsed("%c[stripe] mount element", "color:#6a0dad");
    console.log("client_secret:", maskSecret(secret));

    const stripe = await getStripe();
    const elements = await createElements(stripe, secret);
    await mountPaymentElement(elements, "#roning-card-element");

    // guardamos refs
    stripeRef.current = stripe;
    elementsRef.current = elements;
    console.log("mounted in #roning-card-element");
    console.groupEnd();

    setStripeStatus("ready");
  }

  function startPolling(orderId: number) {
    if (pollRef.current) clearInterval(pollRef.current);
    setPolling(true);
    pollStartedAtRef.current = Date.now();

    const poll = async () => {
      try {
        const r = await fetch(
          `${API_BASE_URL}/orders/${orderId}/public-status`
        );
        if (!r.ok) return;
        const { status } = await r.json(); // ej: 'fulfilled' | 'pending_admin' | 'paid' | 'pending'...
        if (status === "fulfilled" || status === "pending_admin") {
          clearInterval(pollRef.current!);
          setPolling(false);
          onPaid?.();
        } else {
          // Timeout suave: 75s
          if (Date.now() - pollStartedAtRef.current > 75_000) {
            clearInterval(pollRef.current!);
            setPolling(false);
            // Aquí podrías mostrar un aviso: “Seguimos procesando tu pedido…”
          }
        }
      } catch {
        // Ignora errores de red transitorios
      }
    };

    pollRef.current = setInterval(poll, 1500);
  }

  const handlePay = async () => {
    if (!canPay) return;

    // CRYPTO
    if (method === "crypto") {
      await onPayCrypto?.(emailVal.trim());
      return;
    }

    // CARD — Fase 1: si no hay intent, crea orden+intent y monta Element
    if (!clientSecret) {
      try {
        setStripeError(undefined);
        const { order_id, client_secret } = await createOrderAndIntent();
        setOrderId(order_id);
        setClientSecret(client_secret);
        // ❌ quita esta línea:
        // await mountStripeElement(client_secret);
      } catch (e: any) {
        setStripeError(e?.message || "No se pudo iniciar el pago.");
      }
      return;
    }


    // CARD — Fase 2: confirmar pago
    try {
      if (!stripeRef.current || !elementsRef.current) {
        throw new Error("Stripe no está listo.");
      }
      setStripeStatus("confirming");
      setStripeError(undefined);

      // Arranca polling en paralelo (fuente de verdad = backend)
      if (orderId && !polling) startPolling(orderId);

      const res = await confirmPayment(stripeRef.current, elementsRef.current);

      if (res.error) {
        setStripeError(res.error);
        setStripeStatus("requires_action");
        return;
      }

      // Mapea 'canceled' a un estado válido del UI
      const nextStatus =
        res.status === "canceled" ? "requires_action" : res.status;
      setStripeStatus(nextStatus);

      // El éxito real lo marca el webhook → polling cerrará el modal al ver fulfilled/pending_admin
      // Si quieres cerrar aquí de una: onPaid?.();
    } catch (e: any) {
      setStripeError(e?.message || "Error confirmando el pago.");
      setStripeStatus("requires_action");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Email */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Correo electrónico para recibir licencia
        </p>
        <div className="self-start w-[416px] h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center">
          <input
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      </div>

      {/* Términos */}
      <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F]">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="w-[18px] h-[18px] border-2 border-black rounded-[2px] accent-black focus:outline-none focus:ring-0"
        />
        <span className="select-none">
          Acepto{" "}
          <Link
            href={TERMS_URL}
            target="_blank"
            className="underline font-medium"
          >
            términos y condiciones
          </Link>{" "}
          de la compra
        </span>
      </label>

      {/* Método de pago */}
      <div className="space-y-2">
        <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
          Método de pago
        </p>

        {/* 2 columnas siempre */}
        <div className="grid grid-cols-2 gap-2 ipad:gap-3">
          <button
            type="button"
            aria-pressed={method === "card"}
            onClick={() => setMethod("card")}
            className={[
              "w-full rounded-[8px] border",
              // layout: vertical en móvil, horizontal desde sm/ipad
              "flex flex-col sm:flex-row items-center justify-center",
              "gap-1 sm:gap-2",
              // alturas/padding
              "h-[78px] px-2 py-2", // móvil
              "sm:h-[76px] sm:px-3", // sm/md
              "ipad:h-[60px] ipad:px-4", // 744+
              method === "card"
                ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
                : "bg-[#EBEBEB] border border-transparent",
              // accesibilidad/focus
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1",
            ].join(" ")}
          >
            <img
              src="/images/home/add_card.png"
              alt=""
              className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
            />
            <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
              Tarjeta de crédito
            </span>
          </button>

          <button
            type="button"
            aria-pressed={method === "crypto"}
            onClick={() => setMethod("crypto")}
            className={[
              "w-full rounded-[8px] border",
              "flex flex-col sm:flex-row items-center justify-center",
              "gap-1 sm:gap-2",
              "h-[78px] px-2 py-2",
              "sm:h-[76px] sm:px-3",
              "ipad:h-[60px] ipad:px-4",
              method === "crypto"
                ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
                : "bg-[#EBEBEB] border border-transparent",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1",
            ].join(" ")}
          >
            <img
              src="/images/home/send_money.png"
              alt=""
              className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
            />
            <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
              Criptomonedas
            </span>
          </button>
        </div>
      </div>

      {/* Campos tarjeta si corresponde */}
      {method === "card" && (
        <div className="space-y-2">
          <div
            className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
              cardName,
              nameOk
            )}`}
          >
            <input
              value={cardName}
              onChange={(e) => setCardName(onlyLetters(e.target.value))}
              placeholder="Titular de la tarjeta"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>

          <div
            className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center justify-between ${errBorderFilled(
              cardNumber,
              numberOk
            )}`}
          >
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(onlyDigits(e.target.value, 19))}
              placeholder="Número de tarjeta"
              inputMode="numeric"
              className="flex-1 bg-transparent outline-none text-[14px] pr-[8px]"
            />
            <img
              src="/images/home/logos_mastercard.png"
              alt="Mastercard"
              width={24}
              height={24}
              className="shrink-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-[8px]">
            <div
              className={`h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
                exp,
                expOk
              )}`}
            >
              <input
                value={exp}
                onChange={(e) => setExp(formatExpiry(e.target.value))}
                placeholder="MM/AA"
                inputMode="numeric"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
            <div
              className={`h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
                cvc,
                cvcOk
              )}`}
            >
              <input
                type="password"
                value={cvc}
                onChange={(e) => setCvc(onlyDigits(e.target.value, 3))}
                placeholder="CVC"
                inputMode="numeric"
                autoComplete="cc-csc"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>

          <div
            className={`w-full h-[42px] rounded-[8px] bg-[#EBEBEB] px-[14px] flex items-center ${errBorderFilled(
              postal,
              postalOk
            )}`}
          >
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Código postal"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>

          {/* ====== Stripe Payment Element (se monta aquí, sin eliminar tus campos) ====== */}
          {clientSecret ? (
            <div className="rounded-[8px] bg-white border border-[#EBEBEB] p-3">
              <div id="roning-card-element" />
              {stripeError && (
                <p className="mt-2 text-red-600 text-sm">{stripeError}</p>
              )}
              {(stripeStatus === "confirming" ||
                stripeStatus === "processing") && (
                <p className="mt-2 text-xs text-[#3D3D3D]">
                  Procesando el pago… no cierres esta ventana.
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-[8px] bg-[#EBEBEB] p-3 text-[12px] text-[#3D3D3D]">
              Total a pagar: <b>${amountUsd.toFixed(2)} USD</b>. Al continuar,
              montaremos aquí los campos seguros de tarjeta de Stripe.
            </div>
          )}
          {/* ================================================================================= */}
        </div>
      )}

      <button
        type="button"
        disabled={!canPay}
        onClick={handlePay}
        aria-disabled={!canPay}
        className={`mt-2 w-full h-[54px] rounded-[8px] px-[10px] inline-flex items-center justify-center gap-[10px]
        text-white text-[14px] font-semibold ${
          canPay
            ? "bg-black hover:bg-black/90"
            : "bg-black/40 cursor-not-allowed"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30`}
      >
        Pagar ahora
      </button>

      {/* Mensajito extra mientras hacemos polling (no toca tus campos) */}
      {method === "card" && (stripeStatus === "processing" || polling) && (
        <p className="text-xs text-[#3D3D3D]">
          Procesando la orden… puede tardar unos segundos.
        </p>
      )}
    </div>
  );
}
