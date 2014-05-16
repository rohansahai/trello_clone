window.Trellino.Collections.ListCards = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.list = options.list;
    this.comparator = 'rank';
  },

  model: Trellino.Models.Card,

  url: function () {
    return this.list.url() + "/cards";
  }
})
