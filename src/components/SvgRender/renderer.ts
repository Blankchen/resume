export class Renderer {
  resourceId: string;
  resourceType: string;
  jsonUrl: string;
  loaderHTML: string | null;

  containerId: string;
  loaderId: string;

  constructor() {
    this.resourceId = '';
    this.resourceType = '';
    this.jsonUrl = '';
    this.loaderHTML = null;

    this.containerId = 'resource-svg-wrap';
    this.loaderId = 'resource-loader';

    this.init = this.init.bind(this);
    this.handleSvgClick = this.handleSvgClick.bind(this);
    this.prepareConfig = this.prepareConfig.bind(this);
  }

  get loaderEl() {
    return document.getElementById(this.loaderId);
  }

  get containerEl() {
    return document.getElementById(this.containerId);
  }

  prepareConfig() {
    if (!this.containerEl) {
      return false;
    }

    // Clone it so we can use it later
    this.loaderHTML = this.loaderEl!.innerHTML;
    const dataset = this.containerEl.dataset;

    this.resourceType = dataset.resourceType!;
    this.resourceId = dataset.resourceId!;
    this.jsonUrl = dataset.jsonUrl!;

    return true;
  }


  handleSvgClick(e: any) {
    const targetGroup = e.target?.closest('g');
    if (!targetGroup) {
      return;
    }

    e.stopImmediatePropagation();

    const id = targetGroup.classList[0];
    window.dispatchEvent(
      new CustomEvent(`topic.click`, {
        detail: {
          topicId: id,
        },
      })
    );
  }

  init() {
    window.addEventListener('click', this.handleSvgClick);
  }
}

const renderer = new Renderer();
renderer.init();
