// import React, {useEffect, useMemo, useState} from "react";
// import {Link} from "react-router-dom";
// import {addDoc, collection, serverTimestamp} from "firebase/firestore";
// import {db} from "../firebase";
// import {loadCMS, loadRemoteCMS} from "./cms";
// import "./MrSabKuch.css";

// const waLink = phone => `https://wa.me/${String(phone || "919958424916").replace(/\D/g, "")}`;

// export default function MrSabKuchHome(){
//   const [cms,setCms]=useState(loadCMS());
//   const [query,setQuery]=useState("");
//   const [form,setForm]=useState({name:"",phone:"",service:"",message:""});
//   const [status,setStatus]=useState("");

//   useEffect(()=>{
//     loadRemoteCMS().then(setCms);
//     const fn=()=>setCms(loadCMS());
//     window.addEventListener("mr-cms-updated",fn);
//     window.addEventListener("storage",fn);
//     return()=>{window.removeEventListener("mr-cms-updated",fn);window.removeEventListener("storage",fn)};
//   },[]);

//   const services = useMemo(()=>cms.services.filter(s=>s.visible && (`${s.title} ${s.description}`.toLowerCase().includes(query.toLowerCase()))),[cms.services,query]);
//   const b=cms.brand;
//   const wa=waLink(b.whatsapp);

//   const submitLead=async e=>{
//     e.preventDefault();
//     if(!form.name || !form.phone){setStatus("Name aur mobile number zaroor bharein.");return;}
//     try{
//       await addDoc(collection(db,"leads"),{...form,source:"Mr. Sab Kuch",createdAt:serverTimestamp()});
//       setStatus("Enquiry submitted. Our team will contact you.");
//       setForm({name:"",phone:"",service:"",message:""});
//     }catch(error){
//       const saved=JSON.parse(localStorage.getItem("mr_sab_kuch_leads")||"[]");
//       saved.push({...form,source:"Mr. Sab Kuch",createdAt:new Date().toISOString()});
//       localStorage.setItem("mr_sab_kuch_leads",JSON.stringify(saved));
//       setStatus("Enquiry saved on this device. WhatsApp se bhi contact kar sakte hain.");
//     }
//   };

//   return <div className="msk-app">
//     <header className="msk-topbar">
//       <Link to="/" className="msk-brand"><img src="/logo.png" alt="NISS Technology"/><span><b>{b.name}</b><small>Powered by {b.poweredBy}</small></span></Link>
//       <div className="msk-top-actions"><a href={wa} target="_blank" rel="noreferrer">WhatsApp</a><a href={`tel:${b.phone.replace(/\s/g,"")}`}>Call</a><Link to="/mr-admin">Admin</Link></div>
//     </header>

//     <main className="msk-main">
//       <section className="msk-hero-app">
//         <div className="msk-wrap hero-inner">
//           <div className="hero-copy"><span className="msk-kicker">{b.poweredBy}</span><h1>{b.name}</h1><h2>{b.tagline}</h2><p>{b.heroText}</p><div className="hero-buttons"><a href={wa} target="_blank" rel="noreferrer" className="msk-btn primary">WhatsApp Enquiry</a><a href="#services" className="msk-btn">Explore Services</a></div></div>
//           <div className="hero-dashboard"><div className="dash-head"><span>One App</span><span className="live-dot">● Live</span></div><h3>Services, shopping & business in one place.</h3><div className="mini-grid"><span>👤 Customer</span><span>🏪 Vendor</span><span>🧑‍🔧 Field Staff</span><span>🏠 Property</span><span>🛒 Shop</span><span>📋 Bookings</span></div><Link to="/customerlogin" className="dash-link">Open Customer Area →</Link></div>
//         </div>
//       </section>

//       <section className="msk-quick"><div className="msk-wrap quick-grid"><a href="#services">🔎 Find Service</a><a href="#enquiry">📝 New Request</a><a href={wa} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="tel:+919958424916">📞 Call Support</a></div></section>

//       <section id="services" className="msk-section"><div className="msk-wrap"><div className="msk-heading"><span>EXPLORE</span><h2>All Services</h2><p>Search karke service choose karein. Har card existing NISS module ya external business service se connect ho sakta hai.</p></div><div className="service-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services..."/></div><div className="msk-service-grid">{services.map(s=><div className="service-card" key={s.id}><div className="service-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.description}</p>{s.external?<a href={s.path} target="_blank" rel="noreferrer" className="msk-link">Open Service →</a>:<Link className="msk-link" to={s.path}>Open Service →</Link>}</div>)}</div></div></section>

//       <section className="msk-section soft"><div className="msk-wrap"><div className="msk-heading"><span>OFFERS & PLANS</span><h2>Packages</h2><p>Admin panel se names, prices, features aur visibility change ki ja sakti hai.</p></div><div className="msk-package-grid">{cms.packages.filter(x=>x.visible).map(p=><div className="package-card" key={p.id}><span className="package-name">{p.name}</span><strong>{p.price}</strong><p>{p.subtitle}</p><ul>{(p.features||[]).map((f,i)=><li key={i}>✓ {f}</li>)}</ul><a href={`${wa}?text=${encodeURIComponent(`Hello, I want details about ${p.name} package.`)}`} target="_blank" rel="noreferrer" className="msk-btn primary full">Enquire</a></div>)}</div></div></section>

