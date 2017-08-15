import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'i',
    classNames: 'icon',
    classNameBindings: ['iconClass', 'hideArrowClass'],
    
    iconClass: Ember.computed('orderDirection', function() {
        let upOrDown = this.get('orderDirection') == 'asc' ? 'down' : 'up';
        return 'ion-ios-arrow-' + upOrDown;
    }),
    
    hideArrowClass: Ember.computed('currentOrder', 'headerOrder', function() {
        return this.get('currentOrder') == this.get('headerOrder') ? '' : 'hide';
    })
});
