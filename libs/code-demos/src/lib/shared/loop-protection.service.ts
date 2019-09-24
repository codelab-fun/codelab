import { Injectable } from '@angular/core';
import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';
const ts = getTypeScript();

@Injectable()
export class LoopProtectionService {
  public static loopBreaker = `// Breaks out of infinite loops.
const loopBreaker = (function(){
  let iterationsLeft = 100;
  return function(){
    iterationsLeft--;
    if(iterationsLeft === 0){
      throw new Error("Infinite loop detected");
    }
  }
}());
      `;

  constructor() {}

  findAllLoops(source) {
    const messages = [];

    function extractLoops(node) {
      if (
        node.kind === ts.SyntaxKind.WhileStatement ||
        node.kind === ts.SyntaxKind.DoStatement ||
        node.kind === ts.SyntaxKind.ForStatement
      ) {
        const statement = node.statement;
        messages.push({
          start: statement.getStart(source),
          end: statement.getEnd(),
          text: source.text.substring(
            statement.getStart(source),
            statement.getEnd()
          )
        });
      }

      ts.forEachChild(node, extractLoops);
    }

    extractLoops(source);

    return messages;
  }

  protect(filename: string, code: string) {
    if (filename.indexOf('.ts') < 0) {
      return code;
    }
    const source = ts.createSourceFile(filename, code, ts.ScriptTarget.ES5);
    const messages = this.findAllLoops(source);
    const replacementsReversed = messages.reverse();
    for (const { start, end, text } of replacementsReversed) {
      const replacement =
        text.slice(0, 1) === '{'
          ? `{loopBreaker();${text.slice(1)}`
          : `{loopBreaker();${text}}`;

      code = code.slice(0, start) + replacement + code.slice(end);
    }
    if (messages.length > 0) {
      code = LoopProtectionService.loopBreaker + code;
    }
    return code;
  }
}
