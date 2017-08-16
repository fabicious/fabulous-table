import Ember from 'ember';

export default Ember.Controller.extend({
    users: [
        {
            firstname: 'Jonathan',
            surname: 'O\'Neill',
            nickname: 'Jack'
        },
        {
            firstname: 'Samantha',
            surname: 'Carter',
            nickname: 'Sam'
        },
        {
            firstname: 'Daniel',
            surname: 'Jackson'
        },
        {
            firstname: 'Teal\'c'
        },
        {
            firstname: 'George',
            surname: 'Hammond',
            nickname: 'Hammond from Texas'
        }
    ],
    
    actions: {
        findUsers(modelName, options, sortingDone) {
            sortingDone(options.sort);
        },
    
        showUserName(user) {
            alert(user.firstname + ' "' + user.nickname + '" ' + user.surname);
        }
    }
});
