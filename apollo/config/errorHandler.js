import * as _ from 'lodash';

export default (err) => {
  const { networkError, graphQLErrors } = err;

  let errors;
  if (networkError) {
    const { errors: e } = networkError.result;
    errors = e;
  } else if (graphQLErrors) {
    errors = graphQLErrors;
  } else {
    errors = [err];
  }

  return _.reduce(
    errors,
    (r, v, k) => {
      r[k] = v.message;
      return r;
    },
    [],
  );
};
