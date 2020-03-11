import { h } from 'hyperapp';
import * as actions from '../actions';

const inputDecode = e => e.target.value;
const selectDecode = e => {
  e.preventDefault();
  return e.target.value;
};

export const layout = ({ storyFilter, storyType, columns }, children) => h('section', { class: 'layout' }, [
  h('nav', { class: 'layout--nav' }, [
    h('div', { class: 'layout--nav-item' }, [
      'Hyperapp',
      ' ',
      h('strong', null, '[HN]'),

    ]),
    h('div', { class: 'layout--nav-item' }, [
      h(
        'input',
        {
          class: 'layout--nav-filter-element layout--nav-filter',
          placeholder: 'Filter Stories',
          type: 'text',
          value: storyFilter,
          oninput: [actions.StoryFilterInput, inputDecode],
        }
      ),
      h(
        'select',
        {
          class: 'layout--nav-filter-element layout--nav-stories',
          onchange: [actions.SetStoryType, selectDecode],
          value: storyType,
        },
        ['top', 'best', 'new'].map((type) => (
          h('option', { value: type }, type)
        )),
      ),
    ]),
  ]),
  h(
    'section',
    {
      class: 'layout--content',
      style: {
        gridTemplateColumns: columns.join(' '),
      },
    },
    children,
  ),
]);
