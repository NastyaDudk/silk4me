import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MapPin, Instagram, Mail } from "lucide-react";
import silkLifestyle from "@/assets/silk-lifestyle.jpg";

/* =========================
   API URL
========================= */
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const DEFAULT_API = isLocal
  ? "http://localhost:5050/api/lead"
  : "https://silk4me.onrender.com/api/lead";

const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API;

/* =========================
   TYPES
========================= */
type FormData = {
  name: string;
  phone: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================
     READ UTM FROM URL (once)
  ========================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFormData((prev) => ({
      ...prev,
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined,
    }));
  }, []);

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Будь ласка, заповніть ім’я та телефон.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      toast.success("✅ Запит надіслано! Ми звʼяжемося з вами найближчим часом.");
      setFormData((prev) => ({
        ...prev,
        name: "",
        phone: "",
        message: "",
      }));
    } catch {
      toast.error("Помилка з’єднання. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const email = "Silkandnature@gmail.com";

  return (
    <section id="contact" className="bg-silk-charcoal py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* HEADINGS */}
            <div className="text-center lg:text-left space-y-3">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">
                Контакти
              </p>

              <h2 className="text-3xl md:text-4xl font-serif font-light text-background">
                Отримайте{" "}
                <span className="text-gold">персональну консультацію</span>
              </h2>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 max-w-[560px] mx-auto lg:mx-0"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="h-14 bg-background"
                />

                <Input
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  className="h-14 bg-background"
                />
              </div>

              <Textarea
                placeholder="Ваше повідомлення (необов'язково)"
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                className="min-h-[170px] bg-background resize-none"
              />

              <div className="pt-2 flex justify-center lg:justify-start">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    px-12 h-14 text-lg md:text-xl
                    bg-[#E6C9A8] text-[#1F3D34]
                    hover:bg-[#EED7BD] transition-all
                    rounded-md
                  "
                >
                  {isSubmitting ? "Надсилання..." : "Надіслати запит"}
                  <Send className="w-5 h-5 ml-3" />
                </Button>
              </div>
            </form>

            {/* CONTACT LINKS */}
            <div className="pt-4 flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
              <a
                href="https://www.instagram.com/silk4me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-background/80 hover:text-gold"
              >
                <Instagram className="w-5 h-5" />
                Написати в Instagram
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-background/80 hover:text-gold"
              >
                <Mail className="w-5 h-5" />
                Написати на пошту
              </a>

              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" />
                Україна / Європа
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 border border-gold/20" />
            <img
              src={silkLifestyle}
              alt="Silk4me lifestyle"
              className="w-full h-[520px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;