//       {cms.offers.filter(x=>x.visible).map(o=><section className="msk-offer" key={o.id}><div className="msk-wrap offer-inner"><div><span>OFFER</span><h2>{o.title}</h2><p>{o.text}</p></div><a href="#enquiry" className="msk-btn primary">{o.button || "Get Started"}</a></div></section>)}

//       <section className="msk-section"><div className="msk-wrap"><div className="stats-grid">{cms.stats.map(s=><div className="stat-card" key={s.id}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>{cms.sections.filter(x=>x.visible).map(s=><div className="story-card" key={s.id}><h2>{s.title}</h2><p>{s.text}</p></div>)}</div></section>

//       <section id="enquiry" className="msk-section enquiry-section"><div className="msk-wrap enquiry-grid"><div><span className="msk-kicker">NEW REQUEST</span><h2>Tell us what you need</h2><p>Enquiry submit hote hi admin panel ke Leads section me request aa sakti hai.</p><a className="msk-btn" href={wa} target="_blank" rel="noreferrer">WhatsApp instead</a></div><form onSubmit={submitLead} className="lead-form"><input placeholder="Your name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="Mobile number *" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option value="">Select service</option>{cms.services.map(s=><option key={s.id}>{s.title}</option>)}</select><textarea placeholder="What do you need?" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/><button className="msk-btn primary" type="submit">Submit Enquiry</button>{status&&<div className="form-status">{status}</div>}</form></div></section>
//     </main>

//     <footer className="msk-footer"><div className="msk-wrap footer-grid"><div><h2>{b.name}</h2><p>Powered by {b.poweredBy}</p></div><div><b>Contact</b><p>{b.phone}</p><p>{b.email}</p></div><div><b>Office</b><p>{b.address}</p></div></div><div className="copyright">© {new Date().getFullYear()} {b.name}. All rights reserved.</div></footer>
//     <nav className="msk-bottom-nav"><a href="#services">⌂<span>Home</span></a><a href="#services">🔎<span>Services</span></a><a href="#enquiry" className="new-request">＋<span>Request</span></a><a href={wa} target="_blank" rel="noreferrer">💬<span>Chat</span></a><Link to="/customerlogin">👤<span>Account</span></Link></nav>
//   </div>
// }


// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase";
// import { loadCMS, loadRemoteCMS } from "./cms";
// import "./MrSabKuch.css";

// const waLink = (phone) =>
//   `https://wa.me/${String(phone || "919958424916").replace(/\D/g, "")}`;

// export default function MrSabKuchHome() {
//   const [cms, setCms] = useState(loadCMS());
//   const [query, setQuery] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     service: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     loadRemoteCMS().then(setCms);

//     const fn = () => setCms(loadCMS());
//     window.addEventListener("mr-cms-updated", fn);
//     window.addEventListener("storage", fn);

//     return () => {
//       window.removeEventListener("mr-cms-updated", fn);
//       window.removeEventListener("storage", fn);
//     };
//   }, []);

//   const services = useMemo(() => {
//     const q = query.toLowerCase();

//     return cms.services.filter(
//       (s) =>
//         s.visible &&
//         `${s.title} ${s.description}`.toLowerCase().includes(q)
//     );
//   }, [cms.services, query]);

//   const b = cms.brand;
//   const wa = waLink(b.whatsapp);

//   const submitLead = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.phone) {
//       setStatus("Name aur mobile number zaroor bharein.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "leads"), {
//         ...form,
//         source: "Mr. Sab Kuch",
//         createdAt: serverTimestamp(),
//       });

//       setStatus("Enquiry submitted. Our team will contact you.");

//       setForm({
//         name: "",
//         phone: "",
//         service: "",
//         message: "",
//       });
//     } catch (error) {
//       const saved = JSON.parse(
//         localStorage.getItem("mr_sab_kuch_leads") || "[]"
//       );

//       saved.push({
//         ...form,
//         source: "Mr. Sab Kuch",
//         createdAt: new Date().toISOString(),
//       });

//       localStorage.setItem("mr_sab_kuch_leads", JSON.stringify(saved));

//       setStatus(
//         "Enquiry saved on this device. WhatsApp se bhi contact kar sakte hain."
//       );
//     }
//   };

//   const popularServices = services.slice(0, 4);

//   return (
//     <div className="msk-app">

//       {/* HEADER */}
//       <header className="msk-topbar">
//         <Link to="/" className="msk-brand">
//           <div className="msk-logo-box">MSK</div>

//           <span>
//             <b>{b.name}</b>
//             <small>Powered by {b.poweredBy}</small>
//           </span>
//         </Link>

//         <div className="msk-top-search">
//           <span>⌕</span>
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search services..."
//           />
//         </div>

//         <div className="msk-top-actions">
//           <a href={wa} target="_blank" rel="noreferrer">
//             WhatsApp
//           </a>

//           <a href={`tel:${b.phone.replace(/\s/g, "")}`}>
//             Call
//           </a>

//           <Link to="/customerlogin" className="account-btn">
//             Account
//           </Link>
//         </div>
//       </header>

//       <main>

//         {/* HERO */}
//         <section className="msk-hero">
//           <div className="msk-wrap hero-layout">

//             <div className="hero-content">

//               <div className="hero-badge">
//                 <span>●</span> ONE PLATFORM • MANY SERVICES
//               </div>

//               <h1>
//                 Har Zarurat,
//                 <br />
//                 <strong>Ek Hi Jagah.</strong>
//               </h1>

