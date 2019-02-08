/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { LoopProtectionService } from './loop-protection.service';

describe('LoopProtectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoopProtectionService]
    });
  });

  function withLoopProtection(code: string) {
    return LoopProtectionService.loopBreaker + code;
  }

  it('should not modify if it does not contain loops', inject(
    [LoopProtectionService],
    (service: LoopProtectionService) => {
      expect(service.protect('file.ts', `if(true) console.log(153);`)).toEqual(
        `if(true) console.log(153);`
      );
    }
  ));

  it('should add loop protection to a simple loop with curlies.', inject(
    [LoopProtectionService],
    (service: LoopProtectionService) => {
      expect(
        service.protect('file.ts', `for(let x = 0;x<10,x){console.log(123)}`)
      ).toEqual(
        withLoopProtection(
          `for(let x = 0;x<10,x){loopBreaker();console.log(123)}`
        )
      );
    }
  ));
  it('should add loop protection and curlies to a simple loop without curlies. with multiple staments', inject(
    [LoopProtectionService],
    (service: LoopProtectionService) => {
      expect(
        service.protect(
          'file.ts',
          `for(let x = 0;x<10,x)console.log(123),console.log(1);console.log(2)`
        )
      ).toEqual(
        withLoopProtection(
          `for(let x = 0;x<10,x){loopBreaker();console.log(123),console.log(1);}console.log(2)`
        )
      );
    }
  ));
  it('should add loop protection and curlies to a simple loop without curlies, preserving spaces', inject(
    [LoopProtectionService],
    (service: LoopProtectionService) => {
      expect(
        service.protect('file.ts', `for(let x = 0;x<10,x)     console.log(123)`)
      ).toEqual(
        withLoopProtection(
          `for(let x = 0;x<10,x)     {loopBreaker();console.log(123)}`
        )
      );
    }
  ));

  it('should add loop protection to a simple loop with curlies and multiple statements', inject(
    [LoopProtectionService],
    (service: LoopProtectionService) => {
      expect(
        service.protect(
          'file.ts',
          `for(let x = 0;x<10,x){console.log(123);console.log(1)}`
        )
      ).toEqual(
        withLoopProtection(
          `for(let x = 0;x<10,x){loopBreaker();console.log(123);console.log(1)}`
        )
      );
    }
  ));

  it('should add loop protection to a simple while loop with curlies and multiple statements', inject(
    [LoopProtectionService],
    (service: LoopProtectionService) => {
      expect(service.protect('file.ts', `while(true)`)).toEqual(
        withLoopProtection(`while(true){loopBreaker();}`)
      );
    }
  ));
});
