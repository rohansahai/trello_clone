window.Trellino.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  className: "card-li",
  tagName: "li",

  events: {
    "click .card-li" : "toggleDelete",
    "mouseover .card-li": "toggleDelete",
    "mouseleave .card-li": "toggleDelete",
    //"click .delete": "deleteCard"
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      card: this.model
    }));
    this.$el.attr('id', 'card-' + this.model.id);

    return this;
  },

  toggleDelete: function(event) {
    console.log(event);
    $(".delete").toggleClass("hide show");
  },

  deleteCard: function(event) {
    var that = this;

    this.model.destroy({
      success: function () {
        //that.model.lists().remove(that)
        that.render();
      }
    })
  }
})
