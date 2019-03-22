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
            console.log(user.firstname + ' "' + user.nickname + '" ' + user.surname);
        },

        clickedButton() {
            console.log('Thank you');
        },

        loadUsers(modelName, sorting, done) {
            setTimeout(() => {
                done();
            }, 1000);
        }
    }
});
