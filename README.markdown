### What is it?

This is ye normal enyo.VirtualList with two additional, and very handy, methods: _invalidateRow_ and _revealItem_.

_invalidateRow(index)_ is analogous to VirtualList.refresh(), but will only redraw the row at _index_. This is very handy when you have many updates to a single row and refreshing the entire list, every time, is too costly.

_revealItem(index)_ is analogous to Mojo.List.revealItem(). Calling this method will scroll the list just enough to smoothly stop when the item at _index_ reaches the middle of the list. Enyo VirtualList has, odly, ommited this very useful method.

### How do I use it?

Exactly the same as a VirtualList except you have two additional methods.

    components: [
    {
        name: 'list'
        kind: 'AtomicVirtualList'
    },

    refreshRow: function(index) {

        this.$.list.invalidateRow(index);
    },

    scrollToItemNicely: function(index) {

        this.$.list.revealItem(index);
    },
