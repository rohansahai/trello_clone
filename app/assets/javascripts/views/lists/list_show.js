window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  events: {
    "submit": "createNewCard"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
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
      collection: this.model.cards()
    });

    this.addSubview(".cards", cardShow);
  },

   removeCard: function (card) {
     console.log('here');
     var subview = _.find(
       this.subviews(".cards"),
       function (subview) {
         return subview.model === card;
       }
     );

     this.removeSubview(".card", subview);
   },

  createNewCard: function(event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.target).serializeJSON()['card'];
    var card = new Trellino.Models.Card(formData);
    this.model.cards().create(card);
  }
})
