window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',

  lists: function () {
    this._lists = this._lists ||
      new Trellino.Collections.BoardLists([], { board: this });
    return this._lists;
  },

  parse: function (payload) {
    if (payload.lists) {
      this.lists().set(payload.lists, { parse: true });
      delete payload.lists;
    }

    return payload;
  }
})
