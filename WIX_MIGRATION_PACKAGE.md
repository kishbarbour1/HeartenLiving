# Hearten Transitional Living — Wix Migration & Build Package

Everything you need to rebuild this website in Wix, written for a non-developer.
No coding required. Use Wix's AI website builder first, then follow the page specs.

> **This document reflects the FINAL approved website.** It was last updated after the
> final pre-migration content and hero-image corrections. Where this document and the live
> site ever disagree, **the live site is the source of truth.**

---

## 1. Brand Kit (set this up first in Wix)

### Colors (exact HEX)

| Role | Name | HEX | Where it's used |
|---|---|---|---|
| Primary | Burgundy | `#6E1423` | Headlines, primary buttons, dark sections, footer |
| Primary (dark) | Burgundy Dark | `#560F1B` | Values strip bar, button hover |
| Primary (light) | Burgundy Light | `#8C1D2E` | Button hover on primary buttons |
| Accent | Gold | `#BE8A2C` | Donate button, dividers, icon accents |
| Accent (light) | Gold Light | `#E3B95E` | Icons/text on burgundy backgrounds |
| Accent (dark) | Gold Dark | `#9A6E1E` | Small labels, script text, links |
| Background | Cream | `#FBF6EC` | Main page background |
| Background (card) | Cream Card | `#F6ECD6` | Alternating section background |
| Background (deep) | Cream Deep | `#F0E2C4` | Gradient bottoms, hover fills |
| Text | Ink | `#2A1D1F` | Body text (near-black brown) |

Wix theme setup: set **Main color = Burgundy `#6E1423`**, **Accent = Gold `#BE8A2C`**, **Background = Cream `#FBF6EC`**, **Text = Ink `#2A1D1F`**.

### Fonts / Typography

| Use | Font (current site) | Wix substitute (closest built-in) | Notes |
|---|---|---|---|
| Brand name "Hearten", big headings | Playfair Display (serif) | **Playfair Display** (available in Wix) | Bold/Extra-bold |
| Section headings, sub-headings | Roboto Slab (slab serif) | **Roboto Slab** (available in Wix) | Bold, uppercase for labels |
| Decorative script lines | Dancing Script (cursive) | **Dancing Script** (available in Wix) | e.g. "Your Future Starts Here." |
| Body text | Inter | **Inter** (available in Wix) | Regular |

Typography rules to copy:
- Big headings: 36–60px desktop, bold, burgundy.
- Script accent lines: ~28–34px, gold-dark.
- Small uppercase labels (e.g. "WHO WE SERVE"): ~12–14px, bold, letter-spacing wide, gold-dark.
- Body text: 16–18px, ink at ~70% opacity (soft brown-gray).

---

## 2. Navigation Structure

Top menu (4 links + 1 button):

1. **Home** → `/` (home page)
2. **Services** → Services page
3. **About** → About page
4. **Contact** → Contact page
5. **Donate** → Donate page (styled as a **gold pill button** with a heart icon)

Footer "Explore" menu (5 links):
Home · Services · **About** · Contact · Donate

> **Naming rule:** the label is **"About"** everywhere — header navigation, footer
> navigation and page links. Never "About Us". The About page itself is not renamed.

---

## 3. Header Specification

- **Position:** Fixed to the top, full width, sits above content (content starts ~72px down).
- **Background:** Cream, slightly translucent (frosted glass look), turns more solid with a soft shadow once the visitor scrolls.
- **Height:** ~72px.
- **Left:** Logo (heart-with-house emblem) + wordmark:
  - "**Hearten**" — Playfair Display, bold, burgundy, ~24px
  - "TRANSITIONAL LIVING" — 10px, uppercase, letter-spacing wide, gold-dark
- **Right (desktop):** the 4 menu links, then the gold **Donate** pill button (heart icon + "Donate").
- **Active menu link:** burgundy text with a short gold underline.
- **Mobile:** hamburger menu icon (burgundy). Tapping opens a stacked list of the 4 links plus the gold Donate button on a cream panel.

---

## 4. Footer Specification

