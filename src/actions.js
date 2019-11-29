import * as loading from './helpers/loading';
import * as effects from './effects';

const size = 10;

const syncStoriesWithIds = (state, allIds) => {
  const ids = Object.keys(state.stories).concat(allIds);

  return ids.reduce((stories, storyId) => {
    if (!allIds.includes(storyId) || stories[storyId]) {
      return stories;
    }

    const story = loading.start({ id: storyId });
    return { ...stories, [storyId]: story };
  }, state.stories);
};

export const Init = () => ({
  stories: {},
  ids: [],
  storyType: 'top',
  storyFilter: '',
  storyId: null,
  comments: {},
  watchStories: true,
});

export const InitializeStories = (state, { ids, database }) => {
  return [
    {
      ...state,
      ids,
      stories: syncStoriesWithIds(state, ids),
    },
    effects.Stories({ ids, SetStories, database, size }),
  ];
};

export const SetStories = (state, { stories, ids, database, size }) => {
  return [
    {
      ...state,
      stories: {
        ...state.stories,
        ...stories,
      },
    },
    effects.Stories({ ids, SetStories, database, size }),
  ];
};

export const SetStory = (state, { item, id }) => ({
  ...state,
  stories: {
    ...state.stories,
    [id]: item,
  },
});

export const ShowComments = (state, { storyId, database }) => {
  const kids = loading.result(state.stories[storyId], {
    [loading.OK]: story => story.kids,
  }, () => []) || [];

  const makeComments = (initial) => kids.reduce((comments, id) => {
    return {
      ...comments,
      [id]: loading.result(comments[id], {
        [loading.OK]: comment => loading.ok(comment),
      }, () => loading.start({ id }))
    };
  }, initial);

  return [
    {
      ...state,
      storyId,
      comments: makeComments({}),
    },
    [
      effects.Comments({
        database,
        SetComments,
        ids: kids || [],
      }),
    ]
  ];
};

export const LoadReplies = (state, { commentIds, database }) => {
  const loaders = commentIds.reduce((comments, id) => ({
    ...comments,
    [id]: state.comments[id] || loading.start({ id }),
  }), {});

  return [
    {
      ...state,
      comments: {
        ...state.comments,
        ...loaders,
      },
    },
    effects.Comments({
      database,
      SetComments,
      ids: commentIds,
    })
  ];
};


export const SetComments = (state, { comments }) => {
  return {
    ...state,
    comments: {
      ...state.comments,
      ...comments,
    },
  };
};

export const UpdateComment = (state, { comment, id }) => {
  return {
    ...state,
    comments: {
      ...state.comments,
      [id]: comment,
    },
  };
};

export const SetWatchStories = (state, { watchStories }) => {
  return {
    ...state,
    watchStories: Boolean(watchStories),
  };
};

export const StoryFilterInput = (state, storyFilter) => ({
  ...state,
  storyFilter,
});

export const SetStoryType = (state, storyType) => {
  console.log('SetStoryType', storyType);
  return ({
    ...state,
    storyType,
  });
};
