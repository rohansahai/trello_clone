window.Trellino.Views.BoardShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'sync remove', this.render);
  },

  events: {
    "click #delete-board": "deleteBoard"
  },

  template: JST['boards/show'],

  render: function () {
    this.$el.html(this.template({
      board: this.model
    }));

    var addMemberView = new Trellino.Views.BoardAddMember({
      model: this.model
    })
    this.$el.append(addMemberView.render().$el);

    return this;
  },

  deleteBoard: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Trellino.router.navigate("", { trigger: true});
      }
    });
  }
})
