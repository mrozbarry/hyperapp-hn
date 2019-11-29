import * as loading from '../helpers/loading';

const CommentsFX = (dispatch, { database, ids, SetComments }) => {
  ids.reduce((promise, id) => {
    return promise
      .then((collection) => (
        database.item(id)
          .then((comment) => ({ ...collection, [id]: loading.ok(comment) }))
      ));
  }, Promise.resolve({}))
    .then((comments) => {
      dispatch(SetComments, { comments, database });
    });
};

export const Comments = (props) => [CommentsFX, props];
