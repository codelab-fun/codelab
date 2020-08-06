# codelab-angular-10-quiz-app
Angular 10 quiz app created for Angular Codelab (https://www.codelab.fun)

# TODO:
- in multiple-answer questions, score should only increase if ALL correct answers have been chosen
- add previous user answers text for single answer questions in QuizQuestionComponent template
- convert app with Ionic and Apache Cordova for usability on mobile devices
- add state management with NgRx???

# Features:
- App developed using HTML5; CSS3/SCSS; Angular using TypeScript, JavaScript ES6 and NPM
- Uses a basic, clean, modern and aesthetically pleasing UI for the quiz
- Features a simple API and quiz data is retrieved from external file
- Employs familiar Angular concepts such as services/dependency injection, routing and reactive form -- form display toggled depending on the type of question (either multiple choice (mat-checkbox) question or single-answer (mat-radio) question, determined in the quiz service)
- Includes routing to different Angular milestone quizzes on a quiz selection screen
- Supports advanced routing features with paging 1 question at a time using an inferred questionIndex (instead of using questionId)
- Utilizes Angular packages such as Angular Material/CDK, Angular animation library as well as Bootstrap, FontAwesome, hover.css and external 3rd party packages for progressbars (ngb-progressbar) and audio (Howler)
- Displays innovative scoreboard in which correct answer count and countdown clock are both fully controlled with RxJS
- Uses SVG buttons for paging and quiz statuses
- Results page shows user score (with percentage) and computes time taken to complete the quiz and utilizes an expandable/collapsable Angular Material accordion (mat-accordion) which shows a detailed quiz summary (user answer(s), correct answer(s), explanation and elapsedTime for each question), also features buttons to share percentage on social media (Twitter) or by e-mail
- Utilizes Javascript ES6 arrow functions to store the correct answers stored in an array and user answers are also kept in an array
- When there is more than one answer to a question, the number of correct answers is shown
- Uses clean import paths via path aliasing
- App is being finalized to convert to NgRx
