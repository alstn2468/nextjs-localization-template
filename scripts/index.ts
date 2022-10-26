import path from 'path';
import url from 'url';
import { pipe } from 'fp-ts/lib/function';
import { log } from 'fp-ts/lib/Console';

import readFiles from './readFiles';

function getTranslationFolder(relativePath: string = '../translations') {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  return path.join(__dirname, relativePath);
}

function run() {
  return pipe(getTranslationFolder(), readFiles, log)();
}

run();
