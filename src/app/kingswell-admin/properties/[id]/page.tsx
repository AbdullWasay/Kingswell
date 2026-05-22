"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyEditor from "@/components/admin/PropertyEditor";
import type { Property } from "@/lib/types";

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetch("/api/admin/content/properties")
      .then((r) => r.json())
      .then((list: Property[]) => {
        setProperty(list.find((p) => p.id === id) || null);
      });
  }, [id]);

  if (!property) {
    return <p className="p-8">Loading...</p>;
  }

  return <PropertyEditor initial={property} />;
}
