window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Trellino.router = new Trellino.Routers.AppRouter({context: $('#content')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});
