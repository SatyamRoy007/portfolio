const centerPortrait = () => {
  const animatedPortrait = document.querySelector('.portrait');
  const magnet = animatedPortrait?.querySelector(':scope > .magnet');
  if (!animatedPortrait || !magnet || animatedPortrait.querySelector(':scope > .portrait-centered')) return;

  const centeredPortrait = document.createElement('div');
  centeredPortrait.className = 'portrait-centered';
  animatedPortrait.replaceChild(centeredPortrait, magnet);
  centeredPortrait.appendChild(magnet);
};

new MutationObserver(centerPortrait).observe(document.documentElement, { childList: true, subtree: true });
centerPortrait();
