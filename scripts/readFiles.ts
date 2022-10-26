import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { flow, identity, pipe } from 'fp-ts/lib/function';

const supportedExtension = ['yml', 'yaml', 'json'] as const;
type SupportedExtension = typeof supportedExtension[number];

function isDirectory(dirPath: string) {
  return fs.lstatSync(dirPath).isDirectory();
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

export default readFiles;
