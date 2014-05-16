window.Trellino.Views.ListNew = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    "submit": "createNewList"
  },

  render: function () {
    this.$el.html(this.template({
      board: this.model
    }));
    return this;
  },

  createNewList: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.target).serializeJSON()['list'];
    var list = new Trellino.Models.List(formData);

    list.board = Trellino.Boards.getOrFetch(this.model.get('id'))
    list.save({}, {
      success: function () {
        that.collection.add(list);
        Trellino.router.navigate("boards/" + that.model.get('id'), {trigger: true});
      }
    })

  },
})
