"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  Trash2,
  ChevronDown,
  ChevronUp,
  Inbox,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import type { LeadFormType, LeadSubmission } from "@/lib/types";
import { leadFormTypeLabel } from "@/lib/lead-labels";

const FILTER_OPTIONS: { value: "all" | LeadFormType; label: string }[] = [
  { value: "all", label: "All enquiries" },
  { value: "enquiry", label: "Contact" },
  { value: "valuation", label: "Valuation" },
  { value: "viewing", label: "Viewing" },
  { value: "landlord", label: "Landlord" },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-gray-800">{value}</dd>
    </div>
  );
}

function LeadCard({
  lead,
  onDelete,
}: {
  lead: LeadSubmission;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `Delete enquiry from ${lead.firstName} ${lead.lastName}? This cannot be undone.`
      )
    ) {
      return;
    }
    setDeleting(true);
    const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(lead.id)}`, {
      method: "DELETE",
    });
    if (res.ok) onDelete(lead.id);
    setDeleting(false);
  };

  return (
    <article className="rounded-sm border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-kingswell-green/10 px-2 py-0.5 text-xs font-medium text-kingswell-green">
              {leadFormTypeLabel(lead.formType)}
            </span>
            <time className="text-xs text-gray-500">{formatDate(lead.receivedAt)}</time>
          </div>
          <h2 className="mt-2 font-serif text-lg text-kingswell-green">
            {lead.firstName} {lead.lastName}
          </h2>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-1 hover:text-kingswell-green"
            >
              <Mail className="h-3.5 w-3.5 text-kingswell-gold" />
              {lead.email}
            </a>
            <a
              href={`tel:${lead.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1 hover:text-kingswell-green"
            >
              <Phone className="h-3.5 w-3.5 text-kingswell-gold" />
              {lead.phone}
            </a>
          </div>
          {lead.message && !expanded && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{lead.message}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 rounded-sm border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-kingswell-gold"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" /> Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> Details
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-sm border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
            title="Delete enquiry"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <dl className="grid gap-4 border-t border-gray-100 bg-gray-50/50 p-5 sm:grid-cols-2">
          <DetailRow label="Property" value={lead.propertyTitle} />
          <DetailRow label="Address" value={lead.address} />
          <DetailRow label="Property type" value={lead.propertyType} />
          <DetailRow label="Intent" value={lead.intent} />
          <DetailRow label="Service" value={lead.service} />
          {lead.message && (
            <div className="sm:col-span-2">
              <DetailRow label="Message" value={lead.message} />
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | LeadFormType>("all");

  const loadLeads = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/leads")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setLeads)
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const filtered = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((l) => l.formType === filter);
  }, [leads, filter]);

  const removeLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <AdminShell title="Form Enquiries">
      <p className="mb-6 max-w-2xl text-gray-600">
        Every contact, valuation, viewing, and landlord form submission from the
        website appears here. Enquiries are still emailed to your inbox when email
        is configured.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Inbox className="h-5 w-5 text-kingswell-gold" />
        <span className="text-sm text-gray-600">
          {loading ? "Loading…" : `${leads.length} total enquiry${leads.length !== 1 ? "ies" : ""}`}
        </span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="ml-auto rounded-sm border border-gray-200 px-3 py-2 text-sm focus:border-kingswell-gold focus:outline-none"
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading enquiries…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-sm border border-dashed border-gray-300 bg-white p-12 text-center">
          <Inbox className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 font-serif text-lg text-kingswell-green">No enquiries yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Submissions from the contact page, valuation form, property viewings,
            and landlord page will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onDelete={removeLead} />
          ))}
        </div>
      )}
    </AdminShell>
  );
}
