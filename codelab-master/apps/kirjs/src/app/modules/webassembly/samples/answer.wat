(module
  (import "config" "rowSize" (global $rowSize i32))
  (memory 1)
  (export "memory" (memory 0))

  (table 8 anyfunc)

  (func $enable (result i32)
    (i32.const 1)
  )

  (func $disable (result i32)
    (i32.const 0)
  )

  (elem (i32.const 0)
    $enable ;; 000
    $enable ;; 001
    $enable ;; 010
    $enable ;; 011
    $enable ;; 100
    $enable ;; 101
    $enable ;; 110
    $enable ;; 111
  )

  (type $return_i32 (func (result i32)))


  (global $step (export "step") (mut i32) (i32.const 1))




  (func $rotate (param $x i32) (result i32)
    local.get $x
    global.get $rowSize
    i32.add

    global.get $rowSize

    i32.rem_s
  )

  (func $getIndex (param $x i32) (param $y i32) (result i32)
      local.get $x

      local.get $y
      global.get $rowSize
      i32.mul

      i32.add
  )

  (func $loadCell (param $x i32) (param $y i32) (result i32)
        (local.get $x)
        call $rotate

        (local.get $y)

        call $getIndex
        i32.const 4
        i32.mul

        i32.load
    )

  (func $storeCell (param $x i32) (param $value i32)
         local.get $x
         global.get $step
         call $getIndex

         i32.const 4
         i32.mul

         local.get $value

         i32.store
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



  (func $loadPreviousCell (param $x i32) (result i32)
    local.get $x

    global.get $step
    (i32.const 1)
    i32.sub

    call $loadCell
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



  (func $evolveCell (param $x i32)
    local.get $x


    local.get $x
    call $getCellScore
    call_indirect (type $return_i32)

    call $storeCell
  )



  (func $evolveRow (local $i i32)
    block
    loop
      local.get $i
      call $evolveCell

      local.get $i
      (i32.const 1)
      i32.add
      local.tee $i

      global.get $rowSize
      i32.eq

      br_if 1
      br 0
    end
    end
  )



  (func $evolve (export "evolve") (param $steps i32) (local $i i32)
   block
    loop
      call $evolveRow
      global.get $step
      i32.const 1
      i32.add
      global.set $step

      local.get $i
      (i32.const 1)
      i32.add
      tee_local $i


      local.get $steps
      i32.eq

      br_if 1
      br 0
    end
    end

  )
)
