// tslint:disable:max-line-length TODO: Clean up this file and remove this comment.
//  TODO: This should be done using require.context

import { Injectable } from '@angular/core';
import { createModuleTest } from './tests/createModuleTest';
import { createComponentTest } from './tests/createComponentTest';
import { createBootstrapTest } from './tests/bootstrapTest';
import { DiffFilesResolver } from '../libs/utils/src/lib/differ/diffFilesResolver';

declare const require;

const preloadedFiles = {
  'app.component.ts': require(`!raw-loader!./app.component.ts`),
  'app.module.ts': require('!raw-loader!./app.module.ts'),
  'app.html': require('!raw-loader!./app.html'),
  'main.ts': require('!raw-loader!./main.ts'),
  'style.css': require('!raw-loader!./style.css'),
  'video/video-item.ts': require('!raw-loader!./video/video-item.ts'),
  'api.service.ts': require('!raw-loader!./api.service.ts'),
  'material.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
  'search/search.component.html': require('!raw-loader!./search/search.component.html'),
  'search/search.component.ts': require('!raw-loader!./search/search.component.ts'),
  'upload/upload.component.html': require('!raw-loader!./upload/upload.component.html'),
  'upload/upload.component.ts': require('!raw-loader!./upload/upload.component.ts'),
  'video/video.service.ts': require('!raw-loader!./video/video.service.ts'),
  'video/video.component.html': require('!raw-loader!./video/video.component.html'),
  'video/video-materialized.component.html': require('!raw-loader!./video/video-materialized.component.html'),
  'video/video.index.html': require('!raw-loader!./video/video.index.html'),
  'video/video-wrapper.component.ts': require('!raw-loader!./video/video-wrapper.component.ts'),
  'video/video.component.ts': require('!raw-loader!./video/video.component.ts'),
  'thumbs/thumbs.component.ts': require('!raw-loader!./thumbs/thumbs.component.ts'),
  'thumbs/thumbs.html': require('!raw-loader!./thumbs/thumbs.html'),
  'toggle-panel/toggle-panel.html': require('!raw-loader!./toggle-panel/toggle-panel.html'),
  'toggle-panel/toggle-panel.component.ts': require('!raw-loader!./toggle-panel/toggle-panel.component.ts'),
  'wrapper.component.ts': require('!raw-loader!./wrapper.component.ts'),
  'context/context.component.ts': require('!raw-loader!./context/context.component.ts'),
  'context/context.service.ts': require('!raw-loader!./context/context.service.ts'),
  'context/context.html': require('!raw-loader!./context/context.html'),
  'typescript-intro/Codelab.ts': require('!raw-loader!./typescript-intro/Codelab.ts'),
  'typescript-intro/Main.ts': require('!raw-loader!./typescript-intro/Main.ts'),
  'typescript-intro/Guest.ts': require('!raw-loader!./typescript-intro/Guest.ts'),
  'fuzzy-pipe/fuzzy.pipe.ts': require('!raw-loader!./fuzzy-pipe/fuzzy.pipe.ts'),
  'tests/codelabTest.ts': require('!raw-loader!./tests/codelabTest.ts'),
  'tests/createComponentTest.ts': require('!raw-loader!./tests/createComponentTest.ts'),
  'tests/createModuleTest.ts': require('!raw-loader!./tests/createModuleTest.ts'),
  'tests/bootstrapTest.ts': require('!raw-loader!./tests/bootstrapTest.ts'),
  'tests/templatePageSetupTest.ts': require('!raw-loader!./tests/templatePageSetupTest.ts'),
  'tests/routerTest.ts': require('!raw-loader!./tests/routerTest.ts'),
  'tests/formsTest.ts': require('!raw-loader!./tests/formsTest.ts'),
  'tests/materialTest.ts': require('!raw-loader!./tests/materialTest.ts'),
  'tests/templateAddActionTest.ts': require('!raw-loader!./tests/templateAddActionTest.ts'),
  'tests/templateAllVideosTest.ts': require('!raw-loader!./tests/templateAllVideosTest.ts'),
  'tests/diInjectServiceTest.ts': require('!raw-loader!./tests/diInjectServiceTest.ts'),
  'tests/videoComponentCreateTest.ts': require('!raw-loader!./tests/videoComponentCreateTest.ts'),
  'tests/videoComponentUseTest.ts': require('!raw-loader!./tests/videoComponentUseTest.ts'),
  'tests/ThumbsComponentCreateTest.ts': require('!raw-loader!./tests/ThumbsComponentCreateTest.ts'),
  'tests/ThumbsComponentUseTest.ts': require('!raw-loader!./tests/ThumbsComponentUseTest.ts'),
  'tests/togglePanelComponentCreateTest.ts': require('!raw-loader!./tests/togglePanelComponentCreateTest.ts'),
  'tests/togglePanelComponentUseTest.ts': require('!raw-loader!./tests/togglePanelComponentUseTest.ts'),
  'tests/contextComponentUseTest.ts': require('!raw-loader!./tests/contextComponentUseTest.ts'),
  'tests/fuzzyPipeCreateTest.ts': require('!raw-loader!./tests/fuzzyPipeCreateTest.ts'),
  'tests/fuzzyPipeUseTest.ts': require('!raw-loader!./tests/fuzzyPipeUseTest.ts'),
  'thumbs.app.module.ts': require('!raw-loader!./thumbs.app.module.ts'),
  'video.app.module.ts': require('!raw-loader!./video.app.module.ts'),
  'toggle-panel.app.module.ts': require('!raw-loader!./toggle-panel.app.module.ts'),
  'index.html': '<base href="/assets/runner/"><my-app></my-app><div class="error"></div>'
  // 'index.html': '<my-thumbs></my-thumbs><my-wrapper></my-wrapper>'
};

