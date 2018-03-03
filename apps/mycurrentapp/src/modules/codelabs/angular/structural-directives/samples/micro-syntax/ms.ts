import * as code from './code';

export function parseTemplate(template: string) {
  const x = template.match(/<([^ ]+)\s+\*(\w+)\s*="([^"]+)"\s*>([\s\S]*)<\/\w+>/);
  if (x) {
    const [_, tag, directive, value, contents] = x;
    return `<ng-template [${directive}]="${value}">
  <${tag}>${contents}</${tag}>
</ng-template>`;
  }
}

const pre = document.createElement('pre');
document.body.appendChild(pre);
pre.innerText = parseTemplate(code.app_html);
