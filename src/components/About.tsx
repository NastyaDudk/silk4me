import silkCollection from "@/assets/silk-collection.jpg";

const About = () => {
  return (
    <section
      id="about"
      className="bg-silk-charcoal pt-20 pb-24"
    >
      <div className="container mx-auto px-6">
        {/* ВАЖНО: items-start для идеального выравнивания */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* IMAGE */}
          <div className="relative">
            {/* Рамка плотнее и аккуратнее */}
            <div className="inline-block border-2 border-gold/60 p-2">
              <img
                src={silkCollection}
                alt="Silk4me Black Collection Items"
                className="
                  block
                  w-full
                  h-[460px]
                  sm:h-[520px]
                  lg:h-[600px]
                  object-cover
                  object-[72%_center]
                "
                draggable={false}
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col">

            {/* Headings */}
            <div className="mb-10">
              <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
                Про колекцію
              </p>

              <h2 className="text-4xl md:text-5xl font-serif font-light text-background leading-tight">
                Чорний шовк —<br />
                <span className="text-gold">позачасова елегантність</span>
              </h2>
            </div>

            {/* Text */}
            <div className="space-y-6 text-background/80 text-lg leading-[1.75] max-w-xl">
              <p>
                Поза трендами. Поза поясненнями. Завжди впевнений. Завжди актуальний.
                Чорний колір. Саме тому BLCK колекція — наші бестселери.
              </p>

              <p>
                Саме зараз на всі{" "}
                <span className="text-background">
                  чорні вироби Silk4me
                </span>{" "}
                діє знижка -15% за{" "}
                <span className="text-gold font-medium">
                  промокодом BLCK-15
                </span>.
                Пропозиція обмежена.
              </p>

              <p>
                Чорний колір додає виробам стриманої елегантності та робить їх
                практичними для щоденного використання — вдома, у подорожах чи як
                частину подарунка.
              </p>
            </div>

            {/* Facts — этот блок задаёт НИЗ, совпадающий с рамкой */}
           {/* Facts */}
             <div className="mt-20 grid grid-cols-2 gap-10">
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