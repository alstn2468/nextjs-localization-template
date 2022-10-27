import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { identity, pipe } from 'fp-ts/lib/function';
import { type Predicate } from 'fp-ts/lib/Predicate';

const supportedExtension = ['yml', 'yaml', 'json'] as const;
type SupportedExtension = typeof supportedExtension[number];

function isDirectory(dirPath: string) {
  return fs.lstatSync(dirPath).isDirectory();
}

function getFileName(filePath: string, extension?: string) {
  return path.basename(filePath, extension).replace(/[^a-zA-Z ]/g, '');
}

function getFileExtension(filePath: string) {
  return path.extname(filePath).substring(1);
}

function isSupportedExtension(ext: string) {
  return (supportedExtension as unknown as string[]).includes(ext);
}

function getFilePathArrayFromDirPath(dirPath: string): O.Option<string[]> {
  if (!isDirectory(dirPath)) {
    return O.none;
  }
  const filePathArray = fs.readdirSync(dirPath, { encoding: 'utf-8' });
  return O.some(filePathArray);
}

function getFilePathWithExtension(dirPath: string) {
  return pipe(
    dirPath,
    getFilePathArrayFromDirPath,
    O.match(() => [], identity),
    (filePathArray) =>
      A.zipWith(
        filePathArray,
        A.map(getFileExtension)(filePathArray),
        (filePath, ext) => ({ filePath, ext })
      )
  );
}

function getSupportedFilePathsWithExtension(dirPath: string) {
  return pipe(
    dirPath,
    getFilePathWithExtension,
    A.filter(({ ext }) => isSupportedExtension(ext))
  ) as {
    filePath: string;
    ext: SupportedExtension;
  }[];
}

function getParserByExt(ext: SupportedExtension) {
  if (ext === 'json') {
    return JSON.parse;
  }
  if (ext === 'yaml' || ext === 'yml') {
    return yaml.load;
  }
  throw new Error(`⚠️ Unsupported file extension ${ext}`);
}

function readFileByExtension(file: {
  filePath: string;
  ext: SupportedExtension;
}) {
  const { filePath, ext } = file;
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const parser = getParserByExt(ext);
  return E.tryCatch<Error, Record<string, string>>(
    () => parser(content),
    (e) => (e instanceof Error ? e : new Error('Unknown Error'))
  );
}

function readFileByPredicate(dirPath: string, predicate: Predicate<string>) {
  return pipe(
    dirPath,
    getSupportedFilePathsWithExtension,
    A.filter(({ filePath }) => predicate(filePath)),
    A.last,
    E.fromOption(() => new Error('Error: files.ts readFileByPredicate something wrong.')),
    E.chain(({ filePath, ext }) => readFileByExtension({
      filePath: path.join(dirPath, filePath),
      ext,
    })),
  );
}

function readFiles(dirPath: string) {
  return pipe(
    dirPath,
    getSupportedFilePathsWithExtension,
    A.map(({ filePath, ext }) =>
      readFileByExtension({
        filePath: path.join(dirPath, filePath),
        ext,
      })
    )
  );
}

function getFileNames(dirPath: string) {
  return pipe(
    dirPath,
    getSupportedFilePathsWithExtension,
    A.map(({ filePath, ext }) => getFileName(filePath, ext)),
  );
}

function getDirName(metaUrl: string) {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
}

function getTranslationFolder(metaUrl: string, relativePath = '../translations') {
  return path.join(getDirName(metaUrl), relativePath);
}

type Result = ReturnType<typeof readFiles>;

export {
  type Result,
  readFiles,
  readFileByPredicate,
  getFileNames,
  getTranslationFolder,
};
