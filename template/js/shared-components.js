/**
 * KCOZM Salon Admin — Shared Components v11 (CORRECTED)
 * ══════════════════════════════════════════
 * NAVBAR  : White (#ffffff) — original v8
 * SIDEBAR : White background, black labels, grey hover
 * SCROLLBAR: Gold-toned to match sidebar cream, hidden on mobile/tablet
 * ICONS   : Gold (#c8a040) — luxury brand primary
 * MOBILE  : No scrollbar visible, sidebar slides from RIGHT
 * SERVICES: All 4 sub-items (All Services, Categories, Styling, Loyalty Cards)
 * ALL FUNCTIONALITY PRESERVED
 *
 * FIXES APPLIED (v11):
 * ✓ Reassigned --pk, --pk-dk, --pk-ddk, --pk-lt, --pk-glow to GOLD (prevent pink bleed)
 * ✓ Added missing --rose-lt and --rose-dk for index.html Quick Access
 * ✓ Updated .kc-nb-addbtn gradient: pink → gold (consistent with sidebar)
 * ✓ Updated .kc-nb-av gradient: pink → gold
 * ✓ Updated .kc-ft-brand span gradient: pink → gold
 * ✓ Updated .kc-sb-av gradient: pink → gold
 * ✓ Updated .kc-mob-sb-av gradient: pink → gold
 * ✓ Updated .kc-nb-ndot.p (notification dot) color to rose instead of pink
 * ✓ All other functionality and styling preserved exactly
 */
