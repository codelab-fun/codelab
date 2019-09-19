(module
  (import "config" "rowSize" (global $rowSize i32))
  (memory 1)
  (export "memory" (memory 0))

  (global $step (export "step") (mut i32) (i32.const 1))

  (table 8 anyfunc)
  (type $return_i32 (func (result i32)))
  (elem (i32.const 0)
    $enable
    $enable
    $enable
    $enable
    $enable
    $enable
    $enable
    $enable
  )

  (func $rotate (param $x i32) (result i32)
    get_local $x
    get_global $rowSize
    i32.add

    get_global $rowSize

    i32.rem_s
  )


  (func $getIndex (param $x i32) (param $y i32) (result i32)
      get_local $x

      get_local $y
      get_global $rowSize
      i32.mul

      i32.add
  )

  (func $evolve (export "evolve") (param $steps i32) (local $i i32)
   block
    loop
      call $evolveRow
      get_global $step
      i32.const 1
      i32.add
      set_global $step


      ;; i++
      get_local $i
      (i32.const 1)
      i32.add
      tee_local $i


      get_local $steps
      i32.eq

      br_if 1
      br 0
    end
    end

  )

  (func $evolveRow (local $i i32)
    block
    loop
      get_local $i
      call $evolveCell

      ;; i++
      get_local $i
      (i32.const 1)
      i32.add
      local.tee $i




      get_global $rowSize
      i32.eq

      br_if 1
      br 0
    end
    end
  )


  (func $enable (result i32)
    (i32.const 1)
  )

  (func $disable (result i32)
    (i32.const 0)
  )

 (func $evolveCell (param $x i32)
    get_local $x


    get_local $x
    call $getCellScore
    call_indirect (type $return_i32)

    call $storeCell
  )

  (func $storeCell (param $x i32) (param $value i32)
         get_local $x
         get_global $step
         call $getIndex

         i32.const 4
         i32.mul

         get_local $value

         i32.store
  )

(func $getCellScore (param $x i32)  (result i32)
    get_local $x
    i32.const 1
    i32.sub
    call $loadPreviousCell

    get_local $x
    call $loadPreviousCell

    get_local $x
    i32.const 1
    i32.add
    call $loadPreviousCell

    call $shift
  )


  (func $loadPreviousCell (param $x i32) (result i32)
    get_local $x

    get_global $step
    (i32.const 1)
    i32.sub

    call $loadCell
  )

  (func $shift (param $a i32) (param $b i32) (param $c i32)  (result i32)
    get_local $a
    (i32.const 4)
    i32.mul

    get_local $b
    (i32.const 2)
    i32.mul

    get_local $c

    i32.add
    i32.add
  )

  (func $loadCell (param $x i32) (param $y i32) (result i32)
        (get_local $x)
        call $rotate

        (get_local $y)

        call $getIndex
        i32.const 4
        i32.mul

        i32.load
    )
)
