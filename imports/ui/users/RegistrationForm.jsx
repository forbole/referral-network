import { Accounts, STATES } from 'meteor/std:accounts-ui';

export class RegistrationForm extends Accounts.ui.LoginForm {
  fields() {
    const { formState } = this.state;
    if (formState == STATES.SIGN_UP) {
      return {
        firstname: {
          id: 'firstname',
          hint: 'Enter firstname',
          label: 'First Name',
          onChange: this.handleChange.bind(this, 'firstname'),
          required: true
        },
        lastname: {
          id: 'lastname',
          hint: 'Enter lastname',
          label: 'Last Name',
          onChange: this.handleChange.bind(this, 'lastname'),
          required: true
        },
        ...super.fields()
      };
    }
    // console.log(super.fields());
    return super.fields();
  }
  //
  // translate(text) {
  //   // Here you specify your own translation function, e.g.
  //   return this.props.t(text);
  // }

  signUp(options = {}) {
    const { firstname = null, lastname = null } = this.state;
    if (firstname !== null && lastname !== null) {
      options.profile = Object.assign(options.profile || {}, {
        firstname: firstname,
        lastname: lastname,
        name: firstname+" "+lastname
      });
    }
    super.signUp(options);
  }
}