- **Background:** Burgundy `#6E1423`. Text: cream.
- **Layout:** 4 columns on desktop (first column is double-width), stacked on mobile.
- **Column 1 (wide):** Logo (cream tone) + "Hearten" (Playfair, cream) + "TRANSITIONAL LIVING INC." (gold-light, small caps). Below: paragraph — *"A safe place today. A brighter future tomorrow. We believe every young adult deserves the opportunity to build a safe, stable, and successful future."* Then script line *"Your Future Starts Here."* in gold-light.
- **Column 2 — "Explore":** heading gold-light, uppercase. Links: Home, Services, **About**, Contact, Donate.
- **Column 3 — "Contact":** heading gold-light, uppercase. Four rows with small gold icons:
  - Phone icon → (281) 826-1422 (tap-to-call)
  - Mail icon → info@heartenhome.org
  - Globe icon → heartenhome.org
  - Map pin → Spring, Texas 77379
- **Bottom bar:** thin divider line, then left: *"© 2026 Hearten Transitional Living Inc. All rights reserved."* (use auto-year) and right: *"Made with ♥ for brighter futures"*.

---

## 5. Assets to Transfer

### 5a. Brand assets (rebuild in Wix — no files to upload)

| Asset | What it is | How to recreate in Wix |
|---|---|---|
| Logo | A burgundy heart outline with a small house inside, gold rays above and two gold laurel leaves on the sides | Ask Wix AI to "create a heart-and-home logo emblem in burgundy and gold", or use Wix's Logo Maker, or rebuild with a heart icon + house icon |
| Icons | Line icons: home, open book, briefcase, handshake, heart, target, compass, users, sparkles, star, phone, mail, globe, map pin, checkmark, arrow, gift, bed | Use Wix's built-in icon set (search the same names). All are standard, free icons |
| Background pattern | Faint dotted grid over the Home hero (burgundy dots on cream, ~6% opacity) | Optional: Wix section background pattern, or skip it |

### 5b. Hero images (four approved photos — do NOT replace or redesign)

All four hero images are **approved and final**. They must be carried over to Wix
**exactly as they are** — do not swap, re-crop, or re-design them. Do re-export them
compressed for the web (see the optimization note below).

| Page | Subject | Current file |
|---|---|---|
| **Home** | Young adults collaborating around a table | `31d9e9ba0_CollaborativeStudyinaSunlitHome.png` |
| **Services** | Residential living room | `279983be7_WarmModernLivingRoomRetreat.png` |
| **About** | Two women in a mentoring / goal-planning setting | `e25f396b2_FocusedMentoringattheKitchenTable.png` |
| **Contact** | Welcoming residential front entrance (front door) | `4e9c78a5c_WelcomingModernCraftsmanEntryway.png` |

Each image is a **full-width hero background** behind that page's centered hero text,
with a **warm cream/ivory semi-transparent overlay** so the text stays readable while the
photo remains clearly visible. The overlay treatment is intentionally light on About and
Contact — do not darken or strengthen it in Wix.

> **Image optimization (required before publishing):** the current hero files are
> full-resolution PNGs of roughly **1.9–2.3 MB each**, which is heavy for mobile. Before
> uploading to Wix, re-export each photo as a **compressed JPG or WebP at roughly
> 1600–1920px wide, quality ~75–80** (target well under 400 KB each). Keep the same
> composition and framing — compress for file size only, not for appearance. Also set a
> descriptive **alt text** on each in Wix (e.g. "Young adults collaborating at a table").

---

## 6. Page-by-Page Build Specification

Sections are listed **in the exact order they appear**. Copy text exactly as written.

---

### PAGE 1 — HOME

**SEO Title:** Hearten Transitional Living | Helping Young Adults Build Independent Futures
**Meta Description:** Hearten Transitional Living provides safe housing, life skills, mentorship, and support for young adults ages 18–24 in Spring, Texas. Now accepting applications.

