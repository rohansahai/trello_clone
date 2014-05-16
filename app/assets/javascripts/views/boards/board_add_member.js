window.Trellino.Views.BoardAddMember = Backbone.View.extend({
  template: JST['boards/add_member'],

  events: {
    "submit": "addNewMember"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  addNewMember: function (event) {
    event.preventDefault();
    //var formData = $(event.target).serializeJSON();
    var userEmail = $('#new-member-email').val();
    this.model.save({newMemberEmail: userEmail},{
      success: function () {
        alert('Your Member has added');
      }
    })
  },
})
