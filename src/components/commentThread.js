import { h } from 'hyperapp';
import { singleComment } from './singleComment';
import * as actions from '../actions';
import * as storyHelper from '../helpers/story';

const colors = [
  '#69d2e7',
  '#a7dbd8',
  '#e0e4cc',
  '#f38630',
  '#fa6900',
];

export const commentThread = ({ parent, comments, depth, now, database }) => {
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

  return h('ul', ulProps, items.map(comment => {
    const hasChildren = storyHelper.get(comment, 'kids', []).length > 0;
    const isDeleted = storyHelper.get(comment, 'deleted', false);

    return h(
      'li',
      {
        class: 'comment-thread--item',
      },
      [
        h(singleComment, { item: comment, now, database }),
        !isDeleted && hasChildren && commentThread({ parent: comment, comments, depth: nextDepth, now, database }),
      ],
    );
  }));
};
