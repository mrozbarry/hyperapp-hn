import * as loading from './loading';

const recursiveGet = (object, path, defaultValue) => {
  if (typeof object === 'undefined' || object === null) {
    return defaultValue;
  }
  const key = path[0];
  if (!key) {
    return typeof object !== 'undefined'
      ? object
      : defaultValue
  }
  return recursiveGet(object[key], path.slice(1), defaultValue);
};

export const get = (story, path, defaultValue) => loading.result(story, {
  [loading.OK]: s => recursiveGet(s, path.split('.'), defaultValue),
}, (partial) => recursiveGet(partial, path.split('.'), defaultValue));

export const getAllCommentIds = (kids, comments) => {
  if (!kids) {
    return [];
  }

  return kids.reduce((ids, kidId) => {
    const comment = loading.unwrap(comments[kidId], { kids: [] });
    return [...ids, kidId, ...getAllCommentIds(comment.kids, comments)];
  }, []);
}