**Section 1 — Hero** *(full-width background photo: young adults collaborating, with a warm cream overlay)*
- Small pill badge: "♥ NOW ACCEPTING APPLICATIONS"
- Heading (two lines): "Helping Young Adults" / "Build Stable, Independent Futures"
- Paragraph: "Supportive housing and life-enhancing services in a compassionate environment where growth, healing, and long-term stability can flourish."
- Buttons: **"Apply Today →"** (burgundy pill) → Contact page; **"♥ Donate"** (gold-outlined pill) → Donate page
- Pillar strip below buttons, separated by thin gold lines: **SAFE HOUSING | LIFE SKILLS | MENTORSHIP | SUPPORT**
- Background: the approved Home hero photo (young adults collaborating) behind a strong cream radial overlay, with the faint dotted texture on top. Keep the text centered.

**Section 2 — Values Strip** (dark burgundy bar, full width)
- Centered icons + labels: **♥ Kindness | 🤝 Respect | ✨ Empowerment | ⭐ Opportunity | 🏠 Stability**

**Section 3 — Mission & Vision** (two side-by-side cards)
- Card A — "OUR MISSION": "At Hearten Transitional Living, we empower individuals to achieve independence, stability, and purpose by providing supportive housing and life-enhancing services in a compassionate environment where growth, healing, and long-term stability can flourish."
- Card B — "OUR VISION": "To be a beacon of hope where every young adult in transition is empowered to heal, grow, and achieve long-term stability within a compassionate community."

**Section 4 — Services** (cream card background, 4 cards)
- Script line: "Our Services & Support"
- Heading: "Everything Needed to Thrive"
- 4 cards. **Each card shows its complete bullet list** (the Home page and the Services page must show identical lists):
  1. **Housing** (home icon) — "A safe, welcoming place to call home while you build your future." • Fully furnished shared housing • Safe, structured environment • Security monitoring for added safety • Utilities & Wi-Fi included
  2. **Life Skills** (open book icon) — "Practical, everyday skills for confident independent living." • Budgeting • Self-Advocacy • Time management • Communication • Conflict resolution • Household Management
  3. **Career Development** (briefcase icon) — "Guidance and tools to launch education and employment goals." • Resume assistance • Employment readiness • Educational planning • Goal setting
  4. **Wellness** (handshake icon) — "Whole-person support through mentoring and connected resources." • Mentoring • Community resources • Mental health referrals • Case management support
- Button: **"See All Services →"** (burgundy outline pill) → Services page

**Section 5 — Who We Serve** (text left, burgundy panel right)
- Small label with icon: "WHO WE SERVE"
- Heading: "Young adults ages 18–24 who are:"
- Bulleted list (checkmark icons): Aging out of foster care • Experiencing housing instability • Preparing for independent living
- Burgundy panel: script line "Hope. Purpose. Future." + paragraph "We walk beside every young adult with a safe home, caring mentors, and the practical skills to build the independent life they deserve." + 3 stats: **Safety Focused · 18–24 Ages Served · 100% Compassion**
  - The first stat reads **"Safety Focused"**. Do **not** use "24hr Support", "24-hour support", "24-hour supervision", "on-site support", or any wording implying continuous in-person staffing.

**Section 6 — Why Choose Hearten** (cream card background)
- Heading: "Why Families & Community Partners Choose Hearten"
- 8 items in two columns (checkmark + text): Safe Home Environment · Financial Literacy Training · Nurse-Owned Organization · Mentorship · Individualized Life Skills Coaching · Community Connections · Employment & Education Support · Long-Term Stability Focus

**Section 7 — Closing CTA** (burgundy gradient panel)
- Small label: "A SAFE PLACE TODAY"
- Script heading: "A brighter future tomorrow."
- Paragraph: "Safe housing. Real support. A stronger tomorrow. Reach out today and take the first step toward independence."
- Buttons: **"Start Your Application"** (gold pill) → Contact page; **"Support Our Mission"** (cream outline pill) → Donate page

---

### PAGE 2 — SERVICES

**SEO Title:** Our Services & Support | Hearten Transitional Living
**Meta Description:** Housing, life skills, career development, and wellness support for young adults ages 18–24. See how Hearten Transitional Living helps build lasting independence.

**Section 1 — Page Hero** *(full-width background photo: residential living room, with a warm cream overlay)*
- Script line: "Our Services & Support"
- Heading: "Complete, Compassionate Care"
- Paragraph: "From a furnished home to life skills, career development, and wellness — every service is designed to help young adults build lasting independence."
- Background: the approved Services hero photo (living room) behind a cream gradient overlay. Keep the text centered.

