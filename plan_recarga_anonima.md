# Plan de Implementación: Modalidad Anónima en Checkouts de Recarga

## Descripción del Objetivo
El objetivo es permitir a los usuarios comprar recargas de Datos y Minutos de forma "Anónima". En esta modalidad, el usuario no necesita ingresar su número de SIM. En su lugar, completará el pago y recibirá un código RONING por correo para poder recargar la SIM posteriormente desde la aplicación. La nueva sección "Elegir tipo de recarga" (con los botones "Normal" y "Anónima") solo aparecerá para productos que sean Recargas de Datos (SIM Encriptada / SIM TIM) y Recargas de Minutos (SIM Encriptada).

## Cambios Propuestos

### [Componente SimFormUnified]
- **Estado:** Añadir un nuevo estado para controlar la selección: `const [rechargeType, setRechargeType] = useState<"normal" | "anonymous">("normal");`
- **Condición de visualización:** Determinar si el producto actual califica para mostrar el selector:
  ```ts
  const titleNorm = String((product as any)?.name ?? "").toLowerCase();
  const isRecargaName = /(recarga|recharge|ricarica)/i.test(titleNorm);
  const isEligibleRecharge = (formType === "encrypted_data" || formType === "tim_data" || formType === "encrypted_minutes") && isRecargaName;
  ```
- **UI:** Si cumple las condiciones (`isEligibleRecharge`), renderizar el selector "Elegir tipo de recarga" (con diseño tipo tabs/botones redondeados basados en los mockups) justo debajo de las Alertas o "Detalles de compra" y arriba del sub-título "Datos de compra".
- **Lógica de Validación:** Modificar la lógica de validación del formulario (`simOk` y `typeSpecificOk`) para que, cuando `rechargeType === "anonymous"`, el campo del "Número de SIM" **no sea obligatorio** y no bloqueé la validación del botón de pago (`canPay`).
- **Payload a Tottoli / Backend:** Durante el `handlePay` (al ensamblar el Tottoli payload), añadir dentro del objeto `meta`:
  - `recharge_type: rechargeType`
  - `is_anonymous_recharge: rechargeType === "anonymous"`
  Esto le indicará al backend que no hay un número de SIM asociado al pago y que debe enviarle al comprador un email con el código RONING.

#### [MODIFY] [SimFormUnified.tsx](file:///d:/Clients/Encriptados/Encriptados-frontend/src/shared/components/ModalPayment/new/sims/SimFormUnified.tsx)
- Añadir estado `rechargeType`.
- Renderizar el selector visual (los dos botones lado a lado tipo "Normal" | "Anónima").
- Relajar condiciones de validación previas al pago si está habilitado el modo anónimo.
- Modificar objeto `meta` del Request Payload.

#### [MODIFY] [BuyerFieldsSection.tsx](file:///d:/Clients/Encriptados/Encriptados-frontend/src/shared/components/ModalPayment/new/sims/components/BuyerFieldsSection.tsx)
- Modificar el componente para aceptar una nueva prop `isAnonymous?: boolean`.
- Cuando sea `isAnonymous = true`:
  - Los campos de tipo "Número de SIM" deben cambiar visualmente (parecer deshabilitados usando clases de opacidad o grises) y estar bloqueados para escritura (`disabled={true}`).
  - Desactivar las reglas de `required` de `react-hook-form` sobre esos campos (`required: !isAnonymous && cfg.reqSimNumber`).

## Plan de Verificación

### Verificación Manual Paso a Paso
1. Levantar el entorno local de desarrollo (`npm run dev`).
2. Abrir un checkout de un producto de "Recarga de Datos" (SIM Encriptada o SIM TIM) o "Recarga de Minutos".
3. Verificar visualmente que aparezca la nueva sección "Elegir tipo de recarga" (Normal / Anónima) y verificar que sus estilos concuerdan con el diseño.
4. **Al seleccionar "Anónima":**
   - El input de "Número de SIM" debe quedar inhabilitado y atenuado.
   - Probar a pagar: el pago DEBE permitir avanzar sin problemas (la validación no frena el pago).
   - Verificar en consola que el Payload lleva `meta.is_anonymous_recharge = true` en la petición.
5. **Al seleccionar "Normal" (por defecto):**
   - El input del SIM funciona de manera normal y está activo.
   - Probar a pagar: no te puede dejar avanzar si el campo de SIM está vacío.
6. Verificar que otros productos que no son de recarga directa (ej: comprando una SIM Física nueva o un plan eSIM inicial) NO muestren este nuevo selector por accidente.
