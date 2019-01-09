/*jshint esversion: 6 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'td',
    classNames: 'fabulous-cell',
    classNameBindings: ['cellClass'],

    click(event) {
        if (this.get('preventPropagation')) {
            event.stopPropagation();
        }
    }
});