//               <p className="hero-description">
//                 Home services, security, interior, property, shopping,
//                 catering, laundry, events aur digital solutions —
//                 sab kuch ek hi platform par.
//               </p>

//               <div className="hero-buttons">
//                 <a
//                   href={wa}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hero-primary"
//                 >
//                   💬 WhatsApp Enquiry
//                 </a>

//                 <a href="#services" className="hero-secondary">
//                   Explore Services →
//                 </a>
//               </div>

//               <div className="hero-trust">
//                 <div>
//                   <strong>{cms.services.length}+</strong>
//                   <span>Services</span>
//                 </div>

//                 <div>
//                   <strong>24/7</strong>
//                   <span>Enquiry</span>
//                 </div>

//                 <div>
//                   <strong>1</strong>
//                   <span>Platform</span>
//                 </div>
//               </div>
//             </div>

//             {/* HERO APP CARD */}
//             <div className="hero-app-card">

//               <div className="app-card-top">
//                 <div>
//                   <small>WELCOME TO</small>
//                   <h3>Mr. Sab Kuch</h3>
//                 </div>

//                 <div className="app-live">
//                   ● LIVE
//                 </div>
//               </div>

//               <div className="app-search">
//                 🔎 What do you need today?
//               </div>

//               <div className="app-category-grid">
//                 <div>
//                   <span>🔧</span>
//                   <b>QuickFix</b>
//                   <small>Home Repair</small>
//                 </div>

//                 <div>
//                   <span>🏠</span>
//                   <b>Property</b>
//                   <small>Buy / Rent</small>
//                 </div>

//                 <div>
//                   <span>🛋️</span>
//                   <b>Interior</b>
//                   <small>Design</small>
//                 </div>

//                 <div>
//                   <span>📹</span>
//                   <b>Security</b>
//                   <small>CCTV & Guard</small>
//                 </div>
//               </div>

//               <div className="app-request">
//                 <div>
//                   <small>Need something else?</small>
//                   <b>Send a Request</b>
//                 </div>

//                 <a href="#enquiry">＋</a>
//               </div>
//             </div>

//           </div>
//         </section>

//         {/* QUICK ACTIONS */}
//         <section className="quick-actions">
//           <div className="msk-wrap quick-actions-grid">

//             <a href="#services">
//               <span>🔎</span>
//               <div>
//                 <b>Find a Service</b>
//                 <small>Explore services</small>
//               </div>
//             </a>

//             <a href="#enquiry">
//               <span>📝</span>
//               <div>
//                 <b>Request Service</b>
//                 <small>Tell us your requirement</small>
//               </div>
//             </a>

//             <a href={wa} target="_blank" rel="noreferrer">
//               <span>💬</span>
//               <div>
//                 <b>Chat on WhatsApp</b>
//                 <small>Quick assistance</small>
//               </div>
//             </a>

//             <a href={`tel:${b.phone.replace(/\s/g, "")}`}>
//               <span>📞</span>
//               <div>
//                 <b>Call Support</b>
//                 <small>{b.phone}</small>
//               </div>
//             </a>

//           </div>
//         </section>

//         {/* POPULAR SERVICES */}
//         <section className="msk-section popular-section">
//           <div className="msk-wrap">

//             <div className="section-head-row">
//               <div>
//                 <span className="section-label">POPULAR</span>
//                 <h2>What can we help you with?</h2>
//                 <p>
//                   Frequently used services, right at your fingertips.
//                 </p>
//               </div>

//               <a href="#services">View All →</a>
//             </div>

//             <div className="popular-grid">
//               {popularServices.map((s) => (
//                 <div className="popular-card" key={s.id}>

//                   <div className="popular-icon">
//                     {s.icon}
//                   </div>

//                   <div>
//                     <h3>{s.title}</h3>
//                     <p>{s.description}</p>
//                   </div>

//                   {s.external ? (
//                     <a
//                       href={s.path}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       →
//                     </a>
//                   ) : (
//                     <Link to={s.path}>→</Link>
//                   )}

//                 </div>
//               ))}
//             </div>

//           </div>
//         </section>

//         {/* ALL SERVICES */}
//         <section id="services" className="msk-section services-section">
//           <div className="msk-wrap">

//             <div className="section-center">
//               <span className="section-label">OUR ECOSYSTEM</span>
//               <h2>All Services</h2>
//               <p>
//                 One platform for your everyday needs, business requirements
//                 and service requests.
//               </p>
//             </div>

//             <div className="big-service-search">
//               <span>⌕</span>
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="What service are you looking for?"
//               />
//             </div>

//             <div className="msk-service-grid">

//               {services.map((s) => (
//                 <div className="service-card" key={s.id}>

//                   <div className="service-card-top">
//                     <div className="service-icon">
//                       {s.icon}
//                     </div>

//                     <span className="service-arrow">↗</span>
//                   </div>

//                   <h3>{s.title}</h3>

//                   <p>{s.description}</p>

//                   {s.external ? (
//                     <a
//                       href={s.path}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="service-open"
//                     >
//                       Explore Service →
//                     </a>
//                   ) : (
//                     <Link
//                       to={s.path}
//                       className="service-open"
//                     >
//                       Explore Service →
//                     </Link>
//                   )}

//                 </div>
//               ))}

//             </div>

//           </div>
//         </section>

//         {/* HOW IT WORKS */}
//         <section className="how-section">
//           <div className="msk-wrap">

