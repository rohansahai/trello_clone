window.Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  initialize: function (models, options) {
    this.board = options.board;
  },
  url: function () {
    return this.board.url() + "/lists";
  }
})
