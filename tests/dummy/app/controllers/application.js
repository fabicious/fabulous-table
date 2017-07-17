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
            let reverse = options.sort.indexOf('-') == 0;
            let sortKey = reverse ? options.sort.substr(1) : options.sort;
            let sortedUsers = this.get('users').sort((a, b) => {
                if (a[sortKey] > b[sortKey]) {
                    return reverse ? -1 : 1;
                } else if (a[sortKey] < b[sortKey]) {
                    return reverse ? 1 : -1;
                }
    
                return 0;
            });
            
            this.set('users', sortedUsers);
            
            sortingDone(options.sort);
        },
    
        showUserName(user) {
            alert(user.firstname + ' ' + user.surname);
        }
    }
});
