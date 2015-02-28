var self,
    FINDING_CLASS = 'finding';

Template.home.created = function() {
    self = this;
}

Template.home.rendered = function() {
    self.finder = self.$('.find-group'),
    self.input  = self.$('input');
}
 
Template.home.events({
    'mousedown button': findGroupMemebers,
    'mouseup button, mouseout button': stopFindingGroupMembers
});


function findGroupMemebers() {
    if (!self.input.val()) return 
    self.finder.addClass(FINDING_CLASS);
}

function stopFindingGroupMembers() {
    self.finder.removeClass(FINDING_CLASS);
}