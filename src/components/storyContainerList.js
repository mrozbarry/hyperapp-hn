import { h } from 'hyperapp';
import { container } from './container';
import { singleStoryList } from './singleStoryList';
import * as actions from '../actions';

export const storyContainerList = ({ items, now, storyId, database, ...rest }) => {
  return h(
    container,
    {
      ...rest,
      id: 'fooooo',
      class: {
        'story-container-list': true,
        'story-container-list--with-story': !!storyId,
      },
    },
    h(singleStoryList, { items, now, storyId, database }),
  );
};
