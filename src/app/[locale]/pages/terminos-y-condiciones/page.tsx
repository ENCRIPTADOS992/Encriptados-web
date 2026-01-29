"use client";

import Link from "next/link";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Button from "@/shared/components/Button";
import { ArrowLeft } from "lucide-react";

export default function TerminosYCondicionesPage() {
    return (
        <main className="bg-black text-text-secondary min-h-screen pt-32 pb-20">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {/* Header Action */}
                    <div className="mb-8">
                        <Link href="/">
                            <Button intent="ghost" size="sm" className="pl-0 text-primary hover:text-white hover:bg-transparent">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver al inicio
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-8 bg-bg-secondary/30 p-8 md:p-12 rounded-2xl border border-stroke-border/30 backdrop-blur-sm">

                        <header className="border-b border-stroke-border/50 pb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Términos y Condiciones de Compra</h1>
                            <p className="text-primary font-medium">www.encriptados.io</p>
                        </header>

                        <div className="space-y-6 text-sm md:text-base leading-relaxed">
                            <p>
                                Solicitamos a todos nuestros visitantes, lean atentamente los siguientes términos y condiciones de venta electrónica, puesto que se construye con el marco legal aplicable para las transacciones que realice en el presente portal, y en efecto, conservando el resguardo en la defensa de sus derechos como consumidor de acuerdo a la ley 1480 de 2011 y la circular externa Nro. 2 de noviembre 7 de 2019 emitida por parte de la Superintendencia de Industria y Comercio.
                            </p>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">INFORMACIÓN MERCANTIL Y DATOS DE CONTACTO</h2>
                                <p>
                                    La titular del dominio de la presente Web es la sociedad SAFESOLF INTERNACIONAL SAS Identificada con Nit. Nro. 9001.054.325-9, inscrita en el Registro Mercantil de la Cámara de comercio de Medellín- Colombia, con domicilio en la Calle 7 # 39 215 oficina 1009, por lo cual usted puede contactarnos preferencialmente a través de la dirección de correo electrónico <a href="mailto:marketing@encriptados.io" className="text-primary hover:underline">marketing@encriptados.io</a>, y responderemos a su correo electrónico en la brevedad y tan pronto como nos sea posible.
                                </p>
                                <p>
                                    El presente documento (en adelante Términos de uso) regula el acceso y el uso del sitio web www.encryptados.io (en adelante, el sitio web) de propiedad de SAFESOLF INTERNACIONAL SAS INC. (en adelante SAFESOLF); por parte de los usuarios, así como el acceso a los contenidos que puedan estar disponibles en la misma, la prestación de los servicios y productos que en dicha Web se comercializa, y las eventuales responsabilidades derivadas del incumplimiento o del cumplimiento defectuoso de las Condiciones de Uso.
                                </p>
                                <p>
                                    El acceso, la navegación y la utilización de la Web implica la aceptación expresa y sin reservas de todos los términos de las presentes Condiciones de Uso, cuya validez y eficacia es la de cualquier contrato celebrado por escrito y firmado. Su observancia y cumplimiento será exigible respecto de cualquier persona que acceda, navegue o utilice en cualquier forma la Web. Por ello, si no estás de acuerdo con los presentes Términos de Uso o por cualquier razón no los cumple (por ejemplo, por ser menor de 18 años) debe cesar inmediatamente en la navegación y abstenerte de utilizar en cualquier forma la Web.
                                </p>
                                <p>
                                    Al acceder y utilizar los servicios de la web de SAFESOLF, el usuario declara y garantiza que no ha sido incluido en ninguna lista de embargos comerciales o sanciones económicas, la lista de nacionales especialmente designados mantenida por la OFAC o la lista de personas o entidades denegadas del departamento de comercio de estados unidos. SAFESOLF se reserva el derecho de elegir mercados y jurisdicciones para realizar negocios, y puede restringir o rechazar, a su discreción, la prestación de servicios y la venta de productos en determinados países o regiones.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">INFORMACIÓN DE LOS PRODUCTOS.</h2>
                                <p>
                                    En nuestro sitio web, se encuentra la relación y las características de cada producto ofertado, con sus especificaciones técnicas, usos, tamaños, imagen, componentes, propiedades, calidad e idoneidad pertinentes, que constituyen la atención debida al derecho a la información y conocimiento del producto que le corresponde al usuario final.
                                </p>
                                <p>
                                    Las imágenes gráficas del producto, no se determina a escala, es por ello que no se adecuan a la realidad del producto, puesto que se ofrecen presentaciones que no son compatibles con la resolución de la pantalla. De acuerdo a lo anterior, SAFESOLF certifica que la información del producto se encuentra condicionada a la descripción contenida en sus especificaciones, la cual es fiel a la realidad del mismo.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">CAPACIDAD LEGAL</h2>
                                <p>
                                    Los productos y servicios sólo están disponibles para personas que tengan capacidad legal para contratar, en orden a lo anterior, no podrán utilizar los servicios las personas que no tengan dicha capacidad para el ejercicio pleno de sus derechos y atribuciones, como el caso de los menores de edad. Los actos que éstos realicen en este sitio serán responsabilidad de sus padres, tutores, encargados o curadores, y por tanto se considerarán realizados por éstos en ejercicio de la representación legal con la que cuentan. Quien obre en representación de una sociedad, deberá tener capacidad para contratar a nombre de tal entidad y de obligar a la misma en los términos de este Acuerdo.
                                </p>
                                <p>
                                    El usuario asume la plena responsabilidad frente a terceros por todas las órdenes y transacciones que emita en el sitio WEB, así como los recursos para financiar dichas transacciones, en tanto presuponen su consentimiento y autorización, pues son de conocimiento exclusivo del usuario.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">FORMALIZACIÓN CONTRATO DE VENTA DE PRODUCTOS</h2>
                                <p>
                                    Para todos los casos en que la ley exija un “contrato de venta de Producto” o documento equivalente, se entenderá que estos Términos y Condiciones, junto con el precio, modalidad de entrega, forma de pago y características esenciales del Producto, constituyen el Contrato de Venta entre el Usuario y SAFESOLF. Para tal efecto, una vez aprobada la transacción por parte de la entidad bancaria correspondiente, o plataforma respectiva dependiendo de la modalidad de pago, el Usuario podrá ver un resumen que contendrá las condiciones de la transacción realizada. A su vez, estos Términos y Condiciones, estarán siempre disponibles en el sitio web.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">EXENCIÓN DE RESPONSABILIDAD</h2>
                                <p>
                                    El Usuario y/o Cliente de SAFESOLF será responsable de los daños y perjuicios que pueda sufrir directa o indirectamente, como consecuencia del incumplimiento de cualquiera las condiciones descritas en el Aviso de Privacidad, la Ley y en términos y condiciones del uso de la Página Web, descritas en la presente declaración.
                                </p>
                                <p>
                                    SAFESOLF, realizará sus mejores esfuerzos para mantener información actualizada. Sin embargo, no asume responsabilidad legal o de cualquier otra índole por la precisión, oportunidad, contenidos o usos que se dé a dicha información, recordándole al Usuario y/o Cliente que para determinar si la información proporcionada aplica a su caso en particular será necesario que nos contacte a través de nuestros canales oficiales de comunicación.
                                </p>
                                <p>
                                    SAFESOLF como responsable de la Página Web dispondrá su mayor esfuerzo para mantener la correcta funcionabilidad de la Página Web. Sin embargo, el Usuario y/o Cliente asumirá los riesgos, daños o perjuicios, incluyendo más no limitado a la pérdida de información o utilidades, existencia de virus, resultados del uso o la incapacidad para usar los recursos de la Pagina Web entre otros.
                                </p>
                                <p>
                                    La Persona Usuaria mantendrá indemne a SAFESOLF y sus sociedades relacionadas, así como a quienes la dirigen, suceden, administran, representan y/o trabajan en ellas, por cualquier reclamo administrativo o judicial iniciado por otras Personas Usuarias, terceros o por cualquier Organismo. ASÍ MISMO, LA INDEMNIDAD SE PREDICA SOBRE LA ÚNICA RESPONSABILIDAD DEL USUARIO EN EL USO DE LOS PRODUCTOS Y SERVICIOS QUE ADQUIERE EN LA WEB WWW.ENCRIPTADOS.IO, POR LO CUAL SAFESOLF NO SE HACE DIRECTA NI INDIRECTAMENTE RESPONSABLE POR LOS TIPOS PENALES QUE ACAEZCAN DE LA CONSULTA DEL USUARIO Y QUE SOBREVENGAN CON EL USO O DISPOSICIÓN DE LOS PRODUCTOS Y SERVICIOS ADQUIRIDOS, EN TANTO AL MOMENTO DE LA COMPRA, DICHAS CONDUCTAS SALEN DE LA ESFERA DE RESPONSABILIDAD DE SAFESOLF ACUDIENDO AL PRINCIPIO DE RESPONSABILIDAD PENAL PERSONAL.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">REGISTRO DURANTE EL USO DEL SITIO</h2>
                                <p>
                                    Para todos los efectos, el ingreso al sitio está condicionado al suministro de algunos datos de identidad necesarios para ejecutar las transacciones, por lo tanto el Usuario autorizado accederá a la web con el único objeto de realizar la adquisición de productos y/o servicios ofrecidos en este sitio. SAFESOLF no se responsabiliza por la certeza de los Datos Personales provistos por sus Usuarios. Los Usuarios garantizan y responden, en cualquier caso, de la exactitud, veracidad, vigencia y autenticidad de los Datos Personales ingresados. Si se verifica o sospecha por parte de SAFESOLF un uso fraudulento y/o malintencionado y/o contrario a estos Términos y Condiciones y/o contrarios a la buena fe, tendrá el derecho inapelable de dar por declinada la transacción objeto de pago de los productos y servicios y así mismo, si discrecionalmente lo considera, perseguir judicialmente a los infractores.
                                </p>
                                <p>
                                    El Usuario será el único responsable por todas las operaciones efectuadas en y desde su Cuenta, así como el uso que le dé sea directa o por interpuesta persona, a los productos y servicios contratados por la WEB y adquiridos en este medio.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">ACCESO Y ACEPTACIÓN AL INGRESO.</h2>
                                <p>
                                    Al acceder o utilizar el sitio web o cualquier servicio, usted acepta estar sujeto y cumplir estrictamente con estos términos de uso. Si no acepta estar sujeto a estos Términos de uso, no acceda ni utilice el Sitio web ni los Productos y servicios que Oferta. Debe revisar estos Términos de uso con regularidad, ya que puede cambiar en cualquier momento. Si usted se opone a los cambios realizados, deberán dejar de utilizar el sitio web y los servicios. Si continúa utilizando el sitio web o cualquier servicio después de que se enmendaron estos Términos de uso, se considera que usted acepta cumplir con estos Términos de uso en su forma modificada.
                                </p>
                                <p>
                                    Al aceptar estos términos de Uso declaran ser conocedor de todo lo anterior, y reconoce expresamente que SAFESOLF no puede tener responsabilidad por las circunstancias que puedan producirse en el uso de los productos adquiridos a través de la Web.
                                </p>
                                <p>
                                    SAFESOLF exige al usuario final, que sus productos y servicios sean utilizados con fines legales únicamente. En este sentido, usted manifiesta y garantiza expresamente que comprende esta declaración, y en caso de que esta declaración no sea acorde, usted deberá abstenerse o dejar de usar los productos y Servicios.
                                </p>
                                <p>
                                    SAFESOLF se reserva el derecho de suspender o cancelar su acceso o servicios con o sin aviso si esta declaración es falsa o inexacta, si advierte algún fraude o utilización indebida de Los productos, y usted comprende y acepta que cumplirá estrictamente con estos términos de uso y que tomará todas las medidas requeridas por las leyes aplicables para garantizar el cumplimiento estricto de los términos presentes.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">PLAZOS DE VALIDEZ DE LA OFERTA PUBLICADA Y DETALLE DE LOS PRECIOS.</h2>
                                <p>
                                    La oferta mercantil de los productos y servicios es indeterminada y será válida hasta agotar existencia en orden al Código de Comercio Colombiano artículos 845 y siguientes, lo cual se entenderá agotado cuando se retire la publicación de la misma en el sitio web, y su aceptación, será de manera tácita con la voluntad de compra y uso de la plataforma para dichos fines.
                                </p>
                                <p>
                                    Es de anotar que SAFESOLF no estará obligado por errores manifiestos de transcripción en las declaraciones en la oferta sitio Web. Existe la posibilidad que se presenten variaciones en productos como consecuencia de la resolución de la imagen u otras razones técnicas, pero no se hace responsable de estas variaciones. Queda aceptado por el consumidor que las condiciones de oferta se dan por aceptadas al proceder a realizar la compra del producto y es señal de aceptación expresa del presente documento de términos y condiciones.
                                </p>
                                <p>
                                    Los precios están expresados en dólares USD, advirtiendo que SAFESOLF se reserva el derecho de hacer cambios en los precios con anterioridad a un pedido realizado. SAFESOLF también se reserva el derecho a limitar o dar por terminadas ofertas y promociones en cualquier momento sin aviso privado alguno. Se tendrá para efectos de cambio, la tasa representativa del día efectivo de la compra.
                                </p>
                                <p>
                                    Para allegar su pedido a la dirección deseada, SAFESOLF cobra gastos de envío que pueden variar de acuerdo a las cantidades solicitadas. Estos gastos se facturarán, cuando proceda, por separado y se especificarán y sumarán al importe total del pedido. Los tiempos de entrega de los productos oscilarán de acuerdo a la zona o el país de entrega.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">DISPONIBILIDAD DE PRODUCTOS EN EL PORTAL.</h2>
                                <p>
                                    La disponibilidad de los productos está condicionada a existencia en inventario, por lo tanto el SAFESOLF se abstendrá de presentar al mercado electrónico productos que no se encuentren vigentes o disponibles, advirtiendo además, que en caso de requerirse por el usuario final, puede generar espacio de comunicación al correo electrónico <a href="mailto:marketing@encriptados.io" className="text-primary hover:underline">marketing@encriptados.io</a>, con el fin de acordar directamente con el vendedor, un plazo para la consecución de productos requeridos, los cuales estarán sometidos a las mismas condiciones de venta, pago y retracto.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">FORMAS DE PAGO.</h2>
                                <p>
                                    Al realizar compras en el sitio web https://www.encriptados.io, el usuario final ACEPTA de manera libre y voluntaria, recibir y pagar inmediatamente las facturas por la compra de artículos ofertados en este medio, autorizando por demás para que a partir de la fecha, allegue por correo electrónico el comprobante de pago con la relación exacta de los productos adquiridos, exonerando a SAFESOLF del envío de dichos documentos de forma física. Por lo tanto, el cliente acepta que es su responsabilidad contar con el servicio activo del e-mail reportado con el fin que sea allegado en este canal de comunicación, los documentos que soporten la compra.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">MEDIOS DE PAGO QUE SE PODRÁN UTILIZAR EN EL SITIO</h2>
                                <p>
                                    Los productos y servicios ofrecidos en el Sitio, salvo que se señale una forma diferente para casos particulares u ofertas de determinados bienes o servicios, sólo pueden ser pagados con los medios que en cada caso específicamente se indiquen.
                                </p>
                                <p>
                                    Para efecto de lo anterior el sitio WEB cuenta con cuatro medios de pago oportunos y autorizados:
                                </p>

                                <div className="pl-4 border-l-2 border-primary/30 space-y-6 mt-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Pago con tarjeta de crédito.</h3>
                                        <p>
                                            El uso de tarjetas de crédito se sujetará a lo establecido en estos Términos y Condiciones y, en relación con su emisor, y a lo pactado en los respectivos Contratos de Apertura y Reglamento de Uso de tipo bancario. En caso de contradicción, predominará lo expresado en ese último instrumento. Tratándose de tarjetas bancarias aceptadas en el Sitio, los aspectos relativos a éstas, tales como la fecha de emisión, caducidad, cupo, bloqueos, etc., se regirán por el respectivo Contrato de Apertura y Reglamento de Uso del banco, de tal forma que SAFESOLF no tendrá responsabilidad por cualquiera de los aspectos señalados. El Sitio podrá indicar determinadas condiciones de compra según el medio de pago que se utilice por el usuario
                                        </p>
                                        <p className="mt-2">
                                            Es de aclarar que SAFESOLF mediante el pago con tarjeta de crédito de los productos y servicios adquiridos, recolecta la información del usuario la cual puede ser entregada en virtud de la exención al deber de confidencialidad, cuando sea requerido por entidad gubernamental de todo tipo en Colombia. Dicha información se mantendrá bajo confidencialidad mientras se estimen las causales de exención citadas en la política de tratamiento de datos dispuesta en nuestro portal.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Pago mediante dispositivo ATM</h3>
                                        <p>
                                            Para operar el pago mediante dispositivo ATM, el usuario debe portar una tarjeta ATM o una tarjeta de débito e ingresar un número de identificación personal (PIN), siguiendo por demás algunas instrucciones en pantalla necesarias para que se efectúe el servicio bancario.
                                        </p>
                                        <p className="mt-2">
                                            Por lo anterior, dicha autenticación presta mérito de reconocimiento y verificación de seguridad del cliente y en varios niveles, al incorporarse los datos personales en el dispositivo, es claro que la transacción está sujeta a verificación por parte de la entidad financiera, y desde allí, la exención de responsabilidad de SAFESOLF sobre los recursos objeto de la transacción, es inmediata al salir de su ámbito de competencia civil. Así las cosas, SAFESOLF se exime de toda responsabilidad desde el momento que se genera la verificación bancaria de la transacción, por lo cual no es imputable a SAFESOLF el rastreo de los recursos bajo la premisa de las buenas prácticas de seguridad y protección entre todos aquellos que intervienen en nuestros productos y servicios.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Pago mediante criptoactivos y/o Theter Trx en enlaces con plataformas</h3>
                                        <p>
                                            En la modalidad de pago descrita, es claro que nuestras políticas son rigurosas frente a la identidad de los adquirientes y usuarios de nuestros productos y servicios, por lo cual, nuestros enlaces a plataformas bajo el modelo de pasarelas de pago, en este caso, con criptoactivos y/o Theter Trx, contienen una fuerte verificación de seguridad bajo el uso de herramientas de KYC usualmente reconocidas por dichas plataformas para la verificación del usuario final.
                                        </p>
                                        <p className="mt-2">
                                            La verificación obligatoria de la identidad de un usuario, normalmente por parte de una entidad financiera o recaudadora de los recursos bajo cualquier modalidad, incluye entre otros, la verificación de información que pueda utilizarse para comprobar la identidad del adquirente en sendas bases de datos, así como la verificación documental y domiciliaria entre otros.
                                        </p>
                                        <p className="mt-2 text-white bg-primary/10 p-4 rounded-lg">
                                            En las plataformas de pago, es de obligatorio cumplimiento el proceso de KYC para cada uno de sus clientes, solo así estos pueden tener acceso a todos los productos y servicios de la plataforma, además de posibilitar el uso de diversas monedas para el intercambio de productos y servicios en nuestra WEB, por lo cual, dicha verificación garantiza por demás, el origen de los recursos que el usuario dispone para el pago de los productos y servicios ofertados, así como la identidad del mismo; por lo cual el usuario, al ingresar a nuestra web SE ADHIERE AL RECONOCIMIENTO Y ACEPTACIÓN QUE SU INFORMACIÓN PERSONAL PUEDE SER REVELADA A AGENCIAS DE CRÉDITO Y AGENCIAS PARA LA PREVENCIÓN DEL FRAUDE O LA PREVENCIÓN DE DELITOS FINANCIEROS, COMO PARTE DE LA EXENCIÓN DE RESPONSABILIDAD DE SAFESOLF E INDEMNIDAD CORRESPONDIENTE.
                                        </p>
                                        <p className="mt-2">
                                            Nuestras políticas de prevención de lavado de activos, la financiación del terrorismo y actividades ilícitas, están encaminada a evitar que se atente contra el patrimonio empresarial, sus funcionarios y la prestación del servicio, desarrollando relaciones comerciales con asociados de negocios confiables y seguros .
                                        </p>
                                        <p className="mt-2 font-medium text-white">
                                            El usuario entonces, con e l acceso a la WEB y más aún con la adquisición de nuestros productos y servicios se compromete a:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary">
                                            <li>Cumplir con la normativa Legal y de otra índole vigente aplicable.</li>
                                            <li>Garantizar las medidas de control apropiadas, lo cual evita la realización de cualquier operación cambiaria y/ o de comercio exterior, que pueda ser utilizada como instrumento para el ocultamiento, manejo, inversión o aprovechamiento de bienes o recursos provenientes de actividades ilícitas.</li>
                                            <li>De igual manera, el usuario al ingresar a la WEB, declara que los recursos económicos utilizados para la adquisición de los productos y servicios en la WEB, no provienen en ningún caso de actividades ilícitas y no tienen ninguna relación comercial con terceros, que se dediquen a conductas contempladas en el Código Penal Colombiano o en cualquier otra Norma Legal que lo modifique o derogue, así como los criterios de la circular 100-000005 de 2014 de la Superintendencia de sociedades.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Pago mediante transferencia a banco BANCOLOMBIA</h3>
                                        <p>
                                            En la modalidad de pago descrita, el consumidor y/o usuario final, transfiere por su cuenta y riesgo a las cuentas designadas en los medios de pago y el cargo a su valor, desde la entidad bancaria, o transferencia a la cuenta bancaria, allegando el comprobante de depósito a las fuentes de contacto de SAFESOLF.
                                        </p>
                                        <p className="mt-2">
                                            Las transferencias serán habilitadas en dólares americanos como moneda preferencial y en caso de imposibilitar dicha transacción, se harán al cambio del dia al cierre; entendiendo que, los gastos adicionales por diferencia en cambio deben ser asumidos por el Consumidor y/o usuario final, este valor exacto del cambio de moneda debe ser el reportado en el soporte de pago que se envía a SAFESOLF, de no ser así, no será liberado ni entregado el servicio o producto adquirido, hasta completar el pago faltante.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Formalización de contrato de compra.</h2>
                                <p>
                                    En su calidad de consumidor y/o usuario final, el contrato se entenderá perfeccionado solo si usted como cliente tiene más de 18 años, adquiere por medio de compra venta los productos estimados en la oferta comercial disponible en el portal web. Los pedidos que usted realice a través del Sitio Web de los productos ofrecidos en https://www.encriptados.io son únicamente una oferta para celebrar un contrato de compra venta. El precitado contrato sólo quedará efectivamente celebrado cuando SAFESOLF le confirme por email el pedido y las opciones de envío. Antes de recibir por este medio dicha confirmación, se podrá cancelar el pedido. Si SAFESOLF no confirma su pedido en el plazo de diez días hábiles, se considerará rechazado.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Entrega.</h2>
                                <p>
                                    SAFESOLF realizará la entrega en la dirección proporcionada en los formularios de registro de datos, dentro del territorio colombiano, Las entregas se realizarán en días hábiles. Si usted pide que SAFESOLF entregue el pedido en varios envíos, este último podrá cobrarle costes extra de entrega. Cada uno de los envíos individuales constituirá un contrato independiente. Si SAFESOLF se retrasa en la entrega de un envío o uno de los envíos no es correcto, esto no le dará derecho a cancelar ningún otro envío.
                                </p>
                                <p>
                                    Los periodos de entrega son indicativos y, por consiguiente, no se consideran fechas límite estrictas. El mero hecho de haber excedido un periodo de entrega no le dará ningún derecho de compensación. Para ello, deberá enviarse a SAFESOLF una notificación de incumplimiento, esperando el tiempo prudencial designado en los plazos de entrega de acuerdo a la transportadora elegida por el cliente, es por ello que se designa para entregas nacionales de 1 a 3 días hábiles y para entrega internacional de 7 a 15 días hábiles, aproximadamente. En caso que la entrega no se realice en dichos términos, se reintegrará el importe pagado al consumidor y no operará compensación alguna por dicho concepto.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Alternativas en caso de inconvenientes de entrega.</h2>
                                <p>
                                    Si SAFESOLF antes de celebrar el contrato observa que no puede suministrar los productos solicitados, podrá ofrecerle un producto equivalente en términos de calidad, precio y función. Usted no estará obligado a aceptar el producto de sustitución. Si así lo desea, usted podrá devolverlo en el plazo de 5 días y SAFESOLF correrá con los gastos necesarios y razonables para que se lo retorne de su destino.
                                </p>
                                <p>
                                    En caso de celebrarse el contrato, y SAFESOLF observa que no puede bajo ninguna circunstancia suministrar los productos pedidos y no es responsable de esta situación, tendrá derecho a terminar el contrato, informando inmediatamente al respecto y reembolsando los pagos que haya realizado.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">DEVOLUCIONES.</h2>
                                <p>
                                    El cliente y/o Usuario Final podrá devolver los productos recibidos una vez haya contactado a SAFESOLF al correo electrónico designado, exponiendo los motivos de la devolución y reintegrando el producto dentro de los 7 días hábiles siguientes al recibo del producto. Asimismo los productos deberán ser enviados, sin utilizar y completos, incluyendo su embalaje original. Una vez autorizada su devolución, nos pondremos en contacto con usted para coordinar la recogida del mismo por medio de nuestro transportador. La devolución de productos será por cuenta y riesgo de SAFESOLF.
                                </p>
                                <p>
                                    En caso de producirse una devolución válida, se le reembolsará el precio de compra dentro de los diez días siguientes al recibo del producto y la cancelación del contrato. Sin embargo, el cliente y/o usuario final debe ser consciente que existen procesos bancarios que pueden demorar hasta 60 días, es por ello que se requiere comunicación constante entre el cliente y la entidad bancaria para el seguimiento del retorno.
                                </p>
                                <p>
                                    Si se devuelve un producto y SAFESOLF advierte que está alterado por un acto u omisión imputables al cliente, podrá reducir del importe el monto de devolución por la disminución del valor del producto como consecuencia de estos daños. Usted podrá evitar la obligación de compensar la disminución de valor de un producto causado por el uso de dicho producto, si usted no usa el producto como si fuera de su propiedad y si se abstiene, tanto como sea razonablemente posible, de cualquier acción que pueda afectar negativamente a su valor.
                                </p>
                                <p>
                                    Si desea expresar una queja verbal sobre la celebración del contrato o su cumplimiento, puede enviar un su petición al correo electrónico: <a href="mailto:marketing@encriptados.io" className="text-primary hover:underline">marketing@encriptados.io</a>
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Retracto.</h2>
                                <p>
                                    Los retractos antes mencionados deberán ser solicitados por medio de la página Web y en nuestro canal original.
                                </p>
                                <p>
                                    Para poder ejercer el derecho de retracto el usuario debe demostrar que el producto no estar averiado o deteriorado por acciones correspondientes a su dominio, debe por demás contar con las etiquetas, accesorios y empaques originales (incluyendo manuales, guías de uso, certificados de garantía ), el producto no debe mostrar señales de uso, suciedad o desgaste y no debe tener más de CINCO (5) días hábiles de entregado.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">EXENCIONES DE GARANTÍA</h2>
                                <p className="font-semibold text-white">LA GARANTÍA DE PRODUCTOS NO APLICA CUANDO:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary">
                                    <li>El equipo presente maltrato, daños ocasionados por catástrofes naturales o uso distinto al indicado en las instrucciones de manejo</li>
                                    <li>Presente daños causados por fluctuaciones de voltaje de la energía eléctrica o descargas eléctricas atmosféricas</li>
                                    <li>El daño es ocasionados por la adaptación e instalación de piezas o accesorios no genuinos, no autorizados por el vendedor, por la falta de cuidado con el producto o factores ajenos (oxidación, decoloración, ralladuras, exceso de polvo, golpes)</li>
                                    <li>Cuando los sellos de garantía estén rotos</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">TITULARIDAD DE DERECHOS.</h2>
                                <p>
                                    SAFESOLF es titular o, en su caso, cuenta con las licencias correspondientes sobre los derechos de explotación de propiedad intelectual de la Web, así como de todos los productos y contenidos ofrecidos en la misma, incluyendo textos, fotografías o ilustraciones, logos, marcas, grafismos, diseños, interfaces o cualquier otra información o contenido y los servicios disponibles a través de la misma. Asimismo, en ningún caso se entenderá que el acceso, navegación y/o utilización de la Web por parte del Usuario, ni la utilización de los productos y/o servicios ofrecidos por SAFESOLF a través de su Web implican una renuncia, transmisión, licencia o cesión total o parcial de dichos derechos por parte de SAFESOLF. El Usuario dispone de un derecho de uso no exclusivo de los contenidos y/o servicios de la Web, dentro de un ámbito estrictamente doméstico, y únicamente con la finalidad de disfrutar personalmente de las prestaciones de los productos y servicios que la misma ofrece, de acuerdo con las presentes Condiciones de Uso.
                                </p>
                                <p>
                                    Las referencias a marcas o nombres comerciales registrados u otros signos distintivos, ya sean titularidad de SAFESOLF o de terceras empresas, llevan implícita la prohibición de su uso sin el consentimiento de SAFESOLF y/o de sus legítimos titulares. En ningún momento el acceso, navegación o utilización de la Web y/o de sus contenidos confiere al Usuario derecho alguno sobre signos distintivos en él incluidos.
                                </p>
                                <p>
                                    En el caso de que el Usuario envíe información de cualquier tipo a SAFESOLF a través de cualquiera de los canales habilitados al efecto, éste declara, garantiza y acepta que tiene derecho a hacerlo libremente, que dicha información no infringe ningún derecho de propiedad intelectual, industrial, secreto comercial o cualesquiera otros derechos de terceros, y que dicha información no tiene carácter confidencial ni es perjudicial para terceros.
                                </p>
                                <p>
                                    El Usuario reconoce asumir la responsabilidad, dejando indemne a SAFESOLF por cualquier comunicación sea verbal o escrita que suministre personalmente o a su nombre, alcanzando dicha responsabilidad, sin restricción alguna, a cualesquiera daños y perjuicios relacionados con su exactitud, su legalidad, su originalidad y/o su titularidad.
                                </p>
                                <p>
                                    De igual modo, en caso de que cualquier Usuario o un tercero consideren que alguno de los contenidos de la Web propiedad de SAFESOLF vulneran sus derechos de propiedad intelectual y/o industrial, así como cualesquiera otros derechos, deberán remitir una comunicación a <a href="mailto:marketing@encriptados.io" className="text-primary hover:underline">marketing@encriptados.io</a> con la documentación necesaria que acredite tal extremo, y desde SAFESOLF se dará cumplida respuesta tan pronto como sea posible.
                                </p>
                                <p>
                                    El Usuario se compromete a hacer un uso adecuado de los contenidos, materiales, productos y servicios que SAFESOLF ofrece en la Web y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe y al ordenamiento jurídico, La realización de cualesquiera actuaciones como las descritas en el párrafo anterior por el Usuario podrá llevar aparejada la adopción por SAFESOLF de las medidas oportunas amparadas en el ejercicio de sus derechos u obligaciones, entre las que se encuentra la eliminación o bloqueo del Usuario infractor y en efecto, la potencial denuncia de los hechos delictivos que advierta.
                                </p>
                                <p>
                                    El Usuario reconoce expresamente que en el supuesto de que realice las citadas actuaciones no tendrá derecho a reclamar indemnización alguna por los daños y perjuicios causados y, por el contrario, será el único responsable de los daños y perjuicios que pudieran causarse a SAFESOLF y/o a cualesquiera terceros. A tal efecto, el Usuario reconoce expresamente y acepta mantener indemne a SAFESOLF respecto de cualesquiera daños y perjuicios derivados de actuaciones como las que se describen en el párrafo anterior. Esta garantía de indemnidad cubre no solamente el importe de la indemnización y las costas de eventuales procedimientos judiciales o arbitrales, sino también los gastos de profesionales (abogados, peritos etc) que tuviera que realizar SAFESOLF para defender sus derechos y/o intereses tanto judicial como extrajudicialmente. El Usuario que incumpla estas prohibiciones será responsable de cualquier reclamación que se produzca como consecuencia de ello. La garantía de indemnidad descrita en esta cláusula se aplica también a este caso, lo que el Usuario reconoce y acepta expresamente y, por tanto, este deberá dejar a SAFESOLF indemne en los términos ya referidos.
                                </p>
                                <p>
                                    El Usuario reconoce expresamente y acepta su responsabilidad por las eventuales consecuencias derivadas de la infracción de la normativa reguladora de los bienes materiales e inmateriales y/o activos tangibles e intangibles, y se obliga a mantener indemne a SAFESOLF de cualquier reclamación por este motivo en los términos anteriormente expresados.
                                </p>
                                <p>
                                    SAFESOLF se reserva el derecho a modificar las Condiciones de Uso en cualquier momento. En caso de modificación de las Condiciones de Uso se pondrá a disposición de los Usuarios de la Web la nueva versión con antelación suficiente, y se enviará una comunicación informativa a todos los Usuarios registrados, con la posibilidad de recabar su aceptación expresa en caso de que fuera necesario.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Jurisdicción.</h2>
                                <p>
                                    Los Servicios están disponibles para su uso en cualquier país, mientras no contravenga la legislación colombiana ni la del país del uso y adquisición reportado. En este sentido, usted acepta expresamente cumplir con todas las leyes Colombianas, y según corresponda, las extranjeras relacionadas con el uso que haga de los servicios. por ello usted no proporcionará, transportará, exportará, reexportará o pondrá a disposición de otro modo, ya sea directa o indirectamente e independientemente de la forma, incluso a través del acceso visual, los servicios o cualquier tecnología o datos técnicos utilizados para proporcionar dichos servicios o derivados de ellos de manera que contradiga o pueda contradecir las declaraciones y garantías que hizo. El hecho de que pueda acceder a los servicios desde otro lugar no constituirá una declaración o convenio de que los servicios estén disponibles en dicha ubicación. Quien opta por acceder a los servicios en una jurisdicción distinta a donde se ofrecen los Servicios lo hace por iniciativa propia y bajo su propio riesgo, además entiende que dicho acceso puede ser contrario a las leyes aplicables en el mismo.
                                </p>
                                <p>
                                    SAFESOLF se reserva el derecho de interrumpir, suspender o terminar la prestación de cualquier producto o Servicio si: (i) el Usuario final no cumple con cualquiera de estos Términos de uso, la Política de privacidad o las leyes aplicables; (ii) utiliza los productos ofertados en el sitio web con fines ilícitos o con cualquier otro fin que no sean los fines permitidos; (iii) por cualquier otra razón donde dicha interrupción, suspensión o terminación sea necesaria en opinión de SAFESOLF.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">OTRAS PREVISIONES</h2>
                                <p>
                                    En algunos casos, SAFESOLF puede recopilar información personal y otra información: (i) en el curso de la prestación de sus Servicios; y (ii) cuando usted navegue por el sitio web. (ii) mediante cookies. En todos los casos, SAFESOLF utiliza medidas de seguridad para proteger la seguridad y privacidad de dicha información personal. SAFESOLF además implementa varias medidas con respecto al almacenamiento de información personal, como se detalla más detalladamente en su Política de Privacidad. Al utilizar el sitio web y / o los servicios, usted está de acuerdo con las disposiciones de esa política de privacidad, que se incorporan en estos términos de uso por referencia.
                                </p>
                                <p>
                                    Para el evento anterior, remitirse a la política de privacidad bajo la ley Colombiana y política de cookies.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">RESPONSABILIDAD</h2>
                                <p className="font-semibold text-white">EL USUARIO FINAL Y/O CONSUMIDOR, RECONOCE Y ACEPTA QUE:</p>
                                <p>
                                    (A) ASUME TODOS LOS RIESGOS RELATIVOS A, O DERIVADOS DE, EL USO, CONSULTA O ACCESO POR SU PARTE AL SITIO WEB. EL SITIO WEB SE FACILITA “COMO ESTÁ” Y “SEGÚN DISPONIBILIDAD”, SIN GARANTÍA ALGUNA;
                                </p>
                                <p>
                                    (B) DENTRO DE LOS LÍMITES LEGALES, SAFESOLF DECLINA EXPRESAMENTE Y EN ESTE ACTO, TODA GARANTÍA O RESPONSABILIDAD, EXPRESA O IMPLÍCITA, LEGAL O DE OTRO TIPO, INCLUIDAS, ENTRE OTRAS: LAS GARANTÍAS IMPLÍCITAS DE CALIDAD SATISFACTORIA, IDONEIDAD PARA EL USO CONCRETO, PROHIBICIÓN DE USO INDEBIDO Y LAS HABITUALES EN LA PRÁCTICA COMERCIAL O EN LAS NEGOCIACIONES EN ESTE SECTOR; Y
                                </p>
                                <p>
                                    (C) SAFESOLF DECLINA EXPRESAMENTE TODA GARANTÍA RESPECTO A: (I) QUE EL SITIO WEB Y SU CONTENIDO ESTARÁ SIEMPRE LIBRE DE ERRORES O VIRUS O NO SUFRIRÁ NUNCA ATAQUES DE TERCEROS; (II) EL FUNCIONAMIENTO ININTERRUMPIDO Y SIEMPRE SEGURO DEL SITIO WEB; (III) LA PERMANENTE DISPONIBILIDAD DEL SITIO; (IV) QUE EL SITIO WEB CUBRA O NO LAS NECESIDADES DEL USUARIO; Y (V) LA FIABILIDAD, EXACTITUD, INTEGRIDAD, VALIDEZ O VERACIDAD DE LA INFORMACIÓN FACILITADA POR EL USUARIO.
                                </p>
                                <p>
                                    SAFESOLF no será responsable de ninguna pérdida, ya sea indirecta o no objetivamente previsible, como la pérdida de ganancias, negocios u otras oportunidades, que surjan de cualquier defecto, error o incumplimiento con respecto a al sitio web o los servicios o de otro modo.
                                </p>
                                <p>
                                    EL USUARIO ACEPTA ASUMIR TODOS LOS RIESGOS ASOCIADOS CON, O DERIVADOS DE, EL USO DEL SITIO WEB O LA INFORMACIÓN FACILITADA POR EL USUARIO, INCLUYENDO, ENTRE OTROS, LOS RIESGOS DE PÉRDIDAS ECONÓMICAS, LOS DAÑOS A LA PROPIEDAD Y LOS GASTOS DE NEGOCIACIÓN CON OTROS USUARIOS DEL SITIO WEB (YA SEAN DESCONOCIDOS, MENORES, EXTRANJEROS O PERSONAS QUE ACTÚAN BAJO FALSA IDENTIDAD). EL USUARIO SE COMPROMETE TAMBIÉN A EXONERAR DE TODA RESPONSABILIDAD A SAFESOLF, A LA EMPRESA MATRIZ Y A LAS EMPRESAS SUBSIDIARIAS Y AFILIADAS DE ESTA, ASÍ COMO A LOS DIRECTIVOS, ENCARGADOS, COMERCIALES Y EMPLEADOS DE TODAS ELLAS, FRENTE A LAS RECLAMACIONES, DEMANDAS O RECLAMACIONES DE INDEMNIZACIÓN POR DAÑOS Y PERJUICIOS (DIRECTOS, INDIRECTOS Y SOBREVENIDOS) DE CUALQUIER TIPO, CONOCIDAS O NO, QUE PUEDAN INTERPONERSE CON BASE EN, O QUE SE DERIVEN DEL USO DEL SITIO WEB, LA INFORMACIÓN FACILITADA POR EL USUARIO O LAS TRANSACCIONES QUE SE PRODUZCAN COMO RESULTADO DEL USO DEL SITIO WEB POR PARTE DEL USUARIO.
                                </p>
                                <p>
                                    SIEMPRE DENTRO DE LOS LÍMITES LEGALES, EL USUARIO ASUME Y ACEPTA QUE EN NINGÚN CASO, SAFESOLF NI SUS EMPRESAS SUBSIDIARIAS Y AFILIADAS, NI TAMPOCO SUS DIRECTIVOS, LOS COMERCIALES, LOS EMPLEADOS O LOS PROVEEDORES DE TODAS ELLAS, ASUMIRÁN RESPONSABILIDAD ALGUNA POR LAS PÉRDIDAS O LOS DAÑOS DIRECTOS, INDIRECTOS O SOBREVENIDOS (INCLUIDOS, ENTRE OTROS, LOS DAÑOS A LA PROPIEDAD Y LOS DAÑOS PURAMENTE ECONÓMICOS), NI POR LUCRO CESANTE, PÉRDIDA DE INGRESOS O DE DATOS O POR INTERRUPCIÓN DE USO, SEA CUAL SEA LA CAUSA QUE LOS HAYA PROVOCADO – INCUMPLIMIENTO CONTRACTUAL, RESPONSABILIDAD EXTRACONTRACTUAL (INCLUIDA LA NEGLIGENCIA) O INCUMPLIMIENTO DE GARANTÍA-, INCLUSO AUNQUE SAFESOLF HUBIERA SIDO ADVERTIDA DE LA POSIBILIDAD DE OCURRENCIA DE DICHAS PÉRDIDAS O DAÑOS. EN CASO DE QUE EN ALGUNA JURISDICCIÓN SE PROHÍBA LA EXCLUSIÓN DE CIERTAS GARANTÍAS, LA LIMITACIÓN DE RESPONSABILIDAD O EL DESCARGO DE RESPONSABILIDAD RESPECTO A CIERTOS DAÑOS, LA RESPONSABILIDAD ACUMULADA DE SAFESOLF POR DAÑOS NO EXCEDERÁ DE USD$10.00 (DIEZ DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA), SI ASÍ LO PERMITE LA LEGISLACIÓN APLICABLE.
                                </p>
                                <p>
                                    Los usuarios finales entienden y aceptan que el uso de los servicios se deja a su discreción total, por lo tanto, asumen los riesgos propios de los usuarios. SAFESOLF renuncia a cualquier responsabilidad con respecto al uso de estos servicios y no es responsable de ningún daño ocasionado por uso de los mismos.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">CONTACTO</h2>
                                <p>
                                    Todas las preguntas, comentarios o solicitudes con respecto a estos Términos de uso o la Política de privacidad deben dirigirse a SAFESOLF INTERNACIONAL S.A.S. SAFESOLF responderá a las preguntas y solicitudes lo antes posible mediante su canal de comunicación por correo electrónico citado en el contacto inicial.
                                </p>
                                <p>
                                    SAFESOLF se reserva el derecho de cambiar o modificar estos Términos de uso, por ello las actualizaciones a dichos términos estarán disponibles y serán fácilmente accesibles en el sitio web. SAFESOLF recomienda que estos Términos de uso se revisen periódicamente para revisar las prácticas actuales de SAFESOLF INTERNACIONAL S.A.S., ya que el uso continuo de los Servicios constituirá la aceptación de cualquier enmienda a los mismos.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">MISCELANEOS</h2>
                                <p>
                                    Estos Términos de uso, junto con la Política de privacidad y cualquier otro acuerdo celebrado con Usted constituirán el acuerdo completo entre Usted y SAFESOLF y reemplazarán todos los acuerdos, entendimientos, negociaciones y discusiones anteriores entre las partes y no hay representaciones, garantías, convenios, condiciones u otros términos distintos de los expresamente contenidos en estos Términos de uso, la Política de privacidad y cualquier acuerdo de este tipo. Estos Términos de uso solo pueden ser modificados por SAFESOLF y solo por escrito.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">Ley aplicable y resolución de disputas.</h2>
                                <p>
                                    Estos Términos de uso se rigen por las leyes vigentes en Colombia, excluyendo cualquier conflicto de disposiciones legales y los principios de la Convención de las Naciones Unidas sobre Contratos para la Venta Internacional de Mercaderías que pudieran dar lugar a la aplicación de las leyes de otra jurisdicción. Si surge una disputa o desacuerdo con respecto a estos Términos de uso, la Política de privacidad, cualquier acuerdo celebrado con Usted o de otro modo en relación con los Productos y Servicios, las partes acuerdan remitir el asunto al contacto de SAFESOLF, Si el desacuerdo no puede resolverse dentro de los treinta (30) días posteriores a dicha remisión, dicho desacuerdo se someterá a arbitraje de acuerdo al reglamento de arbitraje de la cámara de comercio de Medellín para Antioquia, escogiéndose tres árbitros especialistas en el tema.
                                </p>
                                <p>
                                    Cada parte se compromete a mantener la confidencialidad de toda la información relacionada con la existencia de la disputa y el arbitraje, así como todos los laudos y órdenes emitidos por el tribunal arbitral, excepto en la medida en que la ley aplicable requiera la divulgación.
                                </p>
                            </section>
                        </div>

                        <div className="flex justify-center pt-8 border-t border-stroke-border/50">
                            <Link href="/">
                                <Button intent="primary">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Volver al inicio
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
