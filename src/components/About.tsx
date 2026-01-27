import silkCollection from "@/assets/silk-collection.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-2 border border-gold/30" />
            <img
              src={silkCollection}
              alt="Silk4me Black Collection Items"
              className="relative w-full h-[500px] object-contain bg-background p-8"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">Про колекцію</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-background">
                Чорний шовк —<br />
                <span className="text-gold">позачасова елегантність</span>
              </h2>
            </div>

            <div className="space-y-6 text-background/80 leading-relaxed">
              <p>
              Поза трендами. Поза поясненнями. Завжди впевнений. Завжди актуальний.
              Чорний колір.Саме тому BLCK колекція [від англійського black – чорний]  – наші бестселери. 
              І саме зараз на всі чорні вироби SILK4ME діє знижка -15% за промокодом BLCK-15. 
              
              </p>
              Встигни, адже пропозиція обмежена наявними виробами.
              Для отримання знижки на товари з колекції 
              додай промокод BLCK-15 у кошику з товарами.  
              <p>
                Чорний колір додає виробам стриманої елегантності та робить їх практичними для щоденного використання — вдома, у подорожах чи як частину подарунка.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-gold pl-4">
                <p className="text-2xl font-serif text-background">Mulberry</p>
                <p className="text-sm text-background/70">Преміум шовк</p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <p className="text-2xl font-serif text-background">Україна</p>
                <p className="text-sm text-background/70">Український бренд</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
