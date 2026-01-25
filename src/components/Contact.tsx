import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MapPin, Instagram, MessageCircle } from "lucide-react";
import silkLifestyle from "@/assets/silk-lifestyle.jpg";

// Лучше так: локально будет http://localhost:5050, на проде — свой домен
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api/lead";
const TG_BOT_URL = "https://t.me/silk4me_bot";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name || !phone) {
      toast.error("Будь ласка, заповніть ім’я та телефон.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        const details =
          data?.details?.description ||
          data?.details?.error ||
          data?.error ||
          "unknown_error";

        console.error("Lead submit error:", details, data);
        toast.error("Не вдалося надіслати запит. Спробуйте ще раз.");
        return;
      }

      toast.success("✅ Запит надіслано! Ми звʼяжемося з вами найближчим часом.");
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Помилка з’єднання. Перевірте, чи запущено сервер.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">
                Контакти
              </p>

              <h2 className="text-3xl md:text-4xl font-serif font-light text-background">
                Отримайте{" "}
                <span className="text-gold">персональну консультацію</span>
              </h2>

              <p className="text-background/80">
                Заповніть форму — заявка одразу надходить у Telegram.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground h-12"
                />

                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground h-12"
                />
              </div>

              <Textarea
                placeholder="Ваше повідомлення (необов'язково)"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground min-h-[120px] resize-none"
              />

              <Button
                type="submit"
                variant="luxury"
                size="lg"
                className="w-full md:w-auto bg-gold text-accent-foreground hover:bg-gold-light border-gold hover:border-gold-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Надсилання..." : "Надіслати запит"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-background/20 items-center">
              {/* Только иконка Telegram */}
              <a
  href={TG_BOT_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 group"
>
  <MessageCircle className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
  <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors">
    Написати в Telegram
  </span>
</a>

              <a
                href="https://www.instagram.com/silk4me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Instagram className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors">
                  Написати в Instagram
                </span>
              </a>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-sm text-background/80">
                  Україна / Європа
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 border border-gold/20" />
            <img
              src={silkLifestyle}
              alt="Silk4me Lifestyle"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
