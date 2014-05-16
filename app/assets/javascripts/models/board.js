window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',

  lists: function () {
    this._lists = this._lists ||
      new App.Collections.BoardLists([], { board: this });
    return this._lists;
  },
})
