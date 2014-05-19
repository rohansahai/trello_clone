window.Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    //this.listenTo(this.model.lists(), 'sync', this.render);
    this.listenTo(this.model.lists(), 'remove', this.removeList);
    this.listenTo(this.model.lists(), 'add', this.addList);
    var that = this;
    this.model.lists().sort();
    this.model.lists().each(function(list){
      that.addList(list)
    });

  },

  events: {
    "click #delete-board": "deleteBoard",
  },

  template: JST['boards/show'],

  render: function () {
    var that = this;

    this.$el.html(this.template({
      board: this.model
    }));

    var addMemberView = new Trellino.Views.BoardAddMember({
      model: this.model
    })
    this.$el.append(addMemberView.render().$el);
    this.attachSubviews();

    $('.lists').sortable({
      axis: 'x',
      update: function (event, ui) {
          var data = $(this).sortable('serialize', { key: "rank"});
          var dataNew = data.split("&rank=");
          var firstItem = (dataNew.shift()).split('rank=')[1];
          dataNew.unshift(firstItem);
          that.model.lists().each(function(list){
            var newRank = dataNew.indexOf(list.id.toString());
            list.set('rank', newRank + 1);
            list.save();
          });
      }
    });


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

  removeList: function (list) {
    var subview = _.find(
      this.subviews(".lists"),
      function (subview) {
        return subview.model === list;
      }
    );
    list.board = this.model;
    this.model.lists().remove(list);
    this.removeSubview(".lists", subview);
  },

})
