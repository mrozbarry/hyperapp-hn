import { h } from 'hyperapp';

const mergeClass = props =>
  props.class
    ? (typeof props.class === 'string' ? { [props.class]: true } : props.class)
    : {};

export const container = (props, children) => {
  return h(
    'section',
    {
      ...props,
      class: {
        'container': true,
        ...mergeClass(props),
      },
    },
    children,
  );
};

