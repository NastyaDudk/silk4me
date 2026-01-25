import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Phone, MapPin, Instagram } from "lucide-react";
import silkLifestyle from "@/assets/silk-lifestyle.jpg";

interface FormSubmission {
  id: string;
  name: string;
  phone: string;
  message: string;
  timestamp: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store submission in localStorage for visibility
    const submission: FormSubmission = {
      id: crypto.randomUUID(),
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };
    
    const existingSubmissions = JSON.parse(localStorage.getItem('silk4me_submissions') || '[]');
    existingSubmissions.push(submission);
    localStorage.setItem('silk4me_submissions', JSON.stringify(existingSubmissions));
    
    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Дякуємо! Ми зв'яжемося з вами через Instagram або телефон.");
    setFormData({ name: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.3em] text-sm">Контакти</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-background">
                Отримайте <span className="text-gold">персональну консультацію</span>
              </h2>
              <p className="text-background/80">
                Заповніть форму, і наш консультант зв'яжеться з вами для підбору ідеального варіанту.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground h-12"
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background text-foreground border-border/50 focus:border-gold placeholder:text-muted-foreground h-12"
                />
              </div>
              <Textarea
                placeholder="Ваше повідомлення (необов'язково)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-background/20">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-sm text-background/80">+380 XX XXX XX XX</span>
              </div>
              <a 
                href="https://www.instagram.com/silk4me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Instagram className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                <span className="text-sm text-background/80 group-hover:text-gold-light transition-colors">Написати в Instagram</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-sm text-background/80">Київ, Україна</span>
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
