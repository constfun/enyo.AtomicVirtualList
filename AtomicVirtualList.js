/*
 * A VirtualList that allows invalidation of a single row and has a function to reveal a particular item.
 */
enyo.kind({
        name: 'enyo.AtomicVirtualList',
        kind: 'VirtualList',

        invalidateRow: function(index) {

                var node = this.$.list.fetchRowNode(index);
                if( !node || !node.parentNode ) {
                        return;
                }

                var newHtml = this.$.list.generateRow(index);
                if( !newHtml ) {
                        return;
                }

                node.parentNode.innerHTML = newHtml;
        },

        revealItem: function(index) {

                var scrollStrategy = this.$.scroller.$.scroll;
                scrollStrategy.stop();

                var listHeight = this._getListHeight();
                var itemHeight = this._getItemHeight();
                if( !listHeight || !itemHeight ) {
                        return;
                }

                // When scrolling down scrollStrategy y becomes more negative.
                // In fact, y is always negative unless we scroll up from the initial
                // position of the list, which is not typically done.
                var neededY = -(index * itemHeight);
                // We want our revealed item to be in the middle of the list.
                neededY += (listHeight/2 - itemHeight/2);
                // We can't reliably know how many items the list has, so we cant anticipate
                // if we will overshoot scrolling down, but if scrolling up, we can compensate.
                // This has the additional benefit of not bouncing a short list for no reason.
                neededY = Math.min(neededY, 0);

                var currentY = Math.round(scrollStrategy.y);

                var deltaY = neededY - currentY;

                scrollStrategy.flick({
                        yVel: deltaY * 3,
                });
        },

        _getListHeight: function() {
                if( this._listHeight !== undefined ) {
                        return this._listHeight;
                }

                if( !this.hasNode() ) {
                        return;
                }

                this._listHeight = this.node.offsetHeight;
                return this._listHeight;
        },

        _getItemHeight: function() {
                if( this._itemHeight !== undefined ) {
                        return this._itemHeight;
                }

                if( !this.hasNode() ) {
                        return;
                }

                var itemNode = this.node.querySelector('.page');
                if( !itemNode ) {
                        return;
                }

                if( !itemNode.offsetHeight ) {
                        return;
                }

                this._itemHeight = itemNode.offsetHeight;
                return this._itemHeight;
        },
});
