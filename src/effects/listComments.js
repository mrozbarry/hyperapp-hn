import * as loading from '../helpers/loading';

const ListCommentsFX = (dispatch, {
  storyId,
  database,
  SetComment,
}) => {
  let handle = null;
  let cancel = false;

  const loadComments = (id) => {
    return database.item(id)
      .then((comment) => {
        dispatch(SetComment, {
          id,
          comment: loading.ok(comment),
        });

        const kids = cancel
          ? []
          : (comment.kids || []);

        return Promise.all(
          kids.map(loadComments),
        );
      })
      .catch((err) => {
        console.warn('Unable to load item', { id }, err);
      });
  };

  const loadStory = () => {
    return database.item(storyId)
      .then((story) => {
        return Promise.all(
          story.kids.map(loadComments),
        );
      })
      .then(() => {
        handle = setTimeout(loadStory, 30000);
      });
  };

  loadStory();

  return () => {
    cancel = true;
    clearTimeout(handle);
  };
};

export const ListComments = props => [ListCommentsFX, props];
