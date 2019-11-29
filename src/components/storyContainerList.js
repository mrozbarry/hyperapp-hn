import { h } from 'hyperapp';
import { container } from './container';
import { singleStoryList } from './singleStoryList';
import * as actions from '../actions';

export const storyContainerList = ({ items, now, storyId, database, ...rest }) => {
  return h(
    container,
    {
      ...rest,
      style: {
        ...(rest.style || {}),
        backgroundColor: storyId ? '#eee' : 'white',
        flex: 1,
      },
    },
    h(singleStoryList, { items, now, storyId, type: 'ol', database }),
  );
};
