"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export default function MortgageCalculator() {
  const [price, setPrice] = useState(500000);
  const [deposit, setDeposit] = useState(50000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);

  const loan = price - deposit;
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const monthly =
    loan > 0 && monthlyRate > 0
      ? (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : loan / months;

  return (
    <div className="rounded-sm border border-kingswell-gold/30 bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-kingswell-gold" />
        <h3 className="font-serif text-xl text-kingswell-green">
          Mortgage Calculator
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Property price (£)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 w-full rounded-sm border border-gray-200 px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Deposit (£)</label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="mt-1 w-full rounded-sm border border-gray-200 px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Interest rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full rounded-sm border border-gray-200 px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Term (years)</label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="mt-1 w-full rounded-sm border border-gray-200 px-4 py-2"
          />
        </div>
      </div>

      <div className="mt-6 rounded-sm bg-kingswell-green p-4 text-center text-white">
        <p className="text-sm text-white/70">Estimated monthly payment</p>
        <p className="font-serif text-3xl text-kingswell-gold">
          £{monthly.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
        </p>
        <p className="mt-1 text-xs text-white/50">
          Indicative only — speak to our team for mortgage advice
        </p>
      </div>
    </div>
  );
}
