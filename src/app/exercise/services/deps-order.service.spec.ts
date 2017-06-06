import { inject, TestBed } from '@angular/core/testing';
import { DepsService } from './deps-order.service';


const deps = {
  componentA: {
    path: 'component.ts',
    code: 'import {a} from "./depA.ts"',
    template: ''
  },
  componentABC: {
    path: 'component.ts',
    code: 'import {a} from "./depA.ts";import {a} from "./depB.ts";import {a} from "./depC.ts";',
    template: ''
  },
  depA: {
    path: 'depA.ts',
    code: 'import {Component} from "@angular/core"',
    template: ''
  },
  depB: {
    path: 'depB.ts',
    code: 'import {Component} from "@angular/core"',
    template: ''
  },
  depC: {
    path: 'depC.ts',
    code: 'import {Component} from "@angular/core"',
    template: ''
  },
  depAB: {
    path: 'depAB.ts',
    code: 'import {a} from "./depA.ts";import {a} from "./depB.ts";',
    template: ''
  },
  depAB_C: {
    path: 'depAB_C.ts',
    code: 'import {a} from "./depAB.ts";import {a} from "./depC.ts";',
    template: ''
  },
  depX_A: {
    path: 'x/a.ts',
    code: 'import {a} from "../depA.ts";',
    template: ''
  }


};
describe('DepsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepsService]
    });
  });

  describe('Normalizing file name', () => {
    it('should normalize simple path', () => {
      expect(DepsService.normalizePathRelativeToFile('file.ts', './a.ts')).toEqual('a.ts');
    });

    it('should normalize simple path in a folder', () => {
      expect(DepsService.normalizePathRelativeToFile('folder/file.ts', './a.ts')).toEqual('folder/a.ts');
    });
    it('should normalize simple path in a folder with one level up', () => {
      expect(DepsService.normalizePathRelativeToFile('folder/file.ts', '../a.ts')).toEqual('a.ts');
    });

    it('should normalize simple path in a folder with multiple levels up', () => {
      expect(DepsService.normalizePathRelativeToFile('folder/a/b/c/file.ts', '../../../a.ts')).toEqual('folder/a.ts');
    });
  });

  it('should order two simple files', inject([DepsService], (service: DepsService) => {
    expect(service.order([deps.componentA, deps.depA])).toEqual([deps.depA, deps.componentA]);
  }));

  it('should order files with multiple but 1-level deps ', inject([DepsService], (service: DepsService) => {
    expect(service.order([deps.depA, deps.componentABC, deps.depB, deps.depC]))
      .toEqual([deps.depA, deps.depB, deps.depC, deps.componentABC]);
  }));

  it('should order files with multiple but 1-level deps ', inject([DepsService], (service: DepsService) => {
    expect(service.order([deps.depB, deps.depC, deps.depAB_C, deps.depAB, deps.depA]))
      .toEqual([deps.depB, deps.depC, deps.depA, deps.depAB, deps.depAB_C]);
  }));

  it('should order files if they are in a folder', inject([DepsService], (service: DepsService) => {
    expect(service.order([deps.depX_A, deps.depA])).toEqual([deps.depA, deps.depX_A]);
  }));
});
