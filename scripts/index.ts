import { pipe } from 'fp-ts/lib/function';

import {
  getDestinationPath,
  getTranslationFolderPath,
  readFiles,
  writeFile,
} from './files';
import { getTranslationKeyType } from './generate';

pipe(
  getTranslationFolderPath(import.meta.url),
  readFiles,
  getTranslationKeyType,
  writeFile(
    getDestinationPath(import.meta.url, '../__generated__/translation.d.ts')
  )
);
