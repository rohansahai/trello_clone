window.Trellino.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  events: {
    "mouseover .card": "toggleDelete",
    "mouseleave .delete": "toggleDelete",
    "click .delete": "deleteCard"
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "remove", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      card: this.model
    }));

    return this;
  },

  toggleDelete: function(event) {
    $(event.target).parent().children().toggleClass("hide show");
  },

  deleteCard: function(event) {
    var that = this;

    $.ajax({
      method: 'DELETE',
      url: '/api/cards/' + this.model.get('id'),
      success: function(){
        that.collection.remove(that.model);
        alert('great');
      }
    });

    // this.model.destroy({
    //   success: function () {
    //     //that.model.lists().remove(that)
    //     that.render();
    //   }
    // })
  }
})
