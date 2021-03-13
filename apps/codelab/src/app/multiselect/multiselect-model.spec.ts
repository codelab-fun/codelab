import { MultiselectModel } from './multiselect-model';

describe('MultiselectModel', () => {
  let model: MultiselectModel<string>;

  const item1 = 'a';
  const item2 = 'b';

  const items = [item1, item2, 'c', 'd', 'e'];

  beforeEach(() => {
    model = new MultiselectModel();

    model.setItems(items);
  });

  describe('single selections', () => {
    it('has empty selection initially', () => {
      expect(model.selected).toEqual([]);
    });

    it('allows to select single element', () => {
      model.toggleSingle(item1);

      expect(model.selected).toEqual([item1]);
    });

    it('allows to deselect single element', () => {
      model.toggleSingle(item1);
      model.toggleSingle(item1);

      expect(model.selected).toEqual([]);
    });

    it('allows to reselect single element', () => {
      model.toggleSingle(item1);
      model.toggleSingle(item2);
      model.toggleSingle('c');
      model.toggleSingle(item2);

      expect(model.selected).toEqual([item1, 'c']);
    });

    it('allows to force select single element', () => {
      model.toggleSingle(item1);
      model.selectSingle(item2);

      expect(model.selected).toEqual([item2]);
    });
  });

  describe('selecting with shift', () => {
    it('allows to select multiple elements', () => {
      model.toggleSingle(item1);
      model.toggleContinuous('c');

      expect(model.selected).toEqual([item1, item2, 'c']);
    });

    it('allows to deselect multiple elements', () => {
      model.toggleSingle(item1);
      model.toggleSingle(item2);
      model.toggleSingle('c');
      model.toggleContinuous(item1);

      expect(model.selected).toEqual([]);
    });

    it('allows multiple selections and reselections', () => {
      model.toggleSingle(item1);
      model.toggleContinuous('e');

      expect(model.selected).toEqual([item1, item2, 'c', 'd', 'e']);

      model.toggleContinuous(item2);

      expect(model.selected).toEqual([item1]);

      model.toggleContinuous('d');

      expect(model.selected).toEqual([item1, item2, 'c', 'd']);
    });

    it('allows for selections in different directions', () => {
      model.toggleSingle('c');
      model.toggleContinuous('e');

      expect(model.selected).toEqual(['c', 'd', 'e']);

      model.toggleContinuous(item1);

      expect(model.selected).toEqual(['c', 'd', 'e', 'a', 'b']);
    });

    it('when handling gap selections, sets the value to the latest checked item', () => {
      model.toggleSingle(item1);
      model.toggleSingle('c');
      model.toggleSingle('e');
      model.toggleContinuous('c');

      expect(model.selected).toEqual([item1]);
    });
  });

  describe('toggleAll', () => {
    it('when nothing selected, selects everything', () => {
      model.toggleAll();

      expect(model.selected).toEqual([item1, item2, 'c', 'd', 'e']);
    });

    it('when some thing selected, selects everything', () => {
      model.toggleSingle(item1);
      model.toggleAll();

      expect(model.selected).toEqual([item1, item2, 'c', 'd', 'e']);
    });

    it('when everything selected, deselects everything', () => {
      model.toggleAll();
      model.toggleAll();

      expect(model.selected).toEqual([]);
    });
  });

  describe('clearAll', () => {
    it('selection is empty after clear', () => {
      model.clear();

      expect(model.selected).toEqual([]);
      expect(model.isEmpty()).toEqual(true);
    });

    it('drops the selection when some thing selected', () => {
      model.toggleSingle(item1);
      model.clear();

      expect(model.selected).toEqual([]);
    });
  });

  describe('getSelectedIndexes', () => {
    it('returns selected indexes', () => {
      model.toggleSingle(item1);

      expect(model.getSelectedIndexes()).toEqual([0]);

      model.clear();

      expect(model.getSelectedIndexes()).toEqual([]);

      model.toggleSingle('e');
      model.toggleContinuous('c');

      expect(model.getSelectedIndexes()).toEqual([4, 2, 3]);
    });
  });

  describe('emitChangeEvent', () => {
    it('should emit change event after selection', done => {
      const subscription = model.changed.subscribe(changes => {
        expect(changes).toEqual([item1]);
        done();
      });

      model.toggleSingle(item1);

      subscription.unsubscribe();
    });
  });
});
