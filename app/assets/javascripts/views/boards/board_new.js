window.Trellino.Views.BoardNew = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    "submit": "createNewForm"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createNewForm: function (event) {
    event.preventDefault();
    debugger
    var formData = $(event.target).serializeJSON();
    this.collection.create(formData);
    Trellino.router.navigate("", {trigger: true});
  },
})