(function (win) {
  'use strict';

  var CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      /* ── CRITICAL FIX: Reassign pink vars to GOLD to prevent accidental pink bleed ── */
      --pk:          #c8a040;
      --pk-dk:       #a07828;
      --pk-ddk:      #7a5a10;
      --pk-lt:       #fdf8ee;
      --pk-glow:     rgba(200,160,64,0.22);

      /* ── Primary: GOLD luxury palette ── */
      --gold:        #c8a040;
      --gold-dk:     #a07828;
      --gold-ddk:    #7a5a10;
      --gold-lt:     #fdf8ee;
      --gold-mid:    #fdf3d0;
      --gold-border: #f0e8d0;
      --gold-glow:   rgba(200,160,64,0.22);

      /* ── ADDED: Rose palette for Quick Access badges and accents ── */
      --rose-lt:     #fce8ea;
      --rose-dk:     #c97b84;

      /* ── Sidebar icon gold (matches Add Service button) ── */
      --ic:          #c8a040;
      --ic-dk:       #a07828;
      --ic-glow:     rgba(200,160,64,0.35);

      /* ── Neutrals ── */
      --ink:         #1a1410;
      --ink-2:       #3d3028;
      --ink-3:       #8a7060;
      --surface:     #ffffff;
      --surface-2:   #f9f7f5;
      --border:      #e8e2da;

      /* ── Sidebar — white background ── */
      --sb-w:        220px;
      --sb-col:      56px;
      --sb-bg1:      #ffffff;
      --sb-bg2:      #ffffff;
      --sb-bg3:      #f8f8f8;
      --sb-border:   rgba(0,0,0,0.08);

      --nav-h:       72px;
      --t:           0.22s ease;
    }

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html, body { height:100%; }
    body { font-family:'DM Sans',sans-serif; background:var(--surface-2); color:var(--ink); overflow-x:hidden; }

    /* ════════════════════════════════════════
       GLOBAL SCROLLBAR — matches sidebar cream palette
       Hidden completely on mobile/tablet
    ════════════════════════════════════════ */
    @media (min-width:769px) {
      ::-webkit-scrollbar              { width:6px; height:6px; }
      ::-webkit-scrollbar-track        { background:#f5ecd0; }
      ::-webkit-scrollbar-thumb        { background:linear-gradient(180deg,#c8a040,#a07828); border-radius:99px; }
      ::-webkit-scrollbar-thumb:hover  { background:linear-gradient(180deg,#a07828,#7a5a10); }
      ::-webkit-scrollbar-corner       { background:#f5ecd0; }
      *                                { scrollbar-width:thin; scrollbar-color:#c8a040 #f5ecd0; }
    }
    @media (max-width:768px) {
      ::-webkit-scrollbar { display:none; width:0; }
      *                   { scrollbar-width:none; -ms-overflow-style:none; }
    }

    /* ════════════════════════════════════════
       NAVBAR — white (original v8)
    ════════════════════════════════════════ */
    .kc-navbar {
      position:fixed; top:0; left:0; right:0;
      height:var(--nav-h);
      display:flex; align-items:center; gap:10px;
      padding:0 20px 0 9px;
      background:var(--surface);
      border-bottom:1.5px solid var(--gold-border);
      box-shadow:0 2px 20px rgba(160,120,40,0.08);
      z-index:1002;
    }

    .kc-nb-brand { display:contents; }
    .kc-nb-brand.sb-col { display:contents; }

    .kc-nb-toggle-brand {
      width:38px; height:38px; flex-shrink:0;
      border:1.5px solid var(--gold-border); border-radius:9px;
      background:rgba(200,160,64,0.07); cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:var(--gold-dk); font-size:15px;
      transition:background var(--t), border-color var(--t), color var(--t);
      position:relative; overflow:hidden;
    }
    .kc-nb-toggle-brand:hover { background:var(--gold-mid); border-color:var(--gold); color:var(--gold-ddk); }

    /* icon swap — bars → xmark */
    .kc-nb-toggle-brand .ic-bars,
    .kc-nb-toggle-brand .ic-xmark {
      position:absolute; transition:opacity 0.18s ease, transform 0.22s ease;
    }
    .kc-nb-toggle-brand .ic-bars  { opacity:1; transform:rotate(0deg) scale(1); }
    .kc-nb-toggle-brand .ic-xmark { opacity:0; transform:rotate(-90deg) scale(0.7); }
    .kc-nb-toggle-brand.is-open .ic-bars  { opacity:0; transform:rotate(90deg) scale(0.7); }
    .kc-nb-toggle-brand.is-open .ic-xmark { opacity:1; transform:rotate(0deg) scale(1); }

    /* Logo */
    .kc-nb-logo {
      display:flex; align-items:center;
      flex-shrink:0; text-decoration:none;
      height:var(--nav-h);
      padding:0 8px 0 4px;
    }
    .kc-nb-logo img {
      height:56px; width:auto; min-width:150px; max-width:200px;
      object-fit:contain; object-position:left center; display:block;
      filter:drop-shadow(0 1px 10px rgba(200,160,64,0.22));
    }

    .kc-nb-bar { display:contents; }

    .kc-nb-search { position:relative; flex-shrink:0; }
    .kc-nb-search input {
      width:210px; padding:8px 14px 8px 36px;
      border:1.5px solid var(--gold-border); border-radius:50px;
      background:var(--gold-lt); font-family:'DM Sans',sans-serif;
      font-size:13px; color:var(--ink); outline:none; transition:all var(--t);
    }
    .kc-nb-search input:focus { width:260px; border-color:var(--gold); box-shadow:0 0 0 3px var(--gold-glow); background:#fff; }
    .kc-nb-search input::placeholder { color:var(--gold-dk); opacity:0.6; }
    .kc-nb-search i { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--gold-dk); font-size:12px; pointer-events:none; }

    .kc-nb-spacer { flex:1; }

    .kc-nb-addbtn {
      display:flex; align-items:center; gap:6px; padding:7px 16px; border-radius:9px;
      background:linear-gradient(135deg,var(--gold),var(--gold-dk));
      border:none; color:#fff; font-family:'DM Sans',sans-serif;
      font-size:12.5px; font-weight:600; cursor:pointer;
      white-space:nowrap; flex-shrink:0;
      box-shadow:0 4px 14px rgba(200,160,64,0.32);
      transition:all var(--t); text-decoration:none;
    }
    .kc-nb-addbtn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(200,160,64,0.42); }

    .kc-nb-btn {
      width:38px; height:38px; flex-shrink:0;
      border:1.5px solid var(--gold-border); border-radius:9px;
      background:transparent; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:var(--gold-dk); font-size:14px; position:relative; transition:all var(--t);
    }
    .kc-nb-btn:hover { background:var(--gold-mid); border-color:var(--gold); color:var(--gold-ddk); }
    .kc-nb-btn .dot {
      position:absolute; top:-5px; right:-5px;
      width:17px; height:17px; border-radius:99px;
      background:var(--rose-dk); color:#fff;
      font-size:8px; font-weight:700; line-height:17px; text-align:center;
      border:2px solid var(--surface);
    }

    .kc-nb-branch {
      display:flex; align-items:center; gap:6px; padding:7px 12px;
      border:1.5px solid var(--gold-border); border-radius:9px;
      background:var(--gold-lt); font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:600; color:var(--gold-dk); cursor:pointer;
      transition:all var(--t); white-space:nowrap; flex-shrink:0;
    }
    .kc-nb-branch:hover { border-color:var(--gold); color:var(--gold-ddk); background:var(--gold-mid); }
    .kc-divider { width:1px; height:24px; background:var(--gold-border); flex-shrink:0; }

    .kc-nb-profile { position:relative; flex-shrink:0; }
    .kc-nb-pbtn {
      display:flex; align-items:center; gap:8px; padding:4px 10px 4px 4px;
      border:1.5px solid var(--gold-border); border-radius:50px;
      background:var(--gold-lt); cursor:pointer; transition:all var(--t);
    }
    .kc-nb-pbtn:hover { border-color:var(--gold); background:var(--gold-mid); }
    .kc-nb-av {
      width:32px; height:32px; border-radius:50%;
      background:linear-gradient(135deg,var(--gold),var(--gold-dk));
      display:flex; align-items:center; justify-content:center;
      font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700; color:#fff; flex-shrink:0;
    }
    .kc-nb-pname { font-size:13px; font-weight:600; color:var(--gold-ddk); white-space:nowrap; }
    .kc-nb-prole { font-size:10px; color:var(--gold-dk); white-space:nowrap; }
    .kc-nb-chev  { font-size:10px; color:var(--gold-dk); transition:transform var(--t); flex-shrink:0; }
    .kc-nb-profile.open .kc-nb-chev { transform:rotate(180deg); }

    .kc-nb-pdrop {
      display:none; position:absolute; top:calc(100% + 10px); right:0;
      width:222px; background:var(--surface);
      border:1px solid var(--gold-border); border-radius:14px;
      box-shadow:0 16px 48px rgba(160,120,40,0.14); overflow:hidden; z-index:2000;
    }
    .kc-nb-profile.open .kc-nb-pdrop { display:block; animation:kcFade .18s ease; }
    .kc-nb-pdhead { padding:16px; border-bottom:1px solid var(--gold-border); background:var(--gold-lt); }
    .kc-nb-pdname  { font-size:14px; font-weight:700; color:var(--gold-ddk); }
    .kc-nb-pdemail { font-size:11.5px; color:var(--gold-dk); margin-top:2px; }
    .kc-nb-pdi {
      display:flex; align-items:center; gap:10px; padding:11px 16px;
      font-size:13px; font-weight:500; color:var(--gold-ddk); text-decoration:none; transition:all var(--t);
    }
    .kc-nb-pdi i { width:16px; text-align:center; color:var(--gold-dk); }
    .kc-nb-pdi:hover { background:var(--gold-mid); color:var(--gold-ddk); }
    .kc-nb-pdi:hover i { color:var(--gold-ddk); }
    .kc-nb-pdi.red { color:#c62828; } .kc-nb-pdi.red i { color:#c62828; }
    .kc-nb-pdi.red:hover { background:#fef2f2; }
    .kc-nb-pd-hr { height:1px; background:var(--gold-border); }

    .kc-nb-mob-toggle {
      width:38px; height:38px; flex-shrink:0;
      border:1.5px solid var(--gold-border); border-radius:9px;
      background:transparent; cursor:pointer;
      display:none; align-items:center; justify-content:center;
      color:var(--gold-dk); font-size:15px; transition:all var(--t);
    }
    .kc-nb-mob-toggle:hover { background:var(--gold-mid); border-color:var(--gold); color:var(--gold-ddk); }

    .kc-nb-notif { position:relative; flex-shrink:0; }
    .kc-nb-ndrop {
      display:none; position:absolute; top:calc(100% + 10px); right:0;
      width:320px; background:var(--surface);
      border:1px solid var(--gold-border); border-radius:14px;
      box-shadow:0 16px 48px rgba(160,120,40,0.14); overflow:hidden; z-index:2000;
    }
    .kc-nb-notif.open .kc-nb-ndrop { display:block; animation:kcFade .18s ease; }
    .kc-nb-nhead { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--gold-border); background:var(--gold-lt); }
    .kc-nb-nhead b { font-size:14px; color:var(--gold-ddk); }
    .kc-nb-nhead a { font-size:12px; color:var(--gold-dk); text-decoration:none; font-weight:500; }
    .kc-nb-ni { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; border-bottom:1px solid var(--gold-border); cursor:pointer; transition:background var(--t); }
    .kc-nb-ni:last-child { border:none; }
    .kc-nb-ni:hover { background:var(--gold-lt); }
    .kc-nb-ndot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:14px; }
    .kc-nb-ndot.p  { background:var(--rose-lt); color:var(--rose-dk); }
    .kc-nb-ndot.o  { background:#fff3e0; color:#e65100; }
    .kc-nb-ndot.gr { background:#e8f5e9; color:#2e7d32; }
    .kc-nb-ni p    { font-size:12.5px; color:var(--gold-ddk); line-height:1.5; margin:0; }
    .kc-nb-ni small { font-size:11px; color:var(--gold-dk); }

    @keyframes kcFade    { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
    @keyframes kcIconPop { 0%{transform:scale(1)} 40%{transform:scale(1.22)} 70%{transform:scale(0.95)} 100%{transform:scale(1.08)} }
    @keyframes kcIconGlow {
      0%  { box-shadow:0 0 0 0 var(--ic-glow); }
      50% { box-shadow:0 0 0 7px rgba(200,160,64,0); }
      100%{ box-shadow:0 0 0 0 rgba(200,160,64,0); }
    }

    /* ════════════════════════════════════════
       DESKTOP SIDEBAR — white background, black text, grey hover
    ════════════════════════════════════════ */
    .kc-sidebar {
      position:fixed; top:var(--nav-h); left:0; bottom:0;
      width:var(--sb-w);
      background:#ffffff;
      display:flex; flex-direction:column;
      z-index:1001; overflow:visible;
      border-right:1.5px solid var(--sb-border);
      box-shadow:3px 0 24px rgba(0,0,0,0.06);
      transition:width var(--t);
    }
    .kc-sidebar::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,transparent 0%,rgba(200,160,64,0.40) 20%,var(--gold) 50%,rgba(200,160,64,0.40) 80%,transparent 100%);
      z-index:2; pointer-events:none;
    }
    .kc-sidebar.sb-col { width:var(--sb-col); overflow:visible; }
    .kc-sidebar.sb-col .kc-sb-nav { overflow-y:auto; overflow-x:visible; }

    .kc-sb-search-wrap { display:none; }
    .kc-sb-search-inner {
      display:flex; align-items:center; gap:8px;
      background:rgba(255,255,255,0.60); border:1px solid var(--sb-border);
      border-radius:10px; padding:8px 12px; transition:all var(--t);
    }
    .kc-sb-search-inner:focus-within { border-color:var(--gold); background:#fff; box-shadow:0 0 0 3px var(--gold-glow); }
    .kc-sb-search-inner i { color:var(--ic); font-size:12px; flex-shrink:0; }
    .kc-sb-search-inner input { background:transparent; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--ink); width:100%; min-width:0; }
    .kc-sb-search-inner input::placeholder { color:rgba(200,160,64,0.35); }
    .kc-sidebar.sb-col .kc-sb-search-wrap { padding:10px 0; }
    .kc-sidebar.sb-col .kc-sb-search-inner { border-radius:0; border:none; background:transparent; justify-content:center; padding:8px; }
    .kc-sidebar.sb-col .kc-sb-search-inner input { display:none; }
    .kc-sidebar.sb-col .kc-sb-search-inner i { font-size:15px; }

    .kc-sb-nav { flex:1; overflow-y:auto; overflow-x:visible; padding:4px 0 16px; }
    .kc-sb-nav::-webkit-scrollbar { display:none; width:0; }
    .kc-sb-nav { scrollbar-width:none; -ms-overflow-style:none; }
    .kc-sidebar.sb-col .kc-sb-item { overflow:visible; }

    /* ── Section headings — muted grey ── */
    .kc-sb-sec {
      padding:14px 18px 4px; font-size:9px; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:#aaaaaa;
      white-space:nowrap; overflow:hidden;
      transition:opacity var(--t),height var(--t),padding var(--t);
    }
    .kc-sidebar.sb-col .kc-sb-sec { opacity:0; height:0; padding:0; pointer-events:none; }

    /* ── Nav items — black text, grey hover ── */
    .kc-sb-item {
      display:flex; align-items:center; gap:10px; padding:7px 12px 7px 9px;
      font-size:13px; font-weight:500; color:#111111;
      text-decoration:none; cursor:pointer; position:relative;
      border-left:2px solid transparent;
      white-space:nowrap; overflow:visible; user-select:none;
      transition:background var(--t),color var(--t),border-color var(--t);
    }
    .kc-sb-item:hover { color:#111111; background:#f3f3f3; border-left-color:#cccccc; }
    .kc-sb-item.active { color:var(--gold-ddk); background:var(--gold-mid); border-left-color:var(--gold); }
    .kc-sb-item.active::after {
      content:''; position:absolute; right:0; top:16%; bottom:16%;
      width:3px; background:linear-gradient(180deg,var(--gold),var(--gold-dk)); border-radius:3px 0 0 3px;
    }
    .kc-sb-item.active .kc-sb-icon { background:rgba(200,160,64,0.18); color:var(--gold-dk); box-shadow:0 0 14px rgba(200,160,64,0.35); }
    .kc-sidebar.sb-col .kc-sb-item.active .kc-sb-icon { background:rgba(200,160,64,0.22); color:var(--gold-dk); box-shadow:0 0 20px rgba(200,160,64,0.50); }

    /* ── ICONS: Gold with animated hover ── */
    .kc-sb-icon {
      width:38px; height:38px; border-radius:9px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-size:15px; color:var(--ic);
      transition:color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease;
      position:relative; min-width:38px; background:rgba(200,160,64,0.09);
    }
    .kc-sb-icon i { display:block; transition:transform 0.22s ease; }
    .kc-sb-item:hover .kc-sb-icon {
      color:var(--ic-dk);
      background:#e8e8e8;
      transform:translateY(-2px) scale(1.10);
      box-shadow:0 4px 14px rgba(0,0,0,0.10);
      animation:kcIconPop 0.35s ease forwards;
    }
    .kc-sb-item.open .kc-sb-icon { color:var(--ic-dk); background:#ebebeb; }

    /* Flyout panel */
    .kc-sb-fly {
      position:absolute; left:calc(var(--sb-col) + 4px); top:50%;
      transform:translateY(-50%) translateX(8px);
      min-width:190px; background:#fff;
      border:1px solid rgba(180,130,20,0.25); border-radius:10px; overflow:hidden;
      box-shadow:4px 8px 28px rgba(0,0,0,0.20);
      opacity:0; pointer-events:none;
      transition:opacity 0.18s ease, transform 0.18s ease; z-index:5000;
    }
    .kc-sb-fly::after { content:''; position:absolute; right:100%; top:0; bottom:0; width:12px; background:transparent; }
    .kc-sb-fly::before {
      content:''; position:absolute; left:-6px; top:50%; transform:translateY(-50%);
      border:6px solid transparent; border-right-color:#fff; border-left:none; z-index:1;
    }
    .kc-sidebar.sb-col .kc-sb-fly.fly-show {
      opacity:1; pointer-events:auto; transform:translateY(-50%) translateX(0);
      transition:opacity 0.12s ease, transform 0.12s ease;
    }
    .kc-sb-fly-label { padding:8px 14px; font-size:10.5px; font-weight:700; color:#7a5a10; white-space:nowrap; letter-spacing:0.8px; text-transform:uppercase; border-bottom:1px solid #f0e8d0; background:#fdf8ee; }
    .kc-sb-fly-item { display:flex; align-items:center; gap:9px; padding:9px 14px; font-size:13px; font-weight:500; color:#3d2c08; text-decoration:none; white-space:nowrap; transition:background 0.12s, color 0.12s; border-left:2px solid transparent; }
    .kc-sb-fly-item i { width:14px; text-align:center; font-size:12px; flex-shrink:0; color:#b8860b; }
    .kc-sb-fly-item:hover { background:#fdf3d0; color:#1a0f00; border-left-color:#c8a040; }
    .kc-sb-fly-item:hover i { color:#a07828; }
    .kc-sb-fly-item.active { color:#7a5a10; border-left-color:#c8a040; background:#fdf3d0; font-weight:700; }
    .kc-sb-fly-expand { padding:7px 14px; font-size:11px; color:#b8860b; cursor:pointer; border-top:1px solid #f0e8d0; text-align:center; transition:color 0.12s, background 0.12s; background:#fdf8ee; }
    .kc-sb-fly-expand:hover { color:#7a5a10; background:#fdf3d0; }

    .kc-sb-label { flex:1; white-space:nowrap; overflow:hidden; transition:opacity var(--t),width var(--t); }
    .kc-sidebar.sb-col .kc-sb-label { opacity:0; width:0; }

    .kc-sb-arrow { font-size:9px; color:#bbbbbb; transition:transform var(--t),opacity var(--t); flex-shrink:0; }
    .kc-sb-item.open .kc-sb-arrow { transform:rotate(90deg); }
    .kc-sidebar.sb-col .kc-sb-arrow { opacity:0; width:0; overflow:hidden; }

    .kc-sb-badge {
      background:linear-gradient(135deg,var(--gold),var(--gold-dk)); color:#fff;
      font-size:9px; font-weight:700; padding:2px 7px; border-radius:20px; line-height:1.5;
      flex-shrink:0; box-shadow:0 2px 6px rgba(200,160,64,0.35); transition:opacity var(--t);
    }
    .kc-sidebar.sb-col .kc-sb-badge { opacity:0; width:0; overflow:hidden; padding:0; }
    .kc-sidebar.sb-col .kc-sb-item {
      padding:0;
      margin:1px 0;
      width:var(--sb-col);
      min-height:46px; height:46px;
      display:flex; align-items:center; justify-content:center;
      border-left:2px solid transparent;
    }
    .kc-sidebar.sb-col .kc-sb-icon {
      width:38px; height:38px; border-radius:9px; font-size:15px;
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; margin:0;
    }

    .kc-sb-sub { overflow:hidden; max-height:0; transition:max-height 0.28s ease; }
    .kc-sb-sub.open { max-height:600px; }
    .kc-sidebar.sb-col .kc-sb-sub { max-height:0!important; }

    /* ── Sub items — black text, grey hover ── */
    .kc-sb-sub-item {
      display:flex; align-items:center; gap:10px; padding:7px 12px 7px 16px;
      font-size:12.5px; color:#333333; text-decoration:none;
      border-left:2px solid transparent; white-space:nowrap; transition:all var(--t); position:relative;
    }
    .kc-sb-sub-icon {
      width:32px; height:32px; border-radius:8px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-size:13px; color:var(--ic); transition:color 0.22s ease, background 0.22s ease, transform 0.18s ease; margin-left:16px;
    }
    .kc-sb-sub-item:hover .kc-sb-sub-icon { color:var(--ic-dk); background:#e8e8e8; transform:scale(1.14); animation:kcIconPop 0.30s ease forwards; }
    .kc-sb-sub-item.active .kc-sb-sub-icon { color:var(--ic-dk); background:rgba(200,160,64,0.18); }
    .kc-sb-sub-lbl { flex:1; }
    .kc-sb-sub-item:hover { color:#111111; background:#f3f3f3; }
    .kc-sb-sub-item.active { color:var(--gold-ddk); border-left-color:var(--gold); background:var(--gold-mid); }

    /* ── Footer ── */
    .kc-sb-foot {
      border-top:1px solid rgba(0,0,0,0.07); padding:12px 14px;
      display:flex; align-items:center; gap:10px; overflow:hidden; flex-shrink:0;
      background:#f8f8f8;
    }
    .kc-sidebar.sb-col .kc-sb-foot { justify-content:center; padding:12px 0; }
    .kc-sb-av {
      width:36px; height:36px; border-radius:50%;
      background:linear-gradient(135deg,var(--gold),var(--gold-dk));
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      border:2px solid rgba(200,160,64,0.30); box-shadow:0 0 10px rgba(200,160,64,0.20);
      font-family:'Cormorant Garamond',serif; font-size:16px; font-weight:700; color:#fff;
    }
    .kc-sb-uinfo { overflow:hidden; transition:opacity var(--t),width var(--t); }
    .kc-sidebar.sb-col .kc-sb-uinfo { opacity:0; width:0; }
    .kc-sb-uname { font-size:12.5px; font-weight:600; color:#111111; white-space:nowrap; }
    .kc-sb-urole { font-size:10px; color:#888888; white-space:nowrap; }

    /* ════════════════════════════════════════
       MOBILE OVERLAY + SIDEBAR (RIGHT)
    ════════════════════════════════════════ */
    .kc-mob-ov {
      display:none; position:fixed; inset:0;
      background:rgba(60,10,25,0.65); z-index:1099;
      backdrop-filter:blur(5px); -webkit-backdrop-filter:blur(5px);
    }
    .kc-mob-ov.show { display:block; }

    .kc-mob-sb {
      position:fixed; top:0; right:0; bottom:0;
      width:min(310px,87vw);
      background:#ffffff;
      z-index:1100; display:flex; flex-direction:column;
      overflow:hidden;
      box-shadow:-8px 0 48px rgba(0,0,0,0.12);
      transform:translateX(100%);
      transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);
    }
    .kc-mob-sb::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,transparent 0%,rgba(200,160,64,0.45) 20%,var(--gold) 50%,rgba(200,160,64,0.45) 80%,transparent 100%);
      z-index:2; pointer-events:none;
    }
    .kc-mob-sb.show { transform:translateX(0); }

    .kc-mob-sb-head {
      padding:18px 16px 14px; border-bottom:1px solid rgba(0,0,0,0.07);
      display:flex; align-items:center; gap:12px; flex-shrink:0;
      background:#f8f8f8;
    }
    .kc-mob-sb-av {
      width:44px; height:44px; border-radius:50%;
      background:linear-gradient(135deg,var(--gold),var(--gold-dk));
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      border:2px solid rgba(200,160,64,0.35); box-shadow:0 0 14px rgba(200,160,64,0.20);
      font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; color:#fff;
    }
    .kc-mob-sb-info { flex:1; min-width:0; }
    .kc-mob-sb-name { font-size:14px; font-weight:600; color:#111111; white-space:nowrap; }
    .kc-mob-sb-role { font-size:10.5px; color:#888888; margin-top:2px; }
    .kc-mob-sb-close {
      width:32px; height:32px; border-radius:8px;
      border:1px solid rgba(0,0,0,0.10); background:transparent;
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; color:#666666; font-size:13px; flex-shrink:0; transition:all var(--t);
    }
    .kc-mob-sb-close:hover { border-color:#cccccc; color:#111111; background:#f3f3f3; }

    .kc-mob-sb-search { padding:10px 14px; border-bottom:1px solid rgba(0,0,0,0.07); flex-shrink:0; }
    .kc-mob-sb-si {
      display:flex; align-items:center; gap:8px;
      background:#f5f5f5; border:1px solid rgba(0,0,0,0.08);
      border-radius:10px; padding:9px 12px; transition:all var(--t);
    }
    .kc-mob-sb-si:focus-within { border-color:var(--gold); background:#fff; }
    .kc-mob-sb-si i { color:var(--ic); font-size:12px; flex-shrink:0; }
    .kc-mob-sb-si input { background:transparent; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:13.5px; color:var(--ink); width:100%; }
    .kc-mob-sb-si input::placeholder { color:#aaaaaa; }

    /* No scrollbar in mobile sidebar nav */
    .kc-mob-sb-nav { flex:1; overflow-y:auto; padding:4px 0 12px; }
    .kc-mob-sb-nav::-webkit-scrollbar { display:none; }
    .kc-mob-sb-nav { scrollbar-width:none; -ms-overflow-style:none; }

    .kc-mob-sb-sec { padding:10px 16px 4px; font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#aaaaaa; }

    /* ── Mobile nav items — black text, grey hover ── */
    .kc-mob-sb-item {
      display:flex; align-items:center; gap:10px; padding:10px 14px;
      font-size:13.5px; font-weight:500; color:#111111;
      text-decoration:none; cursor:pointer;
      border-left:2px solid transparent; transition:all var(--t);
    }
    .kc-mob-sb-item:hover { color:#111111; background:#f3f3f3; border-left-color:#cccccc; }
    .kc-mob-sb-item.active { color:var(--gold-ddk); background:var(--gold-mid); border-left-color:var(--gold); }
    .kc-mob-sb-icon {
      width:36px; height:36px; border-radius:9px;
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      font-size:14px; color:var(--ic); background:rgba(200,160,64,0.09);
      transition:color 0.22s ease, background 0.22s ease, transform 0.18s ease;
    }
    .kc-mob-sb-item:hover .kc-mob-sb-icon {
      color:var(--ic-dk); background:#e8e8e8;
      transform:translateY(-2px) scale(1.12);
      animation:kcIconPop 0.35s ease forwards;
    }
    .kc-mob-sb-item.mob-open .kc-mob-sb-icon { color:var(--ic-dk); background:#ebebeb; }
    .kc-mob-sb-item.active .kc-mob-sb-icon { background:rgba(200,160,64,0.20); color:var(--gold-dk); }
    .kc-mob-sb-label { flex:1; }
    .kc-mob-sb-arrow { font-size:9px; color:#bbbbbb; transition:transform var(--t); flex-shrink:0; }
    .kc-mob-sb-item.mob-open .kc-mob-sb-arrow { transform:rotate(90deg); }
    .kc-mob-sb-badge { background:linear-gradient(135deg,var(--gold),var(--gold-dk)); color:#fff; font-size:9px; font-weight:700; padding:2px 7px; border-radius:20px; line-height:1.5; flex-shrink:0; }
    .kc-mob-sb-sub { overflow:hidden; max-height:0; transition:max-height 0.28s ease; }
    .kc-mob-sb-sub.open { max-height:400px; }
    .kc-mob-sb-sub-item {
      display:flex; align-items:center; gap:8px; padding:9px 14px 9px 60px;
      font-size:13px; color:#444444; text-decoration:none;
      border-left:2px solid transparent; transition:all var(--t);
    }
    .kc-mob-sb-sub-item::before { content:''; width:4px; height:4px; border-radius:50%; background:var(--gold); opacity:0.50; flex-shrink:0; }
    .kc-mob-sb-sub-item:hover { color:#111111; background:#f3f3f3; }
    .kc-mob-sb-sub-item.active { color:var(--gold-ddk); border-left-color:var(--gold); }
    .kc-mob-sb-sub-item.active::before { opacity:1; }

    /* ════════════════════════════════════════
       CONTENT + FOOTER
    ════════════════════════════════════════ */
    .kc-content {
      margin-left:var(--sb-w); margin-top:var(--nav-h);
      min-height:calc(100vh - var(--nav-h));
      display:flex; flex-direction:column; transition:margin-left var(--t);
    }
    .kc-content.sb-col { margin-left:var(--sb-col); }

    .kc-footer {
      margin-top:auto; padding:16px 28px;
      border-top:1px solid var(--border); background:var(--surface);
      display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;
    }
    .kc-ft-brand { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:700; color:var(--ink-2); display:flex; align-items:center; gap:8px; }
    .kc-ft-brand span { width:22px; height:22px; background:linear-gradient(135deg,var(--gold),var(--gold-dk)); border-radius:5px; display:inline-flex; align-items:center; justify-content:center; font-size:11px; color:#fff; font-weight:700; }
    .kc-ft-links { display:flex; gap:18px; }
    .kc-ft-links a { font-size:12px; color:var(--ink-3); text-decoration:none; transition:color var(--t); }
    .kc-ft-links a:hover { color:var(--gold-dk); }
    .kc-ft-copy { font-size:11.5px; color:var(--ink-3); }
    .kc-ft-status { display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:600; color:#2e7d32; background:#e8f5e9; padding:3px 10px; border-radius:20px; }

    /* ════════════════════════════════════════
       DARK MODE
    ════════════════════════════════════════ */
    .dark-mode {
      --surface:#1a1012; --surface-2:#13080e;
      --border:rgba(255,255,255,0.07);
      --ink:#f5e8ed; --ink-2:#d0b4c0; --ink-3:#907878;
    }
    .dark-mode .kc-navbar { background:#1a1012; border-bottom-color:rgba(200,160,64,0.15); box-shadow:none; }
    .dark-mode .kc-nb-search input { background:#13080e; color:var(--ink); }
    .dark-mode .kc-nb-btn { border-color:rgba(255,255,255,0.10); color:var(--ink-3); }
    .dark-mode .kc-nb-pbtn { border-color:rgba(255,255,255,0.10); }

    /* ════════════════════════════════════════
       RESPONSIVE
    ════════════════════════════════════════ */
    @media (max-width:768px) {
      .kc-sidebar { display:none; }
      .kc-content { margin-left:0!important; }
      .kc-nb-toggle-brand { display:none; }
      .kc-nb-logo img   { height:48px; width:auto; min-width:130px; max-width:160px; }
      .kc-nb-search     { display:none; }
      .kc-nb-branch     { display:none; }
      .kc-divider       { display:none; }
      .kc-nb-pname, .kc-nb-prole, .kc-nb-chev { display:none; }
      .kc-nb-pbtn       { padding:4px; }
      .kc-nb-mob-toggle { display:flex; }
    }
    @media (min-width:769px) {
      .kc-mob-sb  { display:none!important; }
      .kc-mob-ov  { display:none!important; }
      .kc-nb-mob-toggle { display:none!important; }
    }
  `;

  /* ═══════════════════ NAV DATA ═══════════════════ */
  var NAV = [
    { sec:'MAIN', items:[
      { slug:'dashboard',    label:'Dashboard',    icon:'fa-gauge-high',     href:'index.html',                          badge:null },
      { slug:'appointments', label:'Appointments', icon:'fa-calendar-check', href:'pages/ui-features/appointments.html', badge:'5'  },
      { slug:'customers',    label:'Customers',    icon:'fa-users',          href:'pages/ui-features/customers.html',    badge:null }
    ]},
    { sec:'SALON', items:[
      { slug:'services', label:'Services', icon:'fa-scissors', badge:null, children:[
        { slug:'services',            label:'All Services',       icon:'fa-list',               href:'pages/ui-features/service.html'            },
        { slug:'categorylist',        label:'Categories',         icon:'fa-folder',             href:'pages/ui-features/service_category.html'        },
        { slug:'service_categories',  label:'Sub-Categories',     icon:'fa-folder-open',        href:'pages/ui-features/service_subcategory.html'  },
        { slug:'styling',             label:'Styling',            icon:'fa-wand-magic-sparkles', href:'pages/ui-features/styling.html'            }
      ]},
      { slug:'products', label:'Products', icon:'fa-bottle-droplet', href:'pages/ui-features/e_shop.html', badge:null },
      { slug:'staff', label:'Staff', icon:'fa-user-tie', badge:null, children:[
        { slug:'staff-list',     label:'All Staff',  icon:'fa-users',         href:'pages/ui-features/staff.html'          },
        { slug:'staff-roles',    label:'Roles',      icon:'fa-shield-halved', href:'pages/ui-features/staff-roles.html'    },
        { slug:'staff-schedule', label:'Schedules',  icon:'fa-calendar-days', href:'pages/ui-features/staff-schedule.html' }
      ]}
    ]},
    { sec:'BUSINESS', items:[
      { slug:'franchise', label:'Franchise', icon:'fa-store',       href:'pages/ui-features/franchise.html', badge:null },
      { slug:'payments',  label:'Payments',  icon:'fa-credit-card', href:'pages/ui-features/payments.html',     badge:null },
      { slug:'reports',   label:'Reports',   icon:'fa-chart-line',  href:'pages/ui-features/reports.html',     badge:null },
      { slug:'more-pages', label:'More Pages', icon:'fa-layer-group', badge:null, children:[
        { slug:'bridal',  label:'Bridal',   icon:'fa-ring',         href:'pages/ui-features/bridal.html'  },
        { slug:'offers',  label:'Offers',   icon:'fa-tag',          href:'pages/ui-features/Offers_new.html'    },
        { slug:'contact', label:'Contact',  icon:'fa-envelope',     href:'pages/ui-features/contact_admin.html' },
        { slug:'about',   label:'About Us', icon:'fa-circle-info',  href:'pages/ui-features/about.html'         },
        { slug:'e-shop',  label:'E-Shop',   icon:'fa-bag-shopping', href:'pages/ui-features/e_shop.html'        }
      ]}
    ]},
    { sec:'SYSTEM', items:[
      { slug:'settings', label:'Settings', icon:'fa-gear',               href:'pages/ui-features/settings.html',  badge:null },
      { slug:'logout',   label:'Logout',   icon:'fa-right-from-bracket', href:'pages/samples/login.html', badge:null, danger:true }
    ]}
  ];

  function mkUrl(r,h){ return (!h||h==='#'||h.startsWith('javascript:'))?(h||'#'):r+h; }
  function childActive(it,slug){ return it.children&&it.children.some(function(c){return c.slug===slug;}); }

  /* ═══════════════════ BUILD DESKTOP SIDEBAR ═══════════════════ */
  function buildSidebar(root,active){
    var h='<nav class="kc-sidebar" id="kcSb">';
    h+='<div class="kc-sb-search-wrap"><div class="kc-sb-search-inner">'
     + '<i class="fa-solid fa-magnifying-glass"></i>'
     + '<input type="text" placeholder="Search pages…" oninput="KcozmAdmin._sbSearch(this.value)">'
     + '</div></div>';
    h+='<div class="kc-sb-nav" id="kcSbNav">';
    NAV.forEach(function(g){
      h+='<div class="kc-sb-sec">'+g.sec+'</div>';
      g.items.forEach(function(item){
        var isAct=item.slug===active||childActive(item,active);
        var hasSub=item.children&&item.children.length;
        if(hasSub){
          var fly='<div class="kc-sb-fly"><div class="kc-sb-fly-label">'+item.label+'</div>';
          item.children.forEach(function(c){
            fly+='<a class="kc-sb-fly-item'+(c.slug===active?' active':'')+'" href="'+mkUrl(root,c.href)+'">'
              +'<i class="fa-solid '+c.icon+'"></i>'+c.label+'</a>';
          });
          fly+='<div class="kc-sb-fly-expand" onclick="event.preventDefault();event.stopPropagation();KcozmAdmin._expandAndOpen(this)">↳ Expand menu</div></div>';
          h+='<div class="kc-sb-item'+(isAct?' open':'')+'" onclick="KcozmAdmin._sub(this)">'
           + '<span class="kc-sb-icon"><i class="fa-solid '+item.icon+'"></i></span>'
           + fly
           + '<span class="kc-sb-label">'+item.label+'</span>'
           + (item.badge?'<span class="kc-sb-badge">'+item.badge+'</span>':'')
           + '<i class="fa-solid fa-chevron-right kc-sb-arrow"></i></div>'
           + '<div class="kc-sb-sub'+(isAct?' open':'')+'">';
          item.children.forEach(function(c){
            h+='<a class="kc-sb-sub-item'+(c.slug===active?' active':'')+'" href="'+mkUrl(root,c.href)+'">'
             + '<span class="kc-sb-sub-icon"><i class="fa-solid '+c.icon+'"></i></span>'
             + '<span class="kc-sb-sub-lbl">'+c.label+'</span></a>';
          });
          h+='</div>';
        } else {
          var fly='<div class="kc-sb-fly"><div class="kc-sb-fly-label">'+item.label+'</div></div>';
          var onClickAttr='';
          if(item.onClick){
            onClickAttr=' onclick="event.preventDefault();event.stopPropagation();KcozmAdmin.'+item.onClick+'();return false;"';
          }
          h+='<a class="kc-sb-item'+(isAct?' active':'')+'" href="'+mkUrl(root,item.href)+'"'
           + (item.danger?' style="color:rgba(200,50,70,0.80)"':'')+onClickAttr+' >'
           + '<span class="kc-sb-icon"><i class="fa-solid '+item.icon+'"></i></span>'
           + fly
           + '<span class="kc-sb-label">'+item.label+'</span>'
           + (item.badge?'<span class="kc-sb-badge">'+item.badge+'</span>':'')
           + '</a>';
        }
      });
    });
    h+='</div>';
    h+='<div class="kc-sb-foot"><div class="kc-sb-av">A</div>'
     + '<div class="kc-sb-uinfo"><div class="kc-sb-uname">Salon Admin</div><div class="kc-sb-urole">Administrator</div></div>'
     + '</div></nav>';
    return h;
  }

  /* ═══════════════════ BUILD MOBILE SIDEBAR ═══════════════════ */
  function buildMobSidebar(root,active){
    var h='<div class="kc-mob-sb" id="kcMobSb">';
    h+='<div class="kc-mob-sb-head">'
     + '<div class="kc-mob-sb-av">A</div>'
     + '<div class="kc-mob-sb-info"><div class="kc-mob-sb-name">Salon Admin</div><div class="kc-mob-sb-role">admin@kcozm.com</div></div>'
     + '<button class="kc-mob-sb-close" onclick="KcozmAdmin._closeMob()"><i class="fa-solid fa-xmark"></i></button>'
     + '</div>';
    h+='<div class="kc-mob-sb-search"><div class="kc-mob-sb-si">'
     + '<i class="fa-solid fa-magnifying-glass"></i>'
     + '<input type="text" placeholder="Search pages…" oninput="KcozmAdmin._mobSearch(this.value)">'
     + '</div></div>';
    h+='<div class="kc-mob-sb-nav" id="kcMobNav">';
    NAV.forEach(function(g){
      h+='<div class="kc-mob-sb-sec">'+g.sec+'</div>';
      g.items.forEach(function(item){
        var isAct=item.slug===active||childActive(item,active);
        var hasSub=item.children&&item.children.length;
        if(hasSub){
          h+='<div class="kc-mob-sb-item'+(isAct?' mob-open':'')+'" onclick="KcozmAdmin._mobSub(this)">'
           + '<span class="kc-mob-sb-icon"><i class="fa-solid '+item.icon+'"></i></span>'
           + '<span class="kc-mob-sb-label">'+item.label+'</span>'
           + (item.badge?'<span class="kc-mob-sb-badge">'+item.badge+'</span>':'')
           + '<i class="fa-solid fa-chevron-right kc-mob-sb-arrow"></i></div>'
           + '<div class="kc-mob-sb-sub'+(isAct?' open':'')+'">';
          item.children.forEach(function(c){
            h+='<a class="kc-mob-sb-sub-item'+(c.slug===active?' active':'')+'" href="'+mkUrl(root,c.href)+'" onclick="KcozmAdmin._closeMob()">'+c.label+'</a>';
          });
          h+='</div>';
        } else {
          var onClickAttr='';
          if(item.onClick){
            onClickAttr=' onclick="event.preventDefault();event.stopPropagation();KcozmAdmin.'+item.onClick+'();KcozmAdmin._closeMob();return false;"';
          } else {
            onClickAttr=' onclick="KcozmAdmin._closeMob()"';
          }
          h+='<a class="kc-mob-sb-item'+(isAct?' active':'')+'" href="'+mkUrl(root,item.href)+'"'
           + (item.danger?' style="color:rgba(200,50,70,0.80)"':'')+onClickAttr+'>'
           + '<span class="kc-mob-sb-icon"><i class="fa-solid '+item.icon+'"></i></span>'
           + '<span class="kc-mob-sb-label">'+item.label+'</span>'
           + (item.badge?'<span class="kc-mob-sb-badge">'+item.badge+'</span>':'')
           + '</a>';
        }
      });
    });
    h+='</div></div>';
    return h;
  }

  /* ═══════════════════ BUILD NAVBAR ═══════════════════ */
  function ni(type,icon,title,desc,time){
    return '<div class="kc-nb-ni"><div class="kc-nb-ndot '+type+'"><i class="fa-solid '+icon+'"></i></div>'
          +'<div><p>'+title+'<br><small>'+desc+'</small></p><small>'+time+'</small></div></div>';
  }

  function buildNavbar(root,pageTitle,addButton,addButtonHref){
    return '<header class="kc-navbar" id="kcNav">'
      +'<button class="kc-nb-toggle-brand" id="kcToggleBtn" onclick="KcozmAdmin._toggle()" aria-label="Toggle sidebar">'
      +'<i class="fa-solid fa-bars ic-bars"></i>'
      +'<i class="fa-solid fa-xmark ic-xmark"></i>'
      +'</button>'
      +'<a class="kc-nb-logo" href="'+root+'index.html"><img src="'+root+'images/logo.png" alt="KCOZM – The Luxury Salon"></a>'
      +'<div class="kc-nb-spacer"></div>'
      +(addButton?'<a class="kc-nb-addbtn" href="'+(addButtonHref||'#')+'"><i class="fa-solid fa-plus"></i>'+addButton+'</a>':'')
      +'<div class="kc-nb-search"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search…"></div>'
      +'<button class="kc-nb-branch"><i class="fa-solid fa-location-dot" style="color:var(--gold);font-size:11px"></i> Main Branch <i class="fa-solid fa-chevron-down" style="font-size:9px;opacity:.5;color:var(--gold-dk)"></i></button>'
      +'<div class="kc-divider"></div>'
      +'<button class="kc-nb-btn" onclick="KcozmAdmin._dark()" title="Dark mode"><i class="fa-solid fa-moon"></i></button>'
      +'<div class="kc-nb-notif" id="kcNotif">'
      +  '<button class="kc-nb-btn" onclick="KcozmAdmin._notif()"><i class="fa-solid fa-bell"></i><span class="dot">3</span></button>'
      +  '<div class="kc-nb-ndrop">'
      +    '<div class="kc-nb-nhead"><b>Notifications</b><a href="#">Mark all read</a></div>'
      +    ni('p','fa-calendar-check','New appointment booked','Priya Singh — Bridal Package','2 min ago')
      +    ni('o','fa-star','5-star review received','Absolutely loved the experience!','18 min ago')
      +    ni('gr','fa-cart-shopping','New order #0421','Hair serum ×2, Face mask ×1','1 hr ago')
      +  '</div>'
      +'</div>'
      +'<div class="kc-nb-profile" id="kcProf">'
      +  '<button class="kc-nb-pbtn" onclick="KcozmAdmin._prof()">'
      +    '<div class="kc-nb-av">A</div>'
      +    '<div><div class="kc-nb-pname">Admin</div><div class="kc-nb-prole">Administrator</div></div>'
      +    '<i class="fa-solid fa-chevron-down kc-nb-chev"></i>'
      +  '</button>'
      +  '<div class="kc-nb-pdrop">'
      +    '<div class="kc-nb-pdhead"><div class="kc-nb-pdname">Salon Admin</div><div class="kc-nb-pdemail">admin@kcozm.com</div></div>'
      +    '<a class="kc-nb-pdi" href="'+root+'pages/ui-features/admin-profile.html"><i class="fa-solid fa-user"></i> My Profile</a>'
      +    '<a class="kc-nb-pdi" href="'+root+'pages/ui-features/settings.html"><i class="fa-solid fa-gear"></i> Settings</a>'
      +    '<a class="kc-nb-pdi" href="#"><i class="fa-solid fa-key"></i> Change Password</a>'
      +    '<div class="kc-pd-hr"></div>'
      +    '<a class="kc-nb-pdi red" href="'+root+'pages/samples/login.html"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
      +  '</div>'
      +'</div>'
      +'<button class="kc-nb-mob-toggle" onclick="KcozmAdmin._openMob()" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>'
    +'</header>';
  }

  /* ═══════════════════ FOOTER ═══════════════════ */
  function buildFooter(){
    var y=new Date().getFullYear();
    return '<footer class="kc-footer">'
      +'<div class="kc-ft-brand"><span>K</span> KCOZM Admin</div>'
      +'<div class="kc-ft-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Support</a></div>'
      +'<div class="kc-ft-copy">© '+y+' KCOZM Beauty Studio</div>'
      +'<div class="kc-ft-status"><i class="fa-solid fa-circle" style="font-size:6px"></i> All systems online</div>'
      +'</footer>';
  }

  function injectCSS(){
    if(document.getElementById('kc-css')) return;
    var s=document.createElement('style'); s.id='kc-css'; s.textContent=CSS;
    document.head.insertBefore(s,document.head.firstChild);
  }
  function injectFA(){
    if(document.getElementById('kc-fa')||document.querySelector('link[href*="font-awesome"]')) return;
    var l=document.createElement('link'); l.id='kc-fa'; l.rel='stylesheet';
    l.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(l);
  }

  function filterItems(q,navId,iSel,sSel){
    var qn=(q||'').toLowerCase().trim();
    var nav=document.getElementById(navId); if(!nav) return;
    nav.querySelectorAll(iSel).forEach(function(el){ el.style.display=(!qn||(el.textContent||'').toLowerCase().indexOf(qn)>=0)?'':'none'; });
    if(sSel) nav.querySelectorAll(sSel).forEach(function(el){ el.style.display=(!qn||(el.textContent||'').toLowerCase().indexOf(qn)>=0)?'':'none'; });
  }

  /* ═══════════════════ INIT ═══════════════════ */
  function init(opts){
    opts=opts||{};
    var root         =(opts.depth||'./').replace(/\/?$/,'/');
    var active       =opts.activePage||'dashboard';
    var pageTitle    =opts.pageTitle||'';
    var addButton    =opts.addButton||'';
    var addButtonHref=opts.addButtonHref||'#';

    injectFA(); injectCSS();

    ['nav.navbar','#sidebar','.sidebar-offcanvas','.theme-setting-wrapper','footer.footer'].forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){ el.remove(); });
    });

    var sbDiv=document.createElement('div'); sbDiv.innerHTML=buildSidebar(root,active);
    document.body.insertBefore(sbDiv.firstElementChild,document.body.firstChild);

    var nbDiv=document.createElement('div'); nbDiv.innerHTML=buildNavbar(root,pageTitle,addButton,addButtonHref);
    document.body.insertBefore(nbDiv.firstElementChild,document.body.children[1]);

    var mobDiv=document.createElement('div'); mobDiv.innerHTML=buildMobSidebar(root,active);
    document.body.appendChild(mobDiv.firstElementChild);

    if(!document.getElementById('kcMobOv')){
      var ov=document.createElement('div'); ov.id='kcMobOv'; ov.className='kc-mob-ov';
      ov.onclick=function(){ KcozmAdmin._closeMob(); };
      document.body.appendChild(ov);
    }

    var mp=document.querySelector('.main-panel');
    if(mp){
      mp.classList.add('kc-content');
      var ft=document.createElement('div'); ft.innerHTML=buildFooter();
      mp.appendChild(ft.firstElementChild);
    }

    document.addEventListener('click',function(e){
      var p=document.getElementById('kcProf'),n=document.getElementById('kcNotif');
      if(p&&!p.contains(e.target)) p.classList.remove('open');
      if(n&&!n.contains(e.target)) n.classList.remove('open');
    });

    if(localStorage.getItem('kc-dark')==='1') document.body.classList.add('dark-mode');

    /* ── Body-level flyout popup ── */
    var _flyEl=null, _flyTimer=null;
    function _removeFly(){ if(_flyEl){ _flyEl.remove(); _flyEl=null; } }
    function _showFly(item){
      clearTimeout(_flyTimer); _removeFly();
      var fly=item.querySelector('.kc-sb-fly'); if(!fly) return;
      var sb3=document.getElementById('kcSb');
      if(!sb3||!sb3.classList.contains('sb-col')) return;
      var popup=document.createElement('div');
      popup.className='kc-fly-popup';
      popup.innerHTML=fly.innerHTML;
      var r=item.getBoundingClientRect();
      popup.style.cssText='position:fixed;z-index:9999;top:'+(r.top+r.height/2)+'px;left:'+(r.right+6)+'px;transform:translateY(-50%);'
        +'background:#fff;border:1px solid rgba(180,130,20,0.25);border-radius:10px;overflow:hidden;'
        +'box-shadow:4px 8px 28px rgba(0,0,0,0.22);min-width:190px;pointer-events:auto;font-family:DM Sans,sans-serif;';
      popup.addEventListener('mouseleave',function(){ _flyTimer=setTimeout(_removeFly,100); });
      popup.addEventListener('mouseenter',function(){ clearTimeout(_flyTimer); });
      var exp=popup.querySelector('.kc-sb-fly-expand');
      if(exp){ exp.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); KcozmAdmin._expandAndOpen(item); _removeFly(); }); }
      document.body.appendChild(popup); _flyEl=popup;
    }

    var sbEl=document.getElementById('kcSb');
    if(sbEl){
      sbEl.addEventListener('mouseover',function(e){
        var item=e.target.closest('.kc-sb-item');
        if(item){ clearTimeout(_flyTimer); _showFly(item); }
      });
      sbEl.addEventListener('mouseleave',function(){ _flyTimer=setTimeout(_removeFly,120); });
    }

    if(!document.getElementById('kc-fly-style')){
      var fs=document.createElement('style'); fs.id='kc-fly-style';
      fs.textContent='.kc-fly-popup .kc-sb-fly-label{padding:8px 14px;font-size:10.5px;font-weight:700;color:#7a5a10;white-space:nowrap;letter-spacing:.8px;text-transform:uppercase;border-bottom:1px solid #f0e8d0;background:#fdf8ee;display:block}'
        +'.kc-fly-popup .kc-sb-fly-item{display:flex;align-items:center;gap:9px;padding:9px 14px;font-size:13px;font-weight:500;color:#3d2c08;text-decoration:none;white-space:nowrap;border-left:2px solid transparent}'
        +'.kc-fly-popup .kc-sb-fly-item:hover{background:#fdf3d0;color:#1a0f00;border-left-color:#c8a040}'
        +'.kc-fly-popup .kc-sb-fly-item i{width:14px;text-align:center;font-size:12px;flex-shrink:0;color:#b8860b}'
        +'.kc-fly-popup .kc-sb-fly-expand{padding:7px 14px;font-size:11px;color:#b8860b;cursor:pointer;border-top:1px solid #f0e8d0;text-align:center;background:#fdf8ee;display:block}'
        +'.kc-fly-popup .kc-sb-fly-expand:hover{color:#7a5a10;background:#fdf3d0}';
      document.head.appendChild(fs);
    }
  }

  /* ═══════════════════ PUBLIC API — ALL UNCHANGED ═══════════════════ */
  win.KcozmAdmin={
    init:init,
    _toggle:function(){
      var sb=document.getElementById('kcSb');
      var cnt=document.querySelector('.kc-content');
      var btn=document.getElementById('kcToggleBtn');
      if(!sb) return;
      var col=sb.classList.toggle('sb-col');
      if(cnt) cnt.classList.toggle('sb-col',col);
      if(btn) btn.classList.toggle('is-open',col);
    },
    _openMob:function(){
      var sb=document.getElementById('kcMobSb'),ov=document.getElementById('kcMobOv');
      if(sb) sb.classList.add('show');
      if(ov) ov.classList.add('show');
      document.body.style.overflow='hidden';
    },
    _closeMob:function(){
      var sb=document.getElementById('kcMobSb'),ov=document.getElementById('kcMobOv');
      if(sb){ sb.style.transform='translateX(100%)'; setTimeout(function(){ sb.classList.remove('show'); sb.style.transform=''; },320); }
      if(ov) ov.classList.remove('show');
      document.body.style.overflow='';
    },
    _sub:function(el){
      var sub=el.nextElementSibling;
      if(!sub||!sub.classList.contains('kc-sb-sub')) return;
      el.classList.toggle('open'); sub.classList.toggle('open');
    },
    _expandAndOpen:function(itemOrExpand){
      var sb=document.getElementById('kcSb'),cnt=document.querySelector('.kc-content');
      if(!sb) return;
      if(sb.classList.contains('sb-col')){ sb.classList.remove('sb-col'); if(cnt) cnt.classList.remove('sb-col'); }
      var item=itemOrExpand;
      if(item&&!item.classList.contains('kc-sb-item')) item=item.closest('.kc-sb-item');
      if(item){
        var sub=item.nextElementSibling;
        if(sub&&sub.classList.contains('kc-sb-sub')&&!sub.classList.contains('open')){ item.classList.add('open'); sub.classList.add('open'); }
      }
    },
    _mobSub:function(el){
      var sub=el.nextElementSibling;
      if(!sub||!sub.classList.contains('kc-mob-sb-sub')) return;
      el.classList.toggle('mob-open'); sub.classList.toggle('open');
    },
    _dark:function(){
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('kc-dark',document.body.classList.contains('dark-mode')?'1':'0');
    },
    _prof:function(){
      var p=document.getElementById('kcProf'),n=document.getElementById('kcNotif');
      if(p){ p.classList.toggle('open'); if(n) n.classList.remove('open'); }
    },
    _notif:function(){
      var n=document.getElementById('kcNotif'),p=document.getElementById('kcProf');
      if(n){ n.classList.toggle('open'); if(p) p.classList.remove('open'); }
    },
    _sbSearch:function(q){ filterItems(q,'kcSbNav','.kc-sb-item','.kc-sb-sub-item'); },
    _mobSearch:function(q){ filterItems(q,'kcMobNav','.kc-mob-sb-item','.kc-mob-sb-sub-item'); },
    _comingSoon:function(moduleName){
      this.showToast(moduleName+' module coming soon','info');
    },
    showToast:function(msg,type){
      var icons={success:'fa-circle-check',error:'fa-circle-xmark',info:'fa-circle-info'};
      var bg={success:'#1b5e20',error:'#b71c1c',info:'#18120f'};
      var t=document.getElementById('kc-toast');
      if(!t){
        t=document.createElement('div'); t.id='kc-toast';
        t.style.cssText='position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;align-items:center;gap:10px;padding:12px 18px;border-radius:10px;font-family:DM Sans,sans-serif;font-size:13.5px;font-weight:500;min-width:220px;box-shadow:0 8px 28px rgba(0,0,0,0.18);opacity:0;transform:translateY(12px);transition:all .25s ease;pointer-events:none;color:#fff;';
        document.body.appendChild(t);
      }
      t.style.background=bg[type]||bg.info;
      t.innerHTML='<i class="fa-solid '+(icons[type]||icons.info)+'"></i> '+msg;
      setTimeout(function(){ t.style.opacity='1'; t.style.transform='translateY(0)'; },10);
      clearTimeout(t._tmr);
      t._tmr=setTimeout(function(){ t.style.opacity='0'; t.style.transform='translateY(12px)'; },3200);
    }
  };

})(window);