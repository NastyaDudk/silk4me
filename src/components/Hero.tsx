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
    <section
      className="
        relative min-h-screen overflow-hidden
        pt-24 sm:pt-28 lg:pt-24
        pb-14 sm:pb-16 lg:pb-10
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* lg:items-stretch — чтобы низ/верх слева и справа совпадали визуально */}
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:items-stretch">
          {/* TEXT */}
          <div className="animate-fade-in flex flex-col h-full">
            {/* TOP CONTENT */}
            <div className="space-y-7">
              {/* Заголовок — чуть выше (меньше воздуха сверху) */}
              <div className="space-y-2 -mt-1">
                <button
                  type="button"
                  onClick={goToCollection}
                  className="text-left group"
                  aria-label="Перейти до Black Collection"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                    BLCK Kолекція
                  </h1>
                </button>
              </div>

              <p className="text-muted-foreground text-xl leading-relaxed max-w-xl whitespace-pre-line">
                {`Основа твоєї молодості і краси без зусиль.
Основа здорового сну.
Основа моменту «нарешті для себе».

Коли чорний заспокоює, а шовк піклується.`}
              </p>

              {/* PROMO */}
              <div
                className="
                  mt-5 flex flex-col items-center text-center gap-3
                  sm:flex-row sm:items-center sm:text-left sm:justify-start sm:gap-4
                "
              >
                <span className="text-sm tracking-[0.25em] uppercase text-foreground">
                  Знижка за промокодом
                </span>

                <span
                  className="
                    rounded-lg
                    border border-primary/40
                    bg-primary/10
                    px-5 py-2
                    text-sm font-semibold
                    tracking-[0.3em] uppercase
                    text-primary
                  "
                >
                  {PROMO_CODE}
                </span>
              </div>

              {/* BUTTONS — чуть ниже */}
              <div
                className="
                  flex flex-col items-center gap-4 pt-8
                  sm:flex-row sm:items-start sm:justify-start
                "
              >
                <Button
                  variant="luxury"
                  size="lg"
                  onClick={scrollToContact}
                  className="w-full max-w-[320px] text-center sm:w-[320px]"
                >
                  Отримати консультацію
                </Button>

                <Button
                  variant="luxuryOutline"
                  size="lg"
                  onClick={goToCollection}
                  className="w-full max-w-[320px] text-center sm:w-[320px]"
                >
                  Переглянути колекцію
                </Button>
              </div>
            </div>

            {/* STATS — прижимаем вниз + немного больше воздуха снизу */}
            <div className="mt-auto pt-10 pb-2">
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

            {/* SEO block */}
            <div className="sr-only">
              <h2>Black Collection Silk4me — вироби з натурального шовку Mulberry 6A</h2>

              <p>
                Black Collection від Silk4me включає: рушник для обличчя, шовковий твістер,
                шовкові резинки (максі, міді, міні), шовкову майку, шовкові шорти,
                шовкову маску для сну, тюрбан із шовку, шовкову наволочку та шовкову піжаму.
              </p>

              <h3>Чорна шовкова піжама Silk4me</h3>
              <p>
                Чорна шовкова піжама Silk4me виготовлена з натурального шовку Mulberry 6A.
                Піжама входить до Black Collection та підходить для щоденного сну.
              </p>

              <p>
                22 momme — це показник щільності шовку (мом), який впливає на зносостійкість
                та відчуття тканини під час сну.
              </p>

              <p>
                Перейдіть до повної колекції за посиланням: https://silk4.me/product-category/blck_collection/
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative hidden lg:block h-full">
            <div className="relative h-full">
              {/* рамка ближе и чуть жирнее */}
              <div className="border-[3px] border-border/70 p-[4px] h-full">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={silkModel}
                    alt="Silk4me Black Collection"
                    className="w-full h-[600px] object-cover object-[50%_32%]"
                    draggable={false}
                  />

                  <a
                    href={PAJAMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      absolute
                      left-[8%]
                      top-[70%]
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
              </div>
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
