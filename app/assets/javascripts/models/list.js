window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.board = options.board;
  },

  urlRoot: 'api/boards/' + this.board.get('id') + '/lists'
})
