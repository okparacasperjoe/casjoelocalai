import React, { useState } from 'react';
import { X, UserPlus, FileText, CheckSquare, Sparkles, Upload, CheckCircle2, Building2, MapPin, Phone, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addCustomer, addInvoice, addDocument } from '../db/hooks';

export default function Modals({ activeModal, onCloseModal }) {
  if (!activeModal) return null;

  // Add Customer State
  const [customerData, setCustomerData] = useState({
    name: '',
    company: '',
    location: 'Lagos, Nigeria',
    phone: '',
    totalSpent: '₦0'
  });

  // Create Invoice State
  const [invoiceData, setInvoiceData] = useState({
    customer: 'Sahara Logistics Ltd',
    amount: '450,000',
    currency: 'NGN',
    items: 'Casjoe Local AI Enterprise Setup & Staff Training'
  });

  // Add Task State
  const [taskTitle, setTaskTitle] = useState('');

  // AI Report State
  const [reportType, setReportType] = useState('Sales & Revenue');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReportText, setGeneratedReportText] = useState(null);

  // Upload Doc State
  const [uploadFileName, setUploadFileName] = useState('');

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    if (!customerData.name) return;
    await addCustomer({
      id: 'c-' + Date.now(),
      ...customerData,
      status: 'Active'
    });
    onCloseModal();
  };

  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    const symbol = invoiceData.currency === 'NGN' ? '₦' : invoiceData.currency === 'KES' ? 'KSh ' : invoiceData.currency === 'GHS' ? 'GHS ' : '$';
    await addInvoice({
      id: 'INV-2026-00' + Math.floor(Math.random() * 90 + 10),
      customer: invoiceData.customer,
      amount: `${symbol}${invoiceData.amount}`,
      currency: invoiceData.currency,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      items: invoiceData.items
    });
    onCloseModal();
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setGeneratedReportText(`CASJOE LOCAL AI OFFLINE REPORT (${reportType.toUpperCase()})\n\nKey Insights:\n1. July Revenue reached ₦9.8M with 79% gross profit margins across regional branches.\n2. Local AI query volume increased 34% with zero cloud API expense.\n3. Customer retention rate improved to 98.4% across Lagos, Nairobi, Accra, and Johannesburg hubs.`);
      setIsGeneratingReport(false);
    }, 1200);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFileName) return;
    await addDocument({
      id: 'doc-' + Date.now(),
      name: uploadFileName.endsWith('.pdf') || uploadFileName.endsWith('.docx') || uploadFileName.endsWith('.xlsx') ? uploadFileName : uploadFileName + '.pdf',
      size: '1.8 MB',
      type: 'pdf',
      pages: 12,
      date: new Date().toISOString().split('T')[0],
      summary: 'Uploaded local business document parsed and indexed into Casjoe vector memory.'
    });
    onCloseModal();
  };

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#F59E0B] flex items-center justify-center">
              {activeModal === 'addCustomer' && <UserPlus className="w-4 h-4" />}
              {activeModal === 'createInvoice' && <FileText className="w-4 h-4" />}
              {activeModal === 'addTask' && <CheckSquare className="w-4 h-4" />}
              {activeModal === 'aiReport' && <Sparkles className="w-4 h-4" />}
              {activeModal === 'uploadDoc' && <Upload className="w-4 h-4" />}
            </div>
            <h3 className="font-bold text-white font-['Outfit'] text-lg">
              {activeModal === 'addCustomer' && 'Add New Customer'}
              {activeModal === 'createInvoice' && 'Generate Invoice'}
              {activeModal === 'addTask' && 'Add Action Task'}
              {activeModal === 'aiReport' && 'Generate AI Report'}
              {activeModal === 'uploadDoc' && 'Upload Local Document'}
            </h3>
          </div>
          <button onClick={onCloseModal} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal 1: Add Customer */}
        {activeModal === 'addCustomer' && (
          <form onSubmit={handleCustomerSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Customer Full Name</label>
              <input
                type="text"
                required
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                placeholder="e.g. Amina Bello"
                className="custom-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Company</label>
                <input
                  type="text"
                  required
                  value={customerData.company}
                  onChange={(e) => setCustomerData({ ...customerData, company: e.target.value })}
                  placeholder="e.g. Sahara Logistics"
                  className="custom-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Location</label>
                <select
                  value={customerData.location}
                  onChange={(e) => setCustomerData({ ...customerData, location: e.target.value })}
                  className="custom-select w-full"
                >
                  <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                  <option value="Kano, Nigeria">Kano, Nigeria</option>
                  <option value="Accra, Ghana">Accra, Ghana</option>
                  <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                  <option value="Johannesburg, South Africa">Johannesburg, South Africa</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Phone Number</label>
              <input
                type="text"
                required
                value={customerData.phone}
                onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                placeholder="+234 802 123 4567"
                className="custom-input"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button type="button" onClick={onCloseModal} className="btn-secondary text-xs">Cancel</button>
              <button type="submit" className="btn-primary text-xs">Save Customer</button>
            </div>
          </form>
        )}

        {/* Modal 2: Create Invoice */}
        {activeModal === 'createInvoice' && (
          <form onSubmit={handleInvoiceSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Select Customer</label>
              <select
                value={invoiceData.customer}
                onChange={(e) => setInvoiceData({ ...invoiceData, customer: e.target.value })}
                className="custom-select w-full"
              >
                <option value="Sahara Logistics Ltd">Sahara Logistics Ltd</option>
                <option value="Nairobi Health Hub">Nairobi Health Hub</option>
                <option value="Gold Coast Traders">Gold Coast Traders</option>
                <option value="Kano Community Clinic">Kano Community Clinic</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Currency</label>
                <select
                  value={invoiceData.currency}
                  onChange={(e) => setInvoiceData({ ...invoiceData, currency: e.target.value })}
                  className="custom-select w-full"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="KES">KES (KSh)</option>
                  <option value="GHS">GHS</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Amount</label>
                <input
                  type="text"
                  required
                  value={invoiceData.amount}
                  onChange={(e) => setInvoiceData({ ...invoiceData, amount: e.target.value })}
                  className="custom-input"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Line Items / Description</label>
              <input
                type="text"
                required
                value={invoiceData.items}
                onChange={(e) => setInvoiceData({ ...invoiceData, items: e.target.value })}
                className="custom-input"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button type="button" onClick={onCloseModal} className="btn-secondary text-xs">Cancel</button>
              <button type="submit" className="btn-primary text-xs">Generate Tax Invoice</button>
            </div>
          </form>
        )}

        {/* Modal 3: Add Task */}
        {activeModal === 'addTask' && (
          <form onSubmit={(e) => { e.preventDefault(); onCloseModal(); }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Task Description</label>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g. Audit offline database backup before weekly sync"
                className="custom-input"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button type="button" onClick={onCloseModal} className="btn-secondary text-xs">Cancel</button>
              <button type="submit" className="btn-primary text-xs">Add Action Item</button>
            </div>
          </form>
        )}

        {/* Modal 4: AI Report */}
        {activeModal === 'aiReport' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Report Focus Area</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="custom-select w-full"
              >
                <option value="Sales & Revenue">Sales & Revenue Audit</option>
                <option value="Customer Growth">Customer Growth & Retention</option>
                <option value="Hardware Telemetry">Hardware Telemetry & Model Speed</option>
              </select>
            </div>

            {generatedReportText ? (
              <div className="bg-[#080C18] border border-amber-500/30 p-4 rounded-xl font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                {generatedReportText}
              </div>
            ) : (
              <button
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className="btn-primary w-full text-xs justify-center py-3"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingReport ? 'Compiling Offline AI Insights...' : 'Run Local AI Report Generator'}</span>
              </button>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onCloseModal} className="btn-secondary text-xs">Close</button>
            </div>
          </div>
        )}

        {/* Modal 5: Upload Document */}
        {activeModal === 'uploadDoc' && (
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Document Title / File Name</label>
              <input
                type="text"
                required
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                placeholder="e.g. Q3_Financial_Audit.pdf"
                className="custom-input"
              />
            </div>

            <div className="border-2 border-dashed border-white/10 p-6 rounded-xl text-center space-y-2 bg-[#080C18]">
              <Upload className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-xs text-slate-300">Drag & Drop files here or browse local disk</p>
              <p className="text-[10px] text-slate-500">Supports PDF, DOCX, XLSX, TXT (100% Client-Side Vectorization)</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onCloseModal} className="btn-secondary text-xs">Cancel</button>
              <button type="submit" className="btn-primary text-xs">Vectorize Document Offline</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
