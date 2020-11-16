export const testSnippetMd = `---
title: title
author: author
twitter: kirjs
level: intermediate
links:
- gogel.com
- 123.com
tags:
- tip
---
# Content
Content

# Bonus
Wow bonus

# file:app.component.ts
\`\`\`typescript
import { Component } from '@angular/core';
 @Component({
  selector: 'my-app',
  templateUrl: './app.svg'
})
export class AppComponent {}
\`\`\`
# file:app.svg
\`\`\`svg
<circle r=100 fill=red></circle>
\`\`\`
`;

export const testSnippetParsed = {
  content: 'Content',
  bonus: 'Wow bonus',
  'file:app.component.ts':
    "```typescript\nimport { Component } from '@angular/core';\n @Component({\n  selector: 'my-app',\n  templateUrl: './app.svg'\n})\nexport class AppComponent {}\n```",
  'file:app.svg': '```svg\n<circle r=100 fill=red></circle>\n```',
  title: 'title',
  author: 'author',
  twitter: 'kirjs',
  level: 'intermediate',
  links: ['gogel.com', '123.com'],
  tags: ['tip'],
  demo: {
    'app.component.ts':
      "import { Component } from '@angular/core';\n @Component({\n  selector: 'my-app',\n  templateUrl: './app.svg'\n})\nexport class AppComponent {}",
    'app.module.ts':
      "import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { AppComponent } from './app.component';\n" +
      '\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {}',
    'main.ts':
      "import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport { AppModule } from './app.module';\n\nplatformBrowserDynamic().bootstrapModule(AppModule);\n",
    'index.html': '<my-app></my-app>',
    'app.svg': '<circle r=100 fill=red></circle>'
  }
};

export const testSnippetMinimal = `---
title: title
author: author
twitter: kirjs
level: intermediate
tags:
- tip
---
# Content
Content`;

export const testSnippetEdgeCases = `---
title: title
author: author
twitter: kirjs
level: intermediate
tags:
- tip
---
# Content
Content

# file: app.svg
\`\`\`svg
<circle r=100 fill=red></circle>
\`\`\`
`;
