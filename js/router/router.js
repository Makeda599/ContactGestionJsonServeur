const views = {
  login: document.getElementById('view-login'),
  app:   document.getElementById('view-app'),
};

export function navigate(viewName) {
  Object.entries(views).forEach(([name, el]) => {
    el.classList.toggle('active', name === viewName);
  });
}