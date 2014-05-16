window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
    "boards/:id/new_list": "listNew"
  },

  initialize: function (options) {
    this.$context = options.context;
  },

  boardIndex: function () {
    var that = this;
    Trellino.Boards.fetch({
      success: function () {
        var view = new Trellino.Views.BoardIndex({
          collection: Trellino.Boards
        });
        that.$context.html(view.render().$el);
      }
    })
  },

  boardNew: function () {
    var view = new Trellino.Views.BoardNew({
      collection: Trellino.Boards
    });
    this.$context.html(view.render().$el);
  },

  boardShow: function (id) {
    var model = Trellino.Boards.getOrFetch(id);
    var view = new Trellino.Views.BoardShow({
      model: model
    });

    this.$context.html(view.render().$el);
  },

  listNew: function (id) {
    var model = Trellino.Boards.getOrFetch(id);
    //async issues?
    var listCollection = new Trellino.Collections.BoardLists([],{
      board: model
    });
    var view = new Trellino.Views.ListNew({
      model: model,
      collection: listCollection
    });
    this.$context.html(view.render().$el);
  }
})
