window.Trellino.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  initialize: function () {
    //this.listenTo(this.model.comments(), "add", this.addComment);
  },

  render: function () {
    this.$el.html(this.template({
      card: this.model
    }));

    return this;
  },
})
