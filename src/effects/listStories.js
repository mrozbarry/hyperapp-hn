import * as loading from '../helpers/loading';

const ListStoriesFX = (dispatch, { database, storyId, ids, SetStory }) => {
  let cancel = false;
  let handle = null;

  const idList = storyId
    ? [storyId, ...ids]
    : ids;

  const load = () => {
    return idList.reduce((promise, id) => {
      if (cancel) return promise;

      return promise
        .then(() => database.item(id))
        .then((item) => {
          dispatch(SetStory, { id, story: loading.ok(item) })
        })
        .catch((err) => {
          console.log('Unable to load item', id, err);
          return dispatch(SetStory, { story: loading.err(err) })
        });
    }, Promise.resolve())
  };

  const tick = () => load().then(() => {
    handle = setTimeout(tick, 30000)
  });

  handle = setTimeout(() => {
    tick();
  }, 1);

  return () => {
    cancel = true;
    clearTimeout(handle);
  };
};

export const ListStories = (props) => [ListStoriesFX, props];

