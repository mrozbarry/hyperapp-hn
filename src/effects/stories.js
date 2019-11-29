import * as loading from '../helpers/loading';

const StoriesFX = (dispatch, { database, ids, SetStories, size }) => {
  if (ids.length === 0) {
    return;
  }

  ids.slice(0, size).reduce((promise, id) => {
    return promise
      .then((collection) => (
        database.item(id)
          .then((story) => ({ ...collection, [id]: loading.ok(story) }))
      ));
  }, Promise.resolve({}))
    .then((stories) => {
      dispatch(SetStories, { stories, database, ids: ids.slice(size), size });
    });
};

export const Stories = (props) => [StoriesFX, props];
