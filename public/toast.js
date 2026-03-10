(function () {
  function createToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast';
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, style = "success", duration = 4000) {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `alert alert-${style} alert-soft shadow-lg`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  window.showToast = showToast;
})();
