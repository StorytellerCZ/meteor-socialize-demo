import { Meteor } from 'meteor/meteor';
import { User } from 'meteor/socialize:user-model';
import { UserPresence } from 'meteor/socialize:user-presence';
import SimpleSchema from 'simpl-schema';


const StatusSchema = new SimpleSchema({
    status: {
        type: String,
        optional: true,
        allowedValues: ['online', 'idle'],
    },
    lastOnline: {
        type: Date,
        optional: true,
    },
});

User.attachSchema(StatusSchema);

UserPresence.onCleanup(function onCleanup(sessionIds) {
    if (!sessionIds) {
        Meteor.users.update({}, { $unset: { status: true } }, { multi: true });
    }
});

UserPresence.onUserOnline(function onUserOnline(userId) {
    Meteor.users.update(userId, { $set: { status: 'online', lastOnline: new Date() } });
});

UserPresence.onUserIdle(function onUserIdle(userId) {
    Meteor.users.update(userId, { $set: { status: 'idle' } });
});

UserPresence.onUserOffline(function onUserOffline(userId) {
    Meteor.users.update(userId, { $unset: { status: true } });
});