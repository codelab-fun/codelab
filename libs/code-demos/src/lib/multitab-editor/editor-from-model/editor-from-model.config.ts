
export class DefaultMonacoEditorConfig {
  wrappingColumn = 10;
  model = null;
  scrollBeyondLastLine = false;
  tabCompletion = true;
  wordBasedSuggestions = true;
  lineNumbersMinChars = 3;
  cursorBlinking = 'phase';
  renderIndentGuides = false;
  lineNumbers = false;
  automaticLayout = true;
  fontSize = '12px';
  fixedOverflowWidgets = true;
  minimap = {
    enabled: false
  };
  contextmenu = false;

  constructor(config: Partial<DefaultMonacoEditorConfig> & { model: any }) {
    Object.keys(config)
      .filter(key => this.hasOwnProperty(key))
      .forEach(key => {
        this[key] = config[key];
      });
  }
}

export function generateMonacoEditorConfig(
  config: Partial<DefaultMonacoEditorConfig> & { model: any }
) {
  return new DefaultMonacoEditorConfig(config);
}
