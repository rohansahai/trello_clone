window.Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'sync remove', this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    var that = this;
    this.model.lists().each(function(list){
      that.addList(list)
    });

  },

  events: {
    "click #delete-board": "deleteBoard",
    "mouseover .card": "toggleDelete",
    "mouseleave .delete": "toggleDelete"
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
    this.attachSubviews();
    return this;
  },

  deleteBoard: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Trellino.router.navigate("", { trigger: true});
      }
    });
  },

  addList: function (list) {
    var listShow = new Trellino.Views.ListShow({
      model: list,
    });

    this.addSubview(".lists", listShow);
  },

  toggleDelete: function(event) {
    $(event.target).parent().children().toggleClass("hide show");
  },

})
