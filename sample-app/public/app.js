const state = {
  token: '',
  user: null,
  items: [],
  editingId: null,
  lastQuery: '',
};

const selectors = {
  loginForm: document.querySelector('#login-form'),
  itemForm: document.querySelector('#item-form'),
  message: document.querySelector('#message'),
  workspace: document.querySelector('#workspace'),
  sessionUser: document.querySelector('#session-user'),
  itemList: document.querySelector('#item-list'),
  emptyState: document.querySelector('#empty-state'),
  resultCount: document.querySelector('#result-count'),
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('#search-input'),
  clearSearchButton: document.querySelector('#clear-search'),
  formTitle: document.querySelector('#item-form-title'),
  itemTitle: document.querySelector('#item-title'),
  itemDescription: document.querySelector('#item-description'),
  itemSubmit: document.querySelector('#item-submit'),
  itemCancel: document.querySelector('#item-cancel'),
};

function renderMessage(message, type = 'info') {
  selectors.message.textContent = message;
  selectors.message.className = `message ${type}`;
}

function clearMessage() {
  selectors.message.textContent = '';
  selectors.message.className = 'message';
}

async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.message || 'Unexpected request failure';
    throw new Error(message);
  }

  return payload;
}

function resetItemForm() {
  state.editingId = null;
  selectors.formTitle.textContent = 'Add a new item';
  selectors.itemSubmit.textContent = 'Add Item';
  selectors.itemTitle.value = '';
  selectors.itemDescription.value = '';
}

function startEdit(item) {
  state.editingId = item.id;
  selectors.formTitle.textContent = `Editing: ${item.title}`;
  selectors.itemSubmit.textContent = 'Save Changes';
  selectors.itemTitle.value = item.title;
  selectors.itemDescription.value = item.description;
  selectors.itemTitle.focus();
}

async function deleteItem(itemId) {
  try {
    await apiRequest(`/api/items/${itemId}`, { method: 'DELETE' });
    renderMessage('Item deleted successfully.', 'success');
    await loadItems(state.lastQuery);
  } catch (error) {
    renderMessage(error.message, 'error');
  }
}

function renderItems() {
  selectors.itemList.innerHTML = '';

  if (state.items.length === 0) {
    selectors.emptyState.classList.remove('hidden');
  } else {
    selectors.emptyState.classList.add('hidden');
  }

  selectors.resultCount.textContent = `${state.items.length} item(s)`;

  state.items.forEach((item) => {
    const element = document.createElement('li');
    element.className = 'item-card';
    element.dataset.testid = `item-row-${item.id}`;
    element.innerHTML = `
      <div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <small>Updated ${new Date(item.updatedAt).toLocaleString()}</small>
      </div>
      <div class="actions">
        <button data-testid="edit-item-${item.id}" type="button" class="secondary">Edit</button>
        <button data-testid="delete-item-${item.id}" type="button" class="danger">Delete</button>
      </div>
    `;

    const [editButton, deleteButton] = element.querySelectorAll('button');
    editButton.addEventListener('click', () => startEdit(item));
    deleteButton.addEventListener('click', () => deleteItem(item.id));

    selectors.itemList.appendChild(element);
  });
}

async function loadItems(query = '') {
  try {
    const url = query ? `/api/items?q=${encodeURIComponent(query)}` : '/api/items';
    const payload = await apiRequest(url);
    state.items = payload.items;
    state.lastQuery = query;
    renderItems();
  } catch (error) {
    renderMessage(error.message, 'error');
  }
}

selectors.loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage();

  const formData = new FormData(selectors.loginForm);

  try {
    const payload = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
    });

    state.token = payload.token;
    state.user = payload.user;
    selectors.workspace.classList.remove('hidden');
    selectors.sessionUser.textContent = `${payload.user.displayName} (${payload.user.username})`;
    renderMessage('Login successful.', 'success');
    await loadItems();
  } catch (error) {
    renderMessage(error.message, 'error');
  }
});

selectors.itemForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage();

  const body = JSON.stringify({
    title: selectors.itemTitle.value,
    description: selectors.itemDescription.value,
    tags: ['ui'],
  });

  try {
    if (state.editingId) {
      await apiRequest(`/api/items/${state.editingId}`, {
        method: 'PUT',
        body,
      });
      renderMessage('Item updated successfully.', 'success');
    } else {
      await apiRequest('/api/items', {
        method: 'POST',
        body,
      });
      renderMessage('Item created successfully.', 'success');
    }

    resetItemForm();
    await loadItems(state.lastQuery);
  } catch (error) {
    renderMessage(error.message, 'error');
  }
});

selectors.searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage();
  await loadItems(selectors.searchInput.value.trim());
});

selectors.clearSearchButton.addEventListener('click', async () => {
  selectors.searchInput.value = '';
  clearMessage();
  await loadItems();
});

selectors.itemCancel.addEventListener('click', () => {
  resetItemForm();
  clearMessage();
});

resetItemForm();
renderItems();

