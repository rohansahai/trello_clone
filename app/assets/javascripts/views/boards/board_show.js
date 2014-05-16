window.Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
})
