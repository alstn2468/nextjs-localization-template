import { pipe } from 'fp-ts/lib/function';

import {
  getDestinationPath,
  getTranslationFolderPath,
  readTranslationFiles,
  writeFile,
} from './files';
import { generateKeyUnionTextFromFiles } from './generate';

pipe(
  getTranslationFolderPath(import.meta.url),
  readTranslationFiles,
  generateKeyUnionTextFromFiles,
  writeFile(
    getDestinationPath(import.meta.url, '../__generated__/translation.d.ts')
  )
);
