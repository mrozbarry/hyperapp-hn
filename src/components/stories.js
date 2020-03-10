import { h } from 'hyperapp';
import * as storyHelper from '../helpers/story';

import { container } from './container';
import { singleStory } from './singleStory';

const getId = item => storyHelper.get(item, 'id');

export const stories = ({ items, storyId, now, type, database }) => {
  return h(container, {
    class: storyId ? 'container--dimmed' : undefined,
  }, [
    h('ul', { class: 'stories' }, items.map(story => {
      return (
        h('li', {
          name: `story-${getId(story)}`,
          class: {
            'stories--item': true,
            'stories--item--selected': getId(story) === storyId,
          },
        }, [
          h(singleStory, { item: story, now, database }),
        ])
      );
    }))
  ]);
};
