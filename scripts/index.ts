import url from 'url';
import path from 'path';
import { pipe } from 'fp-ts/lib/function';
import { log } from 'fp-ts/lib/Console';

import readFiles from './readFiles';
import getTranslationKeyType from './getTranslationKeyType';

function getTranslationFolder(relativePath: string = '../translations') {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  return path.join(__dirname, relativePath);
}

function run() {
  return pipe(getTranslationFolder(), readFiles, getTranslationKeyType, log)();
}

run();
