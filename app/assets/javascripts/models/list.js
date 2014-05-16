window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.board = options.board;
  },

  urlRoot: function () {
    return 'api/boards/' + this.board.get('id') + '/lists'
  },
})