//             <div className="section-center white">
//               <span className="section-label">SIMPLE PROCESS</span>
//               <h2>How Mr. Sab Kuch Works</h2>
//               <p>
//                 Service chuniye, request bhejiye aur team se connect ho jaiye.
//               </p>
//             </div>

//             <div className="steps-grid">

//               <div className="step">
//                 <div className="step-number">01</div>
//                 <span>🔎</span>
//                 <h3>Choose Service</h3>
//                 <p>Apni requirement ke according service select karein.</p>
//               </div>

//               <div className="step">
//                 <div className="step-number">02</div>
//                 <span>📝</span>
//                 <h3>Send Request</h3>
//                 <p>Basic details submit karke enquiry bhejein.</p>
//               </div>

//               <div className="step">
//                 <div className="step-number">03</div>
//                 <span>📞</span>
//                 <h3>Team Connects</h3>
//                 <p>Hamari team aapse requirement discuss karegi.</p>
//               </div>

//               <div className="step">
//                 <div className="step-number">04</div>
//                 <span>✅</span>
//                 <h3>Get Service</h3>
//                 <p>Requirement ke according service complete hoti hai.</p>
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* PACKAGES */}
//         {cms.packages.filter((x) => x.visible).length > 0 && (
//           <section className="msk-section packages-section">
//             <div className="msk-wrap">

//               <div className="section-center">
//                 <span className="section-label">PLANS</span>
//                 <h2>Packages & Solutions</h2>
//                 <p>
//                   Business solutions aur packages ko Admin Panel se
//                   update kiya ja sakta hai.
//                 </p>
//               </div>

//               <div className="msk-package-grid">

//                 {cms.packages
//                   .filter((x) => x.visible)
//                   .map((p) => (
//                     <div className="package-card" key={p.id}>

//                       <span className="package-tag">
//                         {p.name}
//                       </span>

//                       <strong>{p.price}</strong>

//                       <h3>{p.subtitle}</h3>

//                       <ul>
//                         {(p.features || []).map((f, i) => (
//                           <li key={i}>
//                             <span>✓</span>
//                             {f}
//                           </li>
//                         ))}
//                       </ul>

//                       <a
//                         href={`${wa}?text=${encodeURIComponent(
//                           `Hello, I want details about ${p.name} package.`
//                         )}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="package-button"
//                       >
//                         Get Details →
//                       </a>

//                     </div>
//                   ))}

//               </div>
//             </div>
//           </section>
//         )}

//         {/* OFFER */}
//         {cms.offers
//           .filter((x) => x.visible)
//           .map((o) => (
//             <section className="offer-banner" key={o.id}>
//               <div className="msk-wrap offer-content">

//                 <div>
//                   <span>LIMITED OFFER</span>
//                   <h2>{o.title}</h2>
//                   <p>{o.text}</p>
//                 </div>

//                 <a href="#enquiry">
//                   {o.button || "Get Started"} →
//                 </a>

//               </div>
//             </section>
//           ))}

//         {/* WHY US */}
//         <section className="msk-section why-section">
//           <div className="msk-wrap">

//             <div className="section-center">
//               <span className="section-label">WHY MR. SAB KUCH</span>
//               <h2>Everything connected in one place.</h2>
//               <p>
//                 Customers, services, vendors and requests — all within
//                 one connected ecosystem.
//               </p>
//             </div>

//             <div className="why-grid">

//               <div className="why-card">
//                 <span>⚡</span>
//                 <h3>Easy & Fast</h3>
//                 <p>
//                   Service discover karna aur enquiry bhejna simple rakha gaya hai.
//                 </p>
//               </div>

//               <div className="why-card">
//                 <span>📱</span>
//                 <h3>Mobile Friendly</h3>
//                 <p>
//                   Phone par app-like experience ke liye responsive design.
//                 </p>
//               </div>

//               <div className="why-card">
//                 <span>🔐</span>
//                 <h3>Connected System</h3>
//                 <p>
//                   Customer requests aur business management ek ecosystem mein.
//                 </p>
//               </div>

//               <div className="why-card">
//                 <span>🛠️</span>
//                 <h3>Growing Platform</h3>
//                 <p>
//                   Future mein naye services aur modules add kiye ja sakte hain.
//                 </p>
//               </div>

//             </div>

//             {cms.sections.filter((x) => x.visible).map((s) => (
//               <div className="story-card" key={s.id}>
//                 <h2>{s.title}</h2>
//                 <p>{s.text}</p>
//               </div>
//             ))}

//           </div>
//         </section>

//         {/* ENQUIRY */}
//         <section id="enquiry" className="enquiry-section">
//           <div className="msk-wrap enquiry-layout">

//             <div className="enquiry-copy">

//               <span className="section-label">
//                 NEED HELP?
//               </span>

//               <h2>
//                 Tell us what
//                 <br />
//                 you need.
//               </h2>

//               <p>
//                 Requirement bataiye. Hamari team aapse connect karke
//                 next steps discuss karegi.
//               </p>

//               <a
//                 href={wa}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="whatsapp-large"
//               >
//                 💬 WhatsApp Us
//               </a>

//               <div className="contact-mini">
//                 <div>
//                   <span>Phone</span>
//                   <b>{b.phone}</b>
//                 </div>

//                 <div>
//                   <span>Email</span>
//                   <b>{b.email}</b>
//                 </div>
//               </div>

//             </div>

//             <form onSubmit={submitLead} className="lead-form">

//               <div className="form-title">
//                 <span>NEW REQUEST</span>
//                 <h3>Send an Enquiry</h3>
//               </div>

