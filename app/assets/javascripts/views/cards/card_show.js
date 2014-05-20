window.Trellino.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  className: "card-li",
  tagName: "li",

  events: {
    "mouseover .card-div": "showDelete",
    "mouseleave .card-div": "hideDelete",
    "click .delete": "deleteCard"
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

  showDelete: function(event) {
    $(event.currentTarget.children).removeClass("hide");
  },

  hideDelete: function(event) {
    $(event.currentTarget.children).addClass("hide");
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
