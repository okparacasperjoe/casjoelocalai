import React, { useState } from 'react';
import { CreditCard, FileText, Plus, DollarSign, ArrowUpRight, CheckCircle2, Clock, Sparkles, Trash2 } from 'lucide-react';
import { deleteInvoice } from '../db/hooks';

export default function FinanceView({ invoices, onOpenCreateInvoice }) {
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');

  const getCurrencySymbol = (curr) => {
    switch (curr) {
      case 'NGN': return '₦';
      case 'KES': return 'KSh ';
      case 'GHS': return 'GHS ';
      case 'ZAR': return 'R';
      default: return '$';
    }
  };

  const convertAndFormat = (amountNgn) => {
    // Rough mock exchange rates against NGN base
    const rates = {
      NGN: 1,
      KES: 0.081,
      GHS: 0.0095,
      ZAR: 0.012,
      USD: 0.00063
    };
    
    const converted = amountNgn * rates[selectedCurrency];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(converted);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0E1629] border border-white/10 p-6 rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold font-['Outfit'] text-white">Finance & Invoicing Engine</h2>
          <p className="text-sm text-slate-400">Offline tax compliance, multi-currency invoicing, and local profit auditing</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="custom-select text-xs font-bold"
          >
            <option value="NGN">₦ NGN (Naira)</option>
            <option value="KES">KSh KES (Shilling)</option>
            <option value="GHS">GHS (Cedi)</option>
            <option value="ZAR">ZAR (Rand)</option>
            <option value="USD">$ USD (Dollar)</option>
          </select>

          <button
            onClick={onOpenCreateInvoice}
            className="btn-primary text-xs py-2.5 px-4"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0E1629] border border-white/10 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-medium text-slate-400">Total Invoiced (This Month)</span>
          <div className="text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-white">
            {getCurrencySymbol(selectedCurrency)}{convertAndFormat(12400000)}
          </div>
          <span className="text-xs text-emerald-400 font-semibold">+18.5% vs last month</span>
        </div>

        <div className="bg-[#0E1629] border border-white/10 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-medium text-slate-400">Collected Revenue</span>
          <div className="text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-emerald-400">
            {getCurrencySymbol(selectedCurrency)}{convertAndFormat(9800000)}
          </div>
          <span className="text-xs text-slate-400">Paid into local accounts</span>
        </div>

        <div className="bg-[#0E1629] border border-white/10 p-5 rounded-2xl space-y-2">
          <span className="text-xs font-medium text-slate-400">Pending Receivables</span>
          <div className="text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-amber-400">
            {getCurrencySymbol(selectedCurrency)}{convertAndFormat(2600000)}
          </div>
          <span className="text-xs text-amber-400 font-semibold">2 Invoices Due</span>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-[#0E1629] border border-white/10 rounded-2xl overflow-hidden shadow-xl space-y-4">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-white font-['Outfit'] text-base">Invoices Ledger</h3>
          <span className="text-xs text-slate-400 font-mono">100% Stored Locally</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080C18] text-slate-400 font-bold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-5">Invoice ID</th>
                <th className="py-3.5 px-5">Customer / Client</th>
                <th className="py-3.5 px-5">Description</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Issue Date</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-amber-400">{inv.id}</td>
                  <td className="py-4 px-5 font-semibold text-white">{inv.customer}</td>
                  <td className="py-4 px-5 text-slate-400">{inv.items}</td>
                  <td className="py-4 px-5 font-extrabold text-white font-['Outfit'] text-sm">{inv.amount}</td>
                  <td className="py-4 px-5 font-mono text-slate-400">{inv.date}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button onClick={() => deleteInvoice(inv.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
