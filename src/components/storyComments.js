import { h } from 'hyperapp';
import { container } from './container';
import { singleStory } from './singleStory';
import { commentThread } from './commentThread';
import * as actions from '../actions';
import * as loading from '../helpers/loading';

export const storyComments = ({ item, now, comments, storyId, database }, children) => {
  const kids = loading.result(item, {
    [loading.OK]: story => story.kids,
  }, () => []) || [];

  const childComments = kids.map(id => comments[id]);

  return h(
    container,
    {
      style: {
        backgroundColor: 'white',
        flex: 1,
        padding: '1rem',
      }
    },
    [
      h(
        'header',
        {
          style: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          },
        },
        [
          h('button', {
            type: 'button',
            onclick: [
              actions.ShowComments,
              { id: null },
            ],
            style: {
              marginRight: '2rem',
              fontSize: '1.5rem',
            },
          }, '←'),
          h(singleStory, { item, now, database }),
        ],
      ),

      h('hr'),

      childComments.length > 0
        ? h(commentThread, { parent: item, comments, now, database })
        : h('strong', null, 'No comments'),
    ]
  );
};

