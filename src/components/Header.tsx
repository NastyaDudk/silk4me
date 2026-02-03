import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const FOREST = "#1f4c41";
const HEADER_H = 76;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Про нас", href: "#about" },
    {
      label: "Black Collection",
      href: "https://silk4.me/product-category/blck_collection/",
      external: true,
    },
    { label: "Ціни", href: "#pricing" },
    { label: "Відгуки", href: "#reviews" },
    { label: "Контакти", href: "#contact" },
  ];

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (itemOrHref: NavItem | string) => {
    const href = typeof itemOrHref === "string" ? itemOrHref : itemOrHref.href;

    const isExternal =
      typeof itemOrHref === "string"
        ? /^https?:\/\//i.test(href)
        : !!itemOrHref.external || /^https?:\/\//i.test(href);

    if (isExternal) {
      window.open(href, "_blank", "noopener,noreferrer");
      closeMenu();
      return;
    }

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    }
  };

  const linkClass =
    "uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-80";

  return (
    <>
      {/* TOP BAR */}
      <header
        className="
          fixed top-0 inset-x-0 z-50
          bg-white/75 backdrop-blur-lg
          border-b border-black/5
        "
        style={{ height: HEADER_H }}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center h-full">
            {/* LOGO — left */}
            <button
              type="button"
              onClick={() => go("#contact")}
              className="flex items-center gap-4 group"
              aria-label="Перейти до контактів"
            >
              <img
                src={logo}
                alt="Silk4me logo"
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />

              <span className="text-[28px] font-serif tracking-[0.35em] text-foreground leading-none">
                SILK<span style={{ color: FOREST }}>4</span>ME
              </span>
            </button>

            {/* DESKTOP NAV — pinned to right */}
            <nav className="hidden md:flex items-center gap-10 ml-auto">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[14px] ${linkClass}`}
                    style={{ color: FOREST }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => go(item)}
                    className={`text-[14px] ${linkClass}`}
                    style={{ color: FOREST }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              type="button"
              className="md:hidden ml-auto"
              onClick={toggleMenu}
              aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={isOpen}
              style={{ color: FOREST }}
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          {/* TOP LINE */}
          <div
            className="flex items-center justify-between px-6 border-b border-black/5"
            style={{ height: HEADER_H }}
          >
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Silk4me logo"
                className="h-11 w-11 object-contain"
                draggable={false}
              />
              <span className="text-[24px] font-serif tracking-[0.33em] text-foreground leading-none">
                SILK<span style={{ color: FOREST }}>4</span>ME
              </span>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Закрити меню"
              style={{ color: FOREST }}
            >
              <X size={32} />
            </button>
          </div>

          {/* CENTER MENU */}
          <nav
            className="flex flex-col items-center justify-center px-6 text-center"
            style={{ height: `calc(100vh - ${HEADER_H}px)` }}
          >
            <div className="flex flex-col gap-10">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-[18px] uppercase transition-opacity duration-300 hover:opacity-80"
                    style={{ color: FOREST, letterSpacing: "0.35em" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => go(item)}
                    className="text-[18px] uppercase transition-opacity duration-300 hover:opacity-80"
                    style={{ color: FOREST, letterSpacing: "0.35em" }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;