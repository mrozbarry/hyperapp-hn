import { h } from 'hyperapp';
import * as storyHelper from '../helpers/story';

import { singleStory } from './singleStory';

const getId = item => storyHelper.get(item, 'id');

export const singleStoryList = ({ items, storyId, now, type, database }) => {
  return h('ol', { class: 'single-story-list' }, items.map(story => {
    return (
      h('li', {
        style: {
          padding: '1rem',
          marginBottom: '2px',
          backgroundColor: getId(story) === storyId ? 'white' : 'transparent',
        },
      }, h(singleStory, { item: story, now, database }))
    )
  }));
};
