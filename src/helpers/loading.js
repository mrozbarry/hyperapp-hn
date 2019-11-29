export const LOADING = 'loading';
export const OK = 'ok';
export const ERR = 'err';

export const start = (partial = null) => [LOADING, partial];
export const ok = (data) => [OK, data];
export const err = (error) => [ERR, error];

export const isOk = item => item && item[0] === OK;
export const isLoading = item => item && item[0] === LOADING;
export const isNotOk = item => !item || item[0] !== OK;

export const result = (item, callbacks, fallback) => {
  const [status, data] = (item || start());
  const callback = callbacks[status] || fallback;
  if (!callback) {
    return null;
  }
  return callback(data);
};

export const unwrap = (item, fallback) => {
  const v = result(item, {}, (value) => value)
  return v || fallback;
};
