# codelab-angular-10-quiz-app
This application was created for the open-source Angular Codelab (https://www.codelab.fun)

# TODO:
- fix scoring issue - in a multiple-answer question, if one correct answer is selected and one incorrect, the score still increases by 1; it should only increase if ALL correct answers have been selected (there also seems to be an issue with switching Observable to BehaviorSubject)
  - if correct, then incorrect, then correct, score doesn't increment
  - similarly if incorrect, then correct, then correct, score doesn't increment
- checking and then unchecking of mat-checkbox in IntroductionComponent doesn't seem to set checkedShuffle back to false -- check this!
- checkbox with shuffle q&a text in IntroductionComponent needs to be fixed in the center so it doesn't move the next time the intro screen is encountered
- status field - I added status variable types to the Quiz interface, but if I remove all the "status: ''" from quiz.ts, it will complain and give an error. I should be able to set it initially somewhere else and have it update as needed.
- saveHighScores function -- doesn't seem to throw error if quiz is taken more than MAX_LENGTH times, weird
- add another animation to mat-grid-tile in QuizSelectionComponent - probably need to create a separate file for the new animation and link it
- add previous user answers text for single-answer questions in QuizQuestionComponent template
- remove "selected" field in Option model and probably use an 'inferred' selected variable instead
- convert app with Ionic and Apache Cordova for usability on mobile devices - priority when everything else has been finished
- add state management with NgRx???
- add route guards? probably wait for NgRx...

------------------------------------------------------------------------------------------------------------------------------------

# FEATURES:
- App developed using HTML5; CSS3/SCSS; Angular using TypeScript, JavaScript ES6 and NPM
- Uses a basic, clean, modern and aesthetically pleasing UI for the quiz
- Features a simple API and quiz data is retrieved from external file
- Employs familiar Angular concepts such as services/dependency injection, routing and reactive form
- Form display is toggled depending on the type of question in the quiz service (either multiple-answer (mat-checkbox) question or single-answer (mat-radio-button) question)
- Includes routing to different Angular milestone quizzes on a quiz-selection screen
- Supports advanced routing features with paging 1 question at a time using an inferred questionIndex (instead of using questionId)
- Utilizes Angular packages such as Angular Material/CDK, Angular animation library as well as Bootstrap, FontAwesome, hover.css and external 3rd party packages for progressbars (ngb-progressbar) and audio (Howler)
- Displays innovative scoreboard in which correct answer count and countdown clock are both fully controlled with RxJS
- Uses SVG buttons for paging and quiz statuses
- Results page shows user score (with percentage) and computes time taken to complete the quiz and utilizes an expandable/collapsable Angular Material accordion (mat-accordion) which shows a detailed quiz summary (user answer(s), correct answer(s), explanation and elapsedTime for each question), also features buttons to share percentage on social media (Twitter) or by e-mail
- Utilizes Javascript ES6 arrow functions to store the correct answers stored in an array and user answers are also kept in an array
- When there is more than one answer to a question, the number of correct answers is shown
- Utilizes clean import paths via path aliasing
- App is being finalized to convert to NgRx
