"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface LeadFormProps {
  type: "valuation" | "viewing" | "enquiry" | "landlord";
  propertyTitle?: string;
  className?: string;
}

export default function LeadForm({
  type,
  propertyTitle,
  className = "",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: type, propertyTitle }),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`rounded-sm bg-kingswell-green/10 p-8 text-center ${className}`}>
        <p className="font-serif text-xl text-kingswell-green">
          Thank you! We&apos;ll be in touch shortly.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          A member of our team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="firstName"
          required
          placeholder="First name *"
          className="rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
        />
        <input
          name="lastName"
          required
          placeholder="Last name *"
          className="rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
        />
      </div>
      <input
        name="email"
        type="email"
        required
        placeholder="Email address *"
        className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="Phone number *"
        className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
      />

      {type === "valuation" && (
        <>
          <input
            name="address"
            required
            placeholder="Property address *"
            className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
          />
          <select
            name="propertyType"
            required
            className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
          >
            <option value="">Property type *</option>
            <option value="house">House</option>
            <option value="flat">Flat / Apartment</option>
            <option value="bungalow">Bungalow</option>
            <option value="other">Other</option>
          </select>
          <select
            name="intent"
            className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
          >
            <option value="sell">Looking to sell</option>
            <option value="let">Looking to let</option>
            <option value="both">Sell or let</option>
          </select>
        </>
      )}

      {type === "landlord" && (
        <select
          name="service"
          required
          className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
        >
          <option value="">Service required *</option>
          <option value="fully-managed">Fully Managed</option>
          <option value="tenant-find">Tenant Find Only</option>
          <option value="rent-collection">Rent Collection</option>
        </select>
      )}

      <textarea
        name="message"
        rows={4}
        placeholder="Additional details (optional)"
        className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {status === "loading" ? "Sending..." : "Submit Enquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please call us or try WhatsApp.
        </p>
      )}

      <p className="text-xs text-gray-500">
        By submitting, you agree to our privacy policy. Your data will be sent to
        our CRM and email systems.
      </p>
    </form>
  );
}
