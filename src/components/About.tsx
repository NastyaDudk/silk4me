import silkCollection from "@/assets/silk-collection.jpg";

const About = () => {
  return (
    <section
      id="about"
      className="bg-silk-charcoal py-12 sm:py-14 lg:py-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Image */}
          <div className="relative">
            <div className="inline-block border-2 border-gold/50 p-2">
              <img
                src={silkCollection}
                alt="Silk4me Black Collection Items"
                className="
                  block
                  w-full
                  h-[420px]
                  sm:h-[480px]
                  lg:h-[560px]
                  object-cover
                  object-[72%_center]
                "
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10">

            {/* Headings */}
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">
                Про колекцію
              </p>

              <h2 className="text-4xl md:text-5xl font-serif font-light text-background leading-tight">
                Чорний шовк —<br />
                <span className="text-gold">позачасова елегантність</span>
              </h2>
            </div>

            {/* Text — УВЕЛИЧЕН */}
            <div className="space-y-7 text-background/80 leading-relaxed text-xl lg:text-[1.35rem]">
              <p>
                Поза трендами. Поза поясненнями. Завжди впевнений. Завжди актуальний.
                Чорний колір. Саме тому BLCK колекція — наші бестселери.
              </p>

              <p>
                Саме зараз на всі чорні вироби SILK4ME діє знижка -15% за промокодом
                <strong className="text-background"> BLCK-15</strong>.
                Пропозиція обмежена.
              </p>

              <p>
                Чорний колір додає виробам стриманої елегантності та робить їх
                практичними для щоденного використання — вдома, у подорожах чи як
                частину подарунка.
              </p>
            </div>

            {/* Facts */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="border-l-2 border-gold pl-4">
                <p className="text-3xl font-serif text-background">
                  Mulberry
                </p>
                <p className="text-base text-background/70">
                  Преміум шовк
                </p>
              </div>

              <div className="border-l-2 border-gold pl-4">
                <p className="text-3xl font-serif text-background">
                  Україна
                </p>
                <p className="text-base text-background/70">
                  Український бренд
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;