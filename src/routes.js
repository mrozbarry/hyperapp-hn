import * as actions from './actions';

const topIndex = {
  OnEnter: (state) => {
    return actions.SetStoryType(state, { storyType: 'top' });
  },
};

const Index = {
  OnEnter: (state, { storyType }) => {
    return actions.SetStoryType(state, {
      storyType,
    });
  },
};

const ShowStory = {
  OnEnter: (state, { storyType, storyId }) => {
    return actions.SelectStory(state, {
      storyType,
      storyId,
    });
  },
};

export default {
  '/': topIndex,
  '/:storyType': Index,
  '/:storyType/:storyId': ShowStory,
};
