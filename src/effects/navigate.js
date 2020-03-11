const NavigateFX = (_dispatch, { href }) => {
  const event = new CustomEvent('hyperapp-router-navigate', {
    detail: { href },
  });
  document.dispatchEvent(event);
};

export const Navigate = props => [NavigateFX, props];
