figma.showUI(__html__);
figma.currentPage.setRelaunchData({ create: '', relaunch: 'Run the plugin to play'});
figma.ui.onmessage = msg => {
  if (msg.type === 'pick') {
    let cards = figma.currentPage.selection;
    const count = cards.length;
    if (count == 0) {
      figma.notify('Please select some cards');
      return;
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomNode = cards[randomIndex];
    const children = randomNode.children;
    let topper = children[children.length - 1];
    const layerVis = topper.visible;
    const layerName = topper.name.toLowerCase().trim();
    if (layerName == 'back' && layerVis == true) {
      topper.visible = false;
    }
    const newSelection = [randomNode];
    figma.currentPage.selection = newSelection;
  }
  else if (msg.type == 'flip') {
    let cards = figma.currentPage.selection;
    if (cards.length == 0) {
      figma.notify('Please select some cards');
      return;
    }
    cards.forEach(card => {
      const children = card.children;
      let topLayer = children[children.length - 1];
      const layerVis = topLayer.visible;
      const layerName = topLayer.name.toLowerCase().trim();
      if (layerName == 'back') {
        topLayer.visible = !layerVis;
      }
    });
  }
};
