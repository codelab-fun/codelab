 (module
 (import "config" "rowSize" (global $rowSize i32))
 (import "config" "log" (func $log (param i32)))
 (type $return_i32 (func (result i32)))
 (memory 1)
 (table 8 funcref)
 (elem (i32.const 0)
    $create ;; 000
    $create ;; 001
    $remove ;; 010
    $remove ;; 011
    $create ;; 100
    $create ;; 101
    $remove ;; 110
    $remove ;; 111
 )

  (func $create (result i32)
    i32.const 1)
  (func $remove (result i32)
    i32.const 0)

 (export "memory" (memory 0))
  (global $step (export "step") (mut i32) (i32.const 1))

  (func $getIndex (param $x i32) (param $y i32) (result i32)
    local.get $y
    global.get $rowSize
    i32.mul
    local.get $x
    i32.add
    i32.const 4
    i32.mul
  )

  (func $getCurrentIndex (param $x i32) (result i32)
    local.get $x
    global.get $step
    call $getIndex
  )

 (func $getPreviousIndex (param $x i32) (result i32)
    local.get $x
    global.get $step
    i32.const 1
    i32.sub
    call $getIndex
  )

  (func $rotate (param $x i32) (result i32)
    global.get $rowSize
    local.get $x
    i32.add
    global.get $rowSize
    i32.rem_s
  )

  (func $calcNextState (param $x i32) (result i32) (local $a i32)
    local.get $x
    i32.const 1
    i32.sub
    call $rotate
    call $getPreviousIndex
    i32.load
    i32.const 2
    i32.shl


    local.get $x
    call $rotate
    call $getPreviousIndex
    i32.load
    i32.const 1
    i32.shl

    local.get $x
    i32.const 1
    i32.add
    call $rotate
    call $getPreviousIndex
    i32.load
    i32.add
    i32.add

    local.tee $a
    call $log
    local.get $a

    (call_indirect (type $return_i32))






  )



  (func $evolve (param $steps i32) (local $index i32)
    block
    loop
          (call $evolveSingle)

          ;; $index++
          local.get $index
          i32.const 1
          i32.add
          local.tee $index

          (br_if 1 (i32.eq (local.get $steps) (local.get $index)))
          drop
          br 0
        end
      end
  )
  (func $evolveSingle (result i32) (local $index i32)
      block
        loop
          ;; color up the cell
          local.get $index
          call $getCurrentIndex
          local.get $index
          call $calcNextState

          i32.store

          ;; $index++
          local.get $index
          i32.const 1
          i32.add
          local.tee $index

          (br_if 1 (i32.eq (global.get $rowSize) (local.get $index)))
          drop
          br 0
        end
      end

      global.get $step
      i32.const 1
      i32.add
      global.set $step

      local.get $index
    )
  (export "evolve" (func $evolve))
)
