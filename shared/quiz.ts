import { Quiz, QuizResource } from '@codelab-quiz/shared/models/';

export const QUIZ_DATA: Quiz[] = [
  {
    quizId: 'typescript',
    milestone: 'TypeScript',
    summary: 'TypeScript makes it easier to read and debug JavaScript code.',
    image: 'ts.png',
    questions: [
      {
        questionText: 'Which of the following does TypeScript use to specify types?',
        options: [
          { text: ':', correct: true },
          { text: ';' },
          { text: '!' },
          { text: '&' }
        ],
        explanation: 'TS uses a colon (:) to separate the property name from the property type'
      },
      {
        questionText: 'Which of the following is NOT a type used in TypeScript?',
        options: [
          { text: 'number' },
          { text: 'string' },
          { text: 'boolean' },
          { text: 'enum', correct: true }
        ],
        explanation: 'enum is not used as a type in TypeScript'
      },
      {
        questionText: 'How can we specify properties and methods for an object in TypeScript?',
        options: [
          { text: 'Use classes.' },
          { text: 'Use interfaces.', correct: true },
          { text: 'Use enums.' },
          { text: 'Use async/await.' }
        ],
        explanation: 'interfaces are typically used to list the properties and methods for an object'
      },
      {
        questionText: 'How else can Array<number> be written in TypeScript?',
        options: [
          { text: '@number' },
          { text: 'number[]', correct: true },
          { text: 'number!' },
          { text: 'number?' }
        ],
        explanation: 'number[] is another way of writing Array<number> in TypeScript'
      },
      {
        questionText: 'In which of these does a class take parameters?',
        options: [
          { text: 'constructor', correct: true },
          { text: 'destructor', },
          { text: 'import' },
          { text: 'subscribe' }
        ],
        explanation: 'a constructor is used by a class to take in parameters'
      },
      {
        questionText: 'Which is NOT an access modifier?',
        options: [
          { text: 'private' },
          { text: 'protected' },
          { text: 'public' },
          { text: 'async', correct: true }
        ],
        explanation: 'async is not used as an access modifier type in TypeScript'
      },
      {
        questionText: 'Which keyword allows us to share information between files in TypeScript?',
        options: [
          { text: 'import' },
          { text: 'export', correct: true },
          { text: 'async' },
          { text: 'constructor' }
        ],
        explanation: 'the export keyword allows for the information to be transmitted between files'
      },
      {
        questionText: 'Which is an array method to generate a new array based on a condition?',
        options: [
          { text: 'filter', correct: true },
          { text: 'map' },
          { text: 'async' },
          { text: 'enum' }
        ],
        explanation: 'filter is a method used to conditionally create a new array'
      },
      {
        questionText: 'How is a property accessible within a class?',
        options: [
          { text: 'Using this.propertyName', correct: true },
          { text: 'Accessors' },
          { text: 'Destructuring' },
          { text: 'Arrow function' }
        ],
        explanation: 'this.propertyName is the way to access a specific property within a class'
      }
    ],
    status: ''
  },
  {
    quizId: 'create-first-app',
    milestone: 'Creating your first app',
    summary: 'Angular allows us to create an app that contains components and modules as well as a system for bootstrapping the app.',
    image: 'first_app.png',
    questions: [
      {
        questionText: 'Which of the following are true statements about Angular?',
        options: [
          { text: 'Angular is a development platform.' },
          { text: 'Angular minimizes much of the code you would have to write.' },
          { text: 'Angular extends HTML\'s syntax to define your HTML components.' },
          { text: 'All of the above.', correct: true }
        ],
        explanation: 'all of the above are true statements about Angular'
      },
      {
        questionText: 'Which of the following can be added to an Angular class?',
        options: [
          { text: 'Properties and methods', correct: true },
          { text: 'Imports and exports' },
          { text: 'Template variables' },
          { text: 'Styles' }
        ],
        explanation: 'properties and methods can be added to a class in Angular'
      },
      {
        questionText: 'How is a class adorned in Angular?',
        options: [
          { text: 'Using the @Component decorator.', correct: true },
          { text: 'Using the @Injectable decorator.' },
          { text: 'Using the @Input decorator.' },
          { text: 'Using the @Output decorator.' }
        ],
        explanation: 'a class is adorned with the @Component decorator in Angular'
      },
      {
        questionText: 'What is the purpose of a decorator in TypeScript?',
        options: [
          { text: 'To attach metadata to a class, function, property or variable.', correct: true },
          { text: 'To add properties and methods to the class.' },
          { text: 'To minimize the amount of code you will write.' },
          { text: 'To perform databinding.' }
        ],
        explanation: 'a decorator attaches metadata to a class, function, property or variable'
      },
      {
        questionText: 'Which defines the location of a component?',
        options: [
          { text: 'decorator' },
          { text: 'selector', correct: true },
          { text: 'template' },
          { text: 'templateUrl' }
        ],
        explanation: 'a selector defines the location of a component in Angular'
      },
      {
        questionText: 'Which defines the HTML code that the component generates?',
        options: [
          { text: 'decorator' },
          { text: 'selector' },
          { text: 'template', correct: true },
          { text: 'templateUrl' }
        ],
        explanation: 'a template contains the HTML code that a component generates'
      },
      {
        questionText: 'Which is used for grouping Angular building blocks together?',
        options: [
          { text: 'NgModule', correct: true },
          { text: 'template' },
          { text: 'selector' },
          { text: 'decorator' }
        ],
        explanation: 'the NgModule is used to group Angular components and modules together'
      },
      {
        questionText: 'How is an Angular module adorned?',
        options: [
          { text: '@NgModule', correct: true },
          { text: '@Component' },
          { text: '@Injectable' },
          { text: '@Output' }
        ],
        explanation: '@NgModule is used to decorate an Angular module'
      },
      {
        questionText: 'Which array specifies components belonging to AppModule?',
        options: [
          { text: 'imports' },
          { text: 'declarations', correct: true },
          { text: 'bootstrap' },
          { text: 'providers' }
        ],
        explanation: 'the declarations array contains all the components that belong to AppModule'
      },
      {
        questionText: 'Which of the following code is used for bootstrapping an app?',
        options: [
          { text: '<app-module #bootstrap></app-module>' },
          { text: '<bootstrap>AppModule</bootstrap>' },
          { text: 'bootstrap: [AppModule]' },
          { text: 'platformBrowserDynamic().bootstrapModule(AppModule);', correct: true }
        ],
        explanation: 'passing AppModule into the platformBrowserDynamic() is the method used for bootstrapping an Angular app'
      }
    ],
    status: ''
  },
  {
    quizId: 'templates',
    milestone: 'Templates',
    summary: 'Angular has a very expressive template system, which takes HTML as a base, and extends it with custom elements.',
    image: 'template.png',
    questions: [
      {
        questionText: 'What characters are used for text interpolation?',
        options: [
          { text: 'backticks: ``', correct: true },
          { text: 'double curlies {{ }}' },
          { text: 'double ampersand &&' },
          { text: 'double pipes ||' }
        ],
        explanation: 'backticks are used in Angular for insertion of text'
      },
      {
        questionText: 'Which characters are used to include a property value?',
        options: [
          { text: 'backticks: ``' },
          { text: 'double curlies: {{ }}', correct: true },
          { text: 'double ampersand: &&' },
          { text: 'double pipes: ||' }
        ],
        explanation: 'double curlies are used to insert a property value inside a template'
      },
      {
        questionText: 'How can you pass a value to a child element\'s attribute?',
        options: [
          { text: 'Use string interpolation {{ property }}', correct: true },
          { text: 'Call a function' },
          { text: 'Using the export keyword' },
          { text: 'Use [attribute]="property"', correct: true }
        ],
        explanation: 'properties can be based to a child element using string interpolation or [attribute]="property" syntax'
      },
      {
        questionText: 'Which is a shortcut for applying a class name based on value of property?',
        options: [
          { text: '{{ property }}' },
          { text: '``property``' },
          { text: '[class.property]="isProperty"', correct: true },
          { text: 'property$' }
        ],
        explanation: 'we use the [class.property] syntax to assign a class name based on a value of property.'
      },
      {
        questionText: 'What is the proper way to bind styles to a button in Angular?',
        options: [
          { text: '<button {{style}}></button>' },
          { text: '<button style="color: blue"' },
          { text: '<button [style.color]="blue">', correct: true },
          { text: '<button>insert style ligature</button>' }
        ],
        explanation: '[style.styleProperty] is the way of binding a style to an element in Angular'
      },
      {
        questionText: 'Which of the following are examples of event bindings in Angular?',
        options: [
          { text: '[click]' },
          { text: '@click' },
          { text: '(click)', correct: true },
          { text: 'on-click', correct: true }
        ],
        explanation: '(click) and its HTML equivalent \'on-click\' are examples of event bindings'
      },
      {
        questionText: 'How do we provide access to an HTML element or Angular component from the template?',
        options: [
          { text: 'Use attribute binding [attr]="name"' },
          { text: 'Use backticks' },
          { text: 'Use double curlies' },
          { text: 'Mark it with #name', correct: true }
        ],
        explanation: 'marking it with #name is the way to access the HTML element from an Angular template'
      },
      {
        questionText: 'What mechanism does Angular provide for handling keyboard shortcuts?',
        options: [
          { text: 'event binding' },
          { text: 'data binding' },
          { text: 'text interpolation' },
          { text: '(keydown.control.enter)', correct: true }
        ],
        explanation: '(keydown.control.enter) is Angular\'s syntax for handling keyboard shortcuts'
      },
      {
        questionText: 'Which directive adds or removes an element from the DOM?',
        options: [
          { text: '*ngFor' },
          { text: '*ngIf', correct: true },
          { text: '*ngSwitch' },
          { text: '[ngStyle]' }
        ],
        explanation: 'ngIf is used to conditionally add or remove an element from the DOM'
      },
      {
        questionText: 'Which directive can be used to display an array of cat images?',
        options: [
          { text: '*ngFor', correct: true },
          { text: '*ngIf' },
          { text: '*ngSwitch' },
          { text: '[ngStyle]' }
        ],
        explanation: 'the ngFor directive is used to display entire arrays or objects'
      }
    ],
    status: ''
  },
  {
    quizId: 'dependency-injection',
    milestone: 'Dependency Injection',
    summary: 'Dependency Injection is a way of providing dependencies in your code instead of hard-coding them.',
    image: 'DIDiagram.png',
    questions: [
      {
        questionText: 'What is the objective of dependency injection?',
        options: [
          { text: 'Pass the service to the client.', correct: true },
          { text: 'Allow the client to find service.', correct: true },
          { text: 'Allow the client to build service.' },
          { text: 'Give the client part service.' }
        ],
        explanation: 'a service gets passed to the client during DI'
      },
      {
        questionText: 'Which of the following benefit from dependency injection?',
        options: [
          { text: 'Programming' },
          { text: 'Testability' },
          { text: 'Software design' },
          { text: 'All of the above.', correct: true }
        ],
        explanation: 'DI simplifies both programming and testing as well as being a popular design pattern'
      },
      {
        questionText: 'In which of the following does dependency injection occur?',
        options: [
          { text: '@Injectable()' },
          { text: 'constructor', correct: true },
          { text: 'function' },
          { text: 'NgModule' }
        ],
        explanation: 'object instantiations are taken care of by the constructor in Angular'
      },
      {
        questionText: 'What is the first step in setting up dependency injection?',
        options: [
          { text: 'Require in the component.' },
          { text: 'Provide in the module.' },
          { text: 'Mark dependency as @Injectable().', correct: true },
          { text: 'Declare an object.' }
        ],
        explanation: 'the first step is marking the class as @Injectable()'
      }
    ],
    status: ''
  },
  {
    quizId: 'component-tree',
    milestone: 'Component Trees',
    summary: 'An Angular application can be thought of as a tree of reusable components.',
    image: 'tree.png',
    questions: [
      {
        questionText: 'How does a parent component pass data to its child component?',
        options: [
          { text: 'Using data binding.' },
          { text: 'Using functions.' },
          { text: 'Using properties.', correct: true },
          { text: 'Using DOM manipulation.' }
        ],
        explanation: 'a parent component can pass data to its child via properties'
      },
      {
        questionText: 'How can one component render another one?',
        options: [
          { text: 'Using an HTML element that matches selector of other component.', correct: true },
          { text: 'Using data binding.' },
          { text: 'Using properties.' },
          { text: 'Passing components via functions.' }
        ],
        explanation: 'a component can display another component by matching the selector of the other component'
      },
      {
        questionText: 'How do components know about each other?',
        options: [
          { text: 'If they are declared in the same module.', correct: true },
          { text: 'If they are passed to each other.' },
          { text: 'Using export.' },
          { text: 'Using property binding.' }
        ],
        explanation: 'components can only know about each other if they are declared in the same module'
      },
      {
        questionText: 'How must a child decorate its properties to pass data?',
        options: [
          { text: 'Using the @Input() decorator.', correct: true },
          { text: 'Using the @Output() decorator.' },
          { text: 'Using the @Injectable decorator.' },
          { text: 'Using the @Component decorator.' }
        ],
        explanation: 'properties must be decorated with @Input() in a child in order to pass data to its parent'
      }
    ],
    status: ''
  },
  {
    quizId: 'router',
    milestone: 'Angular Router',
    summary: 'Angular Router helps developers build Single Page Applications with multiple views and allow navigation between those views.',
    image: 'router.png',
    questions: [
      {
        questionText: 'Which is used to assign URLs to different parts of your app?',
        options: [
          { text: 'Router', correct: true },
          { text: 'Forms' },
          { text: 'Templates' },
          { text: 'Material' }
        ],
        explanation: 'Router is used to provide URLs to the different parts of your app.'
      },
      {
        questionText: 'How are routes configured in Angular?',
        options: [
          { text: 'In a routing module.' },
          { text: 'By defining an array of mapping between URL path and a component.', correct: true },
          { text: 'When the app is being bootstrapped.' },
          { text: 'In tsconfig.json' }
        ],
        explanation: 'routes are configured by defining an array of mapping between URL path and a component'
      },
      {
        questionText: 'How does Angular know about the routing configuration?',
        options: [
          { text: 'We have to pass the config to our module.', correct: true },
          { text: 'When the app is being bootstrapped.' },
          { text: 'It is specified in tsconfig.json' },
          { text: 'It looks for the config in router-outlet.' }
        ],
        explanation: 'routes are configured by defining an array of mapping between URL path and a component'
      },
      {
        questionText: 'Which of the following creates an Angular module from our configuration?',
        options: [
          { text: 'RouterModule.forRoot', correct: true },
          { text: 'router-outlet' },
          { text: 'routerLink' },
          { text: 'navigateByUrl' }
        ],
        explanation: 'RouterModule.forRoot establishes an Angular module from the routing configuration'
      },
      {
        questionText: 'What tag is used to tell the router where to display a selected component?',
        options: [
          { text: 'routerLink' },
          { text: '<router-outlet> tag ', correct: true },
          { text: 'navigate' },
          { text: 'navigateByUrl' }
        ],
        explanation: 'the router-outlet tag tells the router to display selected component(s)'
      },
      {
        questionText: 'Which directive is used to provide a URL in creating a route?',
        options: [
          { text: 'routerLink', correct: true },
          { text: '<router-outlet> tag' },
          { text: 'navigate' },
          { text: 'navigateByUrl' }
        ],
        explanation: 'the routerLink directive is used to provide the URL necessary for routing'
      }
    ],
    status: ''
  },
  {
    quizId: 'material',
    milestone: 'Angular Material',
    summary: 'Angular Material provides a set of Material Design components that are consistent, versatile and look great on mobile devices.',
    image: 'material.png',
    questions: [
      {
        questionText: 'Which of the following is the official website for Angular Material?',
        options: [
          { text: 'https://www.angular.io' },
          { text: 'https://www.material.io' },
          { text: 'https://material.angular.io', correct: true },
          { text: 'https://www.github.com/angular/material' }
        ],
        explanation: 'the official website for Angular Material is material.angular.io'
      },
      {
        questionText: 'Where are Angular Material modules declared in NgModule?',
        options: [
          { text: 'imports', correct: true },
          { text: 'declarations' },
          { text: 'providers' },
          { text: 'schemas' }
        ],
        explanation: 'the imports section of NgModule is where Angular Material modules are declared'
      },
      {
        questionText: 'Which of the following is true about Angular Material Design components?',
        options: [
          { text: 'They are fast and consistent.' },
          { text: 'They look great on mobile.' },
          { text: 'They can be themed.' },
          { text: 'All of the above.', correct: true }
        ],
        explanation: 'all of these are true about Angular Material components.'
      },
      {
        questionText: 'Where are Angular Material components used?',
        options: [
          { text: 'In the template file.', correct: true },
          { text: 'In the TypeScript file.' },
          { text: 'In the CSS file.' },
          { text: 'All of the above.' }
        ],
        explanation: 'Angular Material components are utilized in the template file'
      },
      {
        questionText: 'Which tag can be used to display a card header in Angular Material?',
        options: [
          { text: 'mat-card' },
          { text: 'mat-card-avatar' },
          { text: 'mat-card-header', correct: true },
          { text: 'mat-card-image' }
        ],
        explanation: 'the mat-card-header is used to display the header information inside an Angular mat-card'
      },
      {
        questionText: 'Which tag can be used to display actions in Angular Material?',
        options: [
          { text: 'mat-button' },
          { text: 'mat-raised-button' },
          { text: 'mat-card-content' },
          { text: 'mat-card-actions', correct: true }
        ],
        explanation: 'the mat-card-actions tag is used to display actions inside an Angular Material template'
      }
    ],
    status: ''
  },
  {
    quizId: 'forms',
    milestone: 'Angular Forms',
    summary: 'Angular forms build upon standard HTML forms to help create custom form controls and support easy validation.',
    image: 'forms.png',
    questions: [
      {
        questionText: 'What is the first step in using Angular Forms?',
        options: [
          { text: 'Add FormsModule/ReactiveFormsModule in NgModule.', correct: true },
          { text: 'Add form tag to the template.' },
          { text: 'Add form fields in the template.' },
          { text: 'Add form validation fields to the TypeScript file.' }
        ],
        explanation: 'we must first add FormsModule to the imports section of NgModule'
      },
      {
        questionText: 'What syntax is used to bind inputs to fields on the component?',
        options: [
          { text: '{{ngModel}}' },
          { text: '[(ngModel)]', correct: true },
          { text: '[ngModel]' },
          { text: '*ngModel' }
        ],
        explanation: 'the "banana-in-a-box" syntax [(ngModel]] is used for binding inputs to fields'
      },
      {
        questionText: 'How do you provide validation for your inputs?',
        options: [
          { text: 'Using required keyword', correct: true },
          { text: 'Using valid keyword' },
          { text: 'Using matInput' },
          { text: 'Using mat-error' }
        ],
        explanation: 'by placing the "required" keyword on an input field, it marks the field for validation'
      },
      {
        questionText: 'Which of the following are steps to display a validation error?',
        options: [
          { text: 'Use #name="ngModel" binding.', correct: true },
          { text: 'Use usernameModel\'s errors property.', correct: true },
          { text: 'Use mat-error.' },
          { text: 'Use required keyword.' }
        ],
        explanation: 'using #name="ngModel" and using usernameModel\'s error property are the two steps to display a validation error'
      },
      {
        questionText: 'Which is NOT a built-in validator that Angular provides?',
        options: [
          { text: 'min' },
          { text: 'minLength' },
          { text: 'required' },
          { text: 'password', correct: true }
        ],
        explanation: 'password is not a built-in validator which Angular provides'
      },
      {
        questionText: 'Which is true if the user changed the value of the input?',
        options: [
          { text: 'dirty', correct: true },
          { text: 'touched' },
          { text: 'untouched' },
          { text: 'pristine' }
        ],
        explanation: 'dirty is true when the user changes the value of the input '
      },
      {
        questionText: 'Which is true if the user focused on the input and then blurred without changing the value?',
        options: [
          { text: 'dirty' },
          { text: 'touched', correct: true },
          { text: 'untouched' },
          { text: 'pristine' }
        ],
        explanation: 'touched is true when the user focuses on input and then blurred'
      },
      {
        questionText: 'Which of the following wraps the input in an Angular Material form?',
        options: [
          { text: 'mat-form-field', correct: true },
          { text: 'matInput' },
          { text: 'mat-error' },
          { text: 'mat-card' }
        ],
        explanation: 'mat-form-field surrounds the input in an Angular Material form'
      },
      {
        questionText: 'How is an error shown in an Angular Material form?',
        options: [
          { text: 'mat-form-field' },
          { text: 'matInput' },
          { text: 'mat-error', correct: true },
          { text: 'mat-card' }
        ],
        explanation: 'the mat-error tag is used to show an error in an Angular Material form'
      }
    ],
    status: ''
  },
  {
    quizId: 'angular-cli',
    milestone: 'Angular-CLI',
    summary: 'The Angular CLI is a command-line interface tool used for initializing, developing, scaffolding and maintaining Angular applications.',
    image: 'angular-cli.png',
    questions: [
      {
        questionText: 'Which is a prerequisite for using Angular-CLI?',
        options: [
          { text: 'NodeJS', correct: true },
          { text: 'JavaScript' },
          { text: 'Github' },
          { text: 'WebStorm' }
        ],
        explanation: 'NodeJS needs to be installed on your machine before setting up Angular-CLI'
      },
      {
        questionText: 'How is Angular-CLI installed?',
        options: [
          { text: 'npm install -g @angular/cli', correct: true },
          { text: 'ng new "my-app-name' },
          { text: 'cd my-app-name' },
          { text: 'ng serve command' }
        ],
        explanation: 'Angular-CLI is installed using the "npm install -g @angular/cli" command'
      },
      {
        questionText: 'How can you run an app that is built with Angular-CLI?',
        options: [
          { text: 'ng serve', correct: true },
          { text: 'ng new "my-app-name"' },
          { text: 'npm start' },
          { text: 'node -v' }
        ],
        explanation: 'ng serve is the command that is required to run an app built with Angular-CLI'
      },
      {
        questionText: 'Which URL should be viewed in the browser to see the app running?',
        options: [
          { text: 'http://www.google.com' },
          { text: 'http://angular.io' },
          { text: 'http://localhost' },
          { text: 'http://localhost:4200/', correct: true  }
        ],
        explanation: 'viewing http://localhost:4200/ allows us to view the app in the browser'
      },
      {
        questionText: 'What command is used to create a new service using the Angular-CLI?',
        options: [
          { text: 'ng g c my-component' },
          { text: 'ng g m my-module' },
          { text: 'ng g s my-service', correct: true },
          { text: 'ng g p my-pipe' }
        ],
        explanation: 'a service is created using the ng g s shortcut command'
      },
      {
        questionText: 'Which is a true statement about the Angular CLI?',
        options: [
          { text: 'It is a command-line tool that makes it easy to generate new components.' },
          { text: 'It allows for fast scaffolding of an application that works easily.' },
          { text: 'It takes care of the build system for you.' },
          { text: 'All of the above.', correct: true }
        ],
        explanation: 'all of the above are true statements about the Angular-CLI'
      }
    ],
    status: ''
  }
];

