window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  events: {
    "submit": "createNewCard"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    var that = this;
    this.model.cards().each(function(card){
      that.addCard(card)
    });
  },

  render: function () {
    this.$el.html(this.template({
      list: this.model
    }));

    this.attachSubviews();
    return this;
  },

  addCard: function (card) {
    var cardShow = new Trellino.Views.CardShow({
      model: card,
    });

    this.addSubview(".cards", cardShow);
  },

  createNewCard: function(event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.target).serializeJSON()['card'];
    var card = new Trellino.Models.Card(formData);

    card.list = this.model;
    card.save({}, {
      success: function () {
        that.model.cards().add(card);
      }
    })
  }
})
