/**
 * KCOZM Salon Admin — Shared Components v8
 * ══════════════════════════════════════════
 * NAVBAR  : Dark brand-zone left (logo + toggle) matching sidebar, then light action bar
 * LOGO    : Original gold colors — NO white filter
 * SIDEBAR : Pink/rose gradient, hover-label tooltips on collapse
 * MOBILE  : Sidebar slides from RIGHT, search in sidebar
 * SERVICES: All 4 sub-items restored (All Services, Categories, Styling, Loyalty Cards)
 */
(function (win) {
  'use strict';

  var CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --pk:          #e91e63;
      --pk-dk:       #c2185b;
      --pk-ddk:      #880e4f;
      --pk-lt:       #fce4ec;
      --pk-glow:     rgba(233,30,99,0.18);

      --gold:        #c8a040;
      --gold-lt:     #fdf6e8;

      --ink:         #1a1410;
      --ink-2:       #3d3028;
      --ink-3:       #8a7060;
      --surface:     #ffffff;
      --surface-2:   #f9f7f5;
      --border:      #e8e2da;

      --sb-w:        260px;
      --sb-col:      68px;
      --sb-bg1:      #1a0a12;
      --sb-bg2:      #110610;
      --sb-bg3:      #08030a;
      --sb-border:   rgba(233,30,99,0.14);
      --sb-text:     rgba(255,210,230,0.44);
      --sb-text-hov: rgba(255,238,248,0.94);

      --nav-h:       72px;
      --t:           0.22s ease;
    }

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html, body { height:100%; }
    body { font-family:'DM Sans',sans-serif; background:var(--surface-2); color:var(--ink); overflow-x:hidden; }

    /* ════════════════════════════════════════
       NAVBAR — single clean white bar
    ════════════════════════════════════════ */
    .kc-navbar {
      position:fixed; top:0; left:0; right:0;
      height:var(--nav-h);
      display:flex; align-items:center; gap:12px;
      padding:0 20px 0 16px;
      background:var(--surface);
      border-bottom:1px solid var(--border);
      box-shadow:0 2px 20px rgba(24,12,18,0.07);
      z-index:1002;
    }

    /* Brand zone — just a layout helper, no dark bg */
    .kc-nb-brand { display:contents; }
    .kc-nb-brand.sb-col { display:contents; }

    /* Toggle button — in white navbar */
    .kc-nb-toggle-brand {
      width:38px; height:38px; flex-shrink:0;
      border:1.5px solid var(--border); border-radius:9px;
      background:transparent; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:var(--ink-3); font-size:15px;
      transition:all var(--t);
    }
    .kc-nb-toggle-brand:hover { background:var(--pk-lt); border-color:var(--pk); color:var(--pk-dk); }

    /* Logo — original gold/amber colors, centered, larger */
    .kc-nb-logo {
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; text-decoration:none;
    }
    .kc-nb-logo img {
      height:52px; width:160px;
      object-fit:contain; object-position:center center; display:block;
      filter:drop-shadow(0 1px 10px rgba(200,160,64,0.22));
    }

    /* ── Action bar — everything right of logo ── */
    .kc-nb-bar { display:contents; }

    /* Search — DESKTOP ONLY */
    .kc-nb-search { position:relative; flex-shrink:0; }
    .kc-nb-search input {
      width:210px; padding:8px 14px 8px 36px;
      border:1.5px solid var(--border); border-radius:50px;
      background:var(--surface-2); font-family:'DM Sans',sans-serif;
      font-size:13px; color:var(--ink); outline:none; transition:all var(--t);
    }
    .kc-nb-search input:focus { width:260px; border-color:var(--pk); box-shadow:0 0 0 3px var(--pk-glow); background:#fff; }
    .kc-nb-search input::placeholder { color:var(--ink-3); }
    .kc-nb-search i { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--ink-3); font-size:12px; pointer-events:none; }

    .kc-nb-spacer { flex:1; }

    .kc-nb-addbtn {
      display:flex; align-items:center; gap:6px; padding:7px 16px; border-radius:9px;
      background:linear-gradient(135deg,var(--pk),var(--pk-dk));
      border:none; color:#fff; font-family:'DM Sans',sans-serif;
      font-size:12.5px; font-weight:600; cursor:pointer;
      white-space:nowrap; flex-shrink:0;
      box-shadow:0 4px 14px rgba(233,30,99,0.32);
      transition:all var(--t); text-decoration:none;
    }
    .kc-nb-addbtn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(233,30,99,0.42); }

    .kc-nb-btn {
      width:38px; height:38px; flex-shrink:0;
      border:1.5px solid var(--border); border-radius:9px;
      background:transparent; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:var(--ink-3); font-size:14px; position:relative; transition:all var(--t);
    }
    .kc-nb-btn:hover { background:var(--pk-lt); border-color:var(--pk); color:var(--pk-dk); }
    .kc-nb-btn .dot {
      position:absolute; top:-5px; right:-5px;
      width:17px; height:17px; border-radius:99px;
      background:var(--pk-dk); color:#fff;
      font-size:8px; font-weight:700; line-height:17px; text-align:center;
      border:2px solid var(--surface);
    }

    .kc-nb-branch {
      display:flex; align-items:center; gap:6px; padding:7px 12px;
      border:1.5px solid var(--border); border-radius:9px;
      background:transparent; font-family:'DM Sans',sans-serif;
      font-size:12px; font-weight:600; color:var(--ink-2); cursor:pointer;
      transition:all var(--t); white-space:nowrap; flex-shrink:0;
    }
    .kc-nb-branch:hover { border-color:var(--pk); color:var(--pk-dk); background:var(--pk-lt); }
    .kc-divider { width:1px; height:24px; background:var(--border); flex-shrink:0; }

    /* Profile */
    .kc-nb-profile { position:relative; flex-shrink:0; }
    .kc-nb-pbtn {
      display:flex; align-items:center; gap:8px; padding:4px 10px 4px 4px;
      border:1.5px solid var(--border); border-radius:50px;
      background:transparent; cursor:pointer; transition:all var(--t);
    }
    .kc-nb-pbtn:hover { border-color:var(--pk); background:var(--pk-lt); }
    .kc-nb-av {
      width:32px; height:32px; border-radius:50%;
      background:linear-gradient(135deg,var(--pk),var(--pk-dk));
      display:flex; align-items:center; justify-content:center;
      font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700; color:#fff; flex-shrink:0;
    }
    .kc-nb-pname { font-size:13px; font-weight:600; color:var(--ink); white-space:nowrap; }
    .kc-nb-prole { font-size:10px; color:var(--ink-3); white-space:nowrap; }
    .kc-nb-chev  { font-size:10px; color:var(--ink-3); transition:transform var(--t); flex-shrink:0; }
    .kc-nb-profile.open .kc-nb-chev { transform:rotate(180deg); }

    .kc-nb-pdrop {
      display:none; position:absolute; top:calc(100% + 10px); right:0;
      width:222px; background:var(--surface);
      border:1px solid var(--border); border-radius:14px;
      box-shadow:0 16px 48px rgba(24,12,18,0.14); overflow:hidden; z-index:2000;
    }
    .kc-nb-profile.open .kc-nb-pdrop { display:block; animation:kcFade .18s ease; }
    .kc-nb-pdhead { padding:16px; border-bottom:1px solid var(--border); background:var(--pk-lt); }
    .kc-nb-pdname  { font-size:14px; font-weight:700; color:var(--ink); }
    .kc-nb-pdemail { font-size:11.5px; color:var(--ink-3); margin-top:2px; }
    .kc-nb-pdi {
      display:flex; align-items:center; gap:10px; padding:11px 16px;
      font-size:13px; font-weight:500; color:var(--ink-2); text-decoration:none; transition:all var(--t);
    }
    .kc-nb-pdi i { width:16px; text-align:center; color:var(--ink-3); }
    .kc-nb-pdi:hover { background:var(--pk-lt); color:var(--pk-dk); }
    .kc-nb-pdi:hover i { color:var(--pk-dk); }
    .kc-nb-pdi.red { color:#c62828; } .kc-nb-pdi.red i { color:#c62828; }
    .kc-nb-pdi.red:hover { background:#fce4ec; }
    .kc-pd-hr { height:1px; background:var(--border); }

    /* Mobile hamburger in action bar — hidden on desktop */
    .kc-nb-mob-toggle {
      width:38px; height:38px; flex-shrink:0;
      border:1.5px solid var(--border); border-radius:9px;
      background:transparent; cursor:pointer;
      display:none; align-items:center; justify-content:center;
      color:var(--ink-3); font-size:15px; transition:all var(--t);
    }
    .kc-nb-mob-toggle:hover { background:var(--pk-lt); border-color:var(--pk); color:var(--pk-dk); }

    /* Notifications */
    .kc-nb-notif { position:relative; flex-shrink:0; }
    .kc-nb-ndrop {
      display:none; position:absolute; top:calc(100% + 10px); right:0;
      width:320px; background:var(--surface);
      border:1px solid var(--border); border-radius:14px;
      box-shadow:0 16px 48px rgba(24,12,18,0.14); overflow:hidden; z-index:2000;
    }
    .kc-nb-notif.open .kc-nb-ndrop { display:block; animation:kcFade .18s ease; }
    .kc-nb-nhead { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--border); }
    .kc-nb-nhead b { font-size:14px; color:var(--ink); }
    .kc-nb-nhead a { font-size:12px; color:var(--pk-dk); text-decoration:none; font-weight:500; }
    .kc-nb-ni { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; border-bottom:1px solid var(--border); cursor:pointer; transition:background var(--t); }
    .kc-nb-ni:last-child { border:none; }
    .kc-nb-ni:hover { background:var(--surface-2); }
    .kc-nb-ndot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:14px; }
    .kc-nb-ndot.p  { background:var(--pk-lt); color:var(--pk-dk); }
    .kc-nb-ndot.o  { background:#fff3e0; color:#e65100; }
    .kc-nb-ndot.gr { background:#e8f5e9; color:#2e7d32; }
    .kc-nb-ni p    { font-size:12.5px; color:var(--ink-2); line-height:1.5; margin:0; }
    .kc-nb-ni small { font-size:11px; color:var(--ink-3); }

    @keyframes kcFade { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }

    /* ════════════════════════════════════════
       DESKTOP SIDEBAR (left, below navbar)
    ════════════════════════════════════════ */
    .kc-sidebar {
      position:fixed; top:var(--nav-h); left:0; bottom:0;
      width:var(--sb-w);
      background:linear-gradient(168deg,var(--sb-bg1) 0%,var(--sb-bg2) 50%,var(--sb-bg3) 100%);
      display:flex; flex-direction:column;
      z-index:1001; overflow:visible;
      border-right:1px solid var(--sb-border);
      box-shadow:5px 0 40px rgba(0,0,0,0.50);
      transition:width var(--t);
    }
    .kc-sidebar::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,transparent 0%,rgba(233,30,99,0.45) 20%,#f48fb1 50%,rgba(233,30,99,0.45) 80%,transparent 100%);
      z-index:2; pointer-events:none;
    }
    .kc-sidebar.sb-col { width:var(--sb-col); overflow:visible; }

    /* Search inside sidebar — HIDDEN on desktop, visible only in mobile sidebar */
    .kc-sb-search-wrap { display:none; }
    .kc-sb-search-inner {
      display:flex; align-items:center; gap:8px;
      background:rgba(255,255,255,0.04); border:1px solid rgba(233,30,99,0.18);
      border-radius:10px; padding:8px 12px; transition:all var(--t);
    }
    .kc-sb-search-inner:focus-within { border-color:rgba(233,30,99,0.50); background:rgba(255,255,255,0.07); box-shadow:0 0 0 3px rgba(233,30,99,0.10); }
    .kc-sb-search-inner i { color:rgba(233,30,99,0.52); font-size:12px; flex-shrink:0; }
    .kc-sb-search-inner input { background:transparent; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--sb-text-hov); width:100%; min-width:0; }
    .kc-sb-search-inner input::placeholder { color:rgba(255,210,230,0.28); }
    /* Collapsed sidebar search state — hidden on desktop, irrelevant */
    .kc-sidebar.sb-col .kc-sb-search-wrap { padding:10px 0; }
    .kc-sidebar.sb-col .kc-sb-search-inner { border-radius:0; border:none; background:transparent; justify-content:center; padding:8px; }
    .kc-sidebar.sb-col .kc-sb-search-inner input { display:none; }
    .kc-sidebar.sb-col .kc-sb-search-inner i { font-size:15px; color:rgba(233,30,99,0.55); }

    .kc-sb-nav { flex:1; overflow-y:auto; overflow-x:visible; padding:4px 0 16px; }
    .kc-sb-nav::-webkit-scrollbar { width:3px; }
    .kc-sb-nav::-webkit-scrollbar-thumb { background:rgba(233,30,99,0.22); border-radius:99px; }

    .kc-sb-sec {
      padding:14px 18px 4px; font-size:9px; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:rgba(240,130,170,0.32);
      white-space:nowrap; overflow:hidden;
      transition:opacity var(--t),height var(--t),padding var(--t);
    }
    .kc-sidebar.sb-col .kc-sb-sec { opacity:0; height:0; padding:0; pointer-events:none; }

    .kc-sb-item {
      display:flex; align-items:center; gap:10px; padding:8px 12px;
      font-size:13px; font-weight:500; color:var(--sb-text);
      text-decoration:none; cursor:pointer; position:relative;
      border-left:2px solid transparent;
      white-space:nowrap; overflow:visible; user-select:none;
      transition:background var(--t),color var(--t),border-color var(--t);
    }
    .kc-sb-item:hover { color:var(--sb-text-hov); background:rgba(233,30,99,0.08); border-left-color:rgba(233,30,99,0.40); }
    .kc-sb-item.active {
      color:#fff;
      background:linear-gradient(90deg,rgba(233,30,99,0.22) 0%,rgba(233,30,99,0.04) 100%);
      border-left-color:var(--pk);
    }
    .kc-sb-item.active::after {
      content:''; position:absolute; right:0; top:16%; bottom:16%;
      width:3px; background:linear-gradient(180deg,#f48fb1,#c2185b); border-radius:3px 0 0 3px;
    }

    .kc-sb-icon {
      width:36px; height:36px; border-radius:9px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-size:14px; color:var(--sb-text); transition:all var(--t); position:relative;
    }
    .kc-sb-item:hover .kc-sb-icon, .kc-sb-item.open .kc-sb-icon { color:var(--pk); }
    .kc-sb-item.active .kc-sb-icon { background:rgba(233,30,99,0.20); color:var(--pk); box-shadow:0 0 12px rgba(233,30,99,0.22); }

    /* Hover tooltip — appears when sidebar is collapsed */
    .kc-sb-tip {
      position:absolute; left:calc(var(--sb-col) - 6px); top:50%;
      transform:translateY(-50%) translateX(4px);
      background:linear-gradient(135deg,var(--pk),var(--pk-dk));
      color:#fff; font-size:11.5px; font-weight:600; letter-spacing:0.2px;
      padding:5px 12px; border-radius:7px; white-space:nowrap;
      box-shadow:0 4px 16px rgba(233,30,99,0.38);
      opacity:0; pointer-events:none;
      transition:opacity 0.15s ease, transform 0.15s ease;
      z-index:3000;
    }
    .kc-sb-tip::before {
      content:''; position:absolute; left:-5px; top:50%; transform:translateY(-50%);
      border:5px solid transparent; border-right-color:var(--pk); border-left:none;
    }
    .kc-sidebar.sb-col .kc-sb-item:hover .kc-sb-tip { opacity:1; transform:translateY(-50%) translateX(0); }

    .kc-sb-label { flex:1; white-space:nowrap; overflow:hidden; transition:opacity var(--t),width var(--t); }
    .kc-sidebar.sb-col .kc-sb-label { opacity:0; width:0; }

    .kc-sb-arrow { font-size:9px; color:rgba(255,180,210,0.30); transition:transform var(--t),opacity var(--t); flex-shrink:0; }
    .kc-sb-item.open .kc-sb-arrow { transform:rotate(90deg); }
    .kc-sidebar.sb-col .kc-sb-arrow { opacity:0; width:0; overflow:hidden; }

    .kc-sb-badge {
      background:linear-gradient(135deg,var(--pk),var(--pk-dk)); color:#fff;
      font-size:9px; font-weight:700; padding:2px 7px; border-radius:20px; line-height:1.5;
      flex-shrink:0; box-shadow:0 2px 8px rgba(233,30,99,0.30); transition:opacity var(--t);
    }
    .kc-sidebar.sb-col .kc-sb-badge { opacity:0; width:0; overflow:hidden; padding:0; }
    .kc-sidebar.sb-col .kc-sb-item { padding:8px 0; justify-content:center; }
    .kc-sidebar.sb-col .kc-sb-icon { width:40px; height:40px; border-radius:10px; }

    .kc-sb-sub { overflow:hidden; max-height:0; transition:max-height 0.28s ease; }
    .kc-sb-sub.open { max-height:600px; }
    .kc-sidebar.sb-col .kc-sb-sub { max-height:0!important; }

    .kc-sb-sub-item {
      display:flex; align-items:center; gap:8px; padding:7px 12px 7px 58px;
      font-size:12.5px; color:var(--sb-text); text-decoration:none;
      border-left:2px solid transparent; white-space:nowrap; transition:all var(--t);
    }
    .kc-sb-sub-item::before { content:''; width:4px; height:4px; border-radius:50%; background:currentColor; opacity:0.30; flex-shrink:0; }
    .kc-sb-sub-item:hover { color:var(--sb-text-hov); background:rgba(233,30,99,0.06); }
    .kc-sb-sub-item.active { color:var(--pk); border-left-color:var(--pk); background:rgba(233,30,99,0.09); }
    .kc-sb-sub-item.active::before { opacity:1; }

    /* Sidebar footer */
    .kc-sb-foot {
      border-top:1px solid var(--sb-border); padding:12px 14px;
      display:flex; align-items:center; gap:10px; overflow:hidden; flex-shrink:0;
      background:linear-gradient(0deg,rgba(233,30,99,0.06) 0%,transparent 100%);
    }
    .kc-sidebar.sb-col .kc-sb-foot { justify-content:center; padding:12px 0; }
    .kc-sb-av {
      width:36px; height:36px; border-radius:50%;
      background:linear-gradient(135deg,var(--pk),var(--pk-dk));
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      border:2px solid rgba(233,30,99,0.38); box-shadow:0 0 12px rgba(233,30,99,0.20);
      font-family:'Cormorant Garamond',serif; font-size:16px; font-weight:700; color:#fff;
    }
    .kc-sb-uinfo { overflow:hidden; transition:opacity var(--t),width var(--t); }
    .kc-sidebar.sb-col .kc-sb-uinfo { opacity:0; width:0; }
    .kc-sb-uname { font-size:12.5px; font-weight:600; color:var(--sb-text-hov); white-space:nowrap; }
    .kc-sb-urole { font-size:10px; color:var(--sb-text); white-space:nowrap; }

    /* ════════════════════════════════════════
       MOBILE OVERLAY + SIDEBAR (RIGHT)
    ════════════════════════════════════════ */
    .kc-mob-ov {
      display:none; position:fixed; inset:0;
      background:rgba(8,3,6,0.75); z-index:1099;
      backdrop-filter:blur(5px); -webkit-backdrop-filter:blur(5px);
    }
    .kc-mob-ov.show { display:block; }

    .kc-mob-sb {
      position:fixed; top:0; right:0; bottom:0;
      width:min(310px,87vw);
      background:linear-gradient(168deg,var(--sb-bg1) 0%,var(--sb-bg2) 50%,var(--sb-bg3) 100%);
      z-index:1100; display:flex; flex-direction:column;
      overflow:hidden;
      box-shadow:-10px 0 60px rgba(0,0,0,0.60);
      transform:translateX(100%);
      transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);
    }
    .kc-mob-sb::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,transparent 0%,rgba(233,30,99,0.45) 20%,#f48fb1 50%,rgba(233,30,99,0.45) 80%,transparent 100%);
      z-index:2; pointer-events:none;
    }
    .kc-mob-sb.show { transform:translateX(0); }

    .kc-mob-sb-head {
      padding:18px 16px 14px; border-bottom:1px solid var(--sb-border);
      display:flex; align-items:center; gap:12px; flex-shrink:0;
      background:linear-gradient(180deg,rgba(233,30,99,0.10) 0%,transparent 100%);
    }
    .kc-mob-sb-av {
      width:44px; height:44px; border-radius:50%;
      background:linear-gradient(135deg,var(--pk),var(--pk-dk));
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      border:2px solid rgba(233,30,99,0.50); box-shadow:0 0 18px rgba(233,30,99,0.25);
      font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; color:#fff;
    }
    .kc-mob-sb-info { flex:1; min-width:0; }
    .kc-mob-sb-name { font-size:14px; font-weight:600; color:var(--sb-text-hov); white-space:nowrap; }
    .kc-mob-sb-role { font-size:10.5px; color:var(--sb-text); margin-top:2px; }
    .kc-mob-sb-close {
      width:32px; height:32px; border-radius:8px;
      border:1px solid rgba(233,30,99,0.22); background:transparent;
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; color:rgba(255,180,210,0.55); font-size:13px; flex-shrink:0; transition:all var(--t);
    }
    .kc-mob-sb-close:hover { border-color:var(--pk); color:var(--pk); background:rgba(233,30,99,0.10); }

    .kc-mob-sb-search { padding:10px 14px; border-bottom:1px solid var(--sb-border); flex-shrink:0; }
    .kc-mob-sb-si {
      display:flex; align-items:center; gap:8px;
      background:rgba(255,255,255,0.04); border:1px solid rgba(233,30,99,0.18);
      border-radius:10px; padding:9px 12px; transition:all var(--t);
    }
    .kc-mob-sb-si:focus-within { border-color:rgba(233,30,99,0.50); background:rgba(255,255,255,0.07); }
    .kc-mob-sb-si i { color:rgba(233,30,99,0.52); font-size:12px; flex-shrink:0; }
    .kc-mob-sb-si input { background:transparent; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:13.5px; color:var(--sb-text-hov); width:100%; }
    .kc-mob-sb-si input::placeholder { color:rgba(255,210,230,0.28); }

    .kc-mob-sb-nav { flex:1; overflow-y:auto; padding:4px 0 12px; }
    .kc-mob-sb-nav::-webkit-scrollbar { width:3px; }
    .kc-mob-sb-nav::-webkit-scrollbar-thumb { background:rgba(233,30,99,0.22); border-radius:99px; }

    .kc-mob-sb-sec { padding:10px 16px 4px; font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(240,130,170,0.32); }

    .kc-mob-sb-item {
      display:flex; align-items:center; gap:10px; padding:10px 14px;
      font-size:13.5px; font-weight:500; color:var(--sb-text);
      text-decoration:none; cursor:pointer;
      border-left:2px solid transparent; transition:all var(--t);
    }
    .kc-mob-sb-item:hover { color:var(--sb-text-hov); background:rgba(233,30,99,0.07); border-left-color:rgba(233,30,99,0.38); }
    .kc-mob-sb-item.active {
      color:#fff;
      background:linear-gradient(90deg,rgba(233,30,99,0.22) 0%,rgba(233,30,99,0.04) 100%);
      border-left-color:var(--pk);
    }
    .kc-mob-sb-icon {
      width:36px; height:36px; border-radius:9px;
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      font-size:14px; color:var(--sb-text); transition:all var(--t);
    }
    .kc-mob-sb-item:hover .kc-mob-sb-icon, .kc-mob-sb-item.mob-open .kc-mob-sb-icon { color:var(--pk); }
    .kc-mob-sb-item.active .kc-mob-sb-icon { background:rgba(233,30,99,0.20); color:var(--pk); box-shadow:0 0 10px rgba(233,30,99,0.20); }
    .kc-mob-sb-label { flex:1; }
    .kc-mob-sb-arrow { font-size:9px; color:rgba(255,180,210,0.30); transition:transform var(--t); flex-shrink:0; }
    .kc-mob-sb-item.mob-open .kc-mob-sb-arrow { transform:rotate(90deg); }
    .kc-mob-sb-badge {
      background:linear-gradient(135deg,var(--pk),var(--pk-dk)); color:#fff;
      font-size:9px; font-weight:700; padding:2px 7px; border-radius:20px; line-height:1.5;
      flex-shrink:0; box-shadow:0 2px 8px rgba(233,30,99,0.30);
    }
    .kc-mob-sb-sub { overflow:hidden; max-height:0; transition:max-height 0.28s ease; }
    .kc-mob-sb-sub.open { max-height:400px; }
    .kc-mob-sb-sub-item {
      display:flex; align-items:center; gap:8px; padding:9px 14px 9px 60px;
      font-size:13px; color:var(--sb-text); text-decoration:none;
      border-left:2px solid transparent; transition:all var(--t);
    }
    .kc-mob-sb-sub-item::before { content:''; width:4px; height:4px; border-radius:50%; background:currentColor; opacity:0.30; flex-shrink:0; }
    .kc-mob-sb-sub-item:hover { color:var(--sb-text-hov); background:rgba(233,30,99,0.06); }
    .kc-mob-sb-sub-item.active { color:var(--pk); border-left-color:var(--pk); }
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
    .kc-ft-brand span { width:22px; height:22px; background:linear-gradient(135deg,var(--pk),var(--pk-dk)); border-radius:5px; display:inline-flex; align-items:center; justify-content:center; font-size:11px; color:#fff; font-weight:700; }
    .kc-ft-links { display:flex; gap:18px; }
    .kc-ft-links a { font-size:12px; color:var(--ink-3); text-decoration:none; transition:color var(--t); }
    .kc-ft-links a:hover { color:var(--pk-dk); }
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
    .dark-mode .kc-navbar { background:#1a1012; border-bottom-color:rgba(233,30,99,0.15); box-shadow:none; }
    .dark-mode .kc-nb-search input { background:#13080e; color:var(--ink); }
    .dark-mode .kc-nb-btn { border-color:rgba(255,255,255,0.10); color:var(--ink-3); }
    .dark-mode .kc-nb-pbtn { border-color:rgba(255,255,255,0.10); }

    /* ════════════════════════════════════════
       RESPONSIVE
    ════════════════════════════════════════ */
    @media (max-width:768px) {
      /* Hide desktop sidebar */
      .kc-sidebar { display:none; }
      /* Content full width */
      .kc-content { margin-left:0!important; }

      /* Navbar — tighten up on mobile */
      .kc-nb-logo img   { height:40px; width:130px; }
      .kc-nb-search     { display:none; }   /* no search in navbar on mobile */
      .kc-nb-branch     { display:none; }
      .kc-divider       { display:none; }
      .kc-nb-pname, .kc-nb-prole, .kc-nb-chev { display:none; }
      .kc-nb-pbtn       { padding:4px; }
      /* Show mobile hamburger in action bar */
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
      { slug:'customers',    label:'Customers',    icon:'fa-users',           href:'pages/ui-features/customers.html',    badge:null }
    ]},
    { sec:'SALON', items:[
      /* Services — 4 sub-items restored */
      { slug:'services', label:'Services', icon:'fa-scissors', badge:null, children:[
        { slug:'services',      label:'All Services',        href:'pages/ui-features/service.html'      },
        { slug:'categorylist',  label:'Service Categories',  href:'pages/ui-features/categorylist.html' },
        { slug:'styling',       label:'Styling',             href:'pages/ui-features/styling.html'      },
        { slug:'loyalty',       label:'Loyalty Cards',       href:'pages/ui-features/loyalty.html'      }
      ]},
      { slug:'products', label:'Products', icon:'fa-bottle-droplet', href:'pages/ui-features/e_shop.html', badge:null },
      { slug:'staff',    label:'Staff',    icon:'fa-user-tie', badge:null, children:[
        { slug:'staff-list',     label:'All Staff',  href:'pages/ui-features/staff.html' },
        { slug:'staff-roles',    label:'Roles',      href:'#' },
        { slug:'staff-schedule', label:'Schedules',  href:'#' }
      ]}
    ]},
    { sec:'BUSINESS', items:[
      { slug:'franchise',  label:'Franchise',  icon:'fa-store',       href:'pages/ui-features/franchise_new_tabel.html', badge:null },
      { slug:'payments',   label:'Payments',   icon:'fa-credit-card', href:'#',                                          badge:null },
      { slug:'reports',    label:'Reports',    icon:'fa-chart-line',  href:'#',                                          badge:null },
      { slug:'more-pages', label:'More Pages', icon:'fa-layer-group', badge:null, children:[
        { slug:'bridal',  label:'Bridal',   href:'pages/ui-features/bridal_tabel.html'  },
        { slug:'offers',  label:'Offers',   href:'pages/ui-features/Offers_new.html'    },
        { slug:'contact', label:'Contact',  href:'pages/ui-features/contact_admin.html' },
        { slug:'about',   label:'About Us', href:'pages/ui-features/about.html'         },
        { slug:'e-shop',  label:'E-Shop',   href:'pages/ui-features/e_shop.html'        }
      ]}
    ]},
    { sec:'SYSTEM', items:[
      { slug:'settings', label:'Settings', icon:'fa-gear',               href:'#',                        badge:null },
      { slug:'logout',   label:'Logout',   icon:'fa-right-from-bracket', href:'pages/samples/login.html', badge:null, danger:true }
    ]}
  ];

  function mkUrl(r,h){ return (!h||h==='#')?(h||'#'):r+h; }
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
          h+='<div class="kc-sb-item'+(isAct?' open':'')+'" onclick="KcozmAdmin._sub(this)">'
           + '<span class="kc-sb-icon"><i class="fa-solid '+item.icon+'"></i><span class="kc-sb-tip">'+item.label+'</span></span>'
           + '<span class="kc-sb-label">'+item.label+'</span>'
           + (item.badge?'<span class="kc-sb-badge">'+item.badge+'</span>':'')
           + '<i class="fa-solid fa-chevron-right kc-sb-arrow"></i></div>'
           + '<div class="kc-sb-sub'+(isAct?' open':'')+'">';
          item.children.forEach(function(c){
            h+='<a class="kc-sb-sub-item'+(c.slug===active?' active':'')+'" href="'+mkUrl(root,c.href)+'">'+c.label+'</a>';
          });
          h+='</div>';
        } else {
          h+='<a class="kc-sb-item'+(isAct?' active':'')+'" href="'+mkUrl(root,item.href)+'"'
           + (item.danger?' style="color:rgba(220,90,110,0.75)"':'')+' >'
           + '<span class="kc-sb-icon"><i class="fa-solid '+item.icon+'"></i><span class="kc-sb-tip">'+item.label+'</span></span>'
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
          h+='<a class="kc-mob-sb-item'+(isAct?' active':'')+'" href="'+mkUrl(root,item.href)+'"'
           + (item.danger?' style="color:rgba(220,90,110,0.75)"':'')+' onclick="KcozmAdmin._closeMob()">'
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

      /* Toggle — left edge */
      +'<button class="kc-nb-toggle-brand" onclick="KcozmAdmin._toggle()" aria-label="Toggle sidebar"><i class="fa-solid fa-bars"></i></button>'

      /* Logo — original gold colors, centered & larger */
      +'<a class="kc-nb-logo" href="'+root+'index.html"><img src="'+root+'images/logo.png" alt="KCOZM – The Luxury Salon"></a>'

      +'<div class="kc-nb-spacer"></div>'

      +(addButton?'<a class="kc-nb-addbtn" href="'+(addButtonHref||'#')+'"><i class="fa-solid fa-plus"></i>'+addButton+'</a>':'')

      +'<div class="kc-nb-search"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search…"></div>'

      +'<button class="kc-nb-branch"><i class="fa-solid fa-location-dot" style="color:var(--pk);font-size:11px"></i> Main Branch <i class="fa-solid fa-chevron-down" style="font-size:9px;opacity:.5"></i></button>'
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
      +    '<a class="kc-nb-pdi" href="#"><i class="fa-solid fa-gear"></i> Settings</a>'
      +    '<a class="kc-nb-pdi" href="#"><i class="fa-solid fa-key"></i> Change Password</a>'
      +    '<div class="kc-pd-hr"></div>'
      +    '<a class="kc-nb-pdi red" href="'+root+'pages/samples/login.html"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
      +  '</div>'
      +'</div>'

      /* Mobile hamburger — opens RIGHT sidebar */
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
  }

  /* ═══════════════════ PUBLIC API ═══════════════════ */
  win.KcozmAdmin={
    init:init,

    _toggle:function(){
      var sb=document.getElementById('kcSb');
      var cnt=document.querySelector('.kc-content');
      if(!sb) return;
      var col=sb.classList.toggle('sb-col');
      if(cnt) cnt.classList.toggle('sb-col',col);
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