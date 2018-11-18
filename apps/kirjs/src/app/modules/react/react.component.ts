import { Component } from '@angular/core';
import { reactExercise } from '../../../../../../libs/exercise/src/lib/helpers/helpers';


@Component({
  selector: 'slides-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.css']
})
export class ReactComponent {

  code = {
    hook1: `const Lol = () => {
  const [n, setN] = React.useState(4);
  updateN = () => {setN( n + 1)}
  return <h1>
    <button onClick={()=>setN(n+2)}>
      Hello {n}
    </button>
  </h1>;
}

ReactDOM.render(
  <Lol/>,
  document.querySelector('#app')
);`,
    basic: {
      ...reactExercise(
        `const Lol = () => {
  const [n, setN] = React.useState(4);
  updateN = () => {setN( n + 1)}
  return <h1>
    <button onClick={()=>setN(n+2)}>
      Hello {n}
    </button>
  </h1>;
}

ReactDOM.render(
  <Lol/>,
  document.querySelector('#app')
);`),
      runner: 'React'
    }
  };

  constructor() {
  }

}
