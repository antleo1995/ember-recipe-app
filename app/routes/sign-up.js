import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      if(credentials.password !== credentials.passwordConfirmation) {
         this.get('flashMessages')
        .danger('Passwords do not match');
      }
      else {
              if (!credentials.password || !credentials.passwordConfirmation){
                this.get('flashMessages')
               .danger('Passwords are blank');
             } else {
               this.get('auth').signUp(credentials)
               .then(() => this.get('auth').signIn(credentials))
               .then(() => this.transitionTo('application'))
               .then(() => {
                 credentials = {};
               })
               .then(() => {
                 this.get('flashMessages')
                 .success('Successfully signed-up! You have also been signed-in.');
               })
               .catch(() => {
                 this.get('flashMessages')
                 .danger('There was a problem. Please try again.');
               });
             }
      }

    },
  },
});
