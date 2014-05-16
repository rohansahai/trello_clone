window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.board = options.board;
  },

  urlRoot: function () {
    return 'api/boards/' + this.board.get('id') + '/lists'
  },

  cards: function () {
    this._cards = this._cards ||
      new Trellino.Collections.ListCards([], { list: this });
    return this._cards;
  },

  parse: function (payload) {
    if (payload.cards) {
      this.cards().set(payload.cards, { parse: true });
      delete payload.cards;
    }

    return payload;
  }
})
