import silkCollection from "@/assets/silk-collection.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-2 border border-primary/30" />
            <img
              src={silkCollection}
              alt="Silk4me Black Collection Items"
              className="relative w-full h-[500px] object-contain bg-foreground p-8"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary uppercase tracking-[0.3em] text-sm">Про колекцію</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
                Чорний шовк —<br />
                <span className="text-primary">позачасова елегантність</span>
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Black Collection від Silk4me — це втілення бездоганного смаку та вишуканості. 
                Кожен виріб створено з найкращого шовку mulberry найвищого ґатунку 6A, 
                що забезпечує неперевершену м'якість та довговічність.
              </p>
              <p>
                Чорний колір — це класика, яка ніколи не виходить з моди. Він підкреслює 
                розкіш матеріалу, додає елегантності кожному образу та ідеально вписується 
                в будь-який інтер'єр.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-2xl font-serif text-foreground">Mulberry</p>
                <p className="text-sm text-muted-foreground">Преміум шовк</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="text-2xl font-serif text-foreground">Україна</p>
                <p className="text-sm text-muted-foreground">Український бренд</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