export const QUIZ_RESOURCES: QuizResource[] = [
  {
    quizId: 'TS_Quiz',
    milestone: 'TypeScript',
    resources: [
      {
        title: 'TypeScript language website',
        url: 'https://www.typescriptlang.org',
        host: 'TypeScript website'
      },
      {
        title: 'Microsoft TypeScript GitHub page',
        url: 'https://github.com/microsoft/TypeScript',
        host: 'GitHub'
      },
      {
        title: 'TypeScript Wiki',
        url: 'https://en.wikipedia.org/wiki/TypeScript',
        host: 'Wikipedia'
      },
      {
        title: 'TypeScript blog',
        url: 'https://devblogs.microsoft.com/typescript/',
        host: 'Microsoft dev blogs'
      }
    ]
  },
  {
    quizId: 'create-first-app',
    milestone: 'Creating your first app',
    resources: [
      {
        title: 'Getting started with a basic Angular app',
        url: 'https://angular.io/start',
        host: 'angular.io'
      },
      {
        title: 'Creating Your First Angular App: Basics',
        url: 'https://code.tutsplus.com/tutorials/creating-your-first-angular-app-basics--cms-30092',
        host: 'envatotuts+'
      },
    ]
  },
  {
    quizId: 'templates',
    milestone: 'Templates',
    resources: [
      {
        title: 'Introduction to components and templates',
        url: 'https://angular.io/guide/architecture-components#:~:text=Angular%20templates%20are%20dynamic.,component%20is%20technically%20a%20directive.',
        host: 'angular.io'
      },
      {
        title: 'Angular 4 - Templates',
        url: 'https://www.tutorialspoint.com/angular4/angular4_templates.htm',
        host: 'tutorialspoint'
      },
      {
        title: 'Angular templates and views',
        url: 'https://howtodoinjava.com/angular/angular-templates-and-views/#:~:text=A%20template%20is%20an%20HTML,component%20defines%20that%20component\'s%20view.',
        host: 'HowToDoInJava'
      }
    ]
  },
  {
    quizId: 'dependency-injection',
    milestone: 'Dependency Injection',
    resources: [
      {
        title: 'Dependency injection in Angular',
        url: 'https://angular.io/guide/dependency-injection',
        host: 'angular.io'
      },
      {
        title: 'Dependency injection in action',
        url: 'https://angular.io/guide/dependency-injection-in-action',
        host: 'angular.io'
      },
      {
        title: 'Introduction to services and dependency injection',
        url: 'https://angular.io/guide/architecture-services',
        host: 'angular.io'
      },
      {
        title: 'Total Guide To Angular 6+ Dependency Injection...',
        url: 'https://medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f',
        host: 'medium.com'
      }
    ]
  },
  {
    quizId: 'component-tree',
    milestone: 'Component Trees',
    resources: [
      {
        title: 'Introduction to Angular concepts',
        url: 'https://angular.io/guide/architecture',
        host: 'angular.io'
      },
      {
        title: 'The Core Concepts of Angular',
        url: 'https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04',
        host: 'vsavkin.com'
      }
    ]
  },
  {
    quizId: 'router',
    milestone: 'Angular Router',
    resources: [
      {
        title: 'In-app navigation: routing to views',
        url: 'https://angular.io/guide/router',
        host: 'angular.io'
      },
      {
        title: 'API: @angular/router',
        url: 'https://angular.io/api/router',
        host: 'angular.io'
      },
      {
        title: 'A Complete Guide To Routing In Angular',
        url: 'https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/',
        host: 'Smashing Magazine'
      },
      {
        title: 'Using Route Parameters',
        url: 'https://angular-2-training-book.rangle.io/routing/routeparams',
        host: 'Rangle.io'
      }
    ]
  },
  {
    quizId: 'material',
    milestone: 'Angular Material',
    resources: [
      {
        title: 'Getting Started with Angular Material',
        url: 'https://material.angular.io/guide/getting-started',
        host: 'Angular Material official website'
      },
      {
        title: 'Angular Material UI component library',
        url: 'https://material.angular.io',
        host: 'Angular Material official website'
      },
      {
        title: 'Material Design',
        url: 'https://www.material.io',
        host: 'material.io'
      },
      {
        title: 'Angular Material 7 Tutorial',
        url: 'https://www.tutorialspoint.com/angular_material7/index.htm',
        host: 'tutorialspoint'
      }
    ]
  },
  {
    quizId: 'forms',
    milestone: 'Angular Forms',
    resources: [
      {
        title: 'Introduction to forms in Angular',
        url: 'https://angular.io/guide/forms-overview',
        host: 'angular.io'
      },
      {
        title: 'Angular Forms Guide - Template Driven and Reactive Forms',
        url: 'https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/',
        host: 'Angular University'
      },
      {
        title: 'Template-Driven Form Validation In Angular',
        url: 'https://ankitsharmablogs.com/template-driven-form-validation-in-angular/',
        host: 'Ankit Sharma\'s Blog',
      },
      {
        title: 'How to validate Angular Reactive Forms',
        url: 'https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/',
        host: 'freecodecamp.org'
      }
    ]
  },
  {
    quizId: 'angular-cli',
    milestone: 'Angular-CLI',
    resources: [
      {
        title: 'CLI Overview and Command Reference',
        url: 'https://angular.io/cli',
        host: 'angular.io'
      },
      {
        title: 'Angular 8 Tutorial: Build your First Angular App',
        url: 'https://www.techiediaries.com/angular-8-tutorial-build-first-angular-calculator-app/',
        host: 'TechieDiaries'
      },
      {
        title: 'Starting an Angular app with the Angular CLI',
        url: 'https://scotch.io/courses/build-your-first-angular-website/starting-an-angular-app-with-the-angular-cli',
        host: 'Scotch'
      }
    ]
  }
];