const files = {
  appComponent: 'app.component.ts',
  appModule: 'app.module.ts',
  appHtml: 'app.html',
  main: 'main.ts',
  video_videoItem: 'video/video-item.ts',
  apiService: 'api.service.ts',
  search_search_component_html: 'search/search.component.html',
  search_search_component: 'search/search.component.ts',
  upload_upload_component_html: 'upload/upload.component.html',
  upload_upload_component: 'upload/upload.component.ts',
  video_videoService: 'video/video.service.ts',
  video_video_component_html: 'video/video.component.html',
  video_video_component: 'video/video.component.ts',
  video_video_wrapper_component: 'video/video-wrapper.component.ts',
  video_video_index_html: 'video/video.index.html',
  thumbs_thumbs_component: 'thumbs/thumbs.component.ts',
  thumbs_thumbs_html: 'thumbs/thumbs.html',
  toggle_panel_toggle_panel_html: 'toggle-panel/toggle-panel.html',
  toggle_panel_toggle_panel: 'toggle-panel/toggle-panel.component.ts',
  wrapperComponent: 'wrapper.component.ts',
  contextComponent: 'context/context.component.ts',
  context_context_html: 'context/context.html',
  contextService: 'context/context.service.ts',
  typescript_intro_Codelab_ts: 'typescript-intro/Codelab.ts',
  typescript_intro_Main_ts: 'typescript-intro/Main.ts',
  typescript_intro_Guest_ts: 'typescript-intro/Guest.ts',
  fuzzyPipe_fuzzyPipe: 'fuzzy-pipe/fuzzy.pipe.ts',
  test: 'tests/test.ts',
  indexHtml: 'index.html',
  style_css: 'style.css',
  material_css: 'material.css'
};


const fileOverrides = {
  'index.html': {
    videoComponentCreate: 'video/video.index.html'
  },
  'app.module.ts': {
    videoComponentCreate: 'video.app.module.ts',
    thumbsComponentCreate: 'thumbs.app.module.ts',
    togglePanelComponentCreate: 'toggle-panel.app.module.ts'
  },
  'tests/test.ts': {
    codelab: 'tests/codelabTest.ts',
    createComponent: 'tests/createComponentTest.ts',
    createModule: 'tests/createModuleTest.ts',
    bootstrap: 'tests/bootstrapTest.ts',
    templatePageSetup: 'tests/templatePageSetupTest.ts',
    templateAddAction: 'tests/templateAddActionTest.ts',
    templateAllVideos: 'tests/templateAllVideosTest.ts',
    diInjectService: 'tests/diInjectServiceTest.ts',
    videoComponentCreate: 'tests/videoComponentCreateTest.ts',
    videoComponentUse: 'tests/videoComponentUseTest.ts',
    thumbsComponentCreate: 'tests/ThumbsComponentCreateTest.ts',
    thumbsComponentUse: 'tests/ThumbsComponentUseTest.ts',
    togglePanelComponentCreate: 'tests/togglePanelComponentCreateTest.ts',
    togglePanelComponentUse: 'tests/togglePanelComponentUseTest.ts',
    contextComponentUse: 'tests/contextComponentUseTest.ts',
    fuzzyPipeCreate: 'tests/fuzzyPipeCreateTest.ts',
    fuzzyPipeUse: 'tests/fuzzyPipeUseTest.ts',
    router: 'tests/routerTest.ts',
    material: 'tests/materialTest.ts',
    forms: 'tests/formsTest.ts'
  },
  'video/video.component.html': {
    material: 'video/video-materialized.component.html',
    forms: 'video/video-materialized.component.html'
  }
};

