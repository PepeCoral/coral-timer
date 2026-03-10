const THEMES = ['cupcake', 'bumblebee', 'emerald', 'acid', 'lemonade', 'coffee', 'retro', 'lofi', 'valentine', 'dark'];

class ThemeSelector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.applyStoredTheme();
    this.attachListeners();
  }

  render() {
    this.innerHTML = `
<div class="dropdown mb-4 z-50 p-5">
  <div tabindex="0" role="button" class="btn m-1">
    Theme
    <svg
      width="12px"
      height="12px"
      class="inline-block h-2 w-2 fill-current opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    </svg>
  </div>
  <ul tabindex="-1" class="dropdown-content bg-base-300 rounded-box z-50 w-30 p-2 shadow-2xl">
    ${THEMES.map(theme => `
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="${theme}"
        value="${theme}" />
    </li>`).join('')}
  </ul>
</div>`;
  }

  applyStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored && THEMES.includes(stored)) {
      document.documentElement.setAttribute('data-theme', stored);
      this.setChecked(stored);
    }
  }

  setChecked(theme) {
    const input = this.querySelector(`input[value="${theme}"]`);
    if (input) {
      input.checked = true;
    }
  }

  attachListeners() {
    this.addEventListener('change', (e) => {
      if (e.target.matches('input.theme-controller')) {
        const t = e.target.value;
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
      }
    });
  }
}

customElements.define('theme-selector', ThemeSelector);
