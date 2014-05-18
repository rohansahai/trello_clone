window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.board = options.board;
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
  },
  url: function () {
    if (this.id) {
      return "/api/lists/" + this.id
    } else {
      return "/api/boards/" + this.board.id + "/lists"
    }
  }
})
