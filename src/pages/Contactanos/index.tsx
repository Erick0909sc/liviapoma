import Layout from "@/components/Layout/Layout";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Props = {
  frameborder: string;
};

const index = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    AOS.init({
      duration: 2000, // Duración de las animaciones en milisegundos
      offset: 100, // Desplazamiento en píxeles desde el borde superior del elemento para activar la animación
    });
  }, []); // Asegúrate de ejecutar esto solo una vez después del montaje del componente

  return (
    <Layout title="Inicio">
      <div className="flex items-center justify-center mt-6">
        <section className="bg-white " data-aos="fade-up">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-black sm:text-lg ">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray">
                Sobre Nosotros
              </h2>
              <p className="mb-4">
                Fundado en Tambogrande, Piura por Alexander Liviapoma en el
                2010. Es la principal distribuidora de Sider Perú y Cemento
                Pacasmayo. Mantiene precios mínimos para los pequeños
                comerciantes con la visión Creces tú, Camino Yo.
              </p>
              <p>
                En el 2015 logra su segundo local que funciona como almacén de
                despacho al por mayor, al lograr posicionarse como una empresa
                líder en la comercialización y distribución de productos de
                materiales de construcción. Organiza capacitaciones con el
                objetivo de actualizar y certificar a los maestros constructores
                de la zona y público en general.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="w-full rounded-lg"
                src="https://scontent.fpiu3-1.fna.fbcdn.net/v/t39.30808-6/299326759_604345511396003_8775088148265127012_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHJsaA74EDFzFsxCQmOKBSEB-YVBlpffvIH5hUGWl9-8ofsBv8igfQ0J7dua010AiewkQg8k9FA8uK-iocCncOG&_nc_ohc=Y0pu9YsuR9EAX_2CrAo&_nc_ht=scontent.fpiu3-1.fna&oh=00_AfAyk8NSB9FM0NB1Is6yJINUTkZ86qUXSwRVHWIR83E7pA&oe=65326519"
                alt="1"
              />
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src="https://scontent.fpiu3-1.fna.fbcdn.net/v/t39.30808-6/300172221_604345388062682_6604827093289284845_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE4brTJxJwWmnpy6jONMyvOq7-r4ReYxaKrv6vhF5jFolvyR1plcioTbvBy8o0NME_OiZB1sXBy06AtDkST1Txt&_nc_ohc=CqT0fI1pBjoAX_UAoQ9&_nc_ht=scontent.fpiu3-1.fna&oh=00_AfC3mnnwiPX5KSP4BK2bbOIfeo5DuYOcF3qxJFTF6dcVWw&oe=653182D7"
                alt="2"
              />
            </div>
          </div>
        </section>
      </div>
      <section
        className="flex flex-wrap items-center justify-center mt-6 gap-16 xs:gap-40"
        data-aos="fade-up"
      >
        <div className="block max-w-[24rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
              className="rounded-t-lg"
              src="https://scontent.fpiu3-1.fna.fbcdn.net/v/t39.30808-6/295712560_589583056205582_1383286791742172981_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEfql0gtKeK1ZGzP86lAjuJ9mfwOignOFz2Z_A6KCc4XNO86fSMkMyTQt0vgbo4kisRS2VC13xxgSCGTooFSwpu&_nc_ohc=bCITUUx30NIAX_Y8fqk&_nc_ht=scontent.fpiu3-1.fna&oh=00_AfDJd9O5Q7yHeoj2vmTI2SFbcaQ-A6jqPELJ-cNrTyYGGQ&oe=653393E9"
              alt=""
            />
          </div>
          <div className="p-6">
            <p className="text-base text-black font-bold">Vison</p>
            <p className="text-base text-black">
              Nos visualizamos como la fuerza impulsora detrás del crecimiento y
              desarrollo de la industria de la construcción en Tambogrande,
              Piura y más allá. Ser reconocidos como el socio confiable y líder
              en la distribución de materiales de construcción, fomentando el
              crecimiento de nuestros clientes mientras trascendemos juntos a
              los desafíos del sector.
            </p>
          </div>
        </div>
        <div className="block max-w-[24rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
              className="rounded-t-lg"
              src="https://scontent.fpiu3-1.fna.fbcdn.net/v/t39.30808-6/359420738_814894317007787_9038403100605295779_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHsoR-v3O23ifkm246yBaCIcdaSakpcsldx1pJqSlyyVwUDYfpCcbBgJ47VtIpSpvziZWnl-d4dNkayh71vv5aR&_nc_ohc=2GibTZEqSlAAX9iVorY&_nc_ht=scontent.fpiu3-1.fna&oh=00_AfAubBZcBn8T5-ihjNajdWdJoIx7RA-Z-TR850wkkDWrTw&oe=6532DBFF"
              alt=""
            />
          </div>
          <div className="p-6">
            <p className="text-base text-black font-bold">Mision</p>
            <p className="text-base text-black">
              Impulsamos el éxito de nuestros clientes y el desarrollo
              constructivo en la región al proporcionar productos de calidad a
              precios accesibles desde proveedores confiables. Respaldamos
              proyectos y la formación de maestros constructores mediante
              servicios excepcionales y herramientas especializadas,
              contribuyendo al crecimiento sostenible. Al trabajar en conjunto,
              cultivamos vínculos estrechos y dinamizamos el progreso de nuestra
              comunidad local.
            </p>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center bottom-1">
        <section className="bg-white mt-10 " data-aos="fade-up">
          <div className="container px-6 py-12 mx-auto">
            <div>
              <p className="font-medium text-black">Contactanos</p>

              <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl ">
                Ferreteria Liviapoma
              </h1>

              <p className="mt-3 text-gray-800 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                molestias praesentium, aliquam ex eaque provident laudantium
                voluptatem doloribus, accusamus architecto amet. Dignissimos
                molestiae mollitia praesentium saepe atque illum quae laborum!.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>

                  <h2 className="mt-4 text-base font-medium text-gray-800">
                    Email
                  </h2>
                  <p className="mt-2 text-sm text-black">
                    Envias tus dudas y sugerencias
                  </p>
                  <p className="mt-2 text-sm text-blue-500 ">
                    ferretería@gmail.com
                  </p>
                </div>

                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </span>

                  <h2 className="mt-4 text-base font-medium text-gray-800">
                    Ubicanos
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Nos Ubicamos en :
                  </p>
                  <p className="mt-2 text-sm text-blue-500 ">
                    JR TUMBES MZA A LTE 8 A.H. BUENOS AIRES (FRENTE AL MERCADO)
                  </p>
                  <p className="mt-2 text-sm text-black font-bold ">
                    Tambogrande-Piura
                  </p>
                </div>

                <div>
                  <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </span>

                  <h2 className="mt-4 text-base font-medium text-gray-800 ">
                    Telefono
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 ">
                    Lun-Vier de 8am a 5pm.
                  </p>
                  <p className="mt-2 text-sm text-blue-500 ">
                    +(51) 999 999 999
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
                <iframe
                  width="100%"
                  height="100%"
                  title="map"
                  marginHeight={0}
                  marginWidth={0}
                  scrolling="no"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.806163493557!2d-80.34233080517421!3d-4.926244160107845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9035893e31e35f91%3A0x5f0a2b0427668629!2sFerreter%C3%ADa%20Liviapoma!5e0!3m2!1ses!2spe!4v1697480540633!5m2!1ses!2spe`}
                  frameBorder={0}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default index;