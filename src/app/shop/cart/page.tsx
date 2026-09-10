"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Phone,
  Upload,
  MapPin,
  Truck,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";
import { useCart } from "@/lib/cart-context";

const MOMO_NUMBER = "1400187";
const MOMO_USSD_RAW = "1400187";
const STEP_LABELS = ["Review order", "Pay via MoMo", "Confirm"];

type Fulfillment = "delivery" | "pickup" | null;

export default function CartPage() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const [step, setStep] = useState(0);
  const [fulfillment, setFulfillment] = useState<Fulfillment>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [address, setAddress] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const ussdCode = `*182*8*1*${MOMO_USSD_RAW}*${total}#`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const canProceedToConfirm =
    fileName !== null && fulfillment !== null && (fulfillment === "pickup" || address.trim().length > 3);

  const handleConfirm = () => {
    setConfirmed(true);
    clear();
  };

  // Empty cart
  if (items.length === 0 && !confirmed) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center">
        <SiteContainer>
          <div className="max-w-md mx-auto text-center py-20">
            <ShoppingCart className="w-14 h-14 text-slate-200 mx-auto mb-5" />
            <h1 className="text-2xl font-black text-slate-900 mb-3">Your cart is empty</h1>
            <p className="text-slate-500 font-medium mb-8">
              Browse our health kits and add items to get started.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black text-sm hover:opacity-90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to shop
            </Link>
          </div>
        </SiteContainer>
      </div>
    );
  }

  // Order confirmed
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center">
        <SiteContainer>
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-3">Order received!</h1>
            <p className="text-slate-500 font-medium mb-2 leading-relaxed">
              We've received your payment confirmation. Our team will verify and{" "}
              {fulfillment === "pickup"
                ? "have your order ready for clinic pickup within 24 hours."
                : "dispatch your order within 24–48 hours."}
            </p>
            <p className="text-slate-400 text-sm font-bold mb-8">
              Questions? Call or WhatsApp: {MOMO_NUMBER}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black text-sm hover:opacity-90 transition-all"
              >
                Shop again
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-full font-black text-sm hover:bg-white transition-all"
              >
                Go home
              </Link>
            </div>
          </div>
        </SiteContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <SiteContainer className="py-8 md:py-12">
        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-slate-500 font-bold text-sm mb-6 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full text-[11px] font-black flex items-center justify-center transition-colors ${
                    i <= step
                      ? "bg-primary text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs font-bold hidden sm:inline ${
                    i === step ? "text-primary" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — steps */}
          <div className="lg:col-span-2 space-y-6">

            {/* STEP 0: Cart items */}
            {step === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-50">
                  <h2 className="font-black text-base text-slate-900">Your order</h2>
                </div>
                <ul className="divide-y divide-slate-50">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 p-5">
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-secondary/20"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 leading-snug mb-2">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors"
                            aria-label="Remove one"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-black text-sm w-5 text-center">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors"
                            aria-label="Add one"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-sm text-slate-900">
                          {(item.price * item.qty).toLocaleString()} RWF
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors mt-2"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* STEP 1: MoMo payment */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-yellow-900" />
                    </div>
                    <div>
                      <h2 className="font-black text-base text-slate-900">Pay with MoMo</h2>
                      <p className="text-slate-400 text-xs font-bold">MTN Mobile Money · Rwanda</p>
                    </div>
                  </div>

                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-black text-sm text-slate-900 mb-1">Dial the USSD code</p>
                        <div className="bg-slate-900 text-secondary font-mono font-bold text-sm px-4 py-3 rounded-xl tracking-wider">
                          {ussdCode}
                        </div>
                        <p className="text-slate-400 text-xs font-medium mt-1.5">
                          Sends <span className="font-black text-slate-700">{total.toLocaleString()} RWF</span> to Inshuti Connect ({MOMO_NUMBER})
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-black text-sm text-slate-900 mb-1">Confirm on your phone</p>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                          Enter your MoMo PIN when prompted. You&apos;ll receive a confirmation SMS from MTN.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div className="flex-1">
                        <p className="font-black text-sm text-slate-900 mb-2">Upload your payment screenshot</p>
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className={`w-full flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-5 transition-colors ${
                            fileName
                              ? "border-green-400 bg-green-50 text-green-700"
                              : "border-slate-200 hover:border-primary/40 text-slate-400"
                          }`}
                        >
                          {fileName ? (
                            <>
                              <CheckCircle className="w-6 h-6 text-green-500" />
                              <span className="text-xs font-bold">{fileName}</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6" />
                              <span className="text-xs font-bold">Tap to upload screenshot</span>
                              <span className="text-[11px]">JPG or PNG</span>
                            </>
                          )}
                        </button>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                          aria-label="Upload payment screenshot"
                        />
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Fulfillment */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-black text-base text-slate-900 mb-4">How do you want to receive it?</h2>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setFulfillment("delivery")}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        fulfillment === "delivery"
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <Truck className={`w-5 h-5 shrink-0 ${fulfillment === "delivery" ? "text-primary" : "text-slate-400"}`} />
                      <div>
                        <p className="font-black text-sm text-slate-900">Delivery</p>
                        <p className="text-slate-400 text-xs font-medium">Kigali & countrywide</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment("pickup")}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        fulfillment === "pickup"
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <MapPin className={`w-5 h-5 shrink-0 ${fulfillment === "pickup" ? "text-primary" : "text-slate-400"}`} />
                      <div>
                        <p className="font-black text-sm text-slate-900">Clinic pickup</p>
                        <p className="text-slate-400 text-xs font-medium">Free · ready in 24h</p>
                      </div>
                    </button>
                  </div>

                  {fulfillment === "delivery" && (
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5" htmlFor="address">
                        Delivery address
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="e.g. KG 15 Ave, Kacyiru, Kigali"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Review & confirm */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="font-black text-base text-slate-900 mb-5">Review your order</h2>
                <ul className="space-y-3 mb-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span className="font-bold text-slate-700">
                        {item.name} × {item.qty}
                      </span>
                      <span className="font-black text-slate-900">
                        {(item.price * item.qty).toLocaleString()} RWF
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 pt-4 mb-5">
                  <div className="flex justify-between font-black text-base">
                    <span>Total paid via MoMo</span>
                    <span className="text-primary">{total.toLocaleString()} RWF</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1.5 mb-6">
                  <div className="flex gap-2">
                    <span className="text-slate-400 font-bold w-24 shrink-0">Payment</span>
                    <span className="font-black text-slate-900">MTN MoMo · {MOMO_NUMBER}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 font-bold w-24 shrink-0">Fulfillment</span>
                    <span className="font-black text-slate-900 capitalize">
                      {fulfillment === "pickup" ? "Clinic pickup" : `Delivery to ${address}`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 font-bold w-24 shrink-0">Screenshot</span>
                    <span className="font-black text-green-600">Uploaded ✓</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 active:scale-95 transition-all"
                >
                  Confirm order
                </button>
              </div>
            )}
          </div>

          {/* Right — order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
              <h2 className="font-black text-sm text-slate-900 mb-4">Order summary</h2>
              <ul className="space-y-2 mb-4 text-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span className="text-slate-500 font-medium">
                      {item.name} <span className="text-slate-400">×{item.qty}</span>
                    </span>
                    <span className="font-black text-slate-900">
                      {(item.price * item.qty).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline mb-5">
                <span className="font-black text-sm text-slate-900">Total</span>
                <div className="text-right">
                  <span className="text-xl font-black text-primary">{total.toLocaleString()}</span>
                  <span className="text-slate-400 text-xs font-bold ml-1">RWF</span>
                </div>
              </div>

              {step === 0 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm hover:bg-primary/90 transition-all"
                >
                  Proceed to payment
                </button>
              )}
              {step === 1 && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedToConfirm}
                  className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Review order
                </button>
              )}
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm hover:bg-primary/90 active:scale-95 transition-all"
                >
                  Confirm order
                </button>
              )}

              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="w-full mt-2 text-slate-400 py-2 font-bold text-xs hover:text-slate-700 transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
