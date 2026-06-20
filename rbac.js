// 1. Define Role Permission Matrix Rules Dictionary
const rolePermissions = {
    viewer: {
        canWrite: false,
        canDelete: false,
        showAdminPanel: false
    },
    editor: {
        canWrite: true,
        canDelete: false,
        showAdminPanel: false
    },
    admin: {
        canWrite: true,
        canDelete: true,
        showAdminPanel: true
    }
};

// 2. DOM Node Element Setup
const roleSelect = document.getElementById('roleSelect');
const roleBadge = document.querySelector('#roleBadge strong');

// 3. Core RBAC Processing Engine Logic Function
function applyRBACRules() {
    const activeRole = roleSelect.value;
    
    // Update interface header helper text element
    roleBadge.textContent = activeRole.toUpperCase();

    // Fetch the structural permission values mapping the target role selection
    const permissions = rolePermissions[activeRole];

    // Grab all elements tagged with data-require flags
    const secureElements = document.querySelectorAll('.data-perm');

    secureElements.forEach(element => {
        const requiredPermission = element.getAttribute('data-require');

        // Reset visibility default classes before sorting validation checks
        element.classList.remove('perm-hidden', 'perm-disabled');

        // Rule Application Logic
        if (requiredPermission === 'write' && !permissions.canWrite) {
            element.classList.add('perm-disabled');
        } 
        else if (requiredPermission === 'delete' && !permissions.canDelete) {
            element.classList.add('perm-disabled');
        } 
        else if (requiredPermission === 'admin-panel' && !permissions.showAdminPanel) {
            element.classList.add('perm-hidden');
        }
    });
}

// 4. Register Change Handlers
roleSelect.addEventListener('change', applyRBACRules);

// Trigger parsing pass on script execution setup load
applyRBACRules();