import path from 'path';
import projPath from 'proj-path';
import gitignoreClean from 'gitignore-clean';

export default async function clean() {
  await gitignoreClean(path.resolve(projPath(), '.gitignore'), ['node_modules/']);
}
