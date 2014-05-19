window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  className: 'col-xs-3 board-list',
  tagName: 'li',
  events: {
    "submit": "createNewCard",
    "click .delete-list": "deleteList"
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

    this.$el.attr('id', 'list-' + this.model.id);
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
     var subview = _.find(
       this.subviews(".cards"),
       function (subview) {
         return subview.model === card;
       }
     );

     this.removeSubview(".cards", subview);
     debugger
   },

  createNewCard: function(event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.target).serializeJSON()['card'];
    var card = new Trellino.Models.Card(formData);
    card.list = this.model;
    this.model.cards().create(card);
    this.$('input[name=card\\[title\\]]').val("");
  },

  deleteList: function(event) {
    event.preventDefault();
    var that = this;
    this.model.destroy({
      success: function () {
        that.render();
      }
    })
  }
})
