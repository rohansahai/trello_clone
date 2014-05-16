window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: Trellino.Models.Board,
  getOrFetch: function (id) {
    var boards = this;
    var model;
    if (model = this.get(id)) {
      model.fetch();
    } else {
      model = new NewReader.Models.FeedModel({id: id});
      model.fetch({
        success: function () {
          boards.add(model)
        }
      });
    }

    return model;
  },

})
