import Ember from 'ember';

export default Ember.Component.extend({
    classNames: 'fabulous-table',
    classNameBindings: ['fixedClass'],
    tagName: 'div',
    
    /**
     * Computed property which sets the 'fixed-header' class.
     * @returns 'fixed-header' if this.get('fixedHeader') is set.
     */
    fixedClass: Ember.computed('fixedHeader', function() {
        return this.get('fixedHeader') ? 'fixed-header' : '';
    }),
    
    isLoading: false,
    offset: 0,
    
    sortDefinition: Ember.computed('orderBy', 'orderDirection', function() {
        return [`${this.get('orderBy')}:${this.get('orderDirection')}`];
    }),
    sortedModel: Ember.computed.sort('model', 'sortDefinition'),
    
    /**
     * Element which acts as infinite scroll container
     */
    scrollContainer: Ember.computed('scrollSelector', function() {
        return Ember.$(this.get('scrollSelector'));
    }),
    
    
    /**
     * Hook which gets call when the component is rendered successfully.
     */
    didRender() {
        if (this.get('scrollSelector')) {
            this.bindScrollEvent();
        }
        
        if (this.get('fixedHeader')) {
            this.duplicateTable();
        }
    },
    
    /**
     * Duplicates the table, put it in a container and insert that after the scrollable content.
     *
     * @return {undefined}
     */
    duplicateTable() {
        let original = this.$('table');
        let duplicate = original.clone();
        let container = $('<div></div>');
        
        container.toggleClass('fabulous-duplicate', true);
        container.append(duplicate);
        container.insertAfter('.fabulous-scrollable');
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
        let bottomSelector = this.get('noSpinner') ? '.fabulous-row' : '.spinner';
        let topOffsetOfLastItem = this.$(bottomSelector).last().offset().top;
        
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
            this.scaleFixedHeaders();
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
