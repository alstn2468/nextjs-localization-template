import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { getObjectKeys, mergeEitherObjects } from '~/utils/object';

import { type Result } from './files';

function getTranslationKeyUnionTypes(keys: string[]) {
  return pipe(
    keys,
    A.reduce('', (acc, key) => acc + `\t| "${key}"\n`)
  );
}

function getTranslationKeyTypeFileText(keys: string[]) {
  return `/* eslint-disable */
    // @ts-ignore
    export {};
    declare global {
      type TransltaionKeys =
      ${getTranslationKeyUnionTypes(keys)}
    }
  `;
}

function generateKeyUnionTextFromFiles(readFileResults: Result) {
  return pipe(
    readFileResults,
    mergeEitherObjects,
    getObjectKeys,
    getTranslationKeyTypeFileText
  );
}

export { generateKeyUnionTextFromFiles };
