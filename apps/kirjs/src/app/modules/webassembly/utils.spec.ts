import { extractFunction } from './utils';

describe('SyncComponent', () => {
  it('should create', () => {
    expect(
      extractFunction(
        'getIndex',
        ` (export "memory" (memory 0))
  (global $step (export "step") (mut i32) (i32.const 1))

  (func $getIndex (param $x i32) (param $y i32) (result i32)
    (i32.mul
        (i32.const 4)
        (i32.add
            (local.get $x)
            (i32.mul
                (local.get $y)
                (global.get $rowSize))))
  )
`
      )
    ).toBeTruthy();
  });
});