**Section 2 — Service Detail Blocks** (4 wide cards, alternating side, icon + title + blurb on the left, full bullet list on the right)
- Block 1 — **Housing**: "A safe, welcoming place to call home while you build your future." Full list: Fully furnished shared housing · Safe, structured environment · Security monitoring for added safety · Utilities & Wi-Fi included
- Block 2 — **Life Skills**: "Practical, everyday skills for confident independent living." Full list: Budgeting · Self-Advocacy · Time management · Communication · Conflict resolution · Household Management
- Block 3 — **Career Development**: "Guidance and tools to launch education and employment goals." Full list: Resume assistance · Employment readiness · Educational planning · Goal setting
- Block 4 — **Wellness**: "Whole-person support through mentoring and connected resources." Full list: Mentoring · Community resources · Mental health referrals · Case management support

**Section 3 — Closing CTA** (burgundy panel)
- Heart icon, heading: "Ready to take the next step?"
- Paragraph: "We're now accepting applications. Safe housing. Real support. A stronger tomorrow."
- Button: **"Apply Today →"** (gold pill) → Contact page

---

### PAGE 3 — ABOUT

**SEO Title:** About | Hearten Transitional Living Inc.
**Meta Description:** Hearten Transitional Living is a nurse-owned organization providing compassionate housing and support for young adults ages 18–24 in Spring, Texas. Learn our mission and values.

**Section 1 — Page Hero** *(full-width background photo: two women in a mentoring / goal-planning setting, with a warm cream overlay)*
- Script line: "About Hearten"
- Heading: "A Beacon of Hope"
- Paragraph: "A nurse-owned organization walking beside young adults with compassion, structure, and a genuine belief in their potential."
- Background: the approved About hero photo (mentoring / goal-planning) behind a light cream overlay. Position the crop so **both women stay visible** and the mentoring interaction (one pointing at the notebook) is recognizable — do not crop off faces or the notebook. Keep the text centered.

**Section 2 — Mission & Vision** (two cards)
- "OUR MISSION": "At Hearten Transitional Living, we empower individuals to achieve independence, stability, and purpose by providing supportive housing and life-enhancing services in a compassionate environment where growth, healing, and long-term stability can flourish."
- "OUR VISION": "To be a beacon of hope where every young adult in transition is empowered to heal, grow, and achieve long-term stability within a compassionate community."

**Section 3 — Who We Serve** (cream card background, 3 cards)
- Label: "WHO WE SERVE"
- Heading: "Young adults ages 18–24 who are:"
- 3 cards: Aging out of foster care · Experiencing housing instability · Preparing for independent living

**Section 4 — Why Choose Hearten**
- Heading: "Why Families & Community Partners Choose Hearten"
- Same 8 items as Home.

**Section 5 — Core Values** (burgundy background, 5 tiles)
- Script line: "Our Core Values"
- 5 tiles with icons: Kindness · Respect · Empowerment · Opportunity · Stability
- Button: **"Get In Touch →"** (gold pill) → Contact page

---

### PAGE 4 — CONTACT

**SEO Title:** Contact Us | Hearten Transitional Living
**Meta Description:** Now accepting applications. Contact Hearten Transitional Living in Spring, Texas by phone, email, or our online form to begin your journey toward independent living.

**Section 1 — Page Hero** *(full-width background photo: welcoming residential front entrance, with a warm cream overlay)*
- Script line: "Your Future Starts Here."
- Heading: "Contact Us"
- Paragraph: "Now accepting applications. Reach out to learn more or begin your journey toward independent living."
- Background: the approved Contact hero photo (front door) behind a light cream overlay. Position the crop so the **front door / entrance stays the focal point** on desktop, tablet and mobile — the doorway must not be lost. Keep the text centered.

**Section 2 — Two columns**

