import { app, h } from 'hyperapp';
import * as actions from './actions';
import * as effects from './effects/index';
import * as loading from './helpers/loading';
import * as storyHelper from './helpers/story';
import * as filterStories from './helpers/filterStories';
import * as databaseService from './services/database';

import { layout } from './components/layout';
import { columns } from './components/columns';
import { storyContainerList } from './components/storyContainerList';
import { storyComments } from './components/storyComments';

const mount = () => {
  const database = databaseService.instance();

  return app({
    init: actions.Init(),

    view: state => {
      const mappedStories = state.ids
        .reduce((order, id) => [
          ...order,
          state.stories[id],
        ], []);

      const { storyFilter, storyType } = state;
      const stories = filterStories.filter(mappedStories, storyFilter);

      const now = Date.now();

      const storyList = h(storyContainerList, {
        items: stories,
        now,
        database,
      });


      if (!state.storyId) {
        return h(layout, { storyFilter, storyType }, storyList);
      }

      const story = state.stories[state.storyId];

      return h(layout, { storyFilter, storyType }, columns(null, [
        storyList,
        h(storyComments, { item: story, comments: state.comments, storyId: state.storyId, now, database }),
      ]));
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
