import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MapPin, Instagram, Mail } from "lucide-react";
import silkLifestyle from "@/assets/silk-lifestyle.jpg";

// Локально -> localhost, в проде -> Render
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const DEFAULT_API = isLocal
  ? "http://localhost:5050/api/lead"
  : "https://silk4me.onrender.com/api/lead";

const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API;

type LeadPayload = {
  name: string;
  phone: string;
  message?: string;
};

type ApiResponse = {
  ok?: boolean;
  success?: boolean;
  error?: string;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name || !phone) {
      toast.error("Будь ласка, заповніть ім’я та телефон.");
      return;
    }

    const payload: LeadPayload = {
      name,
      phone,
      ...(message ? { message } : {}),
    };

    setIsSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Render/сервер иногда возвращает не-JSON на ошибках — читаем безопасно
      const raw = await res.text().catch(() => "");
      let data: ApiResponse | null = null;

      try {
        data = raw ? (JSON.parse(raw) as ApiResponse) : null;
      } catch {
        data = null;
      }

      const ok = res.ok && (data?.ok === true || data?.success === true);

      if (!ok) {
        console.error("Lead submit error:", res.status, raw);
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

  const email = "Silkandnature" + "@gmail.com"; // чуть меньше спама, чем явный mailto

  return (
    <section id="contact" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT: Form */}
          <div className="flex flex-col justify-between h-full space-y-8">
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
              {/* Имя + телефон */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground h-12"
                />

                <Input
                  type="tel"
                  inputMode="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground h-12"
                />
              </div>

              {/* Отступ перед текстовым полем */}
              <div className="pt-4">
                <Textarea
                  placeholder="Ваше повідомлення (необов'язково)"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground min-h-[160px] resize-none"
                />
              </div>

              {/* Отступ перед кнопкой */}
              <div className="pt-4">
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
              </div>
            </form>

            {/* Contact Info (mobile center, desktop normal) */}
            <div
              className="
                flex flex-col items-center text-center gap-6 pt-8
                md:flex-row md:flex-wrap md:items-center md:text-left md:gap-10
              "
            >
              {/* Instagram */}
              <a
                href="https://www.instagram.com/silk4me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Instagram className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors">
                  Написати в Instagram
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Mail className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors">
                  Написати на пошту
                </span>
              </a>

              {/* Location — не кликабельно */}
              <div className="flex items-center gap-3 cursor-default">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-sm text-background/80">
                  Україна / Європа
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Image — НЕ ТРОГАЕМ */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 border border-gold/20" />
            <img
              src={silkLifestyle}
              alt="Silk4me Lifestyle"
              className="w-full h-[560px] object-cover object-center"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


