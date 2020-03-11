import { h } from 'hyperapp';

export const link = (props, children) => h(
  'a',
  {
    ...props,
    target: '_blank',
  },
  children
);
