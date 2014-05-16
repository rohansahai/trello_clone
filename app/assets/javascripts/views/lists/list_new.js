window.Trellino.Views.ListNew = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    "submit": "createNewList"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createNewList: function (event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var newModel = this.collection.create(formData, {
      success: function () {
        Trellino.router.navigate("boards/" + newModel.get('id'), {trigger: true});
      }
    });

  },
})
