import * as actions from './actions';

const topIndex = {
  OnEnter: () => (appState) => {
    return actions.SetStoryType({
      ...appState,
      storyId: null,
    }, {
      storyType: 'top',
    });
  },
};

const Index = {
  OnEnter: ({ storyType }) => (appState) => {
    return actions.SetStoryType({
      ...appState,
      storyId: null,
    }, {
      storyType,
    });
  },
};

const ShowStory = {
  OnEnter: ({ storyType, storyId }) => (appState) => {
    return actions.SelectStory(appState, {
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
