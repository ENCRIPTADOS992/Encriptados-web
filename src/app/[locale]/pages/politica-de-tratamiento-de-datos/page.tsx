"use client";

import Link from "next/link";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Button from "@/shared/components/Button";
import { ArrowLeft } from "lucide-react";

export default function PoliticaDeDatosPage() {
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
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Política de Tratamiento de Datos Personales</h1>
                            <p className="text-xl text-primary font-medium mt-1">Safesolf Internacional S.A.S.</p>
                            <p className="text-primary/70 text-sm">www.encriptados.io</p>
                        </header>

                        <div className="space-y-6 text-sm md:text-base leading-relaxed">
                            <p>
                                www.encriptados.io, sitio web cuyo dominio de propiedad de la sociedad SAFESOLF INTERNACIONAL S.A.S., en calidad de sociedad comercial responsable del tratamiento de datos personales obtenidos en desarrollo de su objeto societario y en cumplimiento de los deberes contenidos en la Ley 1581 de 2012, Decretos 886 de 2014, 1377 de 2013 y 886 de 2014, ha creado la presente política de tratamiento de datos personales, con el fin de garantizar la protección legal de los derechos fundamentales de los titulares de datos personales, mediante su adecuado tratamiento mediante la recopilación, uso y protección de la información que se aloja en el sitio web citado, aplicaciones móviles, landings asociadas a la página principal, chat de las páginas entre otros.
                            </p>
                            <p>
                                La navegación y/o uso constituirá su aceptación del presente Aviso de privacidad y Uso de Cookies, así como el consentimiento para el desarrollo de las prácticas descritas.
                            </p>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">RESPONSABLE Y ENCARGADO DEL TRATAMIENTO DE DATOS PERSONALES</h2>
                                <p>
                                    La sociedad SAFESOLF INTERNACIONAL S.A.S., con correo electrónico <a href="mailto:contacto@encriptados.io" className="text-primary hover:underline">contacto@encriptados.io</a>, recopila la información que usted proporciona al realizar una compra en nuestro sitio web, crear una cuenta, ingresar sus datos en el Chat, registrarse para recibir correos electrónicos y boletines, también recibe información de datos por parte de terceros, por ello la sociedad responsable, recopila la información que usted ingresa en su computadora, tableta o dispositivo utilizado para navegar por los Sitios; información de cookies o herramientas similares de seguimiento con el fin de proporcionarle productos y servicios adecuados a su necesidad.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">POLÍTICA DE TRATAMIENTO DE DATOS</h2>
                                <p>
                                    Teniendo en cuenta que la sociedad SAFESOLF INTERNACIONAL S.A.S. tiene por objeto social actividades de administración empresarial y actividades de consultoría de gestión y ante la necesidad de asegurar una adecuada gestión de los datos en cumplimiento de la Ley 1581 de 2012 y Decretos 886 de 2014, 1377 de 2013 y 886 de 2014, y subsiguientes, se permite establecer una política de tratamiento de datos personales, que garantiza la protección de los derechos fundamentales de los titulares de los datos personales en su tratamiento.
                                </p>
                                <p className="italic text-text-secondary/80">
                                    Sociedad cuya actividad es la inversión en sociedades colombianas o extranjeras, e inversión nacional e internacional
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">NATURALEZA DE LOS REGISTROS Y LOS DATOS RECOGIDOS POR SAFESOLF INTERNACIONAL S.A.S.</h2>
                                <p>
                                    La sociedad en desarrollo de su objeto social, recolecta información a través de todos sus canales de atención (Escrito, Telefónico, chat entre otros), durante las 8 horas hábiles del día, de lunes a viernes, garantizando la atención de conformidad con la demanda.
                                </p>
                                <p>
                                    SAFESOLF INTERNACIONAL S.A.S. comparte información con la Controlante y con proveedores de servicios para administrar los Sitios, para efectuar los pagos por parte de los usuarios, proporcionar productos, servicios, es por ello que la sociedad no vende ni comparte Información Personal para su uso fuera de sus marcas.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">FINALIDAD DEL TRATAMIENTO DE INFORMACIÓN</h2>
                                <p>
                                    La recolección y tratamiento de los datos personales por parte de SAFESOLF INTERNACIONAL S.A.S. tiene como finalidades:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    <li>Capturar y actualizar los datos de los usuarios y/o compradores en nuestros sitios web.</li>
                                    <li>Gestionar información que permita generar interacciones de interés y espacios de comunicación con los usuarios de nuestros productos y servicios.</li>
                                    <li>Responder a las regulaciones del Gobierno Nacional en relación con la fuente e intercambio de información.</li>
                                    <li>Promover el registro, uso adecuado, administración y veracidad de la información recolectada.</li>
                                    <li>Realizar actividades comerciales como Enviarle avisos de cambios en las política, productos, ofertas, Procesar aplicaciones y transacciones; Publicar contenidos y opiniones de los consumidores en los Sitios, en nuestras redes sociales entre otros.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">TRATAMIENTO DATOS SENSIBLES</h2>
                                <p>
                                    SAFESOLF INTERNACIONAL S.A.S. garantizará que el tratamiento de esta información se realizará sin necesidad de solicitar acceso a los datos sensibles de los usuarios, con el fin de establecer mecanismos que protejan adecuadamente los derechos sobre los datos personales, en cumplimiento de las disposiciones contenidas en la Ley 1581 de 2012 y sus Decretos especiales.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">PERSONAS A QUIENES SE LES PUEDE SUMINISTRAR LA INFORMACIÓN</h2>
                                <p>La información que reúna las condiciones establecidas en la Ley podrá suministrarse a las siguientes personas:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    <li>A los titulares, sus causahabientes (cuando aquellos falten) o sus representantes legales.</li>
                                    <li>A las entidades públicas o administrativas en ejercicio de sus funciones legales o por orden judicial.</li>
                                    <li>A los terceros autorizados expresamente por el titular o por la ley.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">AUTORIZACIÓN DEL TITULAR</h2>
                                <p>
                                    El titular de los datos personales debe dar su autorización previa, expresa e informada para su tratamiento, la cual deberá ser obtenida por cualquier medio (físico o electrónico) que pueda ser objeto de consulta posterior.
                                </p>
                                <p>
                                    La sociedad responsable del tratamiento de datos, recopila información automáticamente por los medios descritos previamente, específicamente cuando se realizan compras a través del Sitio, envía sus datos en formularios, correo electrónico, chats, fotos, videos, reseñas; dicha información se estima en datos de identificación (nombre, correo electrónico, país, número de teléfono, información de pago entre otros).
                                </p>
                                <p>
                                    Además de la información recopilada automáticamente, se estima también la que se desprenda de las actividades con nuestros proveedores de servicios, quienes recopilan información de manera automática para ejecutar los pagos de nuestros productos y servicios, es por ello que probablemente se recopile información como su tipo de navegador, el tipo de dispositivo del cual se conecta, las páginas que visitó y sus preferencias en navegación.
                                </p>
                                <p>
                                    En navegaciones permitidas, usamos «Cookies», los cuales se utilizan para permitir la interacción de los usuarios con las redes sociales, en caso de no aceptación de las cookies, usted puede modificar la configuración de su navegador y así elegir aceptarla o no.
                                </p>
                                <p>
                                    Podemos recibir información de terceros proveedores de datos, tales como marketing, es por ello que la sociedad en este caso, ejercerá el tratamiento de datos como encargado, de acuerdo a las instrucciones del responsable.
                                </p>
                                <p>
                                    Podemos compartir su información personal con otras empresas de la controlante, en caso de adquisición y/o venta de activos, Si otra sociedad adquiere nuestros activos o activos relacionados con los sitios, la información personal que hayamos podrá ser divulgada a dicha sociedad como uno de los activos transferidos.
                                </p>
                                <p className="font-semibold text-white mt-4">
                                    No será necesaria la autorización para el tratamiento del titular de los datos personales en los siguientes casos:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    <li>Información requerida por una entidad pública o administrativa en ejercicio de sus funciones legales o por orden judicial;</li>
                                    <li>Datos de naturaleza pública;</li>
                                    <li>Casos de urgencia médica o sanitaria;</li>
                                    <li>Tratamiento de información autorizado por la ley para fines históricos, estadísticos o científicos;</li>
                                    <li>Datos relacionados con el Registro Civil de las Personas.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">DERECHOS QUE LE ASISTEN COMO TITULAR</h2>
                                <p>Los titulares de la información cuentan con los siguientes derechos:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    <li>Conocer, actualizar, rectificar y solicitar prueba de sus datos personales frente a SAFESOLF INTERNACIONAL S.A.S.</li>
                                    <li>Ser informado por SAFESOLF INTERNACIONAL S.A.S., previa solicitud, respecto del uso que le ha dado a sus datos personales.</li>
                                    <li>Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo dispuesto en la Ley 1581 de 2012 y las demás normas que la modifiquen, adicionen o complementen.</li>
                                    <li>Revocar la autorización y/o solicitar la supresión del dato personal cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                                    <li>Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">RESPONSABLE DE LA ATENCIÓN CONSULTAS Y RECLAMOS</h2>
                                <p>
                                    El responsable para la recepción de consultas y reclamos relacionados con los datos personales del Titular, nuestro oficial de privacidad, ante la cual el Titular de la información puede ejercer sus derechos para conocer, actualizar, rectificar, suprimir y revocar la autorización. Lo anterior lo puede hacer mediante los canales de atención.
                                </p>
                                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                                    <h3 className="font-bold text-white mb-2">Canales de Atención de Consultas Y reclamos</h3>
                                    <p>
                                        Para realizar peticiones, consultas o reclamos con el fin de ejercer los derechos a conocer, actualizar, rectificar, suprimir los datos o revocar la autorización otorgada, correo electrónico <a href="mailto:contacto@encriptados.io" className="text-primary hover:underline">contacto@encriptados.io</a>
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">PROCEDIMIENTO PARA LA ATENCIÓN DE CONSULTAS Y RECLAMOS.</h2>
                                <p>Los derechos de los titulares podrán ser ejercidos ante SAFESOLF INTERNACIONAL S.A.S. por las siguientes personas:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-primary">
                                    <li>Por el Titular, quien deberá acreditar su identidad en forma suficiente.</li>
                                    <li>Por sus causahabientes, quienes deberán acreditar tal calidad.</li>
                                    <li>Por el representante y/o apoderado del Titular, previa acreditación de la representación o poder debidamente otorgado.</li>
                                </ul>
                                <p className="mt-4">
                                    De acuerdo con lo previsto en la Ley, las personas anteriormente señaladas podrán hacer uso ante SAFESOLF INTERNACIONAL S.A.S. de los siguientes mecanismos:
                                </p>
                                <div className="space-y-6 mt-4 pl-4 border-l-2 border-stroke-border">
                                    <div>
                                        <h3 className="text-lg font-bold text-primary">- Consultas</h3>
                                        <p className="mt-2">
                                            Los Titulares o sus causahabientes podrán consultar o solicitar corrección, actualización o supresión de la información personal del Titular que repose en SAFESOLF INTERNACIONAL S.A.S., quien suministrará toda la información contenida en nuestras bases de datos.
                                        </p>
                                        <p className="mt-2">
                                            Las consultas se formularán al correo electrónico a <a href="mailto:contacto@encriptados.io" className="text-primary hover:underline">contacto@encriptados.io</a> o en escrito dirigido a Calle 7 # 39 215 oficina 1009 – 050022.
                                        </p>
                                        <p className="mt-2">
                                            La consulta será atendida en un término máximo de diez (10) días hábiles contados a partir de la fecha de recibo del requerimiento. Cuando no fuere posible atender la consulta dentro de dicho término, se informará al interesado, expresando los motivos de la demora y señalando la fecha en que se atenderá su consulta, la cual en ningún caso podrá superar los cinco (5) días hábiles siguientes al vencimiento del primer término.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary">- Reclamos</h3>
                                        <p className="mt-2">
                                            Los Titulares o sus causahabientes cuando adviertan que existe incumplimiento alguno de los deberes contenidos en la Ley, podrán presentar un reclamo ante SAFESOLF INTERNACIONAL S.A.S. como responsable del tratamiento, el cual será tramitado bajo las siguientes reglas:
                                        </p>
                                        <p className="mt-2">
                                            El reclamo se formulará a través del correo electrónico <a href="mailto:contacto@encriptados.io" className="text-primary hover:underline">contacto@encriptados.io</a>, la cual deberá contener la identificación plena del Titular, la descripción de los hechos que dan lugar al reclamo, la dirección, adjuntando los documentos que se quiera hacer valer. Si falta algún dato necesario para su trámite, SAFESOLF INTERNACIONAL S.A.S. requerirá al interesado dentro de los cinco (5) días siguientes a la recepción del reclamo para que subsane las fallas y complete el requerimiento. Después de dos meses desde la fecha de requerimiento sin que el solicitante subsane los requisitos, se entenderá que existe desistimiento de la solicitud.
                                        </p>
                                        <p className="mt-2">
                                            Una vez recibido el reclamo, SAFESOLF INTERNACIONAL S.A.S. registrará en trámite y en efecto su respuesta.
                                        </p>
                                        <p className="mt-2">
                                            El término máximo para atender el reclamo por parte de SAFESOLF INTERNACIONAL S.A.S. será de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo. Cuando no fuere posible responder en dicho término, se le informará al interesado los motivos de la demora y la fecha en la cual se proyecta su atención, la cual no puede superar los ocho (8) días hábiles siguientes al vencimiento del primer término.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">SEGURIDAD DE LA INFORMACIÓN Y MEDIDAS DE SEGURIDAD</h2>
                                <p>
                                    En desarrollo del principio de seguridad establecido en la normatividad vigente, el adoptará las medidas técnicas, humanas y administrativas para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
                                </p>
                                <p>
                                    Conservaremos su información durante el tiempo que sea necesario para ofertarle nuestros productos y servicios. Si desea cancelar la suscripción, póngase en contacto con nosotros en el correo electrónico.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">DERECHOS DE AUTOR</h2>
                                <p>
                                    De acuerdo con las leyes que rigen los derechos de propiedad literaria y artística u otros derechos similares, la reproducción o redistribución de los elementos que componen el sitio web de www.encriptados.io, en su totalidad o en parte, está estrictamente prohibida.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-semibold text-white">ENTRADA EN VIGENCIA</h2>
                                <p>
                                    La presente política de Tratamiento de Datos personales fue creada el día 27 de enero del año 2020, y empieza a regir desde el momento de su publicación; es por ello que puede ser modificada y sin previo aviso en orden al cambio de la Legislación Colombiana.
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