const stageOverrides = {
  'main.ts': {
    createComponent: 'bootstrapSolved',
    createModule: 'bootstrapSolved',
  },
  'app.module.ts': {
    createComponent: 'bootstrapSolved'
  }
};


const stages: string[] = [
  'codelab',
  'createComponent',
  'createModule',
  'bootstrap',
  'templatePageSetup',
  'templateAddAction',
  'templateAllVideos',
  'diInjectService',
  'dataBinding',
  'videoComponentCreate',
  'videoComponentUse',
  'router',
  'material',
  'forms',
  'thumbsComponentCreate',
  'thumbsComponentUse',
  'togglePanelComponentCreate',
  'togglePanelComponentUse',
  'contextComponentUse',
  'fuzzyPipeCreate',
  'fuzzyPipeUse',
  'neverShow'
];

const diffFilesResolver = new DiffFilesResolver(preloadedFiles, stages, {
  file: fileOverrides,
  stage: stageOverrides
});

export interface CodelabConfigTemplate {
  name: string;
  id: string;
  defaultRunner: string;
  milestones: MilestoneConfigTemplate[];
}

export interface SlideTemplate {
  slide: true;
  name: string;
}

export interface ExerciseConfigTemplate {
  slide?: false;
  name: string;
  skipTests?: boolean;
  runner?: string;
  files: {
    exercise?: string[];
    reference?: string[];
    hidden?: string[];
    bootstrap?: string[];
    test?: string[];
  };
}

export interface MilestoneConfigTemplate {
  name: string;
  exercises: Array<ExerciseConfigTemplate | SlideTemplate>;
}

function patchATestWithAFunctionINAHackyWay(exercisesFiles, path, callback) {
  return exercisesFiles.map(file => {
    if (file.path === path) {
      file.execute = callback;
    }
    return file;
  });
}

export function convertExerciseToMap(exercise) {
  const convertFilesToMap = (prop = 'template') => (result, file) => {
    if (file[prop]) {
      result[file.path] = file[prop];

      if (file.execute) {
        result[file.path + '.execute'] = file.execute;
      }
    }
    return result;
  };

  const testBootstrap = exercise.files.find(({bootstrap, excludeFromTesting, template}) => template && bootstrap && !excludeFromTesting);
  const bootstrapFiles = exercise.files.find(({bootstrap, excludeFromTesting, template}) => template && bootstrap && excludeFromTesting);
  return {
    highlights: exercise.files.filter(({highlight}) => highlight).reduce((result, {highlight, path}) => (result[path] = highlight, result), {}),
    code: exercise.files.reduce(convertFilesToMap(), {}),
    codeSolutions: exercise.files.map(file => ((file.solution = file.solution || file.template), file)).reduce(convertFilesToMap('solution'), {}),
    test: exercise.files.filter(file => !file.excludeFromTesting).reduce(convertFilesToMap(), {}),
    bootstrap: bootstrapFiles && bootstrapFiles.moduleName,
    bootstrapTest: testBootstrap && testBootstrap.moduleName,
    file: exercise.files[0].path
  };
}

