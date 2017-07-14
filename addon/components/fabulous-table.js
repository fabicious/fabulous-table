import Ember from 'ember';

export default Ember.Component.extend({
    classNames: 'fabulous-table',
    
    isLoading: false,
    offset: 0,
    
    sortDefinition: Ember.computed('orderBy', 'orderDirection', function() {
        return [`${this.get('orderBy')}:${this.get('orderDirection')}`];
    }),
    sortedModel: Ember.computed.sort('model', 'sortDefinition'),
    scrollContainer: Ember.computed('scrollSelector', function() {
        return Ember.$(this.get('scrollSelector'));
    }),
    
    didRender() {
        if (this.get('scrollSelector')) {
            this.bindScrollEvent();
        }
    },
    
    /**
     * Binds scroll event to scroll container
     *
     * @return {undefined}
     */
    bindScrollEvent() {
        this.get('scrollContainer').scroll(() => {
            if (this.isScrolledToBottom() && !this.get('isLoading')) {
                this.reachedBottom();
            }
        });
    },
    
    /**
     * Checks if the list scrolled to bottom
     *
     * @returns {boolean}
     */
    isScrolledToBottom() {
        let scrollContainerHeight = this.get('scrollContainer').outerHeight();
        let topOffsetOfScrollContainer = this.get('scrollContainer').offset().top;
        let topOffsetOfLastItem = this.$('.fabulous-row').last().offset().top;
        
        return topOffsetOfLastItem - topOffsetOfScrollContainer <= scrollContainerHeight;
    },
    
    /**
     * Fires event that list scrolled to bottom
     *
     * @return {undefined}
     */
    reachedBottom() {
        this.set('isLoading', true);
        
        let offset = this.get('offset') + this.get('limit');
        this.set('offset', offset);
        
        this.sendAction('scrolledToBottom', this.get('modelName'), {
            order: this.get('orderBy'),
            direction: this.get('orderDirection'),
            limit: this.get('limit'),
            offset: offset
        }, () => {
            this.set('isLoading', false);
        });
    },
    
    actions: {
        /**
         * Triggers action for clicked row
         *
         * @param {Object} item Item of row
         *
         * @return {undefined}
         */
        rowClicked(item) {
            this.sendAction('rowAction', item);
        },
        
        /**
         * Change order field or order direction
         *
         * @param {String} orderPath Field path by which will be sorted.
         *
         * @return {undefined}
         */
        orderBy(orderPath) {
            if (!orderPath) {
                return;
            }
            
            let sort = orderPath;
            
            let direction = 'asc';
            
            if (sort == this.get('orderBy') && this.get('orderDirection') != 'desc') {
                sort = '-' + sort;
                direction = 'desc';
            }
            
            this.set('offset', 0);
            
            this.sendAction('changedOrder', this.get('modelName'), {
                sort: sort,
                limit: this.get('limit'),
                offset: 0
            }, (orderBy) => {
                let orderDirection = 'asc';
                
                if (orderBy.indexOf('-') == 0) {
                    orderBy = orderBy.substr(1);
                    orderDirection = 'desc';
                }
                
                this.set('orderBy', orderBy);
                this.set('orderDirection', orderDirection);
            });
        }
    }
});