//               <input
//                 placeholder="Your name *"
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({ ...form, name: e.target.value })
//                 }
//               />

//               <input
//                 placeholder="Mobile number *"
//                 value={form.phone}
//                 onChange={(e) =>
//                   setForm({ ...form, phone: e.target.value })
//                 }
//               />

//               <select
//                 value={form.service}
//                 onChange={(e) =>
//                   setForm({ ...form, service: e.target.value })
//                 }
//               >
//                 <option value="">Select service</option>

//                 {cms.services.map((s) => (
//                   <option key={s.id}>{s.title}</option>
//                 ))}
//               </select>

//               <textarea
//                 placeholder="Tell us about your requirement..."
//                 value={form.message}
//                 onChange={(e) =>
//                   setForm({ ...form, message: e.target.value })
//                 }
//               />

//               <button className="submit-button" type="submit">
//                 Submit Enquiry →
//               </button>

//               {status && (
//                 <div className="form-status">
//                   {status}
//                 </div>
//               )}

//             </form>

//           </div>
//         </section>

//       </main>

//       {/* FOOTER */}
//       <footer className="msk-footer">

//         <div className="msk-wrap footer-main">

//           <div className="footer-brand">
//             <div className="footer-logo">MSK</div>

//             <h2>{b.name}</h2>

//             <p>
//               Powered by {b.poweredBy}
//             </p>

//             <p className="footer-tagline">
//               {b.tagline}
//             </p>
//           </div>

//           <div>
//             <h3>Services</h3>
//             <a href="#services">All Services</a>
//             <a href="#enquiry">Request Service</a>
//             <Link to="/customerlogin">Customer Account</Link>
//           </div>

//           <div>
//             <h3>Contact</h3>
//             <a href={`tel:${b.phone}`}>{b.phone}</a>
//             <a href={`mailto:${b.email}`}>{b.email}</a>
//             <a href={wa} target="_blank" rel="noreferrer">
//               WhatsApp
//             </a>
//           </div>

//           <div>
//             <h3>Office</h3>
//             <p>{b.address}</p>
//           </div>

//         </div>

//         <div className="copyright">
//           © {new Date().getFullYear()} {b.name}. All rights reserved.
//         </div>

//       </footer>

//       {/* MOBILE NAV */}
//       <nav className="msk-bottom-nav">

//         <a href="#" className="active">
//           <span>⌂</span>
//           Home
//         </a>

//         <a href="#services">
//           <span>🔎</span>
//           Services
//         </a>

//         <a href="#enquiry" className="new-request">
//           <span>＋</span>
//           Request
//         </a>

//         <a href={wa} target="_blank" rel="noreferrer">
//           <span>💬</span>
//           Chat
//         </a>

//         <Link to="/customerlogin">
//           <span>👤</span>
//           Account
//         </Link>

//       </nav>

//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { loadCMS, loadRemoteCMS } from "./cms";
import "./MrSabKuch.css";
import logo30 from "../logo30.png";
const waLink = (phone) =>
  `https://wa.me/${String(phone || "919958424916").replace(/\D/g, "")}`;

/*
  MR. SAB KUCH APP SERVICES
  Ye services aapke existing app modules ke according rakhe gaye hain.
*/
const APP_SERVICES = [
  {
    id: "quickfix",
    title: "NISS QuickFix",
    icon: "🔧",
    path: "/plumbing",
    description: "Plumbing, electrical, AC repair, carpenter, painting & home repair.",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    icon: "🚰",
    path: "/plumbing",
    description: "Plumber booking, repair, leakage and maintenance services.",
  },
  {
    id: "carpenter",
    title: "Carpenter",
    icon: "🪚",
    path: "/carpenter",
    description: "Furniture repair, woodwork, installation and carpenter services.",
  },
  {
    id: "interior",
    title: "Interior Design",
    icon: "🛋️",
    path: "/interior",
    description: "Home, office, restaurant, hotel and commercial interiors.",
  },
  {
    id: "property",
    title: "Property",
    icon: "🏠",
    path: "/property",
    description: "Buy, sell, rent, PG and property consultation.",
  },
  {
    id: "security",
    title: "Security Agency",
    icon: "👮",
    path: "/security",
    description: "Security guards for residential, commercial and events.",
  },
  {
    id: "cctv",
    title: "CCTV & Security",
    icon: "📹",
    path: "/cctv",
    description: "CCTV, biometric, access control and security solutions.",
  },
  {
    id: "laundry",
    title: "Laundry",
    icon: "🧺",
    path: "/laundry",
    description: "Laundry, dry cleaning, ironing and pickup & delivery.",
  },
  {
    id: "catering",
    title: "Catering & Tiffin",
    icon: "🍽️",
    path: "/catering",
    description: "Wedding, party, corporate catering and tiffin services.",
  },
  {
    id: "events",
    title: "Events & Decoration",
    icon: "🎪",
    path: "/events",
    description: "Event management, tent decoration, stage and lighting.",
  },
  {
    id: "shop",
    title: "Online Shop",
    icon: "🛒",
    path: "/shop",
    description: "Shop products and access online shopping services.",
  },
  {
    id: "electronics",
    title: "Electronics",
    icon: "💻",
    path: "/electronics",
    description: "Electronics, devices and technology products.",
  },
  {
    id: "digital",
    title: "Software & Digital",
    icon: "🌐",
    path: "https://www.klikdigisetu.com/",
    external: true,
    description: "Website, app, software and digital marketing solutions.",
  },
  {
    id: "tailor",
    title: "Tailoring",
    icon: "🧵",
    path: "/tailor",
    description: "Tailoring, stitching, alteration and booking services.",
  },
  {
    id: "teacher",
    title: "Teacher & Skills",
    icon: "🎓",
    path: "/teacher",
    description: "Teacher discovery and skill-based services.",
  },
  {
    id: "instahelp",
    title: "InstaHelp",
    icon: "🧑‍🔧",
    path: "/instahelp",
    description: "On-demand help and service partner booking.",
  },
];