Left column — 4 contact cards + a burgundy highlight box:
1. **CALL US** — (281) 826-1422 (tap-to-call)
2. **EMAIL** — info@heartenhome.org
3. **WEBSITE** — heartenhome.org
4. **LOCATION** — Spring, Texas 77379
- Highlight box (burgundy): ♥ + script "A stronger tomorrow." + "Safe housing. Real support. Your future starts here."

Right column — **"Send Us a Message" form** (see Section 7 for fields and Wix replacement).

---

### PAGE 5 — DONATE

**SEO Title:** Donate | Support Hearten Transitional Living
**Meta Description:** Your gift provides safe housing, life skills, and mentorship for young adults building independent lives. Give one-time or monthly to Hearten Transitional Living.

**Section 1 — Page Hero** (cream gradient hero — **no photo on this page**)
- Small badge: "🤲 SUPPORT OUR MISSION"
- Heading: "Give the Gift of a Brighter Future"
- Paragraph: "Your support provides safe housing, life skills, and mentorship for young adults ready to build independent lives."

**Section 2 — Two columns**

Left column — 4 donation tier cards (clickable):
| Amount | Label | Description |
|---|---|---|
| $25 | Welcome Home Essentials | Help provide toiletries, household essentials, and basic supplies. |
| $75 | Life Skills Support | Help fund budgeting, employment readiness, and independent-living activities. |
| $150 | Housing Stability Support | Help offset housing, utilities, and essential residential expenses. |
| $500 | Future Builder | Make a meaningful contribution toward housing and comprehensive supportive services. |

> **Wording rule:** no tier may claim to fully fund housing or services. Keep the
> "Help provide / Help fund / Help offset / Make a meaningful contribution toward"
> phrasing. Do not upgrade these into definitive claims in Wix.

Right column — **"Your Donation" form** (see Section 10 for Wix Donations setup).

---

## 7. Complete Forms & Every Field

### Contact page — "Send Us a Message"

| Field | Type | Required? | Options |
|---|---|---|---|
| Full Name | Text | Yes | — |
| Email | Email | Yes | — |
| Phone | Text | No | — |
| I'm interested in | Dropdown | No | Applying for housing / Making a referral / Volunteering / Mentoring / Community partnership / Other |
| Message | Multi-line text | Yes | — |

Submit button text: **"Send Message"** (with a paper-plane icon).
Success message: "Thank you! Your message has been received. A member of the Hearten team will be in touch soon."
Second button after success: **"Send Another Message"**.

> **Note:** the form on the current site is a front-end demo — it saves to the browser
> only and sends nothing. It must be replaced with a real Wix Form (see Section 9).

### Donate page — "Your Donation"

| Field | Type | Required? | Notes |
|---|---|---|---|
| Frequency | Two buttons | Yes | "One-time" / "Monthly" (One-time selected by default) |
| Amount | Four preset chips | Yes | $25 / $75 / $150 / $500 (default $75) |
| Custom amount | Number | Optional | Overrides the preset if filled |
| Name | Text | No | — |
| Email | Email | No | — |

Submit button text: **"Donate $[amount] / month"** (shows the chosen amount; "/ month" only if Monthly).

> **Do NOT carry over the "Demo only — no real payment is processed." line.** It exists on
> the Base44 site only because payments aren't wired there. The Wix version uses real
> Wix Donations and must not show any demo wording.

---

## 8. Which Wix Feature Replaces Each Form/Function

| Current site feature | Wix native replacement | Why |
|---|---|---|
| Contact form | **Wix Forms** | Real submissions emailed to you + stored in your Wix dashboard |
| "I'm interested in" dropdown | **Wix Forms** → Dropdown field | Native field type |
| Donate form | **Wix Donations** (Wix Payments) or **Stripe** | Real one-time + monthly giving, receipts, payouts |
| Apply Today buttons | **A real application form / workflow** in Wix (dedicated "Apply" form, or the Contact form with application fields) | Today they only open the Contact page — this must become a real application path |
| Contact info cards | **Wix Contact Info element** or text + icons | Tap-to-call / mail links |
| Newsletter (none exists) | Not needed | — |
| Blog / news (none exists) | Not needed | — |

---

## 9. Instructions — Build the "Apply Today" Form in Wix

The current "Apply Today" button just opens the Contact page. To make it a **real** application:

