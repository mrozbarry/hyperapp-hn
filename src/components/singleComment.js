import { h } from 'hyperapp';
import * as loading from '../helpers/loading';
import * as actions from '../actions';
import fuzzyTime from '../helpers/fuzzyTime';

import { link } from './link';

export const singleComment = ({ item, now, database }) => {
  const commentLinkProps = (comment) => ({
    href: `#comment-${comment.id}`,
    onClick: [
      actions.LoadReplies,
      (e) => {
        e.preventDefault();
        return { commentIds: comment.kids || [], database };
      },
    ],
    target: '_blank',
  });

  const urlLinkProps = comment => comment.url
    ? { href: comment.url, target: '_blank' }
    : commentLinkProps(comment);

  return loading.result(item, {
    [loading.OK]: comment => h('section', { class: 'single-comment' }, [
      h('header', { class: 'single-comment--header' }, [
        h(link, { href: `https://news.ycombinator.com/user?id=${comment.by}` }, comment.by),
        ' ',
        fuzzyTime(now, comment.time),
      ]),
      h('article', { class: 'single-comment--text', innerHTML: comment.text }),
      comment.deleted && h('em', { class: 'single-comment--deleted' }, 'deleted'),
      (comment.kids && comment.kids.length > 0)
        ? h('a', commentLinkProps(comment), `${comment.kids.length} Replies`)
        : null,
    ]),
  }, ({ id }) => `loading(${id})`)
}
