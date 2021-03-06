import * as loading from './helpers/loading';
import * as effects from './effects';

const syncStoriesWithIds = (state, allIds) => {
  const ids = Object.keys(state.items).concat(allIds);

  return ids.reduce((items, storyId) => {
    if (!allIds.includes(storyId) || items[storyId]) {
      return items;
    }

    const story = loading.start({ id: storyId });
    return { ...items, [storyId]: story };
  }, state.items);
};

const initialState = {
  items: {},
  ids: [],
  storyType: 'top',
  storyFilter: '',
  storyId: null,
  comments: {},
  expandedComments: [],
};

export const SetStoryIDs = (state, { ids }) => ({
  ...state,
  ids,
});

export const SetStoryType = (state, { storyType }) => ({
  ...state,
  storyType,
  storyId: null,
});

export const Navigate = (state, { href }) => [
  state,
  effects.Navigate({ href }),
];

export const Init = () => SetStoryType(initialState, {
  storyType: 'top',
});

export const InitializeStories = (state, { ids }) => ({
  ...state,
  ids,
  items: syncStoriesWithIds(state, ids),
});

export const SelectStory = (state, { storyType, storyId }) => ({
  ...state,
  storyType,
  storyId,
  comments: {},
  expandedComments: [],
});

export const CloseStory = state => {
  return [
    state,
    effects.Navigate({ href: `/${state.storyType}` }),
  ];
};

export const ChangeStoryType = (state, { storyType }) => {
  return [
    state,
    effects.Navigate({ href: `/${storyType}` }),
  ];
};

export const ExpandComments = (state, { id }) => ({
  ...state,
  expandedComments: state.expandedComments.includes(id)
    ? state.expandedComments.filter(commentId => commentId !== id)
    : state.expandedComments.concat(id),
});

export const SetStory = (state, { id, story }) => ({
  ...state,
  items: {
    ...state.items,
    [id]: story,
  },
});

export const SetComment = (state, { id, comment }) => ({
  ...state,
  comments: {
    ...state.comments,
    [id]: comment,
  },
});

export const StoryFilterInput = (state, storyFilter) => ({
  ...state,
  storyFilter,
});
