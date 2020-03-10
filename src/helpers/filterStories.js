import * as loading from './loading';

const makeFilter = (storyFilter) => {
  const checkValueOfStory = (story, key, text) => `${(story[key] || '')}`.toLowerCase().includes(text);

  const makeKeyValueMatcher = (text) => {
    const [key, value] = text.split(':');
    return (story) => checkValueOfStory(story, key, value);
  };

  const makeMatcher = (text) => {
    return text.indexOf(':') > 0
      ? makeKeyValueMatcher(text)
      : (story) => (
        checkValueOfStory(story, 'by', text)
        || checkValueOfStory(story, 'text', text)
        || checkValueOfStory(story, 'title', text)
        || checkValueOfStory(story, 'url', text)
        || checkValueOfStory(story, 'type', text)
      );
  };

  const makeIncludeFilter = (text) => {
    return makeMatcher(text);
  };

  const makeExcludeFilter = (text) => {
    return (value) => !makeMatcher(text)(value);
  };

  const steps = storyFilter
    .split(' ')
    .filter(Boolean)
    .map((token) => (
      token[0] === '-'
        ? makeExcludeFilter(token.slice(1))
        : makeIncludeFilter(token)
    ));

  return (story) => steps.every(step => step(story));
};

export const filter = (stories, storyFilter) => {
  if (!storyFilter) return stories;

  const matcher = makeFilter(storyFilter.toLowerCase());

  return stories
    .filter(loading.isOk)
    .map(story => loading.unwrap(story, {}))
    .filter(matcher)
    .map(loading.ok);
};
