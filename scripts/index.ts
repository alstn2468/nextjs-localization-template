import { pipe } from 'fp-ts/lib/function';
import { log } from 'fp-ts/lib/Console';

import { getTranslationFolder, readFiles } from './files';
import { getTranslationKeyType } from './generate';

function run() {
  return pipe(
    getTranslationFolder(import.meta.url),
    readFiles,
    getTranslationKeyType,
    log
  )();
}

run();
