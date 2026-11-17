const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  return root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
}

function updateThemeButton() {
  const isDark = currentTheme() === 'dark';
  themeButton.setAttribute('aria-pressed', String(isDark));
}

if (themeButton) {
  updateThemeButton();
  themeButton.addEventListener('click', () => {
    const theme = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try {
      localStorage.setItem('shallot-bee-theme', theme);
    } catch (error) {
      // The selected theme still applies for this page view.
    }
    updateThemeButton();
  });
  prefersDark.addEventListener('change', updateThemeButton);
}

const grid = document.getElementById('project-grid');
if (grid && typeof projects !== 'undefined') {
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const artwork = document.createElement('div');
    artwork.className = `project-art ${project.color}`;
    artwork.setAttribute('aria-hidden', 'true');
    const artNumber = document.createElement('span');
    artNumber.className = 'project-art-number';
    artNumber.textContent = `NO. ${project.number}`;
    const icon = document.createElement('span');
    icon.className = 'project-symbol';
    icon.textContent = project.symbol;
    const artCaption = document.createElement('span');
    artCaption.className = 'project-art-caption';
    artCaption.textContent = 'A SHALLOT BEE CONCEPT';
    artwork.append(artNumber, icon, artCaption);

    const body = document.createElement('div');
    body.className = 'project-body';
    const category = document.createElement('p');
    category.className = 'project-category';
    category.textContent = project.category;
    const title = document.createElement('h3');
    title.textContent = project.name;
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    const badges = document.createElement('div');
    badges.className = 'store-badges';
    badges.setAttribute('aria-label', 'Store availability');
    ['App Store', 'Google Play'].forEach((store) => {
      const badge = document.createElement('span');
      badge.className = 'store-badge';
      badge.textContent = `${store} · not available`;
      badges.append(badge);
    });
    body.append(category, title, description, badges);
    card.append(artwork, body);
    grid.append(card);
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
