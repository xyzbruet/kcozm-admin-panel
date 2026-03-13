/**
 * KCOZM Salon Admin — Shared Components v4
 * ══════════════════════════════════════════
 * • Logo in NAVBAR — always fully visible, never hidden
 * • Navbar left portion mirrors sidebar width and collapses with it
 * • Sidebar = pure navigation, dark warm gradient + gold accents
 * • Toggle adjusts navbar logo zone + content margin simultaneously
 */
(function (win) {
  'use strict';

  /* ═══════════════════ CSS ═══════════════════ */
  var CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --gold:        #c8a040;
      --gold-dk:     #9a7020;
      --gold-lt:     #fdf6e8;
      --gold-glow:   rgba(200,160,64,0.20);
      --rose:        #c97b84;
      --rose-dk:     #a85560;
      --rose-lt:     #fdf0f2;
      --ink:         #18120f;
      --ink-2:       #3d3028;
      --ink-3:       #907860;
      --surface:     #ffffff;
      --surface-2:   #faf8f6;
      --border:      #ebe5de;

      /* sidebar */
      --sb-w:        252px;
      --sb-col:      72px;
      --sb-bg1:      #1d1108;
      --sb-bg2:      #120c05;
      --sb-bg3:      #090603;
      --sb-border:   rgba(200,160,64,0.15);
      --sb-text:     rgba(238,218,185,0.46);
      --sb-text-hov: rgba(252,234,208,0.95);

      /* navbar */
      --nav-h: 64px;
      --t: 0.22s ease;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body { font-family: 'DM Sans', sans-serif; background: var(--surface-2); color: var(--ink); overflow-x: hidden; }

    /* ── NAVBAR ─────────────────────────────────────── */
    .kc-navbar {
      position: fixed; top: 0; left: 0; right: 0;
      height: var(--nav-h);
      display: flex; align-items: stretch;
      z-index: 1000;
    }

    /* Logo zone — same width as sidebar, slides with it */
    .kc-nb-brand {
      width: var(--sb-w);
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      padding: 10px 16px;
      background: linear-gradient(165deg, var(--sb-bg1) 0%, var(--sb-bg2) 55%, var(--sb-bg3) 100%);
      border-bottom: 1px solid var(--sb-border);
      border-right: 1px solid var(--sb-border);
      text-decoration: none;
      overflow: hidden;
      position: relative;
      /* width is fixed — no transition needed */
    }
    /* Gold shimmer line top edge — matches sidebar */
    .kc-nb-brand::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg,
        transparent 0%, rgba(200,160,64,0.5) 25%,
        #e0b848 50%, rgba(200,160,64,0.5) 75%, transparent 100%);
    }
    /* Logo image — full size by default */
    .kc-nb-brand img {
      height: 46px;
      width: 100%;
      max-width: 218px;
      object-fit: contain;
      object-position: center;
      display: block;
      filter: drop-shadow(0 1px 12px rgba(200,160,64,0.40));
      /* NO transition needed — logo never changes size */
    }
    /* Logo zone is ALWAYS full width — sidebar collapses independently */

    /* Action bar */
    .kc-nb-bar {
      flex: 1;
      display: flex; align-items: center; gap: 10px;
      padding: 0 22px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 1px 18px rgba(24,18,12,0.06);
    }

    .kc-nb-toggle {
      width: 38px; height: 38px; flex-shrink: 0;
      border: 1.5px solid var(--border); border-radius: 9px;
      background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--ink-3); font-size: 15px;
      transition: all var(--t);
    }
    .kc-nb-toggle:hover { background: var(--gold-lt); border-color: var(--gold); color: var(--gold-dk); }

    .kc-nb-search { position: relative; flex-shrink: 0; }
    .kc-nb-search input {
      width: 220px; padding: 8px 14px 8px 36px;
      border: 1.5px solid var(--border); border-radius: 50px;
      background: var(--surface-2); font-family: 'DM Sans',sans-serif;
      font-size: 13px; color: var(--ink); outline: none;
      transition: all var(--t);
    }
    .kc-nb-search input:focus { width: 280px; border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-glow); background:#fff; }
    .kc-nb-search input::placeholder { color: var(--ink-3); }
    .kc-nb-search i { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--ink-3); font-size:12px; pointer-events:none; }

    .kc-nb-spacer { flex: 1; }

    .kc-nb-btn {
      width: 38px; height: 38px; flex-shrink: 0;
      border: 1.5px solid var(--border); border-radius: 9px;
      background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--ink-3); font-size: 14px; position: relative;
      transition: all var(--t);
    }
    .kc-nb-btn:hover { background: var(--gold-lt); border-color: var(--gold); color: var(--gold-dk); }
    .kc-nb-btn .dot {
      position:absolute; top:-5px; right:-5px;
      width: 17px; height:17px; border-radius:99px;
      background: var(--rose-dk); color:#fff;
      font-size:8px; font-weight:700; line-height:17px; text-align:center;
      border: 2px solid var(--surface);
    }

    .kc-nb-branch {
      display:flex; align-items:center; gap:6px;
      padding: 7px 12px; border: 1.5px solid var(--border); border-radius:9px;
      background:transparent; font-family:'DM Sans',sans-serif;
      font-size:12.5px; font-weight:600; color:var(--ink-2); cursor:pointer;
      transition: all var(--t); white-space:nowrap;
    }
    .kc-nb-branch:hover { border-color:var(--gold); color:var(--gold-dk); background:var(--gold-lt); }
    .kc-nb-branch .li { color:var(--gold-dk); font-size:11px; }

    .kc-divider { width:1px; height:24px; background:var(--border); flex-shrink:0; }

    /* Profile */
    .kc-nb-profile { position:relative; flex-shrink:0; }
    .kc-nb-pbtn {
      display:flex; align-items:center; gap:8px;
      padding: 4px 10px 4px 4px;
      border: 1.5px solid var(--border); border-radius:50px;
      background:transparent; cursor:pointer; transition: all var(--t);
    }
    .kc-nb-pbtn:hover { border-color:var(--gold); background:var(--gold-lt); }
    .kc-nb-av {
      width:32px; height:32px; border-radius:50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-dk));
      display:flex; align-items:center; justify-content:center;
      font-size:13px; font-weight:700; color:#fff; flex-shrink:0;
    }
    .kc-nb-pname { font-size:13px; font-weight:600; color:var(--ink); white-space:nowrap; }
    .kc-nb-prole { font-size:10.5px; color:var(--ink-3); white-space:nowrap; }
    .kc-nb-chev { font-size:10px; color:var(--ink-3); transition:transform var(--t); flex-shrink:0; }
    .kc-nb-profile.open .kc-nb-chev { transform:rotate(180deg); }
    .kc-nb-pdrop {
      display:none; position:absolute; top:calc(100% + 10px); right:0;
      width:220px; background:var(--surface);
      border:1px solid var(--border); border-radius:14px;
      box-shadow:0 16px 48px rgba(24,18,12,0.14); overflow:hidden; z-index:2000;
    }
    .kc-nb-profile.open .kc-nb-pdrop { display:block; animation:kcFade .18s ease; }
    .kc-nb-pdhead { padding:16px; border-bottom:1px solid var(--border); background:var(--gold-lt); }
    .kc-nb-pdname { font-size:14px; font-weight:700; color:var(--ink); }
    .kc-nb-pdemail{ font-size:11.5px; color:var(--ink-3); margin-top:2px; }
    .kc-nb-pdi {
      display:flex; align-items:center; gap:10px;
      padding:11px 16px; font-size:13px; font-weight:500;
      color:var(--ink-2); text-decoration:none; transition:all var(--t);
    }
    .kc-nb-pdi i { width:16px; text-align:center; color:var(--ink-3); }
    .kc-nb-pdi:hover { background:var(--gold-lt); color:var(--gold-dk); }
    .kc-nb-pdi:hover i { color:var(--gold-dk); }
    .kc-nb-pdi.red { color:#c62828; }
    .kc-nb-pdi.red i { color:#c62828; }
    .kc-nb-pdi.red:hover { background:var(--rose-lt); }
    .kc-pd-hr { height:1px; background:var(--border); }

    /* Notif */
    .kc-nb-notif { position:relative; flex-shrink:0; }
    .kc-nb-ndrop {
      display:none; position:absolute; top:calc(100% + 10px); right:0;
      width:320px; background:var(--surface);
      border:1px solid var(--border); border-radius:14px;
      box-shadow:0 16px 48px rgba(24,18,12,0.14); overflow:hidden; z-index:2000;
    }
    .kc-nb-notif.open .kc-nb-ndrop { display:block; animation:kcFade .18s ease; }
    .kc-nb-nhead { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--border); }
    .kc-nb-nhead b { font-size:14px; color:var(--ink); }
    .kc-nb-nhead a { font-size:12px; color:var(--gold-dk); text-decoration:none; font-weight:500; }
    .kc-nb-ni { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; border-bottom:1px solid var(--border); cursor:pointer; transition:background var(--t); }
    .kc-nb-ni:last-child { border:none; }
    .kc-nb-ni:hover { background:var(--surface-2); }
    .kc-nb-ndot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:14px; }
    .kc-nb-ndot.g  { background:var(--gold-lt); color:var(--gold-dk); }
    .kc-nb-ndot.r  { background:var(--rose-lt); color:var(--rose-dk); }
    .kc-nb-ndot.gr { background:#e8f5e9; color:#2e7d32; }
    .kc-nb-ni p { font-size:12.5px; color:var(--ink-2); line-height:1.5; margin:0; }
    .kc-nb-ni small { font-size:11px; color:var(--ink-3); }

    @keyframes kcFade { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }

    /* ── SIDEBAR ─────────────────────────────────────── */
    .kc-sidebar {
      position: fixed; top: 0; left: 0; bottom: 0;
      width: var(--sb-w);
      background: linear-gradient(168deg, var(--sb-bg1) 0%, var(--sb-bg2) 50%, var(--sb-bg3) 100%);
      display: flex; flex-direction: column;
      z-index: 1001;
      transition: width var(--t);
      overflow: hidden;
      border-right: 1px solid var(--sb-border);
      box-shadow: 5px 0 40px rgba(0,0,0,0.50);
    }
    /* Gold shimmer top edge */
    .kc-sidebar::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background: linear-gradient(90deg, transparent 0%, rgba(200,160,64,0.5) 25%, #e0b848 50%, rgba(200,160,64,0.5) 75%, transparent 100%);
      z-index:2; pointer-events:none;
    }
    .kc-sidebar.sb-col { width: var(--sb-col); }

    /* Spacer = navbar height */
    .kc-sb-top {
      height: var(--nav-h); flex-shrink: 0;
      border-bottom: 1px solid var(--sb-border);
      background: linear-gradient(180deg, rgba(200,160,64,0.07) 0%, transparent 100%);
    }

    /* Nav */
    .kc-sb-nav { flex:1; overflow-y:auto; overflow-x:hidden; padding:8px 0 16px; }
    .kc-sb-nav::-webkit-scrollbar { width:3px; }
    .kc-sb-nav::-webkit-scrollbar-thumb { background:rgba(200,160,64,0.22); border-radius:99px; }

    .kc-sb-sec {
      padding:16px 20px 5px; font-size:9px; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:rgba(210,172,82,0.38);
      white-space:nowrap; overflow:hidden;
      transition: opacity var(--t), height var(--t), padding var(--t);
    }
    .kc-sidebar.sb-col .kc-sb-sec { opacity:0; height:0; padding:0; pointer-events:none; }

    .kc-sb-item {
      display:flex; align-items:center; gap:10px;
      padding:9px 16px; font-size:13px; font-weight:500; color:var(--sb-text);
      text-decoration:none; cursor:pointer; position:relative;
      border-left:2px solid transparent;
      white-space:nowrap; overflow:hidden; user-select:none;
      transition: background var(--t), color var(--t), border-color var(--t);
    }
    .kc-sb-item:hover { color:var(--sb-text-hov); background:rgba(200,160,64,0.07); border-left-color:rgba(200,160,64,0.36); }
    .kc-sb-item.active {
      color:#fff;
      background: linear-gradient(90deg, rgba(200,160,64,0.18) 0%, rgba(200,160,64,0.03) 100%);
      border-left-color: var(--gold);
    }
    .kc-sb-item.active::after {
      content:''; position:absolute; right:0; top:18%; bottom:18%;
      width:3px; background:linear-gradient(180deg,#e8c060,#a87828); border-radius:3px 0 0 3px;
    }

    .kc-sb-icon {
      width:36px; height:36px; border-radius:9px;
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      font-size:14px; color:var(--sb-text); transition: background var(--t), color var(--t);
    }
    .kc-sb-item:hover   .kc-sb-icon,
    .kc-sb-item.open    .kc-sb-icon { color:var(--gold); }
    .kc-sb-item.active  .kc-sb-icon { background:rgba(200,160,64,0.18); color:var(--gold); }

    .kc-sb-label { flex:1; white-space:nowrap; overflow:hidden; transition:opacity var(--t), width var(--t); }
    .kc-sidebar.sb-col .kc-sb-label { opacity:0; width:0; }

    .kc-sb-arrow { font-size:9px; color:rgba(238,218,185,0.28); transition:transform var(--t), opacity var(--t); flex-shrink:0; }
    .kc-sb-item.open .kc-sb-arrow { transform:rotate(90deg); }
    .kc-sidebar.sb-col .kc-sb-arrow { opacity:0; width:0; overflow:hidden; }

    .kc-sb-badge {
      background:linear-gradient(135deg,#d0a040,#9a7020); color:#fff;
      font-size:9px; font-weight:700; padding:2px 7px; border-radius:20px; line-height:1.5;
      flex-shrink:0; box-shadow:0 2px 8px rgba(200,160,64,0.28);
      transition:opacity var(--t);
    }
    .kc-sidebar.sb-col .kc-sb-badge { opacity:0; width:0; overflow:hidden; padding:0; }

    .kc-sidebar.sb-col .kc-sb-item { padding:9px 0; justify-content:center; }
    .kc-sidebar.sb-col .kc-sb-icon { width:40px; height:40px; }

    .kc-sb-sub { overflow:hidden; max-height:0; transition:max-height 0.28s ease; }
    .kc-sb-sub.open { max-height:500px; }
    .kc-sidebar.sb-col .kc-sb-sub { max-height:0 !important; }

    .kc-sb-sub-item {
      display:flex; align-items:center; gap:8px;
      padding:8px 16px 8px 62px; font-size:12.5px;
      color:var(--sb-text); text-decoration:none;
      border-left:2px solid transparent; white-space:nowrap;
      transition: all var(--t);
    }
    .kc-sb-sub-item::before { content:''; width:5px; height:5px; border-radius:50%; background:currentColor; opacity:0.32; flex-shrink:0; }
    .kc-sb-sub-item:hover { color:var(--sb-text-hov); background:rgba(200,160,64,0.05); }
    .kc-sb-sub-item.active { color:var(--gold); border-left-color:var(--gold); background:rgba(200,160,64,0.08); }
    .kc-sb-sub-item.active::before { opacity:1; }

    /* Sidebar footer */
    .kc-sb-foot {
      border-top:1px solid var(--sb-border); padding:14px 16px;
      display:flex; align-items:center; gap:10px; overflow:hidden; flex-shrink:0;
      background:linear-gradient(0deg,rgba(200,160,64,0.05) 0%,transparent 100%);
    }
    .kc-sidebar.sb-col .kc-sb-foot { justify-content:center; padding:14px 0; }
    .kc-sb-av {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,#3d2a10,#1e1008);
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      border:2px solid rgba(200,160,64,0.42); box-shadow:0 0 14px rgba(200,160,64,0.16);
      font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:700; color:var(--gold);
    }
    .kc-sb-uinfo { overflow:hidden; transition:opacity var(--t), width var(--t); }
    .kc-sidebar.sb-col .kc-sb-uinfo { opacity:0; width:0; }
    .kc-sb-uname { font-size:12.5px; font-weight:600; color:var(--sb-text-hov); white-space:nowrap; }
    .kc-sb-urole { font-size:10px; color:var(--sb-text); white-space:nowrap; }

    /* ── CONTENT ─────────────────────────────────────── */
    .kc-content { margin-left:var(--sb-w); margin-top:var(--nav-h); min-height:calc(100vh - var(--nav-h)); display:flex; flex-direction:column; transition:margin-left var(--t); }
    .kc-content.sb-col { margin-left:var(--sb-col); }

    /* ── FOOTER ─────────────────────────────────────── */
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

    /* ── DARK MODE ─────────────────────────────────────── */
    .dark-mode {
      --surface:#1a1210; --surface-2:#130e0c; --border:rgba(255,255,255,0.08);
      --ink:#f0e4dc; --ink-2:#c8b8b0; --ink-3:#8a7a72;
      --sb-bg1:#0e0804; --sb-bg2:#090603; --sb-bg3:#050402;
    }
    .dark-mode .kc-nb-bar { background:var(--surface); border-bottom-color:var(--border); }

    /* ── MOBILE ─────────────────────────────────────── */
    .kc-mob-ov { display:none; position:fixed; inset:0; background:rgba(8,5,2,0.65); z-index:999; backdrop-filter:blur(4px); }
    .kc-mob-ov.show { display:block; }
    @media (max-width:768px) {
      .kc-sidebar { transform:translateX(-100%); width:var(--sb-w) !important; transition:transform var(--t); }
      .kc-sidebar.mob-open { transform:translateX(0); }
      /* logo zone stays full width on mobile too */
      .kc-content { margin-left:0 !important; }
      .kc-nb-search input { width:130px; }
    }
  `;

  /* ═══════════════════ NAV DATA ═══════════════════ */
  var NAV = [
    { sec:'MAIN', items:[
      { slug:'dashboard',    label:'Dashboard',    icon:'fa-gauge-high',         href:'index.html',                                  badge:null },
      { slug:'appointments', label:'Appointments', icon:'fa-calendar-check',     href:'pages/ui-features/appointments.html',         badge:'5'  },
      { slug:'customers',    label:'Customers',    icon:'fa-users',               href:'pages/ui-features/customers.html',            badge:null }
    ]},
    { sec:'SALON', items:[
      { slug:'services', label:'Services', icon:'fa-scissors', badge:null, children:[
        { slug:'services',     label:'All Services',       href:'pages/ui-features/service.html'      },
        { slug:'categorylist', label:'Service Categories', href:'pages/ui-features/categorylist.html' },
        { slug:'styling',      label:'Styling',            href:'pages/ui-features/styling.html'      },
        { slug:'loyalty',      label:'Loyalty Cards',      href:'pages/ui-features/loyalty.html'      }
      ]},
      { slug:'products', label:'Products', icon:'fa-bottle-droplet', href:'pages/ui-features/e_shop.html',  badge:null },
      { slug:'staff', label:'Staff', icon:'fa-user-tie', badge:null, children:[
        { slug:'staff-list',     label:'All Staff',  href:'pages/ui-features/staff.html' },
        { slug:'staff-roles',    label:'Roles',      href:'#' },
        { slug:'staff-schedule', label:'Schedules',  href:'#' }
      ]}
    ]},
    { sec:'BUSINESS', items:[
      { slug:'franchise', label:'Franchise', icon:'fa-store',       href:'pages/ui-features/franchise_new_tabel.html', badge:null },
      { slug:'payments',  label:'Payments',  icon:'fa-credit-card', href:'#',                                          badge:null },
      { slug:'reports',   label:'Reports',   icon:'fa-chart-line',  href:'#',                                          badge:null },
      { slug:'more-pages', label:'More Pages', icon:'fa-layer-group', badge:null, children:[
        { slug:'bridal',  label:'Bridal',   href:'pages/ui-features/bridal_tabel.html'  },
        { slug:'offers',  label:'Offers',   href:'pages/ui-features/Offers_new.html'    },
        { slug:'contact', label:'Contact',  href:'pages/ui-features/contact_admin.html' },
        { slug:'about',   label:'About Us', href:'pages/ui-features/about.html'         }
      ]}
    ]},
    { sec:'SYSTEM', items:[
      { slug:'settings', label:'Settings', icon:'fa-gear',               href:'#',                        badge:null },
      { slug:'logout',   label:'Logout',   icon:'fa-right-from-bracket', href:'pages/samples/login.html', badge:null, danger:true }
    ]}
  ];

  /* ═══════════════════ HELPERS ═══════════════════ */
  function mkUrl(root, href){ return (!href||href==='#') ? (href||'#') : root+href; }
  function childActive(item, slug){ return item.children && item.children.some(function(c){return c.slug===slug;}); }

  /* ═══════════════════ BUILD SIDEBAR ═══════════════════ */
  function buildSidebar(root, active){
    var h = '<nav class="kc-sidebar" id="kcSb">';
    h += '<div class="kc-sb-top"></div>';
    h += '<div class="kc-sb-nav">';
    NAV.forEach(function(group){
      h += '<div class="kc-sb-sec">'+group.sec+'</div>';
      group.items.forEach(function(item){
        var isAct = item.slug===active || childActive(item,active);
        var hasSub = item.children && item.children.length;
        if(hasSub){
          h += '<div class="kc-sb-item'+(isAct?' open':'')+'" onclick="KcozmAdmin._sub(this)">'
            +  '<span class="kc-sb-icon"><i class="fa-solid '+item.icon+'"></i></span>'
            +  '<span class="kc-sb-label">'+item.label+'</span>'
            +  (item.badge?'<span class="kc-sb-badge">'+item.badge+'</span>':'')
            +  '<i class="fa-solid fa-chevron-right kc-sb-arrow"></i>'
            +'</div>'
            +'<div class="kc-sb-sub'+(isAct?' open':'')+'">';
          item.children.forEach(function(c){
            h += '<a class="kc-sb-sub-item'+(c.slug===active?' active':'')+'" href="'+mkUrl(root,c.href)+'">'+c.label+'</a>';
          });
          h += '</div>';
        } else {
          h += '<a class="kc-sb-item'+(isAct?' active':'')+'" href="'+mkUrl(root,item.href)+'"'
            +  (item.danger?' style="color:rgba(205,110,110,0.72)"':'')+' >'
            +  '<span class="kc-sb-icon"><i class="fa-solid '+item.icon+'"></i></span>'
            +  '<span class="kc-sb-label">'+item.label+'</span>'
            +  (item.badge?'<span class="kc-sb-badge">'+item.badge+'</span>':'')
            +'</a>';
        }
      });
    });
    h += '</div>';
    h += '<div class="kc-sb-foot">'
      +  '<div class="kc-sb-av">A</div>'
      +  '<div class="kc-sb-uinfo"><div class="kc-sb-uname">Salon Admin</div><div class="kc-sb-urole">Administrator</div></div>'
      +'</div>';
    h += '</nav>';
    return h;
  }

  /* ═══════════════════ BUILD NAVBAR ═══════════════════ */
  function ni(type,icon,title,desc,time){
    return '<div class="kc-nb-ni">'
      +'<div class="kc-nb-ndot '+type+'"><i class="fa-solid '+icon+'"></i></div>'
      +'<div><p>'+title+'<br><small>'+desc+'</small></p><small>'+time+'</small></div>'
      +'</div>';
  }

  function buildNavbar(root){
    return '<header class="kc-navbar" id="kcNav">'

      /* ── Logo zone ── */
      +'<a class="kc-nb-brand" id="kcNbBrand" href="'+root+'index.html">'
      +  '<img src="'+root+'images/logo.png" alt="KCOZM – The Luxury Salon">'
      +'</a>'

      /* ── Action bar ── */
      +'<div class="kc-nb-bar">'

        +'<button class="kc-nb-toggle" onclick="KcozmAdmin._toggle()" aria-label="Menu">'
        +  '<i class="fa-solid fa-bars"></i>'
        +'</button>'

        +'<div class="kc-nb-search">'
        +  '<i class="fa-solid fa-magnifying-glass"></i>'
        +  '<input type="text" placeholder="Search…">'
        +'</div>'

        +'<div class="kc-nb-spacer"></div>'

        +'<button class="kc-nb-branch"><i class="fa-solid fa-location-dot li"></i> Main Branch <i class="fa-solid fa-chevron-down" style="font-size:9px;opacity:.5"></i></button>'
        +'<div class="kc-divider"></div>'

        +'<button class="kc-nb-btn" onclick="KcozmAdmin._dark()" title="Dark mode"><i class="fa-solid fa-moon"></i></button>'

        +'<div class="kc-nb-notif" id="kcNotif">'
        +  '<button class="kc-nb-btn" onclick="KcozmAdmin._notif()" title="Notifications">'
        +    '<i class="fa-solid fa-bell"></i><span class="dot">3</span>'
        +  '</button>'
        +  '<div class="kc-nb-ndrop">'
        +    '<div class="kc-nb-nhead"><b>Notifications</b><a href="#">Mark all read</a></div>'
        +    ni('g','fa-calendar-check','New appointment booked','Priya Singh — Bridal Package','2 min ago')
        +    ni('r','fa-star','5-star review received','Absolutely loved the experience!','18 min ago')
        +    ni('gr','fa-cart-shopping','New shop order #0421','Hair serum ×2, Face mask ×1','1 hour ago')
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
        +    '<a class="kc-nb-pdi" href="#"><i class="fa-solid fa-user"></i> My Profile</a>'
        +    '<a class="kc-nb-pdi" href="#"><i class="fa-solid fa-gear"></i> Settings</a>'
        +    '<a class="kc-nb-pdi" href="#"><i class="fa-solid fa-key"></i> Change Password</a>'
        +    '<div class="kc-pd-hr"></div>'
        +    '<a class="kc-nb-pdi red" href="'+root+'pages/samples/login.html"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
        +  '</div>'
        +'</div>'

      +'</div>'
    +'</header>';
  }

  /* ═══════════════════ FOOTER ═══════════════════ */
  function buildFooter(){
    var y = new Date().getFullYear();
    return '<footer class="kc-footer">'
      +'<div class="kc-ft-brand"><span>K</span> KCOZM Admin</div>'
      +'<div class="kc-ft-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Support</a></div>'
      +'<div class="kc-ft-copy">© '+y+' KCOZM Beauty Studio</div>'
      +'<div class="kc-ft-status"><i class="fa-solid fa-circle" style="font-size:6px"></i> All systems online</div>'
      +'</footer>';
  }

  /* ═══════════════════ INJECT ═══════════════════ */
  function injectCSS(){
    if(document.getElementById('kc-css')) return;
    var s=document.createElement('style'); s.id='kc-css'; s.textContent=CSS;
    document.head.insertBefore(s, document.head.firstChild);
  }
  function injectFA(){
    if(document.getElementById('kc-fa')||document.querySelector('link[href*="font-awesome"]')) return;
    var l=document.createElement('link'); l.id='kc-fa'; l.rel='stylesheet';
    l.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(l);
  }

  /* ═══════════════════ INIT ═══════════════════ */
  function init(opts){
    opts = opts||{};
    var root   = (opts.depth||'./').replace(/\/?$/,'/');
    var active = opts.activePage||'dashboard';

    injectFA(); injectCSS();

    /* Clean vendor remnants */
    ['nav.navbar','#sidebar','.sidebar-offcanvas','.theme-setting-wrapper','footer.footer'].forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){el.remove();});
    });

    /* Sidebar */
    var sbDiv=document.createElement('div'); sbDiv.innerHTML=buildSidebar(root,active);
    document.body.insertBefore(sbDiv.firstElementChild, document.body.firstChild);

    /* Navbar */
    var nbDiv=document.createElement('div'); nbDiv.innerHTML=buildNavbar(root);
    document.body.insertBefore(nbDiv.firstElementChild, document.body.children[1]);

    /* Mobile overlay */
    if(!document.getElementById('kcMobOv')){
      var ov=document.createElement('div'); ov.id='kcMobOv'; ov.className='kc-mob-ov';
      ov.onclick=function(){KcozmAdmin._closeMob();};
      document.body.appendChild(ov);
    }

    /* Wire .main-panel */
    var mp=document.querySelector('.main-panel');
    if(mp){
      mp.classList.add('kc-content');
      var ft=document.createElement('div'); ft.innerHTML=buildFooter();
      mp.appendChild(ft.firstElementChild);
    }

    /* Outside-click closes dropdowns */
    document.addEventListener('click',function(e){
      var p=document.getElementById('kcProf'), n=document.getElementById('kcNotif');
      if(p&&!p.contains(e.target)) p.classList.remove('open');
      if(n&&!n.contains(e.target)) n.classList.remove('open');
    });

    /* Restore dark */
    if(localStorage.getItem('kc-dark')==='1') document.body.classList.add('dark-mode');
  }

  /* ═══════════════════ PUBLIC API ═══════════════════ */
  win.KcozmAdmin = {
    init: init,

    _toggle: function(){
      var sb  = document.getElementById('kcSb');
      var cnt = document.querySelector('.kc-content');
      var mob = window.innerWidth <= 768;
      if(mob){
        sb.classList.toggle('mob-open');
        var ov=document.getElementById('kcMobOv');
        if(ov) ov.classList.toggle('show', sb.classList.contains('mob-open'));
      } else {
        sb.classList.toggle('sb-col');
        /* Logo zone in navbar stays FULL width always — only content shifts */
        if(cnt) cnt.classList.toggle('sb-col', sb.classList.contains('sb-col'));
      }
    },

    _closeMob: function(){
      var sb=document.getElementById('kcSb'), ov=document.getElementById('kcMobOv');
      if(sb) sb.classList.remove('mob-open');
      if(ov) ov.classList.remove('show');
    },

    _sub: function(el){
      var sub=el.nextElementSibling;
      if(!sub||!sub.classList.contains('kc-sb-sub')) return;
      el.classList.toggle('open'); sub.classList.toggle('open');
    },

    _dark: function(){
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('kc-dark', document.body.classList.contains('dark-mode')?'1':'0');
    },

    _prof: function(){
      var p=document.getElementById('kcProf'), n=document.getElementById('kcNotif');
      if(p){p.classList.toggle('open'); if(n) n.classList.remove('open');}
    },

    _notif: function(){
      var n=document.getElementById('kcNotif'), p=document.getElementById('kcProf');
      if(n){n.classList.toggle('open'); if(p) p.classList.remove('open');}
    },

    showToast: function(msg, type){
      var icons={success:'fa-circle-check',error:'fa-circle-xmark',info:'fa-circle-info'};
      var bg={success:'#1b5e20',error:'#b71c1c',info:'#18120f'};
      var t=document.getElementById('kc-toast');
      if(!t){
        t=document.createElement('div'); t.id='kc-toast';
        t.style.cssText='position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;align-items:center;gap:10px;padding:12px 18px;border-radius:10px;font-family:DM Sans,sans-serif;font-size:13.5px;font-weight:500;min-width:220px;box-shadow:0 8px 28px rgba(0,0,0,0.18);opacity:0;transform:translateY(12px);transition:all .25s ease;pointer-events:none;color:#fff;';
        document.body.appendChild(t);
      }
      t.style.background = bg[type]||bg.info;
      t.innerHTML = '<i class="fa-solid '+(icons[type]||icons.info)+'"></i> '+msg;
      setTimeout(function(){t.style.opacity='1';t.style.transform='translateY(0)';},10);
      clearTimeout(t._tmr);
      t._tmr=setTimeout(function(){t.style.opacity='0';t.style.transform='translateY(12px)';},3200);
    }
  };

})(window);