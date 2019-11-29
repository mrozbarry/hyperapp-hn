import { h } from 'hyperapp';
import * as loading from '../helpers/loading';
import * as actions from '../actions';
import fuzzyTime from '../helpers/fuzzyTime';

import { link } from './link';

const domainMatcher = /https?:\/\/([^\/]+)\/?/i;
const urlDomain = story => {
  if (!story.url) {
    return null;
  }

  const match = story.url.match(domainMatcher);

  return match[1];
};

export const singleStory = ({ item, now, database }) => {
  const commentLinkProps = story => ({
    href: `#story-${story.id}`,
    onclick: [
      actions.ShowComments,
      (e) => {
        e.preventDefault();
        return { storyId: story.id, database };
      },
    ],
    onmouseenter: [actions.SetWatchStories, { watchStories: false }],
    onmouseleave: [actions.SetWatchStories, { watchStories: true }],
    target: '_blank',
  });

  const urlLinkProps = story => story.url
    ? {
      href: story.url,
      target: '_blank',
      onmouseenter: [actions.SetWatchStories, { watchStories: false }],
      onmouseleave: [actions.SetWatchStories, { watchStories: true }],
    }
    : commentLinkProps(story);

  return loading.result(item, {
    [loading.OK]: story => {
      const domain = urlDomain(story);

      return h('article', { class: 'single-story' }, [
        h('header', { class: 'single-story--header' }, [
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
          ]
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
  }, ({ id }) => `loading(${id})`)
}
