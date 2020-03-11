import { h } from 'hyperapp';
import * as loading from '../helpers/loading';
import * as actions from '../actions';
import fuzzyTime from '../helpers/fuzzyTime';

import { link } from './link';

export const comment = ({ item, now }) => {
  const commentLinkProps = (comment) => ({
    onClick: [
      actions.ExpandComments,
      { id: comment.id }
    ],
  });

  return loading.result(item, {
    [loading.OK]: comment => h('section', { class: 'single-comment' }, [
      h('header', { class: 'single-comment--header' }, [
        h(link, { href: `https://news.ycombinator.com/user?id=${comment.by}` }, comment.by),
        ' ',
        fuzzyTime(now, comment.time),
      ]),
      h('article', { class: 'single-comment--text', innerHTML: comment.text }),
      comment.deleted && h('em', { class: 'single-comment--deleted' }, 'deleted'),
      ((comment.kids || []).length > 0)
        ? h('button', commentLinkProps(comment), `${comment.kids.length} Replies`)
        : null,
    ]),
  }, ({ id }) => `loading(${id})`)
}
