import { Component } from 'react'
import { Mutation } from 'react-apollo';
import cookie from 'cookie'
import RaisedButton from 'material-ui/RaisedButton';

import { ToastContainer, toast} from 'react-toastify'
import { TOAST_STYLE } from '../../../utils/common'
import redirect from '../../../lib/auth/redirect'

import { LOGIN_USER_MUTATION } from '../../../lib/backendApi/mutations'

const style = {
  margin: 12,
};

export default class RegisterButton extends Component{

  onLoginCompleted = (data) => {
    // Store the token in cookie
    const {jwt, name: {last}} = data.loginUser
    // toast(`Welcome Back ${last}!`, {...TOAST_STYLE.success});
    console.log(`Welcome Back ${last}!`);
    document.cookie = cookie.serialize('token', jwt, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })
    // Force a reload of all the current queries now that the user is
    // logged in
    // this.props.client.resetStore().then(() => {
    //   const target = this.props.url.query.from || `/user/dashboard`;
    //   redirect({}, target)
    // })
    // const target = this.props.url.query.from || `/user/dashboard`;
    const target = `/user/dashboard`;
    redirect({}, target)
  }

  onLoginError = (error) => {
    // If you want to send error to external service?
    // console.log(error)
    if (error.graphQLErrors.length==0)
      toast("Something Went Wrong With your request", {...TOAST_STYLE.fail});

    error.graphQLErrors.forEach(error=>{
      switch(error.message) {
        case `password incorrect`:
        toast("Incorrect Username/password", {...TOAST_STYLE.fail});
        break;
        case `email/user not found`:
        toast("Incorrect Username/password", {...TOAST_STYLE.fail});
        break;
        default:
        toast("Something Went Wrong", {...TOAST_STYLE.fail});
      }
    })
  }

  doLogin = (event, runMutation) => {
    const { username, password } = this.props;

    event.preventDefault()
    event.stopPropagation()

    if(this.props.usernameError.length < 1 ){
      runMutation({
        variables: {
          email: username,
          password: password
        }
      })
    } else {
      if (!this.props.phone || !this.props.phoneValid) {
        this.setState({phoneValid: false})
      }
      if (!this.props.password) {
        this.setState({passwordValid: false})
      }

      toast("Your Inputs are not valid", {...TOAST_STYLE.fail});
    }

  }

  render(){
    return <Mutation mutation={LOGIN_USER_MUTATION}
      onCompleted={this.onLoginCompleted}
      onError={this.onLoginError}>
      {(loginUser) => (
          <RaisedButton
          label='Register'
          style={style}
          primary={true}
        //   onClick={this.submitForm}
        />

    //     <RaisedButton
    //      label='Login'
    //      style={style}
    //      primary={true}
    //      onClick={e=>this.doLogin(e, loginUser)}
    //    />
      )}
    </Mutation>
  }
}