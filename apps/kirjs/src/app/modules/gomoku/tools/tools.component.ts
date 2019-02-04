import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Highlights } from '../highlights';

@Component({
  selector: 'kirjs-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  @Input() game;
  @Input() highlights;

  tools = [
    {
      name: 'next',
      action: function(point, game) {
        game.moveTo(point);
      },
      init: function() {
        return this;
      }
    },
    {
      name: 'red-maybe',
      action: function(point, game, highlights) {
        highlights.toggle(point, 'highlight-transparent cell-2');
      },
      init: function() {
        return this;
      }
    },
    {
      name: 'black-maybe',
      action: function(point, game, highlights) {
        highlights.toggle(point, 'highlight-transparent cell-1');
      },
      init: function() {
        return this;
      }
    },
    {
      name: 'highlight',
      action: function(point, game, highlights) {
        highlights.toggle(point, 'highlight-yellow');
      },
      init: function() {
        return this;
      }
    },
    {
      name: 'highlight2',
      action: function(point, game, highlights: Highlights) {
        highlights.toggle(point, 'highlight-orange');
      },
      init: function() {
        return this;
      }
    },
    {
      name: 'clear',
      action: function(point, game, highlights) {
        highlights.clear(point);
      },
      init: function() {
        return this;
      }
    },
    {
      name: 'clear-all',
      init: function(game, highlights: Highlights) {
        highlights.clear();
      }
    },
    {
      name: 'undo',
      init: function(game, highlights: Highlights) {
        highlights.undo();
      }
    },
    {
      name: 'redo',
      init: function(game, highlights: Highlights) {
        highlights.redo();
      }
    }
  ];
  selectedTool: any;

  @HostListener('window:keydown', ['$event.keyCode'])
  shortcut(a: number) {
    if (a >= 48 && a <= 57) {
      this.handle(this.tools[a - 49]);
    }
  }

  handle(tool) {
    const selected = tool.init(this.game, this.highlights);

    if (selected) {
      this.selectedTool = tool;
    }
  }

  constructor() {
    this.selectedTool = this.tools[0];
  }

  ngOnInit() {}
}
