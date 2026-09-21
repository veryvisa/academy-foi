/* 微出国·学 · BC 省保险 Level 1（FOI） · 离线缓存。版本＝内容哈希，新发布自动汰旧。 */
const CACHE_PREFIX = 'vv-foi-';
const VERSION = CACHE_PREFIX + '5f5b4a35bcf7';
const PRECACHE = ["./assets/app.js", "./assets/cards/bp-plan.png", "./assets/cards/bp-plan.t.jpg", "./assets/cards/bp-quota.png", "./assets/cards/bp-quota.t.jpg", "./assets/cards/clm-clock.png", "./assets/cards/clm-clock.t.jpg", "./assets/cards/cond-licence.png", "./assets/cards/cond-licence.t.jpg", "./assets/cards/cond-liquor.png", "./assets/cards/cond-liquor.t.jpg", "./assets/cards/diff-three.png", "./assets/cards/diff-three.t.jpg", "./assets/cards/diff-triage.png", "./assets/cards/diff-triage.t.jpg", "./assets/cards/ec-income.png", "./assets/cards/ec-income.t.jpg", "./assets/cards/home-blueprint.png", "./assets/cards/home-blueprint.t.jpg", "./assets/cards/liab-four.png", "./assets/cards/liab-four.t.jpg", "./assets/cards/liab-occupier.png", "./assets/cards/liab-occupier.t.jpg", "./assets/cards/paths-money.png", "./assets/cards/paths-money.t.jpg", "./assets/cards/paths-steps.png", "./assets/cards/paths-steps.t.jpg", "./assets/cards/prem-factor.png", "./assets/cards/prem-factor.t.jpg", "./assets/cards/prop-proof-90.png", "./assets/cards/prop-proof-90.t.jpg", "./assets/cards/prop-reducers.png", "./assets/cards/prop-reducers.t.jpg", "./assets/cards.js", "./assets/cover/home.jpg", "./assets/decks/autoplan-conditions-specialty.json", "./assets/decks/bc-auto-boundaries.json", "./assets/decks/caib-ch09-farm.json", "./assets/decks/enhanced-care-benefits.json", "./assets/decks/foi-ch03-statutory.json", "./assets/decks/foi-ch05-claim-payment.json", "./assets/decks/foi-ch07-commercial.json", "./assets/decks/foi-ch08-liability.json", "./assets/decks/foi-claims-process.json", "./assets/decks/foi-industry-foundations.json", "./assets/decks.json", "./assets/fsrs.mjs", "./assets/learning-data.mjs", "./assets/manifest.json", "./assets/questions.json", "./assets/search-index.json", "./assets/slides.js", "./assets/style.css", "./bc-msa/index.html", "./caib/index.html", "./cards/bp-plan.html", "./cards/bp-quota.html", "./cards/clm-clock.html", "./cards/cond-licence.html", "./cards/cond-liquor.html", "./cards/diff-three.html", "./cards/diff-triage.html", "./cards/ec-income.html", "./cards/home-blueprint.html", "./cards/index.html", "./cards/liab-four.html", "./cards/liab-occupier.html", "./cards/paths-money.html", "./cards/paths-steps.html", "./cards/prem-factor.html", "./cards/prop-proof-90.html", "./cards/prop-reducers.html", "./ciro/index.html", "./clu/index.html", "./csi-ifc/index.html", "./docs/auto-conditions-and-specialty.html", "./docs/auto-enhanced-care-benefits.html", "./docs/auto-premium-basics.html", "./docs/caib-foi-differences.html", "./docs/claims-process.html", "./docs/commercial-property-bi.html", "./docs/guide-autoplan-basics.html", "./docs/index.html", "./docs/industry-licence-conduct.html", "./docs/industry-mga-delegated-authority.html", "./docs/industry-privacy-intermediaries.html", "./docs/industry-privacy-law.html", "./docs/industry-unlicensed-insurers.html", "./docs/kb-00-INDEX.html", "./docs/kb-01-licensing-paths-2026.html", "./docs/kb-02-exam-blueprint.html", "./docs/kb-03-fees-dates-2026H2.html", "./docs/kb-04-official-sources.html", "./docs/kb-05-fact-ledger.html", "./docs/liability-principles.html", "./docs/property-payment.html", "./docs/quiz-ch01.html", "./docs/quiz-ch02.html", "./docs/quiz-ch03.html", "./docs/quiz-ch04.html", "./docs/quiz-ch05.html", "./docs/quiz-ch06.html", "./docs/quiz-ch07.html", "./docs/quiz-ch08.html", "./docs/quiz-ch09.html", "./docs/quiz-ch10.html", "./docs/quiz-ch11.html", "./docs/quiz-ch12.html", "./drill.html", "./exam.html", "./index.html", "./on-mortgage-l1/index.html", "./progress.html", "./qafp-cfp/index.html", "./rcic/index.html", "./slides.html", "./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(async (c) => {
    for (const u of PRECACHE) { try { await c.add(new Request(u, {cache: 'reload'})); } catch (_) {} }
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith(CACHE_PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
      const cp = res.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return res; })));
  }
});
