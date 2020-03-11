import { h } from 'hyperapp';
import { comment } from './comment';
import * as actions from '../actions';
import * as storyHelper from '../helpers/story';

const colors = [
  '#69d2e7',
  '#a7dbd8',
  '#e0e4cc',
  '#f38630',
  '#fa6900',
];

export const commentThread = ({ parent, comments, depth, now, expandedComments }) => {
  const items = storyHelper
    .get(parent, 'kids', [])
    .map(id => comments[id])
    .filter(Boolean);

  const hasDepth = typeof depth === 'number';

  const nextDepth = hasDepth ? depth + 1 : 0;

  const ulProps = hasDepth ? {
    class: 'comment-thread',
    style: {
      borderLeft: `1px ${colors[depth % colors.length]} solid`,
    },
  } : {
    class: 'comment-thread',
  };

  return h('ul', ulProps, items.map(item => {
    const hasChildren = storyHelper.get(item, 'kids', []).length > 0;
    // const isDeleted = storyHelper.get(item, 'deleted', false);
    const id = storyHelper.get(item, 'id', -1);

    const shouldExpand = hasChildren
      && expandedComments.includes(id)

    return h(
      'li',
      {
        class: 'item-thread--item',
      },
      [
        h(comment, { item, now }),
        shouldExpand && commentThread({ parent: item, comments, depth: nextDepth, now, expandedComments }),
      ],
    );
  }));
};
