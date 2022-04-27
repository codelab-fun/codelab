(function () {
  const consoleDiv = document.createElement('div');
  consoleDiv.className = 'codelab-console';
  document.body.appendChild(consoleDiv);

  const css = `

  .codelab-console pre:first-child {
    border-top: 0 solid;
  }
  .codelab-console pre {
    margin: 0;
    padding: 8px;
    color: #444;
    border-top: 1px #eee dashed;
   }
  .codelab-console pre:before {
    content: "▸";
    color: #999;
    margin-right: 8px;
   }

  `;
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.appendChild(document.createTextNode(css));

  const log = console.log;

  console.log = (...args) => {
    log(...args);
    for (const arg of args) {
      const log = document.createElement('pre');
      log.innerText = JSON.stringify(arg, null, '  ');
      consoleDiv.appendChild(log);
      document.body.scrollTo(0, document.body.scrollHeight);
    }
  };
})();
