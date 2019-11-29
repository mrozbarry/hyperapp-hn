import { h } from 'hyperapp';

export const container = (props, children) => {
  return h(
    'section',
    {
      ...props,
      class: 'container',
    },
    children,
  );
};