/*
  CMS service + app service ko combine karta hai.
  Agar CMS me same service hai to CMS ka data priority lega.
*/
function buildServices(cmsServices = []) {
  const cmsMap = new Map(
    cmsServices.map((service) => [service.id, service])
  );

  return APP_SERVICES.map((service) => ({
    ...service,
    ...(cmsMap.get(service.id) || {}),
    icon: cmsMap.get(service.id)?.icon || service.icon,
  })).concat(
    cmsServices
      .filter(
        (service) =>
          !APP_SERVICES.some((appService) => appService.id === service.id)
      )
      .map((service) => ({
        ...service,
        icon: service.icon || "✨",
      }))
  );
}

export default function MrSabKuchHome() {
  const [cms, setCms] = useState(loadCMS());
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadRemoteCMS().then(setCms);

    const fn = () => setCms(loadCMS());

    window.addEventListener("mr-cms-updated", fn);
    window.addEventListener("storage", fn);

    return () => {
      window.removeEventListener("mr-cms-updated", fn);
      window.removeEventListener("storage", fn);
    };
  }, []);

  const allServices = useMemo(
    () => buildServices(cms.services),
    [cms.services]
  );

  const services = useMemo(() => {
    const q = query.toLowerCase().trim();

    return allServices.filter((service) => {
      if (service.visible === false) return false;

      return `${service.title} ${service.description}`
        .toLowerCase()
        .includes(q);
    });
  }, [allServices, query]);

  const b = cms.brand;
  const wa = waLink(b.whatsapp);

  const submitLead = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      setStatus("Name aur mobile number zaroor bharein.");
      return;
    }

    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        source: "Mr. Sab Kuch",
        createdAt: serverTimestamp(),
      });

      setStatus("Enquiry submitted. Our team will contact you.");

      setForm({
        name: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      const saved = JSON.parse(
        localStorage.getItem("mr_sab_kuch_leads") || "[]"
      );

      saved.push({
        ...form,
        source: "Mr. Sab Kuch",
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem(
        "mr_sab_kuch_leads",
        JSON.stringify(saved)
      );

      setStatus(
        "Enquiry saved on this device. WhatsApp se bhi contact kar sakte hain."
      );
    }
  };

  const popularServices = services.slice(0, 6);

  return (
    <div className="msk-app">

      {/* ================= NAVBAR ================= */}
      <header className="msk-topbar">

        <Link to="/" className="msk-brand">

          <div className="niss-logo-wrap">
            <img
              src={logo30}
              alt="NISS Technology"
              className="niss-logo"
            />
          </div>

          <div className="msk-brand-text">
            <b>{b.name}</b>
            <small>Powered by {b.poweredBy}</small>
          </div>

        </Link>

        <div className="msk-top-search">
          <span>⌕</span>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
          />
        </div>

        <div className="msk-top-actions">

          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-nav"
          >
            WhatsApp
          </a>

          <a
            href={`tel:${b.phone.replace(/\s/g, "")}`}
            className="call-nav"
          >
            Call
          </a>

          <Link
            to="/customerlogin"
            className="account-btn"
          >
            Account
          </Link>

        </div>

      </header>

      <main>

        {/* ================= HERO ================= */}
        <section className="msk-hero">

          <div className="msk-wrap hero-layout">

            <div className="hero-content">

              <div className="hero-badge">
                <span>●</span>
                ONE PLATFORM • MANY SERVICES
              </div>

              <h1>
                Har Zarurat,
                <br />
                <strong>Ek Hi Jagah.</strong>
              </h1>

              <p className="hero-description">
                Home services, security, interior, property,
                shopping, catering, laundry, events aur digital
                solutions — sab kuch ek hi platform par.
              </p>

              <div className="hero-buttons">

                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-primary"
                >
                  💬 WhatsApp Enquiry
                </a>

                <a
                  href="#services"
                  className="hero-secondary"
                >
                  Explore Services →
                </a>

              </div>

              <div className="hero-trust">

                <div>
                  <strong>{services.length}+</strong>
                  <span>Services</span>
                </div>

                <div>
                  <strong>24/7</strong>
                  <span>Enquiry</span>
                </div>

                <div>
                  <strong>1</strong>
                  <span>Platform</span>
                </div>

              </div>

            </div>

            {/* HERO APP CARD */}
            <div className="hero-app-card">

              <div className="app-card-top">

                <div>
                  <small>WELCOME TO</small>
                  <h3>Mr. Sab Kuch</h3>
                </div>

                <div className="app-live">
                  ● LIVE
                </div>

              </div>

              <div className="app-search">
                🔎 What do you need today?
              </div>

              <div className="app-category-grid">

                {popularServices.slice(0, 4).map((service) => (
                  <Link
                    to={service.external ? "/" : service.path}
                    key={service.id}
                  >
                    <span>{service.icon}</span>
                    <b>{service.title}</b>
                    <small>{service.description.slice(0, 22)}...</small>
                  </Link>
                ))}

              </div>

              <div className="app-request">

                <div>
                  <small>Need something else?</small>
                  <b>Send a Request</b>
                </div>

                <a href="#enquiry">＋</a>

              </div>

            </div>

          </div>

        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="quick-actions">

          <div className="msk-wrap quick-actions-grid">

            <a href="#services">
              <span>🔎</span>
              <div>
                <b>Find a Service</b>
                <small>Explore services</small>
              </div>
            </a>

            <a href="#enquiry">
              <span>📝</span>
              <div>
                <b>Request Service</b>
                <small>Tell us your requirement</small>
              </div>
            </a>

            <a href={wa} target="_blank" rel="noreferrer">
              <span>💬</span>
              <div>
                <b>Chat on WhatsApp</b>
                <small>Quick assistance</small>
              </div>
            </a>

            <a href={`tel:${b.phone.replace(/\s/g, "")}`}>
              <span>📞</span>
              <div>
                <b>Call Support</b>
                <small>{b.phone}</small>
              </div>
            </a>

          </div>

        </section>

        {/* ================= POPULAR ================= */}
        

        {/* ================= ALL SERVICES ================= */}
        <section
          id="services"
          className="msk-section services-section"
        >

          <div className="msk-wrap">

            <div className="section-center">

              <span className="section-label">
                MR. SAB KUCH ECOSYSTEM
              </span>

              <h2>
                Our Services
              </h2>

              <p>
                Home, business, property, security, shopping,
                technology aur daily requirements ke liye
                alag-alag services ek hi platform par.
              </p>

            </div>

            <div className="big-service-search">

              <span>⌕</span>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What service are you looking for?"
              />

            </div>

            {/* SERVICE BOXES */}
            <div className="msk-service-grid">

              {services.map((s) => (

                <div
                  className="service-card"
                  key={s.id}
                >

                  <div className="service-card-top">

                    <div className="service-icon">
                      {s.icon}
                    </div>

                    <span className="service-arrow">
                      ↗
                    </span>

                  </div>

                  <h3>
                    {s.title}
                  </h3>

                  <p>
                    {s.description}
                  </p>

                  {s.external ? (

                    <a
                      href={s.path}
                      target="_blank"
                      rel="noreferrer"
                      className="service-open"
                    >
                      Explore Service →
                    </a>

                  ) : (

                    <Link
                      to={s.path}
                      className="service-open"
                    >
                      Explore Service →
                    </Link>

                  )}

                </div>

              ))}

            </div>

            {services.length === 0 && (
              <div className="no-services">
                <span>🔎</span>
                <h3>Service nahi mili</h3>
                <p>
                  Search ko change karke dobara try karein.
                </p>
              </div>
            )}

          </div>

        </section>


        <section className="msk-section popular-section">

          <div className="msk-wrap">

            <div className="section-head-row">

              <div>
                <span className="section-label">
                  POPULAR SERVICES
                </span>

                <h2>
                  What can we help you with?
                </h2>

                <p>
                  Apni requirement ke according service choose karein.
                </p>
              </div>

              <a href="#services">
                View All →
              </a>

            </div>

            <div className="popular-grid">

              {popularServices.map((s) => (

                <div
                  className="popular-card"
                  key={s.id}
                >

                  <div className="popular-icon">
                    {s.icon}
                  </div>

                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>

                  {s.external ? (
                    <a
                      href={s.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                      →
                    </a>
                  ) : (
                    <Link to={s.path}>→</Link>
                  )}

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="how-section">

          <div className="msk-wrap">

            <div className="section-center white">

              <span className="section-label">
                SIMPLE PROCESS
              </span>

              <h2>
                How Mr. Sab Kuch Works
              </h2>

              <p>
                Service chuniye, request bhejiye aur team se connect ho jaiye.
              </p>

            </div>

            <div className="steps-grid">

              <div className="step">
                <div className="step-number">01</div>
                <span>🔎</span>
                <h3>Choose Service</h3>
                <p>
                  Apni requirement ke according service select karein.
                </p>
              </div>

              <div className="step">
                <div className="step-number">02</div>
                <span>📝</span>
                <h3>Send Request</h3>
                <p>
                  Basic details submit karke enquiry bhejein.
                </p>
              </div>

              <div className="step">
                <div className="step-number">03</div>
                <span>📞</span>
                <h3>Team Connects</h3>
                <p>
                  Hamari team aapse requirement discuss karegi.
                </p>
              </div>

              <div className="step">
                <div className="step-number">04</div>
                <span>✅</span>
                <h3>Get Service</h3>
                <p>
                  Requirement ke according service complete hoti hai.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ================= PACKAGES ================= */}
        {cms.packages.filter((x) => x.visible).length > 0 && (

          <section className="msk-section packages-section">

            <div className="msk-wrap">

              <div className="section-center">

                <span className="section-label">
                  PLANS
                </span>

                <h2>
                  Packages & Solutions
                </h2>

                <p>
                  Business solutions aur packages.
                </p>

              </div>

              <div className="msk-package-grid">

                {cms.packages
                  .filter((x) => x.visible)
                  .map((p) => (

                    <div
                      className="package-card"
                      key={p.id}
                    >

                      <span className="package-tag">
                        {p.name}
                      </span>

                      <strong>
                        {p.price}
                      </strong>

                      <h3>
                        {p.subtitle}
                      </h3>

                      <ul>
                        {(p.features || []).map((f, i) => (
                          <li key={i}>
                            <span>✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={`${wa}?text=${encodeURIComponent(
                          `Hello, I want details about ${p.name} package.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="package-button"
                      >
                        Get Details →
                      </a>

                    </div>

                  ))}

              </div>

            </div>

          </section>

        )}

        {/* ================= OFFERS ================= */}
        {cms.offers
          .filter((x) => x.visible)
          .map((o) => (

            <section
              className="offer-banner"
              key={o.id}
            >

              <div className="msk-wrap offer-content">

                <div>
                  <span>LIMITED OFFER</span>
                  <h2>{o.title}</h2>
                  <p>{o.text}</p>
                </div>

                <a href="#enquiry">
                  {o.button || "Get Started"} →
                </a>

              </div>

            </section>

          ))}

        {/* ================= WHY US ================= */}
        <section className="msk-section why-section">

          <div className="msk-wrap">

            <div className="section-center">

              <span className="section-label">
                WHY MR. SAB KUCH
              </span>

              <h2>
                Everything connected in one place.
              </h2>

              <p>
                Customers, services, vendors and requests —
                all within one connected ecosystem.
              </p>

            </div>

            <div className="why-grid">

              <div className="why-card">
                <span>⚡</span>
                <h3>Easy & Fast</h3>
                <p>
                  Service discover karna aur enquiry bhejna simple hai.
                </p>
              </div>

              <div className="why-card">
                <span>📱</span>
                <h3>Mobile Friendly</h3>
                <p>
                  Phone par app-like responsive experience.
                </p>
              </div>

              <div className="why-card">
                <span>🔐</span>
                <h3>Connected System</h3>
                <p>
                  Customer requests aur business management connected.
                </p>
              </div>

              <div className="why-card">
                <span>🛠️</span>
                <h3>Growing Platform</h3>
                <p>
                  Future mein naye services aur modules add kiye ja sakte hain.
                </p>
              </div>

            </div>

            {cms.sections
              .filter((x) => x.visible)
              .map((s) => (

                <div
                  className="story-card"
                  key={s.id}
                >
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>

              ))}

          </div>

        </section>

        {/* ================= ENQUIRY ================= */}
        <section
          id="enquiry"
          className="enquiry-section"
        >

          <div className="msk-wrap enquiry-layout">

            <div className="enquiry-copy">

              <span className="section-label">
                NEED HELP?
              </span>

              <h2>
                Tell us what
                <br />
                you need.
              </h2>

              <p>
                Requirement bataiye. Hamari team aapse
                connect karke next steps discuss karegi.
              </p>

              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-large"
              >
                💬 WhatsApp Us
              </a>

              <div className="contact-mini">

                <div>
                  <span>Phone</span>
                  <b>{b.phone}</b>
                </div>

                <div>
                  <span>Email</span>
                  <b>{b.email}</b>
                </div>

              </div>

            </div>

            <form
              onSubmit={submitLead}
              className="lead-form"
            >

              <div className="form-title">

                <span>NEW REQUEST</span>

                <h3>
                  Send an Enquiry
                </h3>

              </div>

              <input
                placeholder="Your name *"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Mobile number *"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />

              <select
                value={form.service}
                onChange={(e) =>
                  setForm({
                    ...form,
                    service: e.target.value,
                  })
                }
              >

                <option value="">
                  Select service
                </option>

                {services.map((s) => (
                  <option
                    key={s.id}
                    value={s.title}
                  >
                    {s.title}
                  </option>
                ))}

              </select>

              <textarea
                placeholder="Tell us about your requirement..."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />

              <button
                className="submit-button"
                type="submit"
              >
                Submit Enquiry →
              </button>

              {status && (
                <div className="form-status">
                  {status}
                </div>
              )}

            </form>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="msk-footer">

        <div className="msk-wrap footer-main">

          <div className="footer-brand">

            <img
              src={logo30}
              alt="NISS Technology"
              className="footer-niss-logo"
            />

            <h2>
              {b.name}
            </h2>

            <p>
              Powered by {b.poweredBy}
            </p>

            <p className="footer-tagline">
              {b.tagline}
            </p>

          </div>

          <div>

            <h3>Services</h3>

            <a href="#services">
              All Services
            </a>

            <a href="#enquiry">
              Request Service
            </a>

            <Link to="/customerlogin">
              Customer Account
            </Link>

          </div>

          <div>

            <h3>Contact</h3>

            <a href={`tel:${b.phone}`}>
              {b.phone}
            </a>

            <a href={`mailto:${b.email}`}>
              {b.email}
            </a>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

          </div>

          <div>

            <h3>Office</h3>

            <p>
              {b.address}
            </p>

          </div>

        </div>

        <div className="copyright">
          © {new Date().getFullYear()} {b.name}.
          All rights reserved.
        </div>

      </footer>

      {/* ================= MOBILE NAV ================= */}
      <nav className="msk-bottom-nav">

        <a href="#" className="active">
          <span>⌂</span>
          Home
        </a>

        <a href="#services">
          <span>🔎</span>
          Services
        </a>

        <a
          href="#enquiry"
          className="new-request"
        >
          <span>＋</span>
          Request
        </a>

        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
        >
          <span>💬</span>
          Chat
        </a>

        <Link to="/mr-admin">
          <span>👤</span>
          Admin
        </Link>

      </nav>

    </div>
  );
}