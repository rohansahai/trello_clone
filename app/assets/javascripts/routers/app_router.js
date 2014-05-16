window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/new": "boardNew"
  },

  initialize: function (options) {
    this.$context = options.context;
    this.boardsCollection = new Trellino.Collections.Boards();
  },

  boardIndex: function () {
    var that = this;
    this.boardsCollection.fetch({
      success: function () {
        var view = new Trellino.Views.BoardIndex({
          collection: that.boardsCollection
        });
        that.$context.html(view.render().$el);
      }
    })
  },

  boardNew: function () {
    var view = new Trellino.Views.BoardNew({
      collection: this.boardsCollection
    });
    this.$context.html(view.render().$el);
  }
})
