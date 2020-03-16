import { h } from 'hyperapp';
import * as actions from '../actions';

const inputDecode = e => e.target.value;
const selectDecode = e => {
  e.preventDefault();
  return e.target.value;
};

export const layout = ({ storyFilter, storyType, columns }, children) => h('section', { class: 'layout' }, [
  h('nav', { class: 'layout--nav' }, [
    h('div', { class: 'layout--nav-item', style: { gridArea: 'logo', justifyContent: 'flex-start' } }, [
      'Hyperapp',
      ' ',
      h('strong', null, '[HN]'),

    ]),
    h('div', { class: 'layout--nav-item', style: { gridArea: 'filter' } }, [
      h(
        'input',
        {
          class: 'layout--nav-item-filter-input',
          placeholder: 'Filter Stories',
          type: 'text',
          value: storyFilter,
          oninput: [actions.StoryFilterInput, inputDecode],
        }
      ),
      ['Top', 'Best', 'New'].map(label => {
        const value = label.toLowerCase();
        return h('button', {
          type: 'button',
          class: {
            'layout--nav-story-type': true,
            'layout--nav-story-type--selected': value === storyType,
          },
          onclick: [actions.Navigate, { href: `/${value}` }],
        }, label)
      }),
    ]),
    h('div', { class: 'layout--nav-item', style: { justifyContent: 'flex-end', gridArea: 'github' } }, [
      h('a', { href: 'https://github.com/mrozbarry/hyperapp-hn', target: '_blank', class: 'layout--nav-item-github' }, 'Source on github'),
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
