window.Trellino.Models.Card = Backbone.Model.extend({
  initialize: function (options) {
    this.list = options.list;
  },

  urlRoot: function () {
    return 'api/lists/' + this.list.get('id') + '/cards'
  },

  // methodUrl: {
  //   delete: function () {
  //     return 'api/cards/' + this.get('id')
  //   }
  // },
  //
  // sync: function(method, model, options) {
  //   if (model.methodUrl && model.methodUrl[method.toLowerCase()]) {
  //     options = options || {};
  //     options.url = model.methodUrl[method.toLowerCase()];
  //   }
  //   Backbone.sync(method, model, options);
  // }
})
