var self,
    FINDING_CLASS = 'finding';

Template.home.created = function() {
    self = this;
}

Template.home.rendered = function() {
    self.finder     = self.$('.find-group'),
    self.nameInput  = self.$('.name');
    $('.submit')
        .on('vmousedown', findGroupMemebers)
        .on('vmouseup',   stopFindingGroupMembers);
}
 
Template.home.events({
    'mouseup .submit, mouseout .submit': stopFindingGroupMembers
});


function findGroupMemebers(event) {
    event.preventDefault();
    if (!self.nameInput.val()) return issueNonameInputAlert();
    self.finder.addClass(FINDING_CLASS);

}

function stopFindingGroupMembers() {
    self.finder.removeClass(FINDING_CLASS);
}

function issueNonameInputAlert() {
    self.finder.addClass('error');
    clearTimeout(self.errorTimer);
    self.errorTimer = setTimeout(function() {
        self.finder.removeClass('error');
    }, 1000);
}