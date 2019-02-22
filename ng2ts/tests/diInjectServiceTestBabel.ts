import { isDecorator, isIdentifier, isObjectProperty } from 'babel-types';
import { MiniTsQuery, tsAstTestSuite } from '../../apps/codelab/src/app/components/babel-test-runner/babel-helpers';

const tests = [
  {
    title: `@@addIjectableDecoraterToClass`,
    file: 'video/video.service.ts',
    condition(ast: MiniTsQuery) {
      return ast.hasDecorator('Injectable');
    }
  },
  {
    title: `@@addVideoServiceToNgModule`,
    file: 'app.module.ts',
    condition(ast: MiniTsQuery) {
      return ast.hasProvider('VideoService');
    }
  },
  {
    title: `@@getRidOfFakeVideos`,
    file: 'app.component.ts',
    condition(ast: MiniTsQuery) {
      return !ast.hasVariableDeclaration('FAKE_VIDEOS');
    }
  },
  {
    title: `@@injectVideoService`,
    file: 'app.component.ts',
    condition(ast: MiniTsQuery) {
      return ast.hasConstructorParam('videoService', 'VideoService');
    }
  },
];


export const createDITest = tsAstTestSuite(tests);
