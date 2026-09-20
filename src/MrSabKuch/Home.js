import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";
import {loadCMS, loadRemoteCMS} from "./cms";
import "./MrSabKuch.css";

const waLink = phone => `https://wa.me/${String(phone || "919958424916").replace(/\D/g, "")}`;

export default function MrSabKuchHome(){
  const [cms,setCms]=useState(loadCMS());
  const [query,setQuery]=useState("");
  const [form,setForm]=useState({name:"",phone:"",service:"",message:""});
  const [status,setStatus]=useState("");

  useEffect(()=>{
    loadRemoteCMS().then(setCms);
    const fn=()=>setCms(loadCMS());
    window.addEventListener("mr-cms-updated",fn);
    window.addEventListener("storage",fn);
    return()=>{window.removeEventListener("mr-cms-updated",fn);window.removeEventListener("storage",fn)};
  },[]);

  const services = useMemo(()=>cms.services.filter(s=>s.visible && (`${s.title} ${s.description}`.toLowerCase().includes(query.toLowerCase()))),[cms.services,query]);
  const b=cms.brand;
  const wa=waLink(b.whatsapp);

  const submitLead=async e=>{
    e.preventDefault();
    if(!form.name || !form.phone){setStatus("Name aur mobile number zaroor bharein.");return;}
    try{
      await addDoc(collection(db,"leads"),{...form,source:"Mr. Sab Kuch",createdAt:serverTimestamp()});
      setStatus("Enquiry submitted. Our team will contact you.");
      setForm({name:"",phone:"",service:"",message:""});
    }catch(error){
      const saved=JSON.parse(localStorage.getItem("mr_sab_kuch_leads")||"[]");
      saved.push({...form,source:"Mr. Sab Kuch",createdAt:new Date().toISOString()});
      localStorage.setItem("mr_sab_kuch_leads",JSON.stringify(saved));
      setStatus("Enquiry saved on this device. WhatsApp se bhi contact kar sakte hain.");
    }
  };

  return <div className="msk-app">
    <header className="msk-topbar">
      <Link to="/" className="msk-brand"><img src="/logo.png" alt="NISS Technology"/><span><b>{b.name}</b><small>Powered by {b.poweredBy}</small></span></Link>
      <div className="msk-top-actions"><a href={wa} target="_blank" rel="noreferrer">WhatsApp</a><a href={`tel:${b.phone.replace(/\s/g,"")}`}>Call</a><Link to="/mr-admin">Admin</Link></div>
    </header>

    <main className="msk-main">
      <section className="msk-hero-app">
        <div className="msk-wrap hero-inner">
          <div className="hero-copy"><span className="msk-kicker">{b.poweredBy}</span><h1>{b.name}</h1><h2>{b.tagline}</h2><p>{b.heroText}</p><div className="hero-buttons"><a href={wa} target="_blank" rel="noreferrer" className="msk-btn primary">WhatsApp Enquiry</a><a href="#services" className="msk-btn">Explore Services</a></div></div>
          <div className="hero-dashboard"><div className="dash-head"><span>One App</span><span className="live-dot">● Live</span></div><h3>Services, shopping & business in one place.</h3><div className="mini-grid"><span>👤 Customer</span><span>🏪 Vendor</span><span>🧑‍🔧 Field Staff</span><span>🏠 Property</span><span>🛒 Shop</span><span>📋 Bookings</span></div><Link to="/customerlogin" className="dash-link">Open Customer Area →</Link></div>
        </div>
      </section>

      <section className="msk-quick"><div className="msk-wrap quick-grid"><a href="#services">🔎 Find Service</a><a href="#enquiry">📝 New Request</a><a href={wa} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="tel:+919958424916">📞 Call Support</a></div></section>

      <section id="services" className="msk-section"><div className="msk-wrap"><div className="msk-heading"><span>EXPLORE</span><h2>All Services</h2><p>Search karke service choose karein. Har card existing NISS module ya external business service se connect ho sakta hai.</p></div><div className="service-search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services..."/></div><div className="msk-service-grid">{services.map(s=><div className="service-card" key={s.id}><div className="service-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.description}</p>{s.external?<a href={s.path} target="_blank" rel="noreferrer" className="msk-link">Open Service →</a>:<Link className="msk-link" to={s.path}>Open Service →</Link>}</div>)}</div></div></section>

      <section className="msk-section soft"><div className="msk-wrap"><div className="msk-heading"><span>OFFERS & PLANS</span><h2>Packages</h2><p>Admin panel se names, prices, features aur visibility change ki ja sakti hai.</p></div><div className="msk-package-grid">{cms.packages.filter(x=>x.visible).map(p=><div className="package-card" key={p.id}><span className="package-name">{p.name}</span><strong>{p.price}</strong><p>{p.subtitle}</p><ul>{(p.features||[]).map((f,i)=><li key={i}>✓ {f}</li>)}</ul><a href={`${wa}?text=${encodeURIComponent(`Hello, I want details about ${p.name} package.`)}`} target="_blank" rel="noreferrer" className="msk-btn primary full">Enquire</a></div>)}</div></div></section>

      {cms.offers.filter(x=>x.visible).map(o=><section className="msk-offer" key={o.id}><div className="msk-wrap offer-inner"><div><span>OFFER</span><h2>{o.title}</h2><p>{o.text}</p></div><a href="#enquiry" className="msk-btn primary">{o.button || "Get Started"}</a></div></section>)}

      <section className="msk-section"><div className="msk-wrap"><div className="stats-grid">{cms.stats.map(s=><div className="stat-card" key={s.id}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>{cms.sections.filter(x=>x.visible).map(s=><div className="story-card" key={s.id}><h2>{s.title}</h2><p>{s.text}</p></div>)}</div></section>

      <section id="enquiry" className="msk-section enquiry-section"><div className="msk-wrap enquiry-grid"><div><span className="msk-kicker">NEW REQUEST</span><h2>Tell us what you need</h2><p>Enquiry submit hote hi admin panel ke Leads section me request aa sakti hai.</p><a className="msk-btn" href={wa} target="_blank" rel="noreferrer">WhatsApp instead</a></div><form onSubmit={submitLead} className="lead-form"><input placeholder="Your name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="Mobile number *" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option value="">Select service</option>{cms.services.map(s=><option key={s.id}>{s.title}</option>)}</select><textarea placeholder="What do you need?" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/><button className="msk-btn primary" type="submit">Submit Enquiry</button>{status&&<div className="form-status">{status}</div>}</form></div></section>
    </main>

    <footer className="msk-footer"><div className="msk-wrap footer-grid"><div><h2>{b.name}</h2><p>Powered by {b.poweredBy}</p></div><div><b>Contact</b><p>{b.phone}</p><p>{b.email}</p></div><div><b>Office</b><p>{b.address}</p></div></div><div className="copyright">© {new Date().getFullYear()} {b.name}. All rights reserved.</div></footer>
    <nav className="msk-bottom-nav"><a href="#services">⌂<span>Home</span></a><a href="#services">🔎<span>Services</span></a><a href="#enquiry" className="new-request">＋<span>Request</span></a><a href={wa} target="_blank" rel="noreferrer">💬<span>Chat</span></a><Link to="/customerlogin">👤<span>Account</span></Link></nav>
  </div>
}