1. In Wix, go to **Forms & Submissions → My Forms → Create New Form**.
2. Name it **"Housing Application Inquiry"**.
3. Add these fields (mirroring the current Contact form, plus useful application details):
   - Full Name (text, required)
   - Email (email, required)
   - Phone (text, optional)
   - "I'm interested in" (dropdown: Applying for housing / Making a referral / Volunteering / Mentoring / Community partnership / Other)
   - Message (paragraph text, required)
   - Optional: Date of Birth, Current Housing Situation, How did you hear about us
4. Set **Submit** button text to "Send Message" (or "Submit Application").
5. Under **Settings → Notifications**, add your email so every submission reaches you. (The current site does **not** do this — this is the key upgrade.)
6. Set the **success message**: "Thank you! Your message has been received. A member of the Hearten team will be in touch soon."
7. **Connect the button:** select every "Apply Today" / "Start Your Application" / "Get In Touch" button → **Link → Page → Contact** (or link straight to the form). You can also place the form directly on a dedicated "Apply" page and point the buttons there.

---

## 10. Instructions — Set Up Donate Buttons Properly

The current Donate form is a demo that processes **no payment**. To make giving real:

1. In Wix, go to **Settings → Accept Payments** and connect **Wix Payments** (recommended) or **Stripe**.
2. Add **Wix Donations** to the Donate page (Add → Donations).
3. Recreate the four tiers as **suggested amounts**: $25, $75, $150, $500, with the exact labels/descriptions in Section 6 (PAGE 5 — DONATE).
4. Enable a **custom amount** field and a **"Monthly" recurring** option.
5. Remove the "Demo only" note entirely.
6. Set the **thank-you message**: "Thank you! Your generosity helps a young adult find safety, stability, and hope."
7. **Connect every Donate button** (header, Home hero, Home closing CTA, footer) → **Link → Page → Donate**.
8. Add your bank/tax details so donations can be paid out.

---

## 11. SEO Titles & Meta Descriptions (copy/paste into Wix page settings)

> Configure these **directly in Wix** page settings. Do **not** install an SEO library or
> rebuild SEO in Base44 — the current site shares one generic browser title and a
> placeholder meta description, so all of this is set up in Wix.

| Page | SEO Title | Meta Description |
|---|---|---|
| Home | Hearten Transitional Living \| Helping Young Adults Build Independent Futures | Hearten Transitional Living provides safe housing, life skills, mentorship, and support for young adults ages 18–24 in Spring, Texas. Now accepting applications. |
| Services | Our Services & Support \| Hearten Transitional Living | Housing, life skills, career development, and wellness support for young adults ages 18–24. See how Hearten Transitional Living helps build lasting independence. |
| About | About \| Hearten Transitional Living Inc. | Hearten Transitional Living is a nurse-owned organization providing compassionate housing and support for young adults ages 18–24 in Spring, Texas. Learn our mission and values. |
| Contact | Contact Us \| Hearten Transitional Living | Now accepting applications. Contact Hearten Transitional Living in Spring, Texas by phone, email, or our online form to begin your journey toward independent living. |
| Donate | Donate \| Support Hearten Transitional Living | Your gift provides safe housing, life skills, and mentorship for young adults building independent lives. Give one-time or monthly to Hearten Transitional Living. |

Also set your **site name** to "Hearten Transitional Living", add a **favicon** (the heart-home logo on cream), and set a **theme color** (use Cream `#FBF6EC` or Burgundy `#6E1423` — the current site ships a placeholder black `#000000`).

---

## 12. Desktop & Mobile Layout Instructions

**Desktop (max content width ~1280px, centered):**
- Header fixed at top, logo left, menu + Donate button right.
- Two-column sections (Mission/Vision, Who We Serve, Contact, Donate) sit side by side.
- Services grid: 4 cards across on Home; stacked wide rows on Services.
- Why Choose: two columns.
- Values tiles: 5 across.
- Generous white space; sections alternate cream and cream-card backgrounds.
- Hero sections: full-width photo background, centered text, warm cream overlay.

