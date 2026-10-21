/* ==========================================================================
   Components + language handling.
   - Page copy is written in English directly in the HTML (primary language, SEO).
   - Elements with data-i18n="key" are swapped for Latvian from lv.js.
   - Collections and product landing pages render from data.js in both languages.
   ========================================================================== */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG;
  const DATA = window.SITE_DATA;
  const LV = window.LV_COPY || {};
  const page = document.documentElement.dataset.page || "";

  /* ---------- Language ---------- */
  const DEFAULT_LANG = "lv";   // while the Latvian version is being finalised; switch to "en" later
  function storedLang() {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q === "en" || q === "lv") return q;
      return localStorage.getItem("lang") || DEFAULT_LANG;
    } catch (e) { return DEFAULT_LANG; }
  }
  let lang = storedLang();
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : (o[lang] ?? o.en ?? ""));
  const ui = (key, en) => (lang === "lv" && LV.ui && LV.ui[key]) || en;

  const originals = new Map();
  function applyStaticCopy() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = lang === "lv" && LV[key] != null ? LV[key] : originals.get(el);
    });
    const meta = LV.meta && LV.meta[page];
    if (!originals.has("title")) {
      originals.set("title", document.title);
      originals.set("desc", document.querySelector('meta[name="description"]')?.content || "");
    }
    document.title = lang === "lv" && meta ? meta.title : originals.get("title");
    const d = document.querySelector('meta[name="description"]');
    if (d) d.content = lang === "lv" && meta ? meta.description : originals.get("desc");
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem("lang", next); } catch (e) {}
    renderAll();
  }

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const plain = (html) => html.replace(/<[^>]+>/g, "");
  const bookingHref = () => CFG.bookingUrl || "contact.html?topic=coaching";
  function formatPrice(p) {
    if (!p || p.amount == null) return null;
    return new Intl.NumberFormat(lang === "lv" ? "lv-LV" : "en-IE", { style: "currency", currency: p.currency || "EUR", maximumFractionDigits: 0 }).format(p.amount);
  }

  /* ---------- Component: Header (name + a couple of links + language) ---------- */
  function langSwitch() {
    return `<div class="lang-switch" role="group" aria-label="${ui("language", "Language")}">
      <button type="button" data-lang="en" aria-pressed="${lang === "en"}" lang="en">EN</button><span aria-hidden="true">|</span>
      <button type="button" data-lang="lv" aria-pressed="${lang === "lv"}" lang="lv">LV</button>
    </div>`;
  }
  function renderHeader() {
    const el = document.querySelector("[data-component='header']");
    if (!el) return;
    el.innerHTML = `
      <a class="skip-link" href="#main">${ui("skip", "Skip to content")}</a>
      <div class="container site-header__inner">
        <a class="logo" href="index.html">Madara <span>Lazdāne</span></a>
        <nav class="header-links" aria-label="${ui("mainNav", "Main")}">
          <a class="hide-sm" href="about.html"${page === "about" ? ' aria-current="page"' : ""}>${ui("about", "About")}</a>
          <a class="hide-sm" href="contact.html"${page === "contact" ? ' aria-current="page"' : ""}>${ui("contact", "Contact")}</a>
          ${langSwitch()}
        </nav>
      </div>`;
  }

  /* ---------- Component: Footer (minimal) ---------- */
  function renderFooter() {
    const el = document.querySelector("[data-component='footer']");
    if (!el) return;
    const social = Object.entries(CFG.social || {}).filter(([, v]) => v);
    el.innerHTML = `
      <div class="container footer__row">
        <span>© ${new Date().getFullYear()} Madara Lazdāne</span>
        <div class="footer__links">
          <a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a>
          ${social.map(([k, v]) => `<a href="${esc(v)}" rel="noopener" target="_blank">${k[0].toUpperCase() + k.slice(1)}</a>`).join("")}
          <a href="privatuma.html">${ui("privacy", "Privacy policy")}</a>
          <a href="noteikumi.html">${ui("terms", "Terms")}</a>
        </div>
      </div>`;
  }

  /* ---------- Component: product mockups ---------- */
  function mockup(p, light) {
    if (p.mockup === "workbook") {
      return `<div class="stage${light ? " stage--light" : ""}" aria-hidden="true">
        <div class="workbook"><div class="workbook__num">36</div>
          <div><div class="workbook__title">Do It For <em>Your Future</em> Self</div>
          <div class="workbook__meta">${ui("wbMeta", "A 36-day guided workbook")}</div></div></div></div>`;
    }
    if (p.mockup === "cards") {
      const qs = (p.sampleQuestions || []).slice(0, 3);
      return `<div class="stage${light ? " stage--light" : ""}" aria-hidden="true"><div class="cardset">
        ${qs.map((q, i) => `<div class="mcard"><small>${pad(i + 1)}</small><span>${t(q)}</span><small>${ui("askYourself", "Ask yourself")}</small></div>`).join("")}
      </div></div>`;
    }
    return `<figure class="ph"><figcaption>${plain(t(p.name))}</figcaption></figure>`;
  }
  function heroVisual(p, light) {
    const img = p.heroImage;
    if (img && img.src) return `<figure class="media"><img src="${esc(img.src)}" alt="${esc(t(img.alt))}"${img.position ? ` style="object-position:${img.position}"` : ""} fetchpriority="high" decoding="async"></figure>`;
    return mockup(p, light);
  }

  /* ---------- Component: Product card (for listing products anywhere) ---------- */
  function productCard(p) {
    const price = formatPrice(p.price);
    return `<a class="product-card" href="${p.url}">
      ${heroVisual(p, true)}
      <span class="product-card__kicker">${t(p.kicker)}</span>
      <h3>${t(p.name)}</h3>
      <p class="muted">${t(p.tagline)}</p>
      <span class="product-card__foot"><span class="price">${price || ui("pricePending", "Price coming soon")}</span><span class="text-link">${ui("viewProduct", "View")}</span></span>
    </a>`;
  }

  /* ---------- Component: Product landing page ---------- */
  function renderProductPage(el) {
    const p = DATA.products.find((x) => x.id === el.dataset.product);
    if (!p) return;
    const price = formatPrice(p.price);
    const ctaText = t(p.ctaLabel);
    const edName = `edition-${p.id}`;

    el.innerHTML = `
      <section class="split">
        <div class="split__media">${heroVisual(p)}</div>
        <div class="split__body">
          <p class="eyebrow">${t(p.kicker)}</p>
          <h1${p.oneLineTitle ? ' class="h1--oneline"' : ""}>${t(p.name)}</h1>
          <p class="lead">${t(p.tagline)}</p>
          <ul class="caps-list">${p.highlights.map((h) => `<li>${t(h)}</li>`).join("")}</ul>
          <div><a class="btn btn--primary" href="#buy">${ctaText}</a></div>
          <p class="btn-note">${t(p.ctaNote)}</p>
        </div>
      </section>

      <section class="section section--paper2 pain">
        <div class="container">
          <h2>${t(p.pains.title)}</h2>
          ${p.pains.items.length ? `<ul class="pain__list">${p.pains.items.map((i) => `<li>${t(i)}</li>`).join("")}</ul>` : ""}
          <p class="lead pain__close">${t(p.pains.close)}</p>
          <a class="btn btn--primary mt-6" href="#buy">${t(p.ctaLabel)}</a>
        </div>
      </section>

      ${p.video && p.video.youtubeId ? (() => {
        const v = p.video, id = esc(v.youtubeId);
        const player = `<div class="video${v.vertical ? " video--vertical" : ""}" data-yt="${id}">
            <button type="button" class="video__play" aria-label="${ui("playVideo", "Play video")}">
              <img src="https://i.ytimg.com/vi/${id}/${v.vertical ? "oar2" : "maxresdefault"}.jpg" alt="" loading="lazy" decoding="async">
              <span class="video__icon" aria-hidden="true"></span>
            </button>
          </div>`;
        return v.vertical
          ? `<section class="section">
        <div class="container video-split">
          <div>
            <h2>${t(v.title)}</h2>
            <a class="btn btn--primary" href="#buy">${t(p.ctaLabel)}</a>
          </div>
          ${player}
        </div>
      </section>`
          : `<section class="section section--tight">
        <div class="container">
          ${v.title ? `<div class="section-head section-head--wide"><h2>${t(v.title)}</h2></div>` : ""}
          ${player}
        </div>
      </section>`;
      })() : ""}

      ${p.areas ? `<section class="section">
        <div class="container about-block">
          <figure class="media" style="--ratio:4/5"><img src="${esc(p.areas.image.src)}" alt="${esc(t(p.areas.image.alt))}" style="object-position:${p.areas.image.position || "50% 50%"}" loading="lazy" decoding="async"></figure>
          <div>
            <h2>${t(p.areas.title)}</h2>
            ${p.areas.lead ? `<p class="lead">${t(p.areas.lead)}</p>` : ""}
            <ol class="areas">${p.areas.items.map((a, i) => `<li><span>${pad(i + 1)}</span>${t(a)}</li>`).join("")}</ol>
          </div>
        </div>
      </section>` : ""}

      <section class="section">
        <div class="container">
          <div class="section-head"><p class="eyebrow">${p.outcomesEyebrow ? t(p.outcomesEyebrow) : ui("outcomesEyebrow", "What you'll get")}</p>
            <h2>${p.outcomesTitle ? t(p.outcomesTitle) : ui("outcomesTitle", "What you'll <em>take away</em>")}</h2></div>
          <ol class="outcomes outcomes--cards${p.outcomes.length % 3 === 0 ? " outcomes--3" : ""}">${p.outcomes.map((o, i) => `<li class="outcome"><span class="outcome__num">${pad(i + 1)}.</span><h3>${t(o.title)}</h3><p>${t(o.text)}</p></li>`).join("")}</ol>
        </div>
      </section>

      ${p.steps && p.steps.length ? `<section class="section section--dark">
        <div class="container">
          <div class="section-head"><p class="eyebrow">${ui("howItWorks", "How it works")}</p>
            <h2>${p.stepsTitle ? t(p.stepsTitle) : p.id === "journey" ? ui("howJourney", "Thirty-six days. <em>Three parts.</em>") : ui("howCards", "One card. <em>One honest answer.</em>")}</h2></div>
          <ol class="steps">${p.steps.map((s) => `<li><span class="steps__label">${t(s.label)}</span><h3>${t(s.title)}</h3><p class="muted">${t(s.text)}</p></li>`).join("")}</ol>
        </div>
      </section>` : ""}

      ${p.audiences ? `<section class="section">
        <div class="container grid grid--split">
          <div><h2>${t(p.audiencesTitle)}</h2></div>
          <ul class="audiences">${p.audiences.map((a) => `<li><h3>${t(a.title)}</h3><p>${t(a.text)}</p></li>`).join("")}</ul>
        </div>
      </section>` : ""}

      ${p.gallery ? `<section class="section section--paper2">
        <div class="container">
          <div class="section-head"><h2>${t(p.gallery.title)}</h2></div>
          <div class="photo-grid">${p.gallery.images.map((g) => `<figure class="media"><img src="${esc(g.src)}" alt="${esc(t(g.alt))}"${g.position ? ` style="object-position:${g.position}"` : ""} loading="lazy" decoding="async"></figure>`).join("")}</div>
        </div>
      </section>` : ""}

      ${p.bonus ? `<section class="section section--plum">
        <div class="container">
          <div class="section-head section-head--wide"><p class="eyebrow">${t(p.bonus.eyebrow)}</p>
            <h2>${t(p.bonus.title)}</h2><p class="lead">${t(p.bonus.lead)}</p></div>
          <ul class="help-cards help-cards--2">${p.bonus.items.map((b) => `<li class="help-card${b.text ? "" : " help-card--compact"}"><span class="help-card__num">✓</span><h3>${t(b.title)}</h3>${b.text ? `<p>${t(b.text)}</p>` : ""}</li>`).join("")}</ul>
          ${p.bonus.note ? `<p class="bonus-note">${t(p.bonus.note)}</p>` : ""}
        </div>
      </section>` : ""}

      <section class="section section--paper2" id="buy">
        <div class="container">
          <div class="price-box">
            <p class="eyebrow">${t(p.kicker)}</p>
            <h2>${t(p.name)}</h2>
            <p class="price">${price || ui("pricePending", "Price coming soon")}${price ? `<small>${p.priceNote ? t(p.priceNote) : ui("inclVat", "incl. VAT")}</small>` : ""}</p>
            <ul class="ticks">${p.includes.map((i) => `<li>${t(i)}</li>`).join("")}</ul>
            ${p.details ? `<ul class="details">${p.details.map((d) => `<li>${t(d)}</li>`).join("")}</ul>` : ""}
            <form data-checkout>
              <fieldset class="edition">
                <legend>${ui("edition", "Choose your language")}</legend>
                <div class="edition__opts">
                  ${p.editions.map((e) => `<label><input type="radio" name="${edName}" value="${e.code}"${e.code === lang ? " checked" : ""}><span>${t(e.label)}</span></label>`).join("")}
                </div>
              </fieldset>
              <button class="btn btn--primary btn--block" type="submit">${t(p.ctaLabel)}</button>
              <p class="secure-note"><svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true"><path d="M2 6V4a4 4 0 1 1 8 0v2h1v8H1V6h1Zm2 0h4V4a2 2 0 1 0-4 0v2Z" fill="currentColor"/></svg>${ui("secure", "Secure checkout")}</p>
              <p class="terms-note">${ui("termsNote", "By placing an order you agree to the <a href=\"noteikumi.html\">distance contract</a>.")}</p>
              <div class="notice" data-checkout-msg hidden></div>
            </form>
          </div>
        </div>
      </section>

      ${aboutBlock()}

      <section class="section section--paper2">
        <div class="container container--narrow">
          <h2 class="center">${ui("faqTitle", "Frequently asked questions")}</h2>
          <div class="faq mt-6">${p.faq.map((f) => `<details><summary>${t(f.q)}</summary><div><p>${t(f.a)}</p></div></details>`).join("")}
          </div>
        </div>
      </section>

      <section class="cta-band">
        <div class="container cta-band__inner">
          <h2>${p.closing ? t(p.closing) : p.id === "journey" ? ui("closeJourney", "Your future self is <em>waiting on one decision.</em>") : ui("closeCards", "The right question <em>changes the answer.</em>")}</h2>
          <div class="btn-row"><a class="btn btn--dark" href="#buy">${ctaText}</a></div>
        </div>
      </section>`;

    // Video: load the YouTube player only when the visitor presses play (keeps the page fast).
    el.querySelectorAll(".video").forEach((v) => {
      v.querySelector(".video__play").addEventListener("click", () => {
        v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1&rel=0&modestbranding=1" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      });
    });

    // Checkout — integration point. Each language edition can have its own hosted checkout URL
    // (Stripe Payment Link, Lemon Squeezy, Shopify Buy Button, Paddle, etc.).
    el.querySelector("[data-checkout]").addEventListener("submit", (e) => {
      e.preventDefault();
      const code = new FormData(e.target).get(edName);
      const ed = p.editions.find((x) => x.code === code);
      if (ed && ed.checkoutUrl) { location.href = ed.checkoutUrl; return; }
      const msg = el.querySelector("[data-checkout-msg]");
      msg.hidden = false;
      msg.innerHTML = ui("checkoutSoon", "Checkout opens soon. <a href=\"contact.html?topic=product\">Leave your email</a> and you'll be the first to know.");
    });
  }

  /* ---------- Component: short "About me" block (shared on offer pages) ---------- */
  function aboutBlock() {
    return `<section class="section">
      <div class="container about-block">
        <figure class="media" style="--ratio:4/5"><img src="assets/img/madara-rudens-smaids.jpg" alt="Madara Lazdāne" width="1066" height="1600" style="object-position:60% 30%" loading="lazy" decoding="async"></figure>
        <div>
          <p class="eyebrow">${ui("aboutEyebrow", "Career &amp; growth mentor")}</p>
          <h2>${ui("aboutTitle", "Madara Lazdāne <em class=\"h1-sub\">I choose both, too…</em>")}</h2>
          <p>${ui("aboutP1", "I still work a salaried job, and at the same time I build my own projects, write, create content, work with companies and run career coaching sessions. And I don't feel that these worlds compete. Quite the opposite. They complement each other.")}</p>
          <p class="muted">${ui("aboutP2", "My professional background is in law and sustainability management in real estate. I know what it's like to do both.")}</p>
          <a class="text-link" href="about.html">${ui("aboutMore", "More about me")}</a>
        </div>
      </div>
    </section>`;
  }

  /* ---------- Collections ---------- */
  const renderers = {
    products(el) { el.innerHTML = DATA.products.map(productCard).join(""); },
    services(el) {
      el.innerHTML = DATA.services.map((s, i) => `<article class="service"><span class="service__num">${pad(i + 1)}.</span><h3>${t(s.title)}</h3><p>${t(s.text)}</p></article>`).join("");
    },
    themes(el) {
      const limit = +el.dataset.limit || DATA.workshopThemes.length;
      el.innerHTML = DATA.workshopThemes.slice(0, limit).map((w, i) => `<li class="theme"><span class="theme__num">${pad(i + 1)}.</span><h3>${t(w.title)}</h3><p>${t(w.text)}</p></li>`).join("");
    },
    events(el) {
      if (!DATA.events.length) {
        el.innerHTML = `<div class="event-empty"><h3>${ui("noEvents", "No public dates announced yet.")}</h3><p class="muted">${ui("noEventsText", "Register your interest below and you'll hear about new workshops before anyone else.")}</p></div>`;
        return;
      }
      el.innerHTML = DATA.events.map((ev) => `<article class="event"><span class="event__date">${t(ev.date)}</span>
        <div><h3 style="font-size:var(--fs-lg);margin:0">${t(ev.title)}</h3><span class="muted">${t(ev.place)}</span></div>
        ${ev.url ? `<a class="btn btn--primary" href="${esc(ev.url)}">${ui("register", "Register")}</a>` : ""}</article>`).join("");
    },
    testimonials(el) {
      el.innerHTML = DATA.testimonials.map((q) => `<figure class="testimonial">
        ${q.placeholder ? `<span class="ph-tag">${ui("placeholder", "Placeholder")}</span>` : ""}
        <blockquote><p>${t(q.quote)}</p></blockquote>
        <figcaption><strong>${esc(q.name)}</strong><span class="muted">${t(q.context)}</span></figcaption></figure>`).join("");
    },
    about(el) { el.innerHTML = aboutBlock(); },
    product: renderProductPage
  };

  function renderCollections() {
    document.querySelectorAll("[data-render]").forEach((el) => renderers[el.dataset.render] && renderers[el.dataset.render](el));
    document.querySelectorAll("[data-href='booking']").forEach((a) => {
      a.href = bookingHref();
      if (CFG.bookingUrl) { a.target = "_blank"; a.rel = "noopener"; }
    });
    document.querySelectorAll("[data-email]").forEach((a) => { a.href = "mailto:" + CFG.email; a.textContent = CFG.email; });
  }

  /* ---------- Forms ---------- */
  function bindForms(root) {
    root.querySelectorAll("form[data-form]").forEach((form) => {
      if (form.dataset.bound) return;
      form.dataset.bound = "1";
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = form.querySelector(".form__status");
        const say = (msg, state) => { status.textContent = msg; status.dataset.state = state; };
        if (!form.checkValidity()) {
          const bad = form.querySelector(":invalid");
          say(ui("formInvalid", "Please check the highlighted fields."), "error");
          bad && bad.focus();
          return;
        }
        if (!CFG.formEndpoint) {
          say(ui("formNotConnected", "Thank you! (This form isn't connected yet — add an endpoint in config.js.)"), "ok");
          return;
        }
        try {
          const res = await fetch(CFG.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error(res.status);
          form.reset();
          say(ui("formOk", "Thank you — I'll be in touch soon."), "ok");
        } catch (err) {
          say(ui("formError", "Something went wrong. Please email me directly."), "error");
        }
      });
    });
  }

  function prefillTopic() {
    const sel = document.querySelector("select[name='topic']");
    if (!sel) return;
    try {
      const topic = new URLSearchParams(location.search).get("topic");
      if (topic && sel.querySelector(`option[value="${CSS.escape(topic)}"]`)) sel.value = topic;
    } catch (e) {}
  }

  /* ---------- Boot ---------- */
  function renderAll() {
    applyStaticCopy();
    renderHeader();
    renderFooter();
    renderCollections();
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]");
    if (b) setLang(b.dataset.lang);
  });

  renderAll();
  bindForms(document);
  prefillTopic();
})();
