(module
  (import (global $rowSize i32))

  (func $getIndex (param $x i32) (param $y i32) (result i32)
      (local.get $x)

      (local.get $y)
      global.get $rowSize
      i32.mul

      i32.add

      (i32.const 4)
      i32.mul
  )


 (func $storeCell (param $x i32) (param $value i32)
         local.get $x
         global.get $step
         call $getIndex

         local.get $value

         i32.store
 )

(func $getCellScore (param $x i32)  (result i32)
    local.get $x
    i32.const 1
    i32.sub
    call $loadPreviousCell

    local.get $x
    call $loadPreviousCell

    local.get $x
    i32.const 1
    i32.add
    call $loadPreviousCell

    call $shift
  )

  (func $rotate (param $x i32) (result i32)
    global.get $rowSize
    local.get $x
    i32.add

    global.get $rowSize

    i32.rem_s
  )

  (func $loadPreviousCell (param $x i32) (result i32)
    local.get $x

    global.get $step
    (i32.const 1)
    i32.sub

    call $loadCell
  )

  (func $shift (param $a i32) (param $b i32) (param $c i32)  (result i32)
    local.get $a
    (i32.const 4)
    i32.mul

    local.get $b
    (i32.const 2)
    i32.mul

    local.get $c

    i32.add
    i32.add
  )

  (func $loadCell (param $x i32) (param $y i32) (result i32)
      (local.get $x)
      call $rotate

      (local.get $y)

      call $getIndex

      i32.load
  )
)
