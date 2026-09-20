import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const CMS_KEY = "mr_sab_kuch_cms_v2";
export const CMS_DOC = "site/cms";

export const defaultCMS = {
  brand: {
    name: "Mr. Sab Kuch",
    poweredBy: "NISS Technology",
    tagline: "Har Zarurat, Ek Hi Jagah",
    heroText: "Home services, security, interior, property, shopping, catering, laundry, events and digital solutions — one connected platform.",
    whatsapp: "919958424916",
    phone: "+91 9958424916",
    email: "technologiesniss@gmail.com",
    address: "Ground Floor, 122A, New Gandhi Nagar, Ghaziabad, Uttar Pradesh 201001",
    website: "https://www.nisstechnology.com/"
  },
  services: [
    {id:"quickfix",title:"NISS QuickFix",icon:"🔧",path:"/plumbing",description:"Plumbing, electrical, AC repair, carpentry, painting and cleaning.",visible:true},
    {id:"security",title:"Security Solutions",icon:"📹",path:"/cctv",description:"CCTV, biometric, access control, video door phone and AMC.",visible:true},
    {id:"interior",title:"Interior Design",icon:"🛋️",path:"/interior",description:"Residential, commercial, modular kitchen and turnkey interiors.",visible:true},
    {id:"guards",title:"Security Guard Services",icon:"👮",path:"/security",description:"Residential, corporate and event security services.",visible:true},
    {id:"property",title:"Property Services",icon:"🏠",path:"/property",description:"Buy, sell, rent, PG and property consultation.",visible:true},
    {id:"laundry",title:"Laundry Services",icon:"🧺",path:"/laundry",description:"Washing, dry cleaning, ironing, pickup and delivery.",visible:true},
    {id:"catering",title:"Catering & Tiffin",icon:"🍽️",path:"/catering",description:"Wedding, corporate, party catering and tiffin solutions.",visible:true},
    {id:"events",title:"Events & Tent Decoration",icon:"🎪",path:"/events",description:"Wedding decor, stage, lighting and event management.",visible:true},
    {id:"shop",title:"Shop & Electronics",icon:"🛒",path:"/shop",description:"Products, electronics and online purchase experience.",visible:true},
    {id:"digital",title:"Software & Digital",icon:"💻",path:"https://www.klikdigisetu.com/",external:true,description:"Website, apps, digital marketing and technology solutions.",visible:true},
    {id:"tailor",title:"Tailoring & Alteration",icon:"🧵",path:"/tailor",description:"Tailoring, stitching, alteration and booking.",visible:true},
    {id:"education",title:"Teacher & Skills",icon:"🎓",path:"/teacher",description:"Teacher and skill-service discovery.",visible:true}
  ],
  packages: [
    {id:"starter",name:"Starter",price:"₹4,999",subtitle:"Small business launch",features:["Basic setup","WhatsApp enquiry","1 service landing page"],visible:true},
    {id:"growth",name:"Growth",price:"₹14,999",subtitle:"Growing business",features:["Multi-service setup","Lead forms","Business branding support"],visible:true},
    {id:"custom",name:"Custom",price:"On Request",subtitle:"Complete custom solution",features:["Custom modules","Admin workflows","Integrations"],visible:true}
  ],
  sections: [
    {id:"why",title:"Why Mr. Sab Kuch?",text:"Ek single platform jahan customers services discover, enquiry, booking aur business solutions access kar sakte hain.",visible:true},
    {id:"ecosystem",title:"One platform, many teams",text:"Customer, vendor, field staff, property, shop, payments and service modules are connected inside the NISS Technology ecosystem.",visible:true}
  ],
  offers: [
    {id:"offer1",title:"Get a Quote",text:"Tell us what you need and our team will contact you.",button:"Get Quote",visible:true}
  ],
  gallery: [],
  testimonials: [
    {id:"t1",name:"Customer",text:"We are building the platform for simple service discovery and enquiry.",visible:true}
  ],
  stats: [
    {id:"s1",value:"12+",label:"Service categories"},
    {id:"s2",value:"1",label:"Connected platform"},
    {id:"s3",value:"24/7",label:"Enquiry access"}
  ]
};

const clone = value => JSON.parse(JSON.stringify(value));

export function mergeCMS(value) {
  if (!value) return clone(defaultCMS);
  return {
    ...clone(defaultCMS),
    ...value,
    brand: {...defaultCMS.brand, ...(value.brand || {})},
    services: Array.isArray(value.services) ? value.services : clone(defaultCMS.services),
    packages: Array.isArray(value.packages) ? value.packages : clone(defaultCMS.packages),
    sections: Array.isArray(value.sections) ? value.sections : clone(defaultCMS.sections),
    offers: Array.isArray(value.offers) ? value.offers : clone(defaultCMS.offers),
    gallery: Array.isArray(value.gallery) ? value.gallery : [],
    testimonials: Array.isArray(value.testimonials) ? value.testimonials : clone(defaultCMS.testimonials),
    stats: Array.isArray(value.stats) ? value.stats : clone(defaultCMS.stats)
  };
}

export function loadCMS() {
  try {
    const value = localStorage.getItem(CMS_KEY);
    return value ? mergeCMS(JSON.parse(value)) : clone(defaultCMS);
  } catch {
    return clone(defaultCMS);
  }
}

export function cacheCMS(data) {
  localStorage.setItem(CMS_KEY, JSON.stringify(mergeCMS(data)));
  window.dispatchEvent(new Event("mr-cms-updated"));
}

export async function loadRemoteCMS() {
  try {
    const snap = await getDoc(doc(db, CMS_DOC));
    if (snap.exists()) {
      const merged = mergeCMS(snap.data());
      cacheCMS(merged);
      return merged;
    }
  } catch (error) {
    console.warn("Mr. Sab Kuch remote CMS unavailable; using local cache.", error);
  }
  return loadCMS();
}

export async function saveRemoteCMS(data) {
  const merged = mergeCMS(data);
  await setDoc(doc(db, CMS_DOC), merged, {merge:false});
  cacheCMS(merged);
  return merged;
}

export function resetCMS() {
  localStorage.removeItem(CMS_KEY);
  window.dispatchEvent(new Event("mr-cms-updated"));
}
