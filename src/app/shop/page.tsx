"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check, ArrowRight, Shield, Truck, Lock, FlaskConical, Heart, Clock } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";
import { useCart } from "@/lib/cart-context";

type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  badge: string;
  gradient: string;
  Icon: React.ElementType;
  image?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "hiv-self-test-kit",
    name: "HIV Self-Test Kit",
    tagline: "Fast. Private. Accurate.",
    description:
      "WHO-approved rapid HIV test you can do at home in 20 minutes. Step-by-step instructions in English and Kinyarwanda. Results are for your eyes only.",
    price: 3500,
    badge: "Most ordered",
    gradient: "linear-gradient(135deg, #0F382B 0%, #1a5c44 100%)",
    Icon: FlaskConical,
    image: "https://www.globalpointofcare.abbott/content/dam/ardx/globalpointofcare/products-solutions/products/determine/hiv-early-detect-rebrand/HIV-Early-Detect-PP-imgA.jpg",
  },
  {
    id: "pregnancy-test",
    name: "Pregnancy Test",
    tagline: "Results in 3 minutes.",
    description:
      "High-sensitivity urine pregnancy test with 99% accuracy. Discreet packaging, delivered to your door or available for clinic pickup. Know sooner, plan better.",
    price: 2000,
    badge: "In stock",
    gradient: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
    Icon: Heart,
    image: "https://cdn.thewirecutter.com/wp-content/media/2025/01/BEST-PREGNANCY-TESTS-2048px-9398-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp",
  },
  {
    id: "condom-pack",
    name: "Condom Pack (×12)",
    tagline: "Protection you can count on.",
    description:
      "Lubricated latex condoms for STI prevention and contraception. Rigorously tested, individually wrapped, delivered in plain packaging. No questions, no judgement.",
    price: 1500,
    badge: "Essential",
    gradient: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
    Icon: Shield,
    image: "https://cdn11.bigcommerce.com/s-q7bj9b534k/images/stencil/450x450/products/2884/895/ASRTLAR4_condom_assortment_72__03471.1744063910.jpg?c=1",
  },
  {
    id: "emergency-contraceptive",
    name: "Emergency Contraceptive",
    tagline: "Up to 72 hours after.",
    description:
      "Levonorgestrel emergency contraceptive pill. Most effective when taken as soon as possible after unprotected sex. 100% private packaging, no prescription needed.",
    price: 3000,
    badge: "Time-sensitive",
    gradient: "linear-gradient(135deg, #134e4a 0%, #0F382B 100%)",
    Icon: Clock,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhvnntL4jd4au82jbe7ijRJyi06NTvQjdX0q7HdvSblnFrrWrr1ii4In3&s=10",
  },
];

function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find((i) => i.id === product.id);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
        added
          ? "bg-green-500 text-white"
          : "bg-primary text-white hover:bg-primary/90 active:scale-95"
      }`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {inCart ? `Add again (${inCart.qty} in cart)` : "Add to cart"}
        </>
      )}
    </button>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      {/* Hero */}
      <section className="bg-primary text-white pt-10 pb-16 md:pt-12 md:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #B2D8C6 0%, transparent 60%)" }}
        />
        <SiteContainer className="relative z-10">
          <p className="text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-3">
            Health Essentials
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-3 max-w-2xl">
            Health kits, delivered discreetly.
          </h1>
          <p className="text-white/75 text-base font-medium mb-6 max-w-xl">
            HIV tests, pregnancy tests, and contraception. Fair prices, clinic pickup or nationwide delivery.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-white/70">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-secondary" /> Private packaging</span>
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-secondary" /> Countrywide delivery</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-secondary" /> WHO-approved products</span>
          </div>
        </SiteContainer>
      </section>

      {/* Products */}
      <SiteContainer className="-mt-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Product image area */}
              <div className="relative h-44 overflow-hidden">
                {product.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ background: product.gradient }}
                  >
                    <product.Icon className="w-12 h-12 text-white/70" strokeWidth={1.5} />
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest px-4 text-center">
                      {product.tagline}
                    </span>
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-white/90 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-black text-base text-slate-900 mb-2 leading-snug">
                  {product.name}
                </h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-black text-primary">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">RWF</span>
                </div>

                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* View cart nudge */}
        <div className="mt-10 text-center">
          <Link
            href="/shop/cart"
            className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-sm"
          >
            View cart &amp; checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: <Lock className="w-5 h-5 mx-auto mb-2 text-primary" />, title: "Discreet delivery", body: "Plain packaging. No medical labels on the outside." },
            { icon: <Shield className="w-5 h-5 mx-auto mb-2 text-primary" />, title: "Clinically approved", body: "All products meet WHO and Rwanda FDA standards." },
            { icon: <Truck className="w-5 h-5 mx-auto mb-2 text-primary" />, title: "Kigali & countrywide", body: "Nationwide delivery or free clinic pickup." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 border border-slate-100">
              {item.icon}
              <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </SiteContainer>
    </div>
  );
}
