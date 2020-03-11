import { h } from 'hyperapp';
import * as storyHelper from '../helpers/story';

import { container } from './container';
import { story } from './story';

const getId = item => storyHelper.get(item, 'id');

export const stories = ({ items, storyId, now, storyType }) => {
  return h(container, {
    class: storyId ? 'container--dimmed' : undefined,
  }, [
    h('ul', { class: 'stories' }, items.map(item => {
      return (
        h('li', {
          name: `story-${getId(item)}`,
          class: {
            'stories--item': true,
            'stories--item--selected': getId(item) == storyId,
          },
        }, [
          h(story, { item, storyType, now }),
        ])
      );
    }))
  ]);
};
