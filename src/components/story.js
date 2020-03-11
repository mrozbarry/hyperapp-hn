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
    style: { fontSize: '1rem' },
  });

  const urlLinkProps = story => story.url
    ? { href: story.url, target: '_blank' }
    : commentLinkProps(story);

  return loading.result(item, {
    [loading.OK]: story => {
      const domain = urlDomain(story);

      return h('div', { class: 'story' }, [
        !includeText && h('div', { class: 'story--meta' }, [
          h('div', { class: 'story--meta_rank' }, `#${story.rank}`),
          h('div', { class: 'story--meta_score' }, `${story.score}pts`),
        ]),
        h('div', { class: 'story--content' }, [
          h('div', { class: 'story--content_title' }, [
            h('a', urlLinkProps(story), story.title),
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
            (includeText && !!story.text) && h('div', { innerHTML: story.text }),
          ]),
          h('div', { class: 'story--content_footer' }, [
            h('span', {}, [
              h('a', { href: `https://news.ycombinator.com/user?item=${story.by}`, target: '_blank' }, story.by),
              h('span', {}, ' '),
              h('span', {}, 'Posted '),
              h('span', {}, fuzzyTime(now, story.time)),
              h('span', {}, ' with '),
              h('span', {}, `${story.descendants || 0} Comment(s)`),
              h('span', {}, ' | '),
            ]),
            !includeText && h('span', {}, [
              h('a', { href: `/${storyType}/${story.id}` }, 'Comment Thread'),
              h('span', {}, ' '),
            ]),
            h('a', { href: `https://news.ycombinator.com/item?id=${story.id}`, target: '_blank' }, 'On HackerNews'),
          ]),
        ]),
      ]);
    },
  }, (data) => `loading(${data ? data.id : '???'})`)
}
