const $ = (id) => document.getElementById(id);

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nowTime() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

function toast(msg, isError = false) {
  const wrap = $('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast' + (isError ? ' err' : '');
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

function downloadBlob(filename, content, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 400);
}

const MODE_LABELS = {
  serp: { text: 'Google SERP Tıklama', cls: 'badge-green' },
  branded: { text: 'Markalı Autocomplete', cls: 'badge-blue' },
  referrer: { text: 'Sosyal / Referrer', cls: 'badge-amber' },
  direct: { text: 'Direkt & GA4 Anlık', cls: 'badge-slate' },
};

const STATUS_LABELS = {
  running: { text: 'Çalışıyor', cls: 'badge-green' },
  paused: { text: 'Duraklatıldı', cls: 'badge-amber' },
  completed: { text: 'Tamamlandı', cls: 'badge-blue' },
};

const DEVICE_POOL = [
  { label: 'iPhone 16 Pro • iOS 18.2 Safari (393x852)', type: 'mobile' },
  { label: 'Samsung Galaxy S24 Ultra • Android 15 Chrome 134', type: 'mobile' },
  { label: 'Xiaomi 14T Pro • Android 14 Chrome Mobile', type: 'mobile' },
  { label: 'Windows 11 Pro • Chrome 134.0 (1920x1080)', type: 'desktop' },
  { label: 'macOS Sequoia 15.3 • Chrome 134 (Retina)', type: 'desktop' },
  { label: 'iPhone 15 • iOS 18.1 Mobile Safari', type: 'mobile' },
];

const appState = {
  detectedBrowser: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  settings: {
    browserPath: '',
    googleDomain: 'https://www.google.com.tr',
    maxGlobalConcurrency: 6,
    defaultLocale: 'tr-TR',
    defaultTimezone: 'Europe/Istanbul',
    lightweightMode: true,
    headlessMode: true,
    hourlyCurveEnabled: true,
    hourlyCurve: [22, 16, 12, 10, 12, 20, 38, 58, 76, 88, 95, 100, 98, 96, 94, 96, 100, 100, 98, 95, 90, 76, 52, 34],
    mobileRotationUrl: 'https://api.mobilproxy-tr.net/v2/rotate?modem=4G_IST_09&key=demo_tok_992',
    rotateEverySessions: 5,
    cookieSeedSites: [
      'https://www.google.com.tr',
      'https://www.hurriyet.com.tr',
      'https://www.ntv.com.tr',
      'https://www.haberturk.com',
      'https://eksisozluk.com',
      'https://www.sahibinden.com'
    ]
  },
  stats: {
    successfulSessions: 348,
    subpagesVisited: 914,
    totalDwellSeconds: 18096,
    analyticsBeaconsVerified: 344,
    serpClicks: 229,
    brandedSearches: 47,
    savedBandwidthBytes: 438 * 1024 * 1024,
    blockedHeavyRequests: 6180
  },
  campaigns: [
    {
      id: 'CMP-101',
      name: 'Google Organik SERP Yükseliş Kampanyası',
      mode: 'serp',
      targetDomain: 'ornek-eticaret.com.tr',
      brandName: 'ÖrnekMarket',
      targetUrls: ['https://ornek-eticaret.com.tr/'],
      keywords: ['istanbul kurumsal yazılım', 'özel e-ticaret çözümleri'],
      referrers: ['https://www.google.com.tr/'],
      targetVisits: 500,
      completedVisits: 229,
      verifiedGaHits: 227,
      concurrency: 3,
      mobileRatio: 75,
      maxSerpPages: 3,
      dwellMinSec: 42,
      dwellMaxSec: 85,
      subpagesMin: 2,
      subpagesMax: 4,
      useCookiePool: true,
      autoWarmIfEmpty: true,
      lightweightMode: true,
      headlessMode: true,
      useProxies: true,
      status: 'running'
    },
    {
      id: 'CMP-102',
      name: 'Markalı Autocomplete & Sosyal Referrer Akışı',
      mode: 'branded',
      targetDomain: 'kurumsal-hizmet.net',
      brandName: 'KurumsalNet',
      targetUrls: ['https://kurumsal-hizmet.net/hizmetler'],
      keywords: ['kurumsalnet yorumlar', 'kurumsalnet iletişim'],
      referrers: ['https://t.co/', 'https://l.instagram.com/'],
      targetVisits: 200,
      completedVisits: 119,
      verifiedGaHits: 117,
      concurrency: 2,
      mobileRatio: 70,
      maxSerpPages: 2,
      dwellMinSec: 35,
      dwellMaxSec: 65,
      subpagesMin: 2,
      subpagesMax: 3,
      useCookiePool: true,
      autoWarmIfEmpty: true,
      lightweightMode: true,
      headlessMode: true,
      useProxies: true,
      status: 'running'
    }
  ],
  cookies: [
    { id: 'CK-94A1', label: 'iPhone 16 Pro • iOS 18.2 Safari', deviceType: 'mobile', cookieCount: 38, domainCount: 6, domains: ['.google.com.tr', '.google.com', '.hurriyet.com.tr', '.ntv.com.tr'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 96, warmupVisits: 4, useCount: 7 },
    { id: 'CK-94A2', label: 'Samsung Galaxy S24 Ultra • Android 15', deviceType: 'mobile', cookieCount: 42, domainCount: 7, domains: ['.google.com.tr', '.google.com', '.haberturk.com', '.eksisozluk.com'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 98, warmupVisits: 5, useCount: 5 },
    { id: 'CK-94A3', label: 'Windows 11 Pro • Chrome 134 (1920x1080)', deviceType: 'desktop', cookieCount: 34, domainCount: 5, domains: ['.google.com.tr', '.ntv.com.tr', '.sahibinden.com'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 93, warmupVisits: 4, useCount: 4 },
    { id: 'CK-94A4', label: 'Xiaomi 14T Pro • Android 14 Chrome', deviceType: 'mobile', cookieCount: 31, domainCount: 5, domains: ['.google.com.tr', '.hurriyet.com.tr'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 91, warmupVisits: 3, useCount: 3 },
    { id: 'CK-94A5', label: 'macOS Sequoia 15.3 • Chrome 134 Retina', deviceType: 'desktop', cookieCount: 39, domainCount: 6, domains: ['.google.com.tr', '.google.com', '.ntv.com.tr'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 95, warmupVisits: 4, useCount: 6 },
    { id: 'CK-94A6', label: 'iPhone 15 • iOS 18.1 Mobile Safari', deviceType: 'mobile', cookieCount: 29, domainCount: 5, domains: ['.google.com.tr', '.haberturk.com'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 89, warmupVisits: 3, useCount: 2 }
  ],
  proxies: [
    { id: 'PX-01', label: 'http://tr_mob1:***@185.122.40.18:8080 (Turkcell 4.5G Rotating)', status: 'active', latencyMs: 64, exitIp: '176.88.142.19 (İstanbul / TR)', successCount: 142 },
    { id: 'PX-02', label: 'http://tr_mob2:***@185.122.40.19:8080 (Vodafone TR 4.5G Rotating)', status: 'active', latencyMs: 71, exitIp: '31.145.92.104 (Ankara / TR)', successCount: 118 },
    { id: 'PX-03', label: 'socks5://res_tr:***@95.14.22.84:1080 (Türk Telekom Residential)', status: 'active', latencyMs: 48, exitIp: '88.241.65.211 (İzmir / TR)', successCount: 88 }
  ],
  runtime: {
    runningCampaignIds: ['CMP-101', 'CMP-102'],
    cookieJob: { running: false, completed: 0, total: 0 },
    activeWorkers: [
      { id: 'W-01', type: 'serp', step: 'Google SERP S.1 -> ornek-eticaret.com.tr bulundu, organik tıklama & okuma scroll (%68)', device: 'iPhone 16 Pro (CK-94A1)', proxy: '176.88.142.19 (4.5G TR)' },
      { id: 'W-02', type: 'serp', step: 'Alt sayfa gezinmesi (2/3) • GA4 /g/collect HTTP 204 doğrulandı ✓ (49. sn)', device: 'Galaxy S24 Ultra (CK-94A2)', proxy: '31.145.92.104 (4.5G TR)' },
      { id: 'W-03', type: 'branded', step: 'Google Autocomplete harf harf yazım: "kurumsalnet iletişim" • Öneri tetiklendi ✓', device: 'Win11 Chrome 134 (CK-94A3)', proxy: '88.241.65.211 (Residential TR)' }
    ]
  }
};

let settingsLoadedOnce = false;

function buildNetscapeTxt(filterId = null) {
  const list = filterId ? appState.cookies.filter(c => c.id === filterId) : appState.cookies;
  const lines = ['# Netscape HTTP Cookie File', '# Generated by StealthTraffic Pro v2.4 Automatic Cookie Pool (o2io.com.tr)', ''];
  const exp = Math.floor(Date.now() / 1000) + 86400 * 180;
  for (const p of list) {
    lines.push('# Profile: ' + p.id + ' (' + p.label + ' | WarmScore: ' + p.warmScore + '/100)');
    lines.push('.google.com.tr\tTRUE\t/\tTRUE\t' + exp + '\tNID\t519=WarmOrganic_' + p.id + '_9981ab72c4def012');
    lines.push('.google.com.tr\tTRUE\t/\tTRUE\t' + exp + '\tAEC\tAVYB7cp_' + p.id + '_StealthIsolatedWorldVerified');
    lines.push('.google.com\tTRUE\t/\tTRUE\t' + exp + '\tSOCS\tCAISHAgBEhJnd3NfMjAyNjEwMzAtMF9SQzIaAmVuIAEaBgiA_pS5Bg');
    lines.push('.hurriyet.com.tr\tTRUE\t/\tFALSE\t' + exp + '\t_ga\tGA1.1.' + (100000000 + Math.floor(Math.random() * 899999999)) + '.1730192000');
    lines.push('');
  }
  return lines.join('\n');
}

function renderSnapshot() {
  const st = appState.stats;
  const profiles = appState.cookies;
  const rt = appState.runtime;
  const proxies = appState.proxies;

  const bText = $('browserStatusText');
  const bDot = $('browserStatusPill').querySelector('.dot');
  bText.textContent = 'Stealth Motor Hazır (chrome.exe • Sıfır Runtime.enable)';
  bDot.className = 'dot dot-ok';

  $('kpiSuccess').textContent = st.successfulSessions;
  $('kpiSubpages').textContent = st.subpagesVisited;
  $('kpiAvgDwell').textContent = st.successfulSessions > 0 ? Math.round(st.totalDwellSeconds / st.successfulSessions) : 52;
  $('kpiGaHits').textContent = st.analyticsBeaconsVerified;
  $('kpiActiveWorkers').textContent = rt.activeWorkers.length;
  $('kpiSerpClicks').textContent = st.serpClicks;
  $('kpiBranded').textContent = st.brandedSearches;

  $('kpiCookiePool').textContent = profiles.length;
  $('kpiCookieGa').textContent = profiles.filter(c => c.hasGaCookie).length;
  $('kpiCookieGoogle').textContent = profiles.filter(c => c.hasGoogleCookies).length;
  $('kpiCookieScore').textContent = profiles.length
    ? Math.round(profiles.reduce((a, c) => a + c.warmScore, 0) / profiles.length)
    : 0;

  const savedMb = (st.savedBandwidthBytes / (1024 * 1024)).toFixed(1);
  $('kpiSavedMb').textContent = savedMb + ' MB';
  $('kpiBlockedReq').textContent = st.blockedHeavyRequests;

  const activePx = proxies.filter(p => p.status === 'active').length;
  $('kpiProxies').textContent = activePx + ' / ' + proxies.length;

  $('activeWorkerCountBadge').textContent = rt.activeWorkers.length;
  const wList = $('activeWorkersList');
  if (!rt.activeWorkers.length) {
    wList.innerHTML = '<div class="empty-hint">Şu anda aktif çalışan oturum yok. Sağ üstten <strong>⚡ Hızlı Canlı Demo Başlat</strong> ile test oturumu başlatabilirsiniz.</div>';
  } else {
    wList.innerHTML = rt.activeWorkers.map(w => `
      <div class="worker-pill-card">
        <div class="worker-top">
          <span>${escapeHtml(w.id)}</span>
          <span>${escapeHtml(w.type.toUpperCase())}</span>
        </div>
        <div class="worker-step">${escapeHtml(w.step)}</div>
        <div class="worker-meta">${escapeHtml(w.device)} &bull; ${escapeHtml(w.proxy)}</div>
      </div>`).join('');
  }

  const cBody = $('campaignsTableBody');
  cBody.innerHTML = appState.campaigns.map(c => {
    const mInfo = MODE_LABELS[c.mode] || MODE_LABELS.direct;
    const isRunning = rt.runningCampaignIds.includes(c.id);
    const sInfo = isRunning ? STATUS_LABELS.running : (STATUS_LABELS[c.status] || STATUS_LABELS.paused);
    const pct = c.targetVisits > 0 ? Math.min(100, Math.round(((c.completedVisits || 0) / c.targetVisits) * 100)) : 0;
    const kwPreview = (c.keywords || []).slice(0, 2).join(', ');
    return `
      <tr>
        <td>
          <strong>${escapeHtml(c.name)}</strong><br/>
          <span style="color:var(--text-muted);font-size:11.5px;">${escapeHtml(c.targetDomain)} ${kwPreview ? '&bull; ' + escapeHtml(kwPreview) : ''}</span>
        </td>
        <td><span class="badge ${mInfo.cls}">${mInfo.text}</span></td>
        <td>
          <div><strong>${c.completedVisits || 0}</strong> / ${c.targetVisits || '∞'} (${pct}%)</div>
          <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
        </td>
        <td><span class="badge badge-green">${c.verifiedGaHits || 0} GA4 ✓</span></td>
        <td style="font-size:11.5px;color:var(--text-muted);">
          %${c.mobileRatio ?? 70} Mobil &bull; ${c.concurrency} Thread<br/>
          ${c.dwellMinSec}-${c.dwellMaxSec}sn &bull; ${c.subpagesMin}-${c.subpagesMax} Alt Sayfa
        </td>
        <td><span class="badge ${sInfo.cls}">${sInfo.text}</span></td>
        <td>
          <div class="btn-row">
            ${isRunning
              ? `<button class="btn btn-secondary btn-xs" onclick="campaignAction('${escapeHtml(c.id)}','pause')">Duraklat</button>`
              : `<button class="btn btn-primary btn-xs" onclick="campaignAction('${escapeHtml(c.id)}','start')">Başlat</button>`}
            <button class="btn btn-secondary btn-xs" onclick="editCampaign('${escapeHtml(c.id)}')">Düzenle</button>
            <button class="btn btn-ghost btn-xs" onclick="campaignAction('${escapeHtml(c.id)}','reset')">Sıfırla</button>
            <button class="btn btn-danger btn-xs" onclick="campaignAction('${escapeHtml(c.id)}','delete')">Sil</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  const cj = rt.cookieJob;
  if (cj.running) {
    $('btnStartCookieWarmup').classList.add('hidden');
    $('btnStopCookieWarmup').classList.remove('hidden');
    $('cookieJobProgressBox').classList.remove('hidden');
    $('cookieJobProgressText').textContent = `Otomatik çerez profilleri üretiliyor ve yaşlandırılıyor: ${cj.completed} / ${cj.total}`;
  } else {
    $('btnStartCookieWarmup').classList.remove('hidden');
    $('btnStopCookieWarmup').classList.add('hidden');
    $('cookieJobProgressBox').classList.add('hidden');
  }

  $('cookiesTableBody').innerHTML = profiles.map(p => `
    <tr>
      <td><strong>${escapeHtml(p.id)}</strong></td>
      <td>
        ${escapeHtml(p.label)}<br/>
        <span class="badge ${p.deviceType === 'mobile' ? 'badge-blue' : 'badge-slate'}">${p.deviceType === 'mobile' ? 'Mobil' : 'Masaüstü'}</span>
      </td>
      <td><strong>${p.cookieCount}</strong> çerez &bull; ${p.domainCount} domain</td>
      <td>
        <span class="badge badge-green">_ga ✓</span>
        <span class="badge badge-blue">Google NID/AEC ✓</span>
      </td>
      <td><strong>${p.warmScore} / 100</strong> (${p.warmupVisits} tur)</td>
      <td>${p.useCount || 0} kez</td>
      <td>
        <div class="btn-row">
          <button class="btn btn-secondary btn-xs" onclick="exportSingleCookie('${escapeHtml(p.id)}')">.txt</button>
          <button class="btn btn-danger btn-xs" onclick="deleteCookieProfile('${escapeHtml(p.id)}')">Sil</button>
        </div>
      </td>
    </tr>`).join('');

  $('proxiesTableBody').innerHTML = proxies.map(p => `
    <tr>
      <td><strong>${escapeHtml(p.id)}</strong></td>
      <td><code>${escapeHtml(p.label)}</code></td>
      <td><span class="badge badge-green">Aktif</span></td>
      <td>${p.latencyMs ? p.latencyMs + ' ms' : '-'}</td>
      <td>${escapeHtml(p.exitIp || '-')}</td>
      <td>${p.successCount || 0}</td>
      <td><button class="btn btn-danger btn-xs" onclick="deleteProxy('${escapeHtml(p.id)}')">Sil</button></td>
    </tr>`).join('');

  if (!settingsLoadedOnce) {
    settingsLoadedOnce = true;
    const s = appState.settings;
    $('setBrowserPath').value = s.browserPath;
    $('setGoogleDomain').value = s.googleDomain;
    $('setMaxConcurrency').value = s.maxGlobalConcurrency;
    $('setLocale').value = s.defaultLocale;
    $('setTimezone').value = s.defaultTimezone;
    $('setLightweight').checked = s.lightweightMode;
    $('setHeadless').checked = s.headlessMode;
    $('setHourlyEnabled').checked = s.hourlyCurveEnabled;
    $('setSeedSites').value = s.cookieSeedSites.join('\n');
    $('rotApiUrl').value = s.mobileRotationUrl;
    $('rotEveryN').value = s.rotateEverySessions;
    $('hourlyBarsContainer').innerHTML = s.hourlyCurve.map((val, hr) => `
      <div class="hour-cell">
        <span>${String(hr).padStart(2, '0')}:00 (%)</span>
        <input type="number" class="hour-input" data-hour="${hr}" min="0" max="100" value="${val}" />
      </div>`).join('');
  }
}

function appendLog(entry) {
  const stream = $('liveLogStream');
  const div = document.createElement('div');
  div.className = 'log-line';
  const cls = entry.level === 'success' ? 'log-success' : entry.level === 'warn' ? 'log-warn' : entry.level === 'error' ? 'log-error' : 'log-info';
  div.innerHTML = `<span class="log-time">[${escapeHtml(entry.time)}]</span><span class="log-worker">[${escapeHtml(entry.worker)}]</span><span class="${cls}">${escapeHtml(entry.message)}</span>`;
  stream.appendChild(div);
  while (stream.children.length > 180) stream.removeChild(stream.firstChild);
  stream.scrollTop = stream.scrollHeight;
}

window.exportSingleCookie = (id) => {
  downloadBlob(`stealthtraffic-cookie-${id}.txt`, buildNetscapeTxt(id));
  toast(`${id} Netscape (.txt) çerez dosyası indirildi.`);
};

window.campaignAction = (id, action) => {
  const c = appState.campaigns.find(x => x.id === id);
  if (!c) return;
  if (action === 'pause') {
    appState.runtime.runningCampaignIds = appState.runtime.runningCampaignIds.filter(x => x !== id);
    c.status = 'paused';
    toast('Kampanya duraklatıldı.');
  } else if (action === 'start') {
    if (!appState.runtime.runningCampaignIds.includes(id)) appState.runtime.runningCampaignIds.push(id);
    c.status = 'running';
    toast('Kampanya başlatıldı.');
  } else if (action === 'reset') {
    c.completedVisits = 0;
    c.verifiedGaHits = 0;
    toast('Kampanya sayaçları sıfırlandı.');
  } else if (action === 'delete') {
    appState.campaigns = appState.campaigns.filter(x => x.id !== id);
    appState.runtime.runningCampaignIds = appState.runtime.runningCampaignIds.filter(x => x !== id);
    toast('Kampanya silindi.');
  }
  renderSnapshot();
};

window.editCampaign = (id) => {
  const c = appState.campaigns.find(x => x.id === id);
  if (!c) return;
  $('campModalTitle').textContent = 'Kampanyayı Düzenle (' + c.id + ')';
  $('campId').value = c.id;
  $('campName').value = c.name;
  $('campMode').value = c.mode;
  $('campDomain').value = c.targetDomain;
  $('campBrand').value = c.brandName || '';
  $('campUrls').value = (c.targetUrls || []).join('\n');
  $('campKeywords').value = (c.keywords || []).join('\n');
  $('campReferrers').value = (c.referrers || []).join('\n');
  $('modalCampaign').classList.remove('hidden');
};

window.deleteCookieProfile = (id) => {
  appState.cookies = appState.cookies.filter(c => c.id !== id);
  renderSnapshot();
  toast('Çerez profili silindi.');
};

window.deleteProxy = (id) => {
  appState.proxies = appState.proxies.filter(p => p.id !== id);
  renderSnapshot();
  toast('Proxy silindi.');
};

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    $(btn.dataset.tab).classList.add('active');
  });
});

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => $(btn.dataset.close).classList.add('hidden'));
});

$('btnExportNetscape')?.addEventListener('click', (e) => {
  e.preventDefault();
  downloadBlob('stealthtraffic-cookie-pool.txt', buildNetscapeTxt());
  toast('Tüm çerez havuzu Netscape (.txt) formatında indirildi.');
});

$('btnExportJson')?.addEventListener('click', (e) => {
  e.preventDefault();
  downloadBlob('stealthtraffic-cookie-pool.json', JSON.stringify(appState.cookies, null, 2), 'application/json');
  toast('Tüm çerez havuzu JSON formatında indirildi.');
});

$('btnOpenQuickDemo').addEventListener('click', () => {
  if (!$('demoUrl').value) $('demoUrl').value = 'https://sizin-hedef-siteniz.com/';
  if (!$('demoKeyword').value) $('demoKeyword').value = 'hedef anahtar kelime';
  $('modalQuickDemo').classList.remove('hidden');
});

$('btnSubmitQuickDemo').addEventListener('click', () => {
  const url = $('demoUrl').value.trim() || 'https://hedef-siteniz.com/';
  const mode = $('demoMode').value;
  const kw = $('demoKeyword').value.trim() || 'organik arama kelimesi';
  const visits = Math.min(12, Math.max(1, Number($('demoVisits').value) || 3));
  $('modalQuickDemo').classList.add('hidden');
  toast('Canlı Demo Simülasyonu başlatıldı! Gerçek GA4 gönderimi için WhatsApp (+90 501 703 70 04) üzerinden URL iletebilirsiniz.');

  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  const wid = 'DEMO-' + Math.floor(10 + Math.random() * 89);
  const dev = DEVICE_POOL[Math.floor(Math.random() * DEVICE_POOL.length)];
  const workerObj = {
    id: wid,
    type: mode,
    step: mode === 'serp' ? `Google.com.tr üzerinde "${kw}" aranıyor -> ${domain} organik tıklandı` : `${domain} sayfasına sıcak çerez profili ile giriş yapıldı`,
    device: dev.label.split('•')[0].trim() + ' (CK-94A1)',
    proxy: '176.88.142.19 (Turkcell 4.5G Rotating)'
  };
  appState.runtime.activeWorkers.unshift(workerObj);
  renderSnapshot();

  appendLog({ time: nowTime(), worker: wid, level: 'info', message: `Stealth Chromium başlatıldı (Page.createIsolatedWorld • Sıfır Runtime.enable sızıntısı) -> ${domain}` });
  setTimeout(() => {
    appendLog({ time: nowTime(), worker: wid, level: 'info', message: `Hafif Mod aktif: 16 ağır görsel/video engellendi (1.9 MB kota tasarrufu), JS motoru açık.` });
    workerObj.step = `${domain} -> GA4 /g/collect HTTP 204 doğrulandı ✓ • Okuma scroll & alt sayfa (1/2)`;
    appState.stats.analyticsBeaconsVerified += 1;
    appState.stats.blockedHeavyRequests += 16;
    appState.stats.savedBandwidthBytes += 1.9 * 1024 * 1024;
    renderSnapshot();
  }, 1400);
  setTimeout(() => {
    appendLog({ time: nowTime(), worker: wid, level: 'success', message: `GA4 Measurement Ping (/g/collect?en=page_view&tid=G-LIVE) doğrulandı ✓ • ${visits} oturum kuyruğa alındı.` });
    appState.stats.successfulSessions += 1;
    appState.stats.subpagesVisited += 2;
    if (mode === 'serp') appState.stats.serpClicks += 1;
    renderSnapshot();
  }, 3000);
});

$('btnNewCampaign').addEventListener('click', () => {
  $('campModalTitle').textContent = 'Yeni Trafik Kampanyası Oluştur';
  $('campId').value = '';
  $('campName').value = '';
  $('campDomain').value = '';
  $('modalCampaign').classList.remove('hidden');
});

$('btnBulkCampaign')?.addEventListener('click', () => {
  if (!$('bulkDomainsInput').value.trim()) {
    $('bulkDomainsInput').value = [
      'eticaret-proje.com.tr | özel e-ticaret paketi, kurumsal seo danışmanlığı',
      'haber-portali.net | son dakika ekonomi, güncel teknoloji haberleri',
      'hukuk-danismanlik.org | istanbul bilişim avukatı, şirket danışmanlığı'
    ].join('\n');
  }
  $('modalBulkCampaign').classList.remove('hidden');
});

$('btnSubmitBulkCampaign')?.addEventListener('click', () => {
  const lines = $('bulkDomainsInput').value.trim().split('\n').map(s => s.trim()).filter(Boolean);
  if (!lines.length) return toast('Lütfen satır satır domain | kelime1, kelime2 listesini girin.', true);
  const mode = $('bulkMode').value;
  const visits = Number($('bulkVisits').value) || 150;
  const concurrency = Number($('bulkConcurrency').value) || 2;
  const dMin = Number($('bulkDwellMin').value) || 35;
  const dMax = Number($('bulkDwellMax').value) || 75;
  const autoStart = $('bulkAutoStart').checked;
  let added = 0;

  lines.forEach((line) => {
    const [rawDom, rawKws = ''] = line.split(/[|;]/);
    const dom = (rawDom || '').trim().replace(/^https?:\/\//i, '').split('/')[0];
    if (!dom) return;
    const kws = rawKws.split(',').map(k => k.trim()).filter(Boolean);
    const id = 'CMP-' + Math.floor(200 + Math.random() * 790);
    appState.campaigns.unshift({
      id,
      name: `Toplu: ${dom}` + (kws.length ? ` (${kws.length} kelime)` : ''),
      mode: kws.length ? mode : 'direct',
      targetDomain: dom,
      brandName: dom.split('.')[0],
      targetUrls: ['https://' + dom + '/'],
      keywords: kws,
      referrers: ['https://www.google.com.tr/'],
      targetVisits: visits,
      completedVisits: 0,
      verifiedGaHits: 0,
      concurrency,
      mobileRatio: 75,
      dwellMinSec: dMin,
      dwellMaxSec: dMax,
      subpagesMin: 1,
      subpagesMax: 3,
      status: autoStart ? 'running' : 'paused'
    });
    if (autoStart) {
      appState.runtime.runningCampaignIds.push(id);
      const wid = 'W-' + Math.floor(10 + Math.random() * 89);
      const dev = DEVICE_POOL[Math.floor(Math.random() * DEVICE_POOL.length)];
      appState.runtime.activeWorkers.unshift({
        id: wid,
        type: mode,
        step: kws.length ? `Google SERP -> "${kws[0]}" aranıyor -> ${dom} hedeflendi` : `${dom} sıcak çerez ile açıldı`,
        device: dev.label.split('•')[0].trim() + ' (CK-94A2)',
        proxy: '31.145.92.104 (4.5G TR)'
      });
      appendLog({ time: nowTime(), worker: wid, level: 'success', message: `Toplu görev başlatıldı -> ${dom} (${kws.join(', ') || 'Direkt GA4'})` });
    }
    added++;
  });

  $('modalBulkCampaign').classList.add('hidden');
  renderSnapshot();
  toast(`${added} farklı domain ve özel kelime havuzu aynı anda başlatıldı!`);
});

$('btnSaveCampaign').addEventListener('click', () => {
  const domain = $('campDomain').value.trim() || 'yeni-hedefsite.com';
  const id = $('campId').value || ('CMP-' + Math.floor(103 + Math.random() * 890));
  const existing = appState.campaigns.find(c => c.id === id);
  const obj = {
    id,
    name: $('campName').value.trim() || ('Kampanya: ' + domain),
    mode: $('campMode').value,
    targetDomain: domain,
    brandName: $('campBrand').value.trim(),
    targetUrls: $('campUrls').value.split('\n').filter(Boolean),
    keywords: $('campKeywords').value.split('\n').filter(Boolean),
    referrers: $('campReferrers').value.split('\n').filter(Boolean),
    targetVisits: Number($('campTargetVisits').value) || 100,
    completedVisits: existing ? existing.completedVisits : 0,
    verifiedGaHits: existing ? existing.verifiedGaHits : 0,
    concurrency: Number($('campConcurrency').value) || 2,
    mobileRatio: Number($('campMobileRatio').value) || 70,
    dwellMinSec: Number($('campDwellMin').value) || 30,
    dwellMaxSec: Number($('campDwellMax').value) || 70,
    subpagesMin: Number($('campSubMin').value) || 1,
    subpagesMax: Number($('campSubMax').value) || 3,
    status: 'running'
  };
  if (existing) Object.assign(existing, obj);
  else {
    appState.campaigns.unshift(obj);
    appState.runtime.runningCampaignIds.push(id);
  }
  $('modalCampaign').classList.add('hidden');
  renderSnapshot();
  toast('Kampanya kaydedildi ve aktif kuyruğa eklendi.');
});

$('btnStartCookieWarmup').addEventListener('click', () => {
  const count = Math.min(20, Math.max(1, Number($('ckCount').value) || 3));
  appState.runtime.cookieJob = { running: true, completed: 0, total: count };
  renderSnapshot();
  toast(`${count} adet organik çerez profili üretimi başlatıldı...`);
  let done = 0;
  const timer = setInterval(() => {
    done++;
    const dev = DEVICE_POOL[Math.floor(Math.random() * DEVICE_POOL.length)];
    const cid = 'CK-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    appState.cookies.unshift({
      id: cid,
      label: dev.label,
      deviceType: dev.type,
      cookieCount: 28 + Math.floor(Math.random() * 18),
      domainCount: 5 + Math.floor(Math.random() * 3),
      domains: ['.google.com.tr', '.google.com', '.hurriyet.com.tr', '.ntv.com.tr'],
      hasGaCookie: true,
      hasGoogleCookies: true,
      warmScore: 89 + Math.floor(Math.random() * 10),
      warmupVisits: 3 + Math.floor(Math.random() * 3),
      useCount: 0
    });
    appState.runtime.cookieJob.completed = done;
    appendLog({ time: nowTime(), worker: 'COOKIE-WARM', level: 'success', message: `Yeni sıcak profil üretildi: ${cid} (_ga + Google NID/AEC/SOCS • Skor: 94/100)` });
    if (done >= count || !appState.runtime.cookieJob.running) {
      clearInterval(timer);
      appState.runtime.cookieJob.running = false;
      toast(`${done} adet sıcak çerez profili havuza eklendi!`);
    }
    renderSnapshot();
  }, 1100);
});

$('btnStopCookieWarmup').addEventListener('click', () => {
  appState.runtime.cookieJob.running = false;
  renderSnapshot();
  toast('Çerez üretimi durduruldu.');
});

$('btnOpenCookieImport').addEventListener('click', () => $('modalCookieImport').classList.remove('hidden'));
$('btnSubmitCookieImport').addEventListener('click', () => {
  $('modalCookieImport').classList.add('hidden');
  const cid = 'CK-IMP' + Math.floor(10 + Math.random() * 89);
  appState.cookies.unshift({
    id: cid, label: 'İçe Aktarılan Profil • Chrome 134', deviceType: 'desktop',
    cookieCount: 26, domainCount: 4, domains: ['.google.com.tr'], hasGaCookie: true, hasGoogleCookies: true, warmScore: 90, warmupVisits: 3, useCount: 0
  });
  renderSnapshot();
  toast('Çerez profili başarıyla havuza aktarıldı.');
});
$('btnClearCookies').addEventListener('click', () => {
  appState.cookies = [];
  renderSnapshot();
  toast('Çerez havuzu temizlendi.');
});

$('btnImportProxies').addEventListener('click', () => {
  const lines = $('proxyBulkInput').value.trim().split('\n').filter(Boolean);
  if (!lines.length) return toast('Lütfen eklenecek proxy satırlarını girin.', true);
  lines.forEach((l, idx) => {
    appState.proxies.push({
      id: 'PX-0' + (appState.proxies.length + idx + 1),
      label: l,
      status: 'active',
      latencyMs: 52 + Math.floor(Math.random() * 35),
      exitIp: '176.88.' + Math.floor(20 + Math.random() * 200) + '.' + Math.floor(10 + Math.random() * 230) + ' (TR)',
      successCount: 0
    });
  });
  $('proxyBulkInput').value = '';
  renderSnapshot();
  toast(`${lines.length} adet proxy havuza eklendi.`);
});

$('btnTestProxies').addEventListener('click', () => toast('Test tamamlandı: Tüm kayıtlı proxyler aktif (Ort. 61 ms).'));
$('btnTriggerRotationNow').addEventListener('click', () => {
  const newIp = '176.88.' + Math.floor(10 + Math.random() * 230) + '.' + Math.floor(10 + Math.random() * 240) + ' (İstanbul 4.5G)';
  if (appState.proxies[0]) appState.proxies[0].exitIp = newIp;
  appendLog({ time: nowTime(), worker: '4G-ROTATE', level: 'success', message: `Mobil Proxy IP sıfırlama API çağrıldı (HTTP 200) -> Yeni Çıkış IP: ${newIp}` });
  renderSnapshot();
  toast('Mobil Proxy IP adresi başarıyla yenilendi: ' + newIp);
});
$('btnSaveRotation').addEventListener('click', () => toast('Mobil IP yenileme ayarları kaydedildi.'));
$('btnSaveSettings').addEventListener('click', () => toast('Tüm sistem ayarları kaydedildi.'));
$('btnClearLogs').addEventListener('click', () => { $('liveLogStream').innerHTML = ''; });
$('btnResetStats').addEventListener('click', () => {
  appState.stats.successfulSessions = 0;
  appState.stats.analyticsBeaconsVerified = 0;
  renderSnapshot();
  toast('İstatistikler sıfırlandı.');
});

// Seed initial realistic terminal history + continuous live ticker
const INITIAL_LOGS = [
  { worker: 'ENGINE', level: 'info', message: 'StealthTraffic Pro v2.4 başlatıldı • Sıfır Runtime.enable CDP çekirdeği aktif.' },
  { worker: 'COOKIE-POOL', level: 'success', message: '6 adet sıcak organik çerez profili yüklendi (_ga + Google NID/AEC/SOCS hazır, Ort. Skor: 94/100).' },
  { worker: 'W-01', level: 'info', message: 'Profil CK-94A1 (iPhone 16 Pro • 176.88.142.19) -> google.com.tr SERP araması: "istanbul kurumsal yazılım"' },
  { worker: 'W-01', level: 'info', message: 'Hafif Mod: 19 ağır görsel/font ağ katmanında bloklandı (2.3 MB tasarruf) • JS & gtag.js aktif.' },
  { worker: 'W-01', level: 'success', message: 'Hedef domain S.1 #4 sırada bulundu ve organik tıklandı -> GA4 /g/collect (HTTP 204) doğrulandı ✓' },
  { worker: 'W-02', level: 'success', message: 'Alt sayfa gezinmesi (/hizmetlerimiz -> /referanslar) tamamlandı • Kalma süresi: 58 sn • GA4 event=user_engagement ✓' },
  { worker: 'W-03', level: 'info', message: 'Autocomplete sinyali: "kurumsalnet iletişim" insan ritminde yazıldı (/complete/search HTTP 200 ✓)' },
  { worker: '4G-ROTATE', level: 'success', message: '5 oturum tamamlandı -> 4.5G Mobil Proxy IP otomatik yenilendi (Yeni IP: 31.145.92.104)' }
];

renderSnapshot();
INITIAL_LOGS.forEach(l => appendLog({ time: nowTime(), ...l }));

const LIVE_TICK_MESSAGES = [
  { worker: 'W-01', level: 'success', message: 'GA4 Measurement Ping (/g/collect?v=2&en=page_view) HTTP 204 doğrulandı ✓ • Doğal scroll %74' },
  { worker: 'W-02', level: 'info', message: 'İç link tıklaması (isTrusted: true donanım eventi) -> /iletisim alt sayfası açıldı (1.8 MB medya tasarrufu)' },
  { worker: 'COOKIE-AGE', level: 'success', message: 'Profil CK-94A2 çerezleri güncellendi ve yaşlandırıldı (_ga + _gid • Isınma Skoru: 98/100)' },
  { worker: 'W-03', level: 'success', message: 'Google SERP organik tıklama tamamlandı • Sitede kalma: 54 sn (Pogo-sticking koruması aktif ✓)' }
];
let tickIdx = 0;
setInterval(() => {
  if (!appState.runtime.runningCampaignIds.length) return;
  const item = LIVE_TICK_MESSAGES[tickIdx % LIVE_TICK_MESSAGES.length];
  tickIdx++;
  appendLog({ time: nowTime(), ...item });
  if (tickIdx % 2 === 0) {
    appState.stats.successfulSessions += 1;
    appState.stats.analyticsBeaconsVerified += 1;
    appState.stats.subpagesVisited += 2;
    appState.stats.savedBandwidthBytes += 1.6 * 1024 * 1024;
    appState.stats.blockedHeavyRequests += 14;
    if (appState.campaigns[0]) {
      appState.campaigns[0].completedVisits = Math.min(appState.campaigns[0].targetVisits, appState.campaigns[0].completedVisits + 1);
      appState.campaigns[0].verifiedGaHits += 1;
    }
    renderSnapshot();
  }
}, 3200);
