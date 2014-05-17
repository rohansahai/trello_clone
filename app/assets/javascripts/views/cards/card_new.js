window.Trellino.Views.CardNew = Backbone.View.extend({
  template: JST['cards/new'],

  events: {
    "submit": "createNewCard"
  },

  render: function () {
    this.$el.html(this.template({
      board: this.model
    }));
    return this;
  },

  createNewCard: function (event) {
    // event.preventDefault();
    // var that = this;
    // var formData = $(event.target).serializeJSON()['card'];
    // var card = new Trellino.Models.card(formData);
    //
    // card.list = Trellino.Boards.getOrFetch(this.model.get('id'))
    // card.save({}, {
    //   success: function () {
    //     that.collection.add(card);
    //     Trellino.router.navigate("boards/" + that.model.get('id'), {trigger: true});
    //   }
    // })

  },
})
