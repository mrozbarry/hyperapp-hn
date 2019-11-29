import firebase from 'firebase/app';
import 'firebase/database';

export const instance = () => {
  const app = firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com',
  });
  const database = app.database();

  const listen = (path, callback) => {
    const ref = database.ref(`/v0/${path}`);
    const internalCallback = ref.on('value', (snapshot) => {
      callback(snapshot.val());
    });
    return () => ref.off('value', internalCallback);
  };

  const makeListOf = (path) => {
    return (callback) => {
      return listen(path, callback);
    };
  }

  return {
    list: {
      top: makeListOf('topstories'),
      new: makeListOf('newstories'),
      best: makeListOf('beststories'),
    },
    item: (id, callback) => {
      const ref = database.ref(`/v0/item/${id}`);

      return new Promise((resolve) => {
        ref.once('value', (snapshot) => {
          resolve(snapshot.val());
        });
      });
    },
    watch: (ids, callback) => {
      const cancels = ids.map((id) => listen(`/v0/item/${id}`, callback));
      return () => {
        for(const cancel of cancels) {
          cancel();
        }
      };
    },
  };
};

