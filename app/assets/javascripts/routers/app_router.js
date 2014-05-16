window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex"
  },
  initialize: function (options) {
    this.$context = options.context;
  },
  boardIndex: function () {
    var that = this;
    var boardsCollection = new Trellino.Collections.Boards();
    boardsCollection.fetch({
      success: function () {
        var view = new Trellino.Views.BoardIndex({
          collection: boardsCollection
        });
        that.$context.html(view.render().$el);
      }
    })
  },
})
