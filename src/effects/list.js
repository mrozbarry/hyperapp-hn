const ListFX = (dispatch, { storyType, SetStoryIDs, database }) => {
  const onIDs = (ids) => {
    dispatch(SetStoryIDs, { ids });
  };

  return database.list[storyType](onIDs);
};

export const List = (props) => [ListFX, props];
