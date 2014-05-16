window.Trellino.Collections.BoardLists = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.board = options.board;
    this.comparator = 'rank';
  },

  model: Trellino.Models.List,
  
  url: function () {
    return this.board.url() + "/lists";
  }
})
