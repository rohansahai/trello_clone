window.Trellino.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  events: {
    "click .card": "showDeleteButton"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      card: this.model
    }));

    return this;
  },

  showDeleteButton: function (event) {
    alert('ok great');
    console.log(event);
  }
})
