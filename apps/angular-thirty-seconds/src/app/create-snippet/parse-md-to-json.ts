// @ts-ignore
window.Buffer = {from() {}};
// @ts-ignore
const matter = require('gray-matter');

function extractHeaders(str) {
  const match = ('\n' + str + '\n#')
    .match(/\n#+.*\n[\s\S]*?(?=\n#)/g);

  if (!match) {
    return {
      content: str,
    };
  }
  return match
    .reduce((result, a) => {
      const {groups} = a.match(/^\n(?<depth>#+)(?<header>.*)\n(?<content>[\s\S]*)$/);
      result[groups.header.trim().toLocaleLowerCase()] = groups.content.trim();
      return result;
    }, {});
}

export function parseMarkdown() {
  const snippet = `---
title: Accessing Enums in template
author: fetis
twitter: fetis26
level: beginner
tags:
  - enums
  - templates
---
# Content
Enums are great but they are not visible in Angular templates by default. 
With this little trick you can make them accessible.

\`\`\`typescript
enum Animals {
  DOG,
  CAT,
  DOLPHIN
}

@Component({
  ...
})
export class AppComponent {
  animalsEnum: typeof Animals = Animals;
}
\`\`\`

# ComponentCode
\`\`\`typescript
import { Component } from "@angular/core";

enum Animals {
  DOG,
  CAT,
  DOLPHIN
}

@Component({
  selector: "my-app",
  template: \`<div *ngIf="value === animalsEnum.CAT">meow</div>\`,
})
export class AppComponent {
  value: Animals = Animals.CAT;
  animalsEnum: typeof Animals = Animals;
}
\`\`\``;


  const result = matter(snippet);
  console.log({...extractHeaders(result.content), ...result.data});

}

