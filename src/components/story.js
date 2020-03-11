import { h } from 'hyperapp';
import * as loading from '../helpers/loading';
import fuzzyTime from '../helpers/fuzzyTime';
import * as actions from '../actions';

import { link } from './link';

const domainMatcher = /https?:\/\/([^\/]+)\/?/i;
const urlDomain = story => {
  if (!story || !story.url) {
    return null;
  }

  const match = story.url.match(domainMatcher);

  return match[1];
};

export const story = ({ storyType, item, now, includeText }) => {
  const commentLinkProps = story => ({
    href: `/${storyType}/${story.id}`,
  });

  const urlLinkProps = story => story.url
    ? { href: story.url, target: '_blank' }
    : commentLinkProps(story);

  return loading.result(item, {
    [loading.OK]: story => {
      const domain = urlDomain(story);

      return h('article', { class: 'single-story' }, [
        h('header', { class: 'single-story--header' }, [
          story.rank && h('a', { name: `story-${story.id}` }, `${story.rank}. `),
          h(link, urlLinkProps(story), story.title),
          domain && [
            ' ',
            '(',
            h(
              'a',
              {
                href: '#url-filter',
                onclick: [
                  actions.StoryFilterInput,
                  (e) => {
                    e.preventDefault();
                    return domain;
                  },
                ],
              },
              domain,
            ),
            ')',
          ],
          (includeText && !!story.text) && h('p', null, story.text),
        ]),
        h('footer', { class: 'single-story--footer' }, [
          story.score,
          'pts, ',
          'by ',
          h(link, { href: `https://news.ycombinator.com/user?id=${story.by}` }, story.by),
          ' ',
          fuzzyTime(now, story.time),
          ' ',
          (story.descendants > 0)
            ? h('a', commentLinkProps(story), `${story.descendants} Comments`)
            : h('a', commentLinkProps(story), `Comments`)
        ]),
      ]);
    },
  }, (data) => `loading(${data ? data.id : '???'})`)
}
