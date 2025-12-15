export function showError(message) {
    const el = document.getElementById('form-error');
    if (!el) return;

    el.textContent = message;
    el.classList.add('visible');
}

export function clearError() {
    const el = document.getElementById('form-error');
    if (!el) return;

    el.textContent = '';
    el.classList.remove('visible');
}
