import * as loading from '../helpers/loading';

const WatchItemsFx = (dispatch, { database, OnUpdate, stringifiedIds }) => {
  const ids = JSON.parse(stringifiedIds);
  return database.watch(ids, (thing) => {
    dispatch(OnUpdate, { item: loading.ok(thing), id: thing.id });
  });
};

export const WatchItems = props => [WatchItemsFx, props];
