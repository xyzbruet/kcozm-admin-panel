const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'pages', 'ui-features');

const P = [
  { file: 'bridal_tabel.html', title: 'Bridal', form: 'bridal_from.html', fields: ['Image URL', 'Description'] },
  { file: 'franchise_new_tabel.html', title: 'Franchise', form: 'franchise_new_form.html', fields: ['Franchise Name', 'Location', 'Investment'] },
  { file: 'Offers_new.html', title: 'Offer', form: 'Offers_New_from.html', fields: ['Offer Code', 'Discount %', 'Expiry Date'] },
  { file: 'e_shop.html', title: 'Product', form: '../forms/product_form.html', fields: ['Product Name', 'Price', 'Stock'] }
];

function buildModal(title, fields) {
  let fieldsHtml = fields.map(f => `
      <div style="display:flex; flex-direction:column; gap:5px; margin-bottom:12px; text-align:left">
        <label style="font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:var(--ink-light)">${f}</label>
        <input style="padding:10px 13px; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-family:'DM Sans',sans-serif; font-size:13.5px; color:var(--ink); background:var(--surface-2); outline:none; transition:all 0.18s" type="text" placeholder="Enter ${f.toLowerCase()}...">
      </div>
  `).join('');

  return `
  <!-- Add Modal -->
  <div class="kc-modal-overlay" id="addModalOverlay" style="align-items:center;">
    <div class="kc-modal" style="width:min(520px,95vw); max-height:90vh; overflow-y:auto;">
      <div style="padding-bottom:18px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; margin-bottom:22px;">
        <h5 style="margin:0; font-family:'Cormorant Garamond',serif; font-size:19px; color:var(--ink)">Add New ${title}</h5>
        <button onclick="closeAddModal()" style="width:34px; height:34px; border-radius:8px; border:1.5px solid var(--border); background:transparent; display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--ink-light); transition:all 0.18s"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div>
        ${fieldsHtml}
      </div>
      <div style="padding-top:16px; border-top:1px solid var(--border); display:flex; gap:10px; justify-content:flex-end">
        <button class="kc-btn-cancel" onclick="closeAddModal()">Cancel</button>
        <button class="kc-btn-confirm" onclick="submitAddModal()"><i class="fa-solid fa-plus"></i> Add ${title}</button>
      </div>
    </div>
  </div>
  `;
}

function buildJs(title) {
  return `
    function openAddModal() { document.getElementById('addModalOverlay').classList.add('show'); document.body.style.overflow='hidden'; }
    function closeAddModal()  { document.getElementById('addModalOverlay').classList.remove('show'); document.body.style.overflow=''; }
    function submitAddModal() {
      closeAddModal();
      if(window.KcozmAdmin && KcozmAdmin.showToast) KcozmAdmin.showToast('${title} added successfully!', 'success');
      if(typeof render === 'function') render();
    }
  `;
}

P.forEach(p => {
  const filePath = path.join(dir, p.file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace navigation button with openAddModal
  const regexBtn = new RegExp(`onclick="window\\.location\\.href='${p.form}'"`, 'g');
  content = content.replace(regexBtn, `onclick="openAddModal()"`);

  // Replace editRow navigation with Toast + Modal
  const regexEdit = new RegExp(`function editRow\\(id\\)\\s*\\{\\s*window\\.location\\.href\\s*=\\s*'${p.form}\\?id='\\s*\\+\\s*id;?\\s*\\}`, 'g');
  content = content.replace(regexEdit, `function editRow(id) { KcozmAdmin.showToast('Editing ${p.title} #' + id, 'info'); openAddModal(); }`);

  // Also catch variations without spaces
  const regexEdit2 = new RegExp(`function editRow\\(id\\)\\{window\\.location\\.href='${p.form}\\?id='\\+id;\\}`, 'g');
  content = content.replace(regexEdit2, `function editRow(id) { KcozmAdmin.showToast('Editing ${p.title} #' + id, 'info'); openAddModal(); }`);

  // Inject Modal HTML before the shared-components script
  if (!content.includes('id="addModalOverlay"')) {
    content = content.replace(/<script src="\.\.\/\.\.\/js\/shared-components\.js"><\/script>/, buildModal(p.title, p.fields) + '\n  <script src="../../js/shared-components.js"></script>');
  }

  // Inject JS handlers before closing </body>
  if (!content.includes('function openAddModal')) {
    content = content.replace('</body>', `<script>${buildJs(p.title)}</script>\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${p.file}`);

  // Delete obsolete form file
  const formPath = path.join(dir, p.form.replace('../forms/', '')); // Actually Offers_New_from.html is in same dir
  if (fs.existsSync(formPath) && !p.form.includes('../')) {
    fs.unlinkSync(formPath);
    console.log(`Deleted obsolete form: ${p.form}`);
  }
});