export const ng2tsConfig: /*TODO: fix the type to be: CodelabConfigTemplate */any = {
  name: 'Angular 101 Codelab (beta)',
  id: 'ng2ts',
  defaultRunner: 'Angular',
  milestones: [
    {
      name: 'Intro to TypeScript',
      exercises: [
        {
          name: 'Intro',
          slide: true
        },
        {
          name: 'TypeScript',
          runner: 'TypeScript',
          files: diffFilesResolver.resolve('codelab', {
            exercise: [
              files.typescript_intro_Codelab_ts,
              files.typescript_intro_Guest_ts,
              files.typescript_intro_Main_ts
            ],
            test: [files.test],
            bootstrap: [
              files.typescript_intro_Main_ts
            ]
          }),
        }
      ]
    },
    {
      name: 'Bootstrapping your app',
      exercises: [
        {
          name: 'Intro',
          slide: true
        },
        {
          name: 'Create a component',
          files: patchATestWithAFunctionINAHackyWay(diffFilesResolver.resolve('createComponent', {
            exercise: [files.appComponent],
            reference: [files.appModule, files.main, files.style_css, files.indexHtml],
            bootstrap: [files.main],
            test: [files.test],
          }), 'tests/test.ts', createComponentTest)
        },
        {
          name: 'Create a NgModule',
          files: patchATestWithAFunctionINAHackyWay(diffFilesResolver.resolve('createModule', {
            exercise: [files.appModule],
            reference: [files.appComponent],
            hidden: [files.main],
            test: [files.test],
            bootstrap: [files.main]
          }), 'tests/test.ts', createModuleTest)
        },
        {
          name: 'Bootstrap the module',
          skipTests: true,
          files: patchATestWithAFunctionINAHackyWay(diffFilesResolver.resolve('bootstrap', {
            exercise: [files.main],
            reference: [files.appComponent, files.appModule],
            test: [files.test],
            bootstrap: [files.main]
          }), 'tests/test.ts', createBootstrapTest)
        }
      ]
    },
    {
      name: 'Templates',
      exercises: [
        {
          name: 'Intro',
          slide: true
        },
        {
          name: 'Set up the page',
          files: diffFilesResolver.resolve('templatePageSetup', {
            exercise: [files.appHtml],
            reference: [files.appComponent, files.appModule, files.main, files.style_css, files.indexHtml],
            test: [files.test],
            bootstrap: [files.main]
          })
        }, {
          name: 'Add some action',
          files: diffFilesResolver.resolve('templateAddAction', {
            exercise: [files.appComponent, files.appHtml],
            reference: [files.appModule, files.main, files.video_videoItem, files.style_css, files.indexHtml],
            test: [files.test],
            bootstrap: [files.main],
          })
        },
        {
          name: 'Display all videos',
          files: diffFilesResolver.resolve('templateAllVideos', {
            exercise: [files.appComponent, files.appHtml],
            reference: [files.appModule, files.main, files.video_videoItem, files.style_css, files.indexHtml],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Dependency Injection',
      exercises: [
        {
          name: 'Intro',
          slide: true
        },
        {
          name: 'Service injection',
          files: diffFilesResolver.resolve('diInjectService', {
            exercise: [files.video_videoService, files.appModule, files.appComponent],
            reference: [
              files.appHtml, files.apiService, files.video_videoItem, files.main, files.style_css, files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    }
    ,
    {
      name: 'Component Tree',
      exercises: [
        {
          name: 'Intro',
          slide: true,
        },
        {
          name: 'Create VideoComponent',
          files: diffFilesResolver.resolve('videoComponentCreate', {
            exercise: [files.video_video_component, files.video_video_component_html],
            reference: [
              files.appModule,
              files.video_video_wrapper_component,
              files.video_videoService, files.appHtml,
              files.appComponent, files.video_videoItem,
              files.apiService, files.main, files.style_css, files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        },
        {
          name: 'Use VideoComponent',
          files: diffFilesResolver.resolve('videoComponentUse', {
            exercise: [files.appModule, files.appHtml],
            reference: [
              files.video_video_component_html, files.video_video_component, files.appComponent,
              files.video_videoService, files.video_videoItem, files.apiService, files.main, files.style_css,
              files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Routing',
      exercises: [
        {
          name: 'Router',
          files: diffFilesResolver.resolve('router', {
            exercise: [
              files.appModule,
              files.appHtml,
              files.search_search_component,
              files.search_search_component_html,
              files.upload_upload_component,
              files.upload_upload_component_html,
            ],
            reference: [
              files.video_video_component_html, files.video_video_component, files.appComponent,
              files.video_videoService, files.video_videoItem, files.apiService, files.main, files.style_css,
              files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Material',
      exercises: [
        {
          name: 'Material',
          files: diffFilesResolver.resolve('material', {
            exercise: [
              files.appModule,
              files.video_video_component_html,
              files.appHtml,
            ],
            reference: [
              files.video_video_component,
              files.appComponent,
              files.video_videoService,
              files.video_videoItem,
              files.apiService,
              files.main,
              files.style_css,
              files.indexHtml,
              files.search_search_component,
              files.search_search_component_html,
              files.upload_upload_component,
              files.upload_upload_component_html,
              files.material_css
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Forms',
      exercises: [
        {
          name: 'Forms',
          files: diffFilesResolver.resolve('forms', {
            exercise: [
              files.appModule,
              files.upload_upload_component_html,
              files.upload_upload_component,
            ],
            reference: [
              files.appHtml,
              files.search_search_component,
              files.search_search_component_html,
              files.video_video_component_html,
              files.video_video_component,
              files.appComponent,
              files.video_videoService,
              files.video_videoItem,
              files.apiService,
              files.main,
              files.style_css,
              files.indexHtml,
              files.material_css
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Custom events',
      exercises: [
        {
          name: 'Intro',
          slide: true
        },
        {
          name: 'Create ThumbsComponent',
          files: diffFilesResolver.resolve('thumbsComponentCreate', {
            exercise: [files.thumbs_thumbs_component, files.thumbs_thumbs_html],
            reference: [files.apiService, files.appModule, files.main, files.style_css, files.indexHtml],
            test: [files.test],
            bootstrap: [files.main]
          })
        },
        {
          name: 'Use ThumbsComponent',
          files: diffFilesResolver.resolve('thumbsComponentUse', {
            exercise: [files.video_video_component, files.video_video_component_html, files.appModule],
            reference: [
              files.thumbs_thumbs_component,
              files.thumbs_thumbs_html,
              files.appHtml,
              files.appComponent,
              files.video_videoService,
              files.video_videoItem,
              files.apiService,
              files.main,
              files.style_css,
              files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Content projection',
      exercises: [
        {
          name: 'Intro',
          slide: true
        },
        {
          name: 'Add TogglePanelComponent',
          files: diffFilesResolver.resolve('togglePanelComponentCreate', {
            exercise: [files.toggle_panel_toggle_panel, files.toggle_panel_toggle_panel_html],
            reference: [
              files.wrapperComponent, files.apiService, files.appModule, files.main, files.style_css, files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        },
        {
          name: 'Use TogglePanelComponent',
          files: diffFilesResolver.resolve('togglePanelComponentUse', {
            exercise: [files.video_video_component_html, files.appModule],
            reference: [
              files.video_video_component,
              files.toggle_panel_toggle_panel,
              files.toggle_panel_toggle_panel_html,
              files.thumbs_thumbs_component,
              files.thumbs_thumbs_html,
              files.appHtml,
              files.appComponent,
              files.video_videoService,
              files.video_videoItem,
              files.apiService,
              files.main,
              files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    },
    {
      name: 'Pipes (bonus)',
      exercises: [
        {
          name: 'Create a pipe',
          files: diffFilesResolver.resolve('fuzzyPipeCreate', {
            exercise: [files.fuzzyPipe_fuzzyPipe],
            test: [files.test],
            bootstrap: [files.main]
          })
        }, {
          name: 'Use the pipe',
          files: diffFilesResolver.resolve('fuzzyPipeUse', {
            exercise: [files.appModule, files.video_video_component_html],
            reference: [
              files.fuzzyPipe_fuzzyPipe,
              files.contextService,
              files.contextComponent,
              files.context_context_html,
              files.video_video_component,
              files.toggle_panel_toggle_panel,
              files.toggle_panel_toggle_panel_html,
              files.thumbs_thumbs_component,
              files.thumbs_thumbs_html,
              files.appHtml,
              files.appComponent,
              files.video_videoService,
              files.video_videoItem,
              files.apiService,
              files.main,
              files.indexHtml
            ],
            test: [files.test],
            bootstrap: [files.main]
          })
        }
      ]
    }
    ,
    {
      name: 'Survey',
      exercises: [
        {
          slide: true,
          name: 'All done!'
        }
      ]
    }
  ]
};

@Injectable()
export class Ng2TsExercises {
  getExercises(milestoneId: number, exerciseId: number): ExerciseConfigTemplate {
    return ng2tsConfig.milestones[milestoneId].exercises[exerciseId];
  }
}
