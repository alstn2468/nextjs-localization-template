import { pipe } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/Array';
import {
  getFileNames,
  getTranslationFolderPath,
  readTranslationFileByPredicate,
} from '~/scripts/files';

function getAllLocales() {
  return pipe(getTranslationFolderPath(import.meta.url), getFileNames);
}

function getAllPaths() {
  return pipe(
    getAllLocales(),
    map((fileName) => ({ params: { slug: fileName } }))
  );
}

function getTranslations(locale: string) {
  return readTranslationFileByPredicate(
    getTranslationFolderPath(import.meta.url),
    (filePath) => filePath.includes(locale)
  );
}

export { getAllLocales, getAllPaths, getTranslations };