**Mobile (Wix auto-stacks, verify these):**
- Header: logo left, hamburger right. Menu opens as a stacked list with the Donate button.
- All multi-column sections become single-column, stacked in the same order.
- Hero heading ~32–36px; buttons full-width and stacked.
- **Hero photos:** verify each one still reads well when cropped narrow — the Contact **front door must stay visible**, the About **two women must stay visible**, and no faces or key objects should be cut off awkwardly.
- Services cards stack vertically; Why Choose items stack.
- Contact and Donate two-column layouts stack (info/tiers first, then the form).
- Footer columns stack; bottom bar centers.

**Motion (optional):** the current site fades content up on load. In Wix you can add a subtle "Fade In" entrance animation to hero text and section headings.

---

## 13. MASTER PROMPT FOR WIX AI WEBSITE BUILDER

Copy everything in the box below and paste it into Wix's AI builder as your description.

```
Build a warm, professional nonprofit website for "Hearten Transitional Living Inc.",
a nurse-owned transitional housing organization in Spring, Texas that helps young adults
ages 18–24 (aging out of foster care or experiencing housing instability) build stable,
independent futures. The site must feel compassionate, hopeful, and trustworthy.

BRAND COLORS (use exactly):
- Primary burgundy #6E1423, dark burgundy #560F1B
- Accent gold #BE8A2C, light gold #E3B95E, dark gold #9A6E1E
- Cream backgrounds #FBF6EC and #F6ECD6, near-black brown text #2A1D1F

FONTS:
- Headings and the wordmark "Hearten" in Playfair Display (serif, bold)
- Section sub-headings and small uppercase labels in Roboto Slab
- Decorative script accent lines in Dancing Script (gold)
- Body text in Inter

LOGO: a burgundy heart outline containing a small house, with short gold rays above
and two gold laurel leaves at the sides. Wordmark "Hearten" with the smaller line
"TRANSITIONAL LIVING" beneath it in gold small caps.

PAGES AND MENU: Home, Services, About, Contact, and Donate. Menu order: Home, Services,
About, Contact, and a gold "Donate" pill button with a heart icon on the right.
Footer has an "Explore" link list (Home, Services, About, Contact, Donate) and a
"Contact" list: phone (281) 826-1422, email info@heartenhome.org, website
heartenhome.org, and "Spring, Texas 77379".

HERO IMAGES: use a full-width photo background behind the centered hero text on the Home,
Services, About and Contact pages, each with a warm cream semi-transparent overlay so the
text stays readable while the photo remains clearly visible. Home = young adults
collaborating around a table; Services = a residential living room; About = two women in a
mentoring / goal-planning setting at a table; Contact = a welcoming residential front
entrance with a front door. Keep the crop so nothing important is cut off (the front door on
Contact, both women on About). The Donate page hero has no photo.

HOME PAGE (in this order):
1. Hero: badge "Now Accepting Applications"; heading "Helping Young Adults Build Stable,
   Independent Futures"; paragraph "Supportive housing and life-enhancing services in a
   compassionate environment where growth, healing, and long-term stability can flourish.";
   buttons "Apply Today" (burgundy) and "Donate" (gold outline); a strip reading
   "Safe Housing | Life Skills | Mentorship | Support".
2. Dark burgundy values bar: Kindness, Respect, Empowerment, Opportunity, Stability.
3. Two cards: "Our Mission" and "Our Vision" (use the mission/vision text provided).
4. Services section titled "Everything Needed to Thrive" with four cards: Housing, Life
   Skills, Career Development, Wellness, each with a short description and its complete
   bullet list; button "See All Services".
5. "Who We Serve" section: "Young adults ages 18–24 who are:" with three points (aging out
   of foster care, experiencing housing instability, preparing for independent living),
   beside a burgundy panel with the stats "Safety Focused", "18–24 Ages Served",
   "100% Compassion".
6. "Why Families & Community Partners Choose Hearten" with eight checkmarked benefits.
7. Closing burgundy call-to-action: "A brighter future tomorrow." with buttons
   "Start Your Application" and "Support Our Mission".

SERVICES PAGE: hero "Complete, Compassionate Care"; four wide detail blocks for Housing,
Life Skills, Career Development, and Wellness, each with its full bullet list; closing
call-to-action with an "Apply Today" button.

ABOUT PAGE: hero "A Beacon of Hope"; Mission and Vision cards; "Who We Serve" with three
cards; "Why Choose Hearten" with eight benefits; a burgundy "Our Core Values" section with
five tiles (Kindness, Respect, Empowerment, Opportunity, Stability) and a "Get In Touch" button.

CONTACT PAGE: hero "Contact Us"; left column with four contact cards (Call Us, Email,
Website, Location) and a burgundy highlight box; right column with a working contact form
containing Full Name (required), Email (required), Phone, an "I'm interested in" dropdown
(Applying for housing, Making a referral, Volunteering / Mentoring, Community partnership,
Other), and Message (required), with a "Send Message" button. Use a real Wix Form that
emails submissions to the organization.

DONATE PAGE: hero "Give the Gift of a Brighter Future"; four suggested donation tiers
($25 Welcome Home Essentials, $75 Life Skills Support, $150 Housing Stability Support,
$500 Future Builder), a one-time / monthly toggle, preset amount chips, a custom amount
field, name and email fields, and a "Donate" button. Use real Wix Donations / Wix Payments
so gifts are actually processed, with a thank-you message after giving. Do not describe any
tier as fully funding housing or services.

STYLE: alternating cream and cream-card section backgrounds, rounded cards with soft
shadows, burgundy and gold accents, generous spacing, clean and calm. Ensure the site is
fully responsive and looks great on mobile. Add unique page SEO titles and descriptions
focused on "transitional living," "safe housing for young adults," and "Spring, Texas."
```

