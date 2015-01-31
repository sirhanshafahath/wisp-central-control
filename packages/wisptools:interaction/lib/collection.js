WtInteraction = new Mongo.Collection('wt_interactions');

WtInteraction.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update: function(userId, doc) {
    return !! userId;
  }
});

WtInteraction.new = function (data) {
  var user = Meteor.user();
  check(user.username, String);
  check(data, {type: String});

    var interaction = _.extend(data, {
        c_date: new Date(),
        c_user_id: user._id,
        c_user: user.username        
    });
    interaction._id = this.insert(interaction);
    return interaction;

}

WtInteraction.updateFeild = function (id, data) {
  this.update({_id: id}, {$set: data});
}
