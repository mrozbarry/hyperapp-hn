const ListFX = (dispatch, { storyType, SetStoryIDs, database }) => {
  console.log('ListFX', {
    storyType,
    SetStoryIDs,
    database,
  });
  let handle = null;
  const onIDs = (ids) => {
    clearTimeout(handle);
    handle = setTimeout(() => {
      dispatch(SetStoryIDs, { ids });
    }, 250);
  };

  return database.list[storyType](onIDs);
};

export const List = (props) => [ListFX, props];
