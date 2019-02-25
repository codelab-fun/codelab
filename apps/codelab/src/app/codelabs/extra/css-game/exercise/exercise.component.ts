import { Component, OnInit, Input } from '@angular/core';
import * as exercise from "../output.json";

@Component({
  selector: 'exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent implements OnInit {
  stylestr = ""
  isCorrect = false
  @Input() questionIndex:number
  showHint = false
  exer = exercise.questions

  questiontypes = 
  [ 
    {
      "type": "correct",
      "count": 0,
      "outputText": "Select Below"
    },
    {
      "type": "incorrect",
      "count": 0,
      "outputText": "Not Below"
    }
  ]

  ngOnInit() {
  }

  onNextQ() {
    this.questionIndex++
    this.isCorrect = false
    this.stylestr = ""
  }

  onCheck() {
    var inCorrectCount = 0
    var correctCount = 0
    this.isCorrect = false
    this.showHint = true
    for (var t2 of this.questiontypes) {
      t2.count = 0
      for (var e of this.exer[this.questionIndex][t2.type]) {
        var val = this.compileCode(e.htmlStr)
        e["highlight"] = val ? true : false
        if(val)
          t2.count++
      }
    }

    correctCount = this.questiontypes[0].count
    inCorrectCount = this.questiontypes[1].count
    if(correctCount == this.exer[this.questionIndex].correct.length && inCorrectCount == 0) {
      this.isCorrect = true
    }
  }

  compileCode(code1) {
    if(this.stylestr.length == 0) {
      return false
    }
    var a = document.createElement("main")
    a.innerHTML = code1;
    try {
      var b = a.querySelectorAll(this.stylestr)
      return !!b.length
    }catch(e) {
      console.log(e)
      return false
    }
  }
}
