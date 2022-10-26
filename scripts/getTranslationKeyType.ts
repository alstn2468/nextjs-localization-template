import A from 'fp-ts/lib/Array';
import E from 'fp-ts/lib/Either';
import R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/function';

import { type Result } from './readFiles';

function mergeEitherObjects(
  objects: E.Either<Error, Record<string, string>>[]
) {
  return pipe(
    objects,
    A.reduce<Result[number], Record<string, string>>({}, (acc, object) =>
      pipe(
        object,
        E.match(
          () => acc,
          (value) => ({ ...acc, ...value })
        )
      )
    )
  );
}

function getObjectKeys(object: Record<string, string>) {
  return R.keys(object);
}

function getTranslationKeyTypes(keys: string[]) {
  return pipe(
    keys,
    A.reduce('', (acc, key) => acc + `\t| "${key}"\n`)
  );
}

function getTranslationKeyTypeString(keys: string[]) {
  return `
    export {};
    declare global {
      type TransltaionKeys =
      ${getTranslationKeyTypes(keys)}
    }
  `;
}

function getTranslationKeyType(readFileResults: Result) {
  return pipe(
    readFileResults,
    mergeEitherObjects,
    getObjectKeys,
    getTranslationKeyTypeString
  );
}

export default getTranslationKeyType;
