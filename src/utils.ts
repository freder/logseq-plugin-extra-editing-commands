import * as R from 'ramda';


export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);
