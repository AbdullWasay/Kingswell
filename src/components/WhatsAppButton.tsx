"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export default function WhatsAppButton({
  message,
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-4 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 sm:right-6 ${className}`}
      aria-label="Contact us on WhatsApp"
      title="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
