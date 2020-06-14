async function loadUpSetJS() {
  document.body.insertAdjacentHTML('beforeend', '<div id="app"></div>');

  function loadScript(url) {
    const s = document.createElement('script');
    s.crossOrigin = true;
    s.src = url;
    document.head.appendChild(s);
    return new Promise((resolve) => (s.onload = resolve));
  }

  await Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/react@16/umd/react.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.development.js'),
    loadScript('https://cdn.jsdelivr.net/npm/lz-string'),
  ]);

  window.UpSetJSModel = window.exports = {};

  let s = document.createElement('script');
  s.src = '../../model/dist/model.cjs.development.js';
  document.body.appendChild(s);
  await new Promise((resolve) => (s.onload = resolve));

  window.require = function require(id) {
    if (id === 'react') {
      return window.React;
    }
    if (id === 'lz-string') {
      return window.LZString;
    }
    if (id === '@upsetjs/model') {
      return window.UpSetJSModel;
    }
  };
  window.UpSetJS = window.exports = {};

  s = document.createElement('script');
  s.src = '../dist/react.cjs.development.js';
  document.body.appendChild(s);
  await new Promise((resolve) => (s.onload = resolve));

  const theme =
    new URLSearchParams(window.location.search).get('theme') ||
    (window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light');

  function render(props, elem) {
    props.theme = theme;
    window.ReactDOM.render(
      window.React.createElement(elem || window.exports.default, props),
      document.getElementById('app')
    );
  }
  document.body.style.backgroundColor = window.exports.getDefaultTheme(theme).backgroundColor;

  const elems = await fetch('../src/data/got.json').then((r) => r.json());
  return { UpSetJS: window.exports, render, elems, theme };
}
