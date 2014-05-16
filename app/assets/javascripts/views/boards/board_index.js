window.Trellino.Views.BoardIndex = Backbone.View.extend({
  template: JST['boards/index'],

  render: function() {
    this.$el.html(this.template({
      boards: this.collection
    }))

    return this;
  },
})
