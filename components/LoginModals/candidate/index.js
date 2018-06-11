import React from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme' ;
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { auto } from 'async';

import LoginButton from './LoginButton'

const EMAIL_REGEX = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const muiThemebtn = getMuiTheme()
const customContentStyle = {
  maxWidth: '40%',
};
const style = {
  margin: 12,
};
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    paddingTop : 10,
    paddingBottom: 0,
    height : 325
  },
  tab: {
    backgroundColor : '#fff',
    color : '#646666'
  },
};
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class CandidateModal extends React.Component {
  constructor({props}){
    super(props) ;
  }
  state = {
    open: false,
    value : 1,
    username : '',
    password : '',
    usernameError : '',
    passwordError : '',
    fullname : '' ,
    regEmail : '' ,
    slideIndex: 0
  };

  loginAs = ['Candidate' , 'Institution', 'Career Adviser']

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  usernameText = (event) => {
    this.setState({username : event.target.value})
    EMAIL_REGEX.test(this.state.username)? this.setState({usernameError:''}):this.setState({usernameError:'Invalid Email'})
  };

  handleTabChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleLoginAs = (event, index, value) => this.setState({value});

  render() {
    const actions = [
     (this.state.slideIndex == 0 ?
       <LoginButton {...this.state}/>
        : <RaisedButton
      label='Register'
      style={style}
      primary={true}
      onClick={this.submitForm}
    />),
      <RaisedButton
        label="Cancel"
        style={style}
        secondary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={muiThemebtn}>
        {/* <RaisedButton label="Modal Dialog" onClick={this.handleOpen} /> */}
        <Dialog
          style={{zIndex : 1000}}
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={customContentStyle}
        >
        <Tabs
          onChange={this.handleTabChange}
          value={this.state.slideIndex}
        >
          <Tab label="Login" value={0} style={styles.tab} />
          <Tab label="Signup" value={1} style={styles.tab}/>
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleTabChange}
        >
          <div style={styles.slide}>
            <TextField
              hintText="example@gmail.com"
              fullWidth={true}
              errorText={this.state.usernameError}
              value={this.state.username}
              onChange={this.usernameText.bind(this)}
              floatingLabelText="Email"
              type="text"
            />
            <TextField
              hintText="Password"
              fullWidth={true}
              value={this.state.password}
              onChange={(e) => this.setState({password : e.target.value})}
              errorText={this.state.passwordError}
              floatingLabelText="Password"
              type="password"
            />


             <FloatingActionButton mini={true} style={style}>
               <ContentAdd />
             </FloatingActionButton>

             <FloatingActionButton mini={true} secondary={true} style={style}>
               <ContentAdd />
             </FloatingActionButton>
          </div>
          <div style={styles.slide}>
            <TextField style={styles.textfield}
              hintText={this.state.value == 2 ? 'Institution Name'  : 'Fullname'}
              fullWidth={true}
              errorText=''
              value={this.state.fullname}
              onChange={(e) => this.setState({fullname : e.target.value})}
              floatingLabelText={this.state.value == 2 ? 'Institution Name'  : 'Fullname'}
              type="text"
            />
            <TextField
              hintText="example@gmail.com"
              fullWidth={true}
              errorText=''
              value={this.state.regEmail}
              onChange={(e) => this.setState({regEmail : e.target.value})}
              floatingLabelText="Email"
              type="text"
            />
            <TextField
              hintText="Password"
              fullWidth={true}
              value={this.state.regPassword}
              onChange={(e) => this.setState({regPassword : e.target.value})}
              errorText=''
              floatingLabelText="Password"
              type="password"
            />
            <SelectField
              floatingLabelText="Register As"
              value={this.state.value}
              onChange={this.handleLoginAs}
              fullWidth={true}
            >
              <MenuItem value={1} primaryText="Candidate" />
              <MenuItem value={2} primaryText="Institution" />
              <MenuItem value={3} primaryText="Career Adviser" />
            </SelectField>
          </div>
        </SwipeableViews>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}