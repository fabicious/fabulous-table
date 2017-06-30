import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    classNames: 'fabulous-cell',
    classNameBindings: ['cellClass']
});
