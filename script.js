const form = document.getElementById('tenantForm');
const tenantList = document.getElementById('tenantList');

const API_URL = 'https://rentals-system-8nodzlmlr-njoroge-s1.vercel.app/'; // Update with your backend's actual URL

// Fetch and display tenants
async function fetchTenants() {
  try {
    const response = await fetch(API_URL);
    const tenants = await response.json();
    
    tenantList.innerHTML = ''; // Clear previous list

    tenants.forEach(tenant => {
      const tenantItem = document.createElement('div');
      tenantItem.classList.add('tenant');
      tenantItem.innerHTML = `
        <p><strong>Name:</strong> ${tenant.name}</p>
        <p><strong>House Number:</strong> ${tenant.houseNumber}</p>
        <p><strong>Phone:</strong> ${tenant.phoneNumber}</p>
        <p><strong>Date of Entry:</strong> ${new Date(tenant.dateOfEntry).toLocaleDateString()}</p>
      `;
      tenantList.appendChild(tenantItem);
    });
  } catch (error) {
    console.error('Error fetching tenants:', error);
  }
}

// Submit new tenant data
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tenantData = {
    name: document.getElementById('name').value,
    houseNumber: document.getElementById('houseNumber').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    dateOfEntry: document.getElementById('dateOfEntry').value
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tenantData)
    });

    if (!response.ok) {
      throw new Error('Failed to add tenant');
    }

    alert('Tenant added successfully');
    form.reset();
    fetchTenants(); // Refresh tenant list
  } catch (error) {
    console.error('Error adding tenant:', error);
  }
});

// Load tenants on page load
fetchTenants();
