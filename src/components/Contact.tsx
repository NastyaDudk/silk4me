import { useState } from "react";
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

const API_URL = isLocal
  ? "https://localhost:5050/api/lead"
  : "https://silk4me-api.onrender.com/api/lead";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
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
  const validate = () => {
    const e: Errors = {};

    if (!formData.name.trim()) e.name = "Введіть імʼя";
    if (!formData.email.trim()) {
      e.email = "Введіть email";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      e.email = "Некоректний email";
    }
    if (!formData.phone.trim()) e.phone = "Введіть телефон";

    setErrors(e);
    return Object.keys(e).length === 0;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      toast.success("✅ Запит успішно надіслано!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("❌ Помилка. Спробуйте пізніше.");
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
            <div className="text-center lg:text-left space-y-3">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">
                Контакти
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-background">
                Отримайте <span className="text-gold">персональну консультацію</span>
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 max-w-[560px]"
              noValidate
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Ваше імʼя"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                  {errors.name && <p className="text-sm">{errors.name}</p>}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                  {errors.email && <p className="text-sm">{errors.email}</p>}
                </div>
              </div>

              <div>
                <Input
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      phone: e.target.value.replace(/[^\d+]/g, ""),
                    }))
                  }
                />
                {errors.phone && <p className="text-sm">{errors.phone}</p>}
              </div>

              <Textarea
                placeholder="Ваше повідомлення (необовʼязково)"
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Надсилання..." : "Надіслати"}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <div className="flex gap-6 text-background/80">
              <a href="https://instagram.com/silk4me" target="_blank">
                <Instagram />
              </a>
              <a href="mailto:Silkandnature@gmail.com">
                <Mail />
              </a>
              <div className="flex items-center gap-2">
                <MapPin /> Україна / Європа
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="hidden lg:block">
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
}