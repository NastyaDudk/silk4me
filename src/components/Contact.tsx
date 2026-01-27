import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MapPin, Instagram, Mail, MessageCircle } from "lucide-react";
import silkLifestyle from "@/assets/silk-lifestyle.jpg";

const TG_BOT_URL = "https://t.me/silk4me_bot";

// Локально -> localhost, в проде -> Render
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const DEFAULT_API = isLocal
  ? "http://localhost:5050/api/lead"
  : "https://silk4me.onrender.com/api/lead";

const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API;

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
          `http_${res.status}`;

        console.error("Lead submit error:", details, data);
        toast.error("Не вдалося надіслати запит. Спробуйте ще раз.");
        return;
      }

      toast.success("✅ Запит надіслано! Ми звʼяжемося з вами найближчим часом.");
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Помилка з’єднання. Перевірте сервер або Render.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
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
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* БОЛЬШЕ ОТСТУП после 2 полей */}
              <div className="grid md:grid-cols-2 gap-4 mb-3">
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

              {/* БОЛЬШЕ ОТСТУП перед кнопкой */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="luxury"
                  size="lg"
                  className="w-full md:w-auto bg-gold text-accent-foreground hover:bg-gold-light border-gold hover:border-gold-light"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Надсилання..." : "Надіслати запит"}
                  {/* иконку НЕ трогаем */}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>

            {/* Contact Info — В ОДИН РЯД */}
            <div className="pt-8 border-t border-background/20">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <a
                  href="https://www.instagram.com/silk4me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <Instagram className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                  <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors whitespace-nowrap">
                    Написати в Instagram
                  </span>
                </a>

                <a
                  href="mailto:Silkandnature@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <Mail className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                  <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors whitespace-nowrap">
                    Написати на пошту
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-sm text-background/80 whitespace-nowrap">
                    Україна / Європа
                  </span>
                </div>

                {/* если Telegram нужен — просто раскомментируй */}
                {/*
                <a
                  href={TG_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <MessageCircle className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                  <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors whitespace-nowrap">
                    Написати в Telegram
                  </span>
                </a>
                */}
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