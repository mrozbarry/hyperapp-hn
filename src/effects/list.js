const ListFX = (dispatch, { database, storyType, SetStoryIDs }) => {
  return database.list[storyType]((ids) => {
    dispatch(SetStoryIDs, { ids, database });
  });
};

export const List = (props) => [ListFX, props];
