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
    "click #delete-board": "deleteBoard"
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

    this.$el.find('.cards').sortable({
      connectWith: '.cards',
      update: function (event, ui) {
        var data = $(this).sortable('serialize', { key: "rank"});
        var dataNew = data.split("&rank=");
        var firstItem = (dataNew.shift()).split('rank=')[1];
        dataNew.unshift(firstItem);

        var listId = $(event.target).attr('data-list-id');
        var currentList = that.model.lists().get(listId);
        that.prevList = currentList;
        if (dataNew.length === 1){ return true } //if we move a card from one list to another we don't want to go through this
        currentList.cards().each(function(card){
          var newRank = dataNew.indexOf(card.id.toString());
          card.set('rank', newRank + 1);
          card.save();
        });
      },

      receive: function (event, ui){
        var data = $(this).sortable('serialize', { key: "rank"});
        var dataNew = data.split("&rank=");
        var firstItem = (dataNew.shift()).split('rank=')[1];
        dataNew.unshift(firstItem);
        var listId = $(event.target).attr('data-list-id');
        var currentList = that.model.lists().get(listId);
        var newCardId;

        if (currentList.cards().length === 0){ newCardId = dataNew[0] };

        for (var i = 0; i < currentList.cards().length; i++){
          for (var j = 0; j < dataNew.length; j++) {
            if (currentList.cards().models[i].id.toString() === dataNew[j]){
              dataNew.splice(j,1);
            }
          }
        }


        var newCard = that.prevList.cards().get(dataNew[0]); //new card from previous list
        that.prevList.cards().remove(newCard);
        newCard.set('list_id', currentList.id);
        currentList.cards().add(newCard);
        newCard.save();

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
