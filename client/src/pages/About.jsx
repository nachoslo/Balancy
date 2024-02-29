function About() {
  return (
    <section
      id="about"
      className="absolute left-0 -top-screen px-4 w-full py-12 flex flex-col justify-center items-center gap-20 bg-black md:py-28 md:flex-row md:gap-32 md:px-32 md:text-base 2xl:text-lg 2xl:px-96"
    >
      <div className="text-center w-full flex flex-col justify-center items-center gap-4 md:gap-8">
        <h2 className="text-nowrap text-2xl md:text-4xl">
          ¿Cómo surge <span className="font-bold text-pink-700">Balancy</span>?
        </h2>
        <p>
          Balancy surge de la necesidad de tener un mejor control y organización
          de nuestras billeteras virtuales y datos bancarios.
        </p>
      </div>
      <div className="text-center w-full flex flex-col justify-center items-center gap-4 md:gap-8">
        <h2 className="font-bold text-pink-700 text-2xl md:text-4xl">Problemática</h2>
        <p>
          Con la utilizacíon y creación de diversas billeteras virtuales y
          cuentas online, muchas veces nos encontramos con la dificultad de
          obtener nuestros datos de forma rápida y clara debido a que tanto los
          métodos de autenticación, como las rutas para solicitar nuestros datos
          dentro de las distintas cuentas, son diferentes.
        </p>
      </div>
    </section>
  );
}

export default About;
