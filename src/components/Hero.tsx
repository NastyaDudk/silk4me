import { Button } from "@/components/ui/button";
import silkModel from "@/assets/silk-model.jpg";

const COLLECTION_URL = "https://silk4.me/product-category/blck_collection/";
const PAJAMA_URL = "https://silk4.me/shop_ua/silk_set_blck_ua/";
const PROMO_CODE = "BLCK-15";

const Hero = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToCollection = () => {
    window.open(COLLECTION_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen flex items-center pt-12 lg:pt-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div className="space-y-7 animate-fade-in">
            <div className="space-y-3">
              <p className="uppercase tracking-[0.3em] text-sm text-foreground/70">
                Ексклюзивна колекція
              </p>

              <button
                type="button"
                onClick={goToCollection}
                className="text-left group"
                aria-label="Перейти до Black Collection"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                  BLCK Collection
                </h1>
              </button>
            </div>

            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl whitespace-pre-line">
              {`Основа твоєї молодості і краси без зусиль.
Основа здорового сну.
Основа моменту «нарешті для себе».

Коли чорний заспокоює, а шовк піклується.`}
            </p>

            {/* PROMO — label same color as title + premium framed code */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-sm tracking-[0.25em] uppercase text-foreground">
                Знижка за промокодом
              </span>

              <span className="
              rounded-lg
              border border-primary/40
              bg-primary/10
              px-5 py-2
              text-sm font-semibold
              tracking-[0.3em] uppercase
              text-primary
                ">
              {PROMO_CODE}
              </span>
              </div>

            {/* BUTTONS — wider paddings, never wrap, same width */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="luxury"
                size="lg"
                onClick={scrollToContact}
                className="w-[320px] px-7 whitespace-nowrap text-center"
              >
                Отримати консультацію
              </Button>

              <Button
                variant="luxuryOutline"
                size="lg"
                onClick={goToCollection}
                className="w-[320px] px-7 whitespace-nowrap text-center"
              >
                Переглянути колекцію
              </Button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border/50 max-w-xl">
              <div className="text-center">
                <div className="text-4xl font-medium text-foreground">100%</div>
                <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  натуральний шовк
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-medium text-foreground">6A</div>
                <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  найвища якість
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-medium text-foreground">22</div>
                <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  momme
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />

            <div className="relative overflow-hidden">
              <img
                src={silkModel}
                alt="Silk4me Black Collection"
                className="w-full h-[600px] object-cover object-top"
                draggable={false}
              />

              <a
                href={PAJAMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  absolute
                  left-[8%]
                  top-[72%]
                  bg-background/90 backdrop-blur-sm
                  border border-border/50
                  px-6 py-4
                  max-w-[360px]
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                "
                style={{ animation: "badge-float 3.6s ease-in-out infinite" }}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 text-center">
                  Хіт продажу
                </p>
                <p className="text-lg font-serif text-foreground">
                  Шовкова піжама Black Edition
                </p>
                <p className="mt-2 text-xs underline underline-offset-4 text-muted-foreground">
                  Перейти до товару
                </p>
              </a>
            </div>

            <style>{`
              @keyframes badge-float {
                0% { transform: translate(0,0); }
                50% { transform: translate(40px, -10px); }
                100% { transform: translate(0,0); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;