---

## 14. Configure in Wix (build steps that are NOT part of the Base44 site)

These are deliberately **left to Wix** — do not try to build them in Base44:

| Item | What to do in Wix |
|---|---|
| **Apply Today** | Build a real application form/workflow (Section 9) and point all Apply buttons at it |
| **Contact** | Replace the demo form with a **Wix Form** connected to the appropriate Hearten email address |
| **Donate** | Set up **real Wix Donations / Wix Payments** (or Stripe) — one-time + monthly (Section 10) |
| **Unique SEO title per page** | Set individually in each Wix page's SEO settings (Section 11) |
| **Unique meta description per page** | Set individually in each Wix page's SEO settings (Section 11) |
| **Favicon** | Upload the heart-home logo on cream in Wix site settings |
| **Theme color** | Set in Wix site settings (currently a placeholder black) |
| **Mobile optimization** | Verify every page at mobile width after building (Section 12) |
| **Image optimization / compression** | Re-export the four hero photos as compressed JPG/WebP (~1600–1920px wide, <400 KB each) before uploading (Section 5b) |

### Do NOT carry over from Base44

- The **"Demo only — no real payment is processed."** line (and any demo/mock wording)
- The **mock donation processing** (writes to browser storage, charges nothing)
- The **localStorage form handling** (Contact form saves to the browser only, sends nothing)
- The **FastAPI / MongoDB backend** — unused by the site and not needed in Wix
- **Base44 / Emergent development scripts** (the overlay script, PostHog analytics snippet, `emergent-main.js`)
- **Test scaffolding** (`constants/testIds/`, `tests/`) and build/test configuration
- **Builder artifacts** and **placeholder metadata** (the generic `<title>`, the "A product of emergent.sh" meta description, the black theme color)

---

## 15. Extra Details Wix Will Need

- **Domain:** heartenhome.org (already referenced on the site). Connect it in Wix → Domains.
- **Contact details:** phone (281) 826-1422 · email info@heartenhome.org · Spring, Texas 77379.
- **Tagline used throughout:** "A safe place today. A brighter future tomorrow." and "Your Future Starts Here."
- **Hero photos:** four approved images (Section 5b). Compress them for web use, and add descriptive alt text to each.
- **Accessibility:** keep strong color contrast (burgundy on cream is good); add alt text to any images you add.
- **The current backend and database are NOT needed** — the Wix site uses Wix Forms and Wix Donations instead.
- **Nothing to migrate technically:** all content is plain text; just copy/paste into Wix.
