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
    var listCollection = new Trellino.Collections.BoardLists([],{
      board: this.model
    });

    var listShow = new Trellino.Views.ListShow({
      model: list,
    });

    this.addSubview(".lists", listShow);
  }

})

//
//
// App.Views.TodosShow = Backbone.CompositeView.extend({
//   template: JST["todos/show"],
//
//   initialize: function () {
//     this.listenTo(this.model, "sync", this.render);
//     this.listenTo(
//       this.model.comments(), "add", this.addComment
//     );
//     this.listenTo(
//       this.model.comments(), "remove", this.removeComment
//     );
//
//     var commentNewView =
//       new App.Views.CommentsNew({ model: this.model });
//     this.addSubview(".comments-new", commentNewView);
//
//     this.model.comments().each(this.addComment.bind(this));
//   },
//
//   addComment: function (comment) {
//     var commentsShow =
//       new App.Views.CommentsShow({ model: comment });
//     this.addSubview(".comments", commentsShow);
//   },
//
//   removeComment: function (comment) {
//     var subview = _.find(
//       this.subviews(".comments"),
//       function (subview) {
//         return subview.model === comment;
//       }
//     );
//
//     this.removeSubview(".comments", subview);
//   },
//
//   render: function () {
//     var view = this;
//     var renderedContent = this.template({
//       todo: this.model
//     });
//
//     this.$el.html(renderedContent);
//     this.attachSubviews();
//
//     return this;
//   }
//});
