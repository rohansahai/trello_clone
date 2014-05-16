window.Trellino.Models.Card = Backbone.Model.extend({
  initialize: function (options) {
    this.list = options.list;
  },

  urlRoot: function () {
    return 'api/lists/' + this.list.get('id') + '/cards'
  },
})
