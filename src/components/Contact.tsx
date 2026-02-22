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
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const API_URL =
  import.meta.env.VITE_API_URL ||
  (isLocal
    ? "http://localhost:5050/api/lead"
    : "https://silk4me.onrender.com/api/lead");

/* =========================
   TYPES
========================= */
type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

/* =========================
   EMAIL REGEX
========================= */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================
     VALIDATION
  ========================= */
  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Будь ласка, введіть імʼя";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Будь ласка, введіть email";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Введіть коректну електронну адресу";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Будь ласка, введіть телефон";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      toast.success("✅ Запит успішно надіслано!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch {
      toast.error("Сталася помилка. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h2 className="text-3xl md:text-4xl font-serif text-background">
                Отримайте{" "}
                <span className="text-gold">персональну консультацію</span>
              </h2>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 max-w-[560px] mx-auto lg:mx-0"
              noValidate
            >
              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Ваше імʼя"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="h-14 bg-background"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-background/70">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    className="h-14 bg-background"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-background/70">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* PHONE */}
<div>
  <Input
    placeholder="Телефон"
    inputMode="tel"
    value={formData.phone}
    onChange={(e) => {
      const sanitized = e.target.value.replace(/[^\d+]/g, "");
      setFormData((p) => ({ ...p, phone: sanitized }));
    }}
    className="h-14 bg-background"
  />

  {errors.phone && (
    <p className="mt-1 text-sm text-background/70">
      {errors.phone}
    </p>
  )}
</div>

              {/* MESSAGE */}
              <Textarea
                placeholder="Ваше повідомлення (необовʼязково)"
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                className="min-h-[170px] bg-background resize-none"
              />

              {/* BUTTON */}
              <div className="pt-2 flex justify-center lg:justify-start">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    px-12 h-14 text-lg
                    bg-[#E6C9A8] text-[#1F3D34]
                    hover:bg-[#EED7BD]
                    transition-all duration-300
                    rounded-md
                  "
                >
                  {isSubmitting ? "Надсилання..." : "Надіслати запит"}
                  <Send className="w-5 h-5 ml-3" />
                </Button>
              </div>
            </form>

            {/* LINKS */}
            <div className="pt-4 flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
              <a
                href="https://www.instagram.com/silk4me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-background/80 hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>

              <a
                href="mailto:Silkandnature@gmail.com"
                className="flex items-center gap-3 text-background/80 hover:text-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>

              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" />
                Україна / Європа
              </div>
            </div>
          </div>

          {/* IMAGE */}
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