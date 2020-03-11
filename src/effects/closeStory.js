const CloseStoryFX = (_dispatch, { storyType }) => {
  const event = new CustomEvent('hyperapp-router-navigate', {
    detail: {
      href: `/${storyType}`
    },
  });
  document.dispatchEvent(event);
};

export const CloseStory = props => [CloseStoryFX, props];
