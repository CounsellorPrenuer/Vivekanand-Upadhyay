import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/917030502200"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
      style={{ "--tw-shadow-color": "rgba(34, 197, 94, 0.5)" } as React.CSSProperties}
      data-testid="button-floating-whatsapp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
