import type { LeadFormType } from "./types";

export function leadFormTypeLabel(type: LeadFormType): string {
  const labels: Record<LeadFormType, string> = {
    valuation: "Valuation request",
    viewing: "Viewing request",
    enquiry: "Contact enquiry",
    landlord: "Landlord enquiry",
  };
  return labels[type] || type;
}
