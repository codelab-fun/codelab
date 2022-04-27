import MediumEditor from 'medium-editor';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';

rangy.init();

export const AsideButton = MediumEditor.extensions.button.extend({
  name: 'aside',

  tagNames: ['aside'], // nodeName which indicates the button should be 'active' when isAlreadyApplied() is called
  contentDefault: '<b>A</b>', // default innerHTML of the button
  contentFA: '<i class="fa fa-paint-brush"></i>', // innerHTML of button when 'fontawesome' is being used
  aria: 'Highlight', // used as both aria-label and title attributes
  action: 'highlight', // used as the data-action attribute of the button

  init: function () {
    MediumEditor.extensions.button.prototype.init.call(this);

    this.classApplier = rangy.createClassApplier('highlight', {
      elementTagName: 'aside',
      normalize: true,
    });
  },

  handleClick: function (event) {
    this.classApplier.toggleSelection();
    this.base.checkContentChanged();
  },
});
