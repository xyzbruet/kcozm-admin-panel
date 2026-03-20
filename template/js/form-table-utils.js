/**
 * KCOZM Form & Table Utilities v1.0
 * ═══════════════════════════════════════════════════════════════
 * Centralized utilities for managing form/table interactions
 * Provides modular functions for:
 *  - Form field management
 *  - Data validation
 *  - localStorage persistence
 *  - Form-table linking (edit mode)
 *  - Modal handling
 * ═══════════════════════════════════════════════════════════════
 */

const FormTableUtils = {
  
  // ═══ FORM VALIDATION ═══
  /**
   * Validates a form field against specified rules
   * @param {string} fieldId - HTML element ID
   * @param {string} type - Validation type: 'text', 'email', 'number', 'required'
   * @param {object} options - Additional validation options
   * @returns {boolean} - True if valid
   */
  validateField(fieldId, type, options = {}) {
    const field = document.getElementById(fieldId);
    if (!field) return false;
    
    const value = field.value.trim();
    
    switch(type) {
      case 'required':
        return value.length > 0;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'number':
        return !isNaN(value) && (options.min === undefined || value >= options.min);
      case 'text':
        return value.length > (options.minLength || 0);
      default:
        return true;
    }
  },

  /**
   * Validates entire form object
   * @param {object} fields - Field configuration object
   * @returns {boolean} - True if all fields valid
   */
  validateForm(fields) {
    let isValid = true;
    Object.keys(fields).forEach(fieldId => {
      const config = fields[fieldId];
      if (!this.validateField(fieldId, config.type, config.options)) {
        isValid = false;
        this.highlightError(fieldId);
      } else {
        this.clearError(fieldId);
      }
    });
    return isValid;
  },

  // ═══ FIELD HIGHLIGHTING ═══
  /**
   * Highlights field as error (adds 'has-error' class)
   * @param {string} fieldId - HTML element ID
   */
  highlightError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('form-input-error');
      field.style.borderColor = '#c62828';
    }
  },

  /**
   * Clears field error highlighting
   * @param {string} fieldId - HTML element ID
   */
  clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.remove('form-input-error');
      field.style.borderColor = '';
    }
  },

  // ═══ DATA COLLECTION ═══
  /**
   * Collects all form field values into single object
   * Automatically handles text, email, number, select, textarea
   * @param {string[]} fieldIds - Array of field IDs to collect
   * @returns {object} - Object with field values
   */
  collectFormData(fieldIds) {
    const data = {};
    fieldIds.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        // Trim text values, preserve numbers
        data[fieldId] = field.value;
      }
    });
    return data;
  },

  /**
   * Populates form fields from data object (for edit mode)
   * @param {object} data - Object with field data
   */
  populateForm(data) {
    Object.keys(data).forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.value = data[fieldId];
      }
    });
  },

  /**
   * Clears all form fields
   * @param {string[]} fieldIds - Array of field IDs to clear
   */
  clearForm(fieldIds) {
    fieldIds.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) field.value = '';
      this.clearError(fieldId);
    });
  },

  // ═══ LOCALSTORAGE PERSISTENCE ═══
  /**
   * Saves data to localStorage
   * @param {string} key - Storage key
   * @param {object|array} data - Data to save
   */
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch(e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  /**
   * Retrieves data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default if not found
   * @returns {any} - Retrieved data or default value
   */
  getFromStorage(key, defaultValue = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch(e) {
      console.error('Storage error:', e);
      return defaultValue;
    }
  },

  /**
   * Adds new item to storage array and saves
   * @param {string} key - Storage key
   * @param {object} item - Item to add
   * @returns {object} - Added item with ID and timestamp
   */
  addToStorage(key, item) {
    const items = this.getFromStorage(key, []);
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    this.saveToStorage(key, items);
    return newItem;
  },

  /**
   * Updates item in storage array
   * @param {string} key - Storage key
   * @param {number} id - Item ID to update
   * @param {object} updates - Fields to update
   * @returns {boolean} - Success status
   */
  updateInStorage(key, id, updates) {
    const items = this.getFromStorage(key, []);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveToStorage(key, items);
      return true;
    }
    return false;
  },

  /**
   * Deletes item from storage
   * @param {string} key - Storage key
   * @param {number} id - Item ID to delete
   * @returns {boolean} - Success status
   */
  deleteFromStorage(key, id) {
    const items = this.getFromStorage(key, []).filter(item => item.id !== id);
    this.saveToStorage(key, items);
    return true;
  },

  // ═══ TABLE RENDERING ═══
  /**
   * Generic row renderer for tables
   * @param {array} items - Array of items to render
   * @param {function} rowTemplate - Function that returns HTML for each row
   * @param {string} containerId - Container element ID
   */
  renderTable(items, rowTemplate, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="kc-empty-message">No items found</div>';
      return;
    }
    
    container.innerHTML = items.map((item, idx) => rowTemplate(item, idx)).join('');
  },

  // ═══ FORM-TABLE LINKING ═══
  /**
   * Loads item for editing and opens form
   * @param {string} tableKey - Storage key for table data
   * @param {number} itemId - ID of item to edit
   * @param {string} redirectUrl - URL of form page
   */
  editItem(tableKey, itemId, redirectUrl) {
    const item = this.getFromStorage(tableKey, []).find(i => i.id === itemId);
    if (item) {
      // Store in session for form to retrieve
      sessionStorage.setItem('editingItem', JSON.stringify(item));
      window.location.href = `${redirectUrl}?edit=${itemId}`;
    }
  },

  /**
   * Checks if form is in edit mode and loads data
   * @param {string} tableKey - Storage key for table
   * @returns {object|null} - Item data if editing, null if new
   */
  loadEditingItem(tableKey) {
    const editingItem = sessionStorage.getItem('editingItem');
    if (editingItem) {
      const item = JSON.parse(editingItem);
      sessionStorage.removeItem('editingItem');
      return item;
    }
    return null;
  },

  // ═══ TOAST NOTIFICATIONS (wrapper) ═══
  /**
   * Show success notification
   * @param {string} message - Message to display
   */
  showSuccess(message) {
    if (window.KcozmAdmin && window.KcozmAdmin.showToast) {
      KcozmAdmin.showToast(message, 'success');
    }
  },

  /**
   * Show error notification
   * @param {string} message - Message to display
   */
  showError(message) {
    if (window.KcozmAdmin && window.KcozmAdmin.showToast) {
      KcozmAdmin.showToast(message, 'error');
    }
  },

  /**
   * Show info notification
   * @param {string} message - Message to display
   */
  showInfo(message) {
    if (window.KcozmAdmin && window.KcozmAdmin.showToast) {
      KcozmAdmin.showToast(message, 'info');
    }
  },

  // ═══ PAGINATION ═══
  /**
   * Paginates array of items
   * @param {array} items - Items to paginate
   * @param {number} page - Current page (1-indexed)
   * @param {number} perPage - Items per page
   * @returns {object} - {items, page, totalPages, total}
   */
  paginate(items, page = 1, perPage = 10) {
    const total = items.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const paginatedItems = items.slice(start, start + perPage);
    
    return {
      items: paginatedItems,
      page,
      totalPages,
      total,
      start: start + 1,
      end: Math.min(start + perPage, total)
    };
  },

  // ═══ FILTERING & SEARCHING ═══
  /**
   * Searches items by text in multiple fields
   * @param {array} items - Items to search
   * @param {string} query - Search query
   * @param {string[]} fields - Fields to search in
   * @returns {array} - Filtered items
   */
  searchItems(items, query, fields) {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(item => 
      fields.some(field => 
        String(item[field] || '').toLowerCase().includes(q)
      )
    );
  },

  /**
   * Filters items by field value
   * @param {array} items - Items to filter
   * @param {string} field - Field to filter by
   * @param {any} value - Value to match
   * @returns {array} - Filtered items
   */
  filterItems(items, field, value) {
    if (!value) return items;
    return items.filter(item => item[field] === value);
  }
};

// Export for use in pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormTableUtils;
}
