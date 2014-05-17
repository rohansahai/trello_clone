window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  intialize: function () {
    this.listenTo(this.model.comments(), "add", this.addComment);
    var that = this;
    this.model.comments().each(function(list){
      that.addComment(comment)
    });
  },

  render: function () {
    this.$el.html(this.template({
      list: this.model
    }));

    this.attachSubviews();
    return this;
  },

  addComment: function (list) {
    var commentCollection = new Trellino.Collections.ListComments([],{
      board: this.model
    });
    //THIS IS ALL FUCKED

    var listShow = new Trellino.Views.ListShow({
      model: list,
    });

    this.addSubview(".lists", listShow);
  }
})
