/* =========================================================
   Shop details: edit only this CONFIG block
   ========================================================= */
const CONFIG = {
  name: "Shree Hari Photo State & Money Transfer",
  shortName: "Shree Hari",
  tagline: "Fast, trusted photocopy and money transfer in Shimla Bahadur, Rudrapur",
  phone: "9997775777",
  whatsapp: "919997775777",              // 91 + number, no + or spaces
  email: "idfcshree@gmail.com",
  address: "Shimla Bahadur, U.S. Nagar, Rudrapur, Uttarakhand - 263153",
  since: 2016,
  timings: [
    ["Every day", "8:00 AM - 8:00 PM"]   // change if any day is closed
  ],
  mapEmbed: "",                          // optional Google Maps embed link
  customersPerMonth: "200+"
};

/* Services: remove or add blocks as needed */
const SERVICES = [
  { icon: "🖨️", name: "Photocopy", desc: "Clear and fast photocopies of your documents.",
    docs: ["Original document(s) you want copied"] },
  { icon: "💸", name: "Money Transfer", desc: "Quick and safe money transfer to a bank account.",
    docs: ["Receiver's name, account number and bank / IFSC", "Your Aadhaar or photo ID", "Cash amount to send"] },
  { icon: "🧾", name: "Mini Statement", desc: "Check the recent transactions of your bank account.",
    docs: ["Your ATM / debit card or passbook", "Mobile number linked to the account"] },
  { icon: "🏦", name: "Account Opening - BOB", desc: "Open a Bank of Baroda account with our help.",
    docs: ["Aadhaar card", "PAN card", "Passport size photos", "Mobile number"] },
  { icon: "🏦", name: "Account Opening - IOB", desc: "Open an Indian Overseas Bank account with our help.",
    docs: ["Aadhaar card", "PAN card", "Passport size photos", "Mobile number"] }
];
/* ========================================================= */

const $ = (s) => document.querySelector(s);
const waLink = (text) =>
  "https://wa.me/" + CONFIG.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");

/* Basic info */
const years = new Date().getFullYear() - CONFIG.since;
document.title = CONFIG.name + " - Rudrapur";
$("#brand-name").textContent = CONFIG.shortName;
$("#hero-title").textContent = CONFIG.name;
$("#foot-name").textContent = CONFIG.name;
$("#tagline").textContent = CONFIG.tagline;
$("#year").textContent = new Date().getFullYear();
$("#why-years").textContent = years + "+ years of trust";

const hello = "Hello, I need some information from " + CONFIG.name + ".";
$("#hero-wa").href = waLink(hello);
$("#float-wa").href = waLink(hello);
$("#hero-call").href = "tel:+91" + CONFIG.phone;

/* Stats */
const stats = [
  [years + "+", "Years of service"],
  [CONFIG.customersPerMonth, "Customers every month"],
  ["BOB & IOB", "Account opening"]
];
$("#stats").innerHTML = stats
  .map(([n, label]) => '<div class="stat"><b>' + n + "</b><span>" + label + "</span></div>")
  .join("");

/* Services */
$("#service-grid").innerHTML = SERVICES
  .map((s) => {
    const msg = "Hello, I need help with: " + s.name + ".";
    return (
      '<details class="svc"><summary>' +
      '<span class="ico">' + s.icon + "</span>" +
      "<div><h3>" + s.name + "</h3><p>" + s.desc + "</p></div></summary>" +
      '<div class="docs"><h4>What to bring</h4><ul>' +
      s.docs.map((d) => "<li>" + d + "</li>").join("") +
      '</ul><a class="ask" target="_blank" rel="noopener" href="' + waLink(msg) + '">Ask on WhatsApp</a></div>' +
      "</details>"
    );
  })
  .join("");

/* Service dropdown in form */
$("#f-service").innerHTML =
  SERVICES.map((s) => "<option>" + s.name + "</option>").join("") + "<option>Something else</option>";

/* Timings, address, map */
$("#time-table").innerHTML = CONFIG.timings
  .map(([d, t]) => "<tr><td>" + d + "</td><td>" + t + "</td></tr>")
  .join("");
$("#address").textContent = CONFIG.address;
$("#c-address").textContent = CONFIG.address;

if (CONFIG.mapEmbed) {
  $("#map-wrap").innerHTML =
    '<iframe src="' + CONFIG.mapEmbed + '" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>';
} else {
  $("#map-wrap").innerHTML =
    '<a class="map-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(CONFIG.name + ", " + CONFIG.address) + '">View on Google Maps</a>';
}

/* Contact info */
const phoneEl = $("#c-phone");
phoneEl.textContent = "+91 " + CONFIG.phone;
phoneEl.href = "tel:+91" + CONFIG.phone;
if (CONFIG.email) {
  $("#c-email-row").classList.remove("hidden");
  $("#c-email").textContent = CONFIG.email;
  $("#c-email").href = "mailto:" + CONFIG.email;
}

/* Enquiry form -> WhatsApp */
$("#enquiry").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#f-name").value.trim();
  const phone = $("#f-phone").value.trim();
  const service = $("#f-service").value;
  const extra = $("#f-msg").value.trim();
  const text =
    "Hello, my name is " + name + " (mobile: " + phone + ").\n" +
    "I need help with: " + service + "." +
    (extra ? "\nMessage: " + extra : "");
  window.open(waLink(text), "_blank", "noopener");
});

/* Mobile menu */
const links = $("#links");
$("#menu-btn").addEventListener("click", () => links.classList.toggle("open"));
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});