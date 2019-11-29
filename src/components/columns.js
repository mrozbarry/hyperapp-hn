import { h } from 'hyperapp';

export const columns = (props, columns) => {
  return h(
    'div',
    {
      ...(props || {}),
      class: 'columns',
    },
    columns
  );
};
