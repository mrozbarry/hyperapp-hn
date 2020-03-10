import { app, h } from 'hyperapp';
import * as actions from './actions';
import * as effects from './effects/index';
import * as loading from './helpers/loading';
import * as storyHelper from './helpers/story';
import * as filterStories from './helpers/filterStories';
import * as databaseService from './services/database';

import { layout } from './components/layout';
import { stories } from './components/stories';
import { storyComments } from './components/storyComments';

const mapStories = ({ ids, stories }) => ids
  .reduce((order, id, rank) => [
    ...order,
    loading.augment(stories[id], (s) => ({ ...(s || {}), rank: rank + 1 })),
  ], []);

const mount = () => {
  const database = databaseService.instance();

  return app({
    init: actions.Init(),

    view: state => {
      const now = Date.now();

      const mappedStories = mapStories(state);
      const { storyFilter, storyType, storyId } = state;
      const story = state.stories[state.storyId];

      const visibleStories= filterStories.filter(mappedStories, storyFilter);

      return h(
        layout,
        {
          storyFilter,
          storyType,
          columns: state.storyId ? 2 : 1,
        },
        [
          
          h(stories, {
            items: visibleStories,
            now,
            storyId,
            database,
          }),
          state.storyId && h(
            storyComments,
            { item: story, comments: state.comments, storyId, now, database }
          ),
        ],
      );
    },

    subscriptions: state => {
      const story = loading.unwrap(state.stories[state.storyId], { kids: [] });

      const storyId = state.storyId ? JSON.stringify([state.storyId]) : null;
      const commentIds = state.storyId ? JSON.stringify(storyHelper.getAllCommentIds(story.kids, state.comments)) : null;

      return [ 
        state.watchStories && effects.List({
          SetStoryIDs: actions.InitializeStories,
          storyType: state.storyType,
          database,
        }),
        storyId && effects.WatchItems({
          database,
          OnUpdate: actions.SetStory,
          stringifiedIds: storyId,
        }),
        commentIds && effects.WatchItems({
          database,
          OnUpdate: actions.UpdateComment,
          stringifiedIds: commentIds,
        }),
      ];
    },

    node: document.getElementById('app'),
  });
};

mount();
