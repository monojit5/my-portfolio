// drei's <Html> labels must live in the fixed stage, not in the scrolling container created by ScrollControls.
export const stagePortal = {
  get current() {
    return document.querySelector('.stage')
  },
}
