window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
    "boards/:id/new_list": "listNew"
  },

  initialize: function (options) {
    this.$context = options.context;
    Trellino.Boards.fetch();
  },

  boardIndex: function () {
    var that = this;
    var view = new Trellino.Views.BoardIndex({
      collection: Trellino.Boards
    });
    that._swapView(view);
  },

  boardNew: function () {
    var view = new Trellino.Views.BoardNew({
      collection: Trellino.Boards
    });
    this._swapView(view);
  },

  boardShow: function (id) {
    var model = Trellino.Boards.getOrFetch(id);
    var view = new Trellino.Views.BoardShow({
      model: model
    });
    this._swapView(view);
  },

  listNew: function (id) {
    var model = Trellino.Boards.getOrFetch(id);
    var view = new Trellino.Views.ListNew({
      model: model,
    });
    this._swapView(view);
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    this.$context.html(newView.render().$el);

    this.currentView = newView;
  }
})
