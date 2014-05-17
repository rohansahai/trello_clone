window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  initialize: function () {
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
    var cardCollection = new Trellino.Collections.ListCards([],{
      model: card
    });

    var cardShow = new Trellino.Views.CardShow({
      model: card,
    });

    this.addSubview(".cards", cardShow);
  }
})
