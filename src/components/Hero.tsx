import { Button } from "@/components/ui/button";
import silkModel from "@/assets/silk-model.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-silk-charcoal" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <p className="text-primary uppercase tracking-[0.3em] text-sm font-light">
                Ексклюзивна колекція
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-foreground">
                Black
                <span className="block text-primary">Collection</span>
              </h1>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Відкрийте для себе розкіш натурального шовку. 100% шовк найвищої якості, 
              створений для тих, хто цінує елегантність та бездоганний стиль.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="luxury" 
                size="xl"
                onClick={scrollToContact}
              >
                Отримати консультацію
              </Button>
              <Button 
                variant="luxuryOutline" 
                size="xl"
                onClick={() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" })}
              >
                Переглянути колекцію
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl font-serif text-primary">100%</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Натуральний шовк</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-primary">6A</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Найвища якість</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-primary">22</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Momme щільність</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-sm" />
            <img
              src={silkModel}
              alt="Silk4me Black Collection"
              className="relative w-full h-[600px] object-cover object-top"
            />
            <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm p-6 border border-border/50">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Новинка сезону</p>
              <p className="text-lg font-serif text-foreground">Шовкова піжама Black Edition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary" />
      </div>
    </section>
  );
};

export default Hero;
