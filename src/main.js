import { app, h } from 'hyperapp';
import withRouter from '@mrbarrysoftware/hyperapp-router';
//import withDebug from 'hyperapp-debug';
import * as actions from './actions';
import * as effects from './effects/index';
import * as loading from './helpers/loading';
import * as filterStories from './helpers/filterStories';
import * as databaseService from './services/database';
import routes from './routes';

import { layout } from './components/layout';
import { stories } from './components/stories';
import { storyComments } from './components/storyComments';

const mapStories = ({ ids, items }) => ids
  .reduce((order, id, rank) => [
    ...order,
    loading.augment(items[id], (s) => ({ ...(s || {}), rank: rank + 1 })),
  ], []);

const mount = () => {
  const database = databaseService.instance();

  return withRouter(app)({
    router: {
      routes,
    },

    init: actions.Init(),

    view: state => {
      const now = Date.now();

      const mappedStories = mapStories(state);
      const { storyFilter, storyType, storyId } = state;
      const story = state.items[state.storyId];

      const visibleStories= filterStories.filter(mappedStories, storyFilter);

      return h(
        layout,
        {
          storyFilter,
          storyType,
          columns: state.storyId ? ['40%', '60%'] : ['100%', 0],
        },
        [
          
          h(stories, {
            items: visibleStories,
            now,
            storyId,
            storyType: state.storyType,
            database,
          }),

          state.storyId && h(
            storyComments,
            {
              item: story,
              comments: state.comments,
              storyId,
              now,
              expandedComments: state.expandedComments,
            }
          ),
        ],
      );
    },

    subscriptions: state => {
      return [ 
        effects.List({
          storyType: state.storyType,
          SetStoryIDs: actions.InitializeStories,
          database,
        }),

        effects.ListStories({
          ids: state.ids,
          storyId: state.storyId,
          SetStory: actions.SetStory,
          database,
        }),

        state.storyId && effects.ListComments({
          storyId: state.storyId,
          SetComment: actions.SetComment,
          database,
        }),

      ];
    },

    node: document.getElementById('app'),
  });
};

mount();
