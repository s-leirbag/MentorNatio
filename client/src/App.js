import React from 'react';
import './App.css';

// import CssBaseline from '@mui/material/CssBaseline';
import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
// import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

import MenteeSignUp from './Components/MenteeSignUp';
import Matches from './Components/Matches';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'menteeSignUp', // menteeSignUp, mentorSignUp, matches
      loading: false,
      error: null,
      data: null,
    };
  }

  handleSubmit = (formData) => {
    this.setState({loading: true});
    fetch('http://127.0.0.1:8000/mentee', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({loading: false, data}, () => { this.setState({page: 'matches'}) })
      })
      .catch((error) => {
        this.setState({loading: false, error});
      });
  }

  render() {
    const loadingScreen = (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loading}
        onClick={() => this.setState({loading: false})}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

    let page;
    if (this.state.page === 'matches') {
      page = <Matches data={this.state.data}/>;
    } else if (this.state.page === 'mentorSignUp') {

    } else if (this.state.page === 'menteeSignUp') {
      page = <MenteeSignUp onSubmit={this.handleSubmit}/>;
    }
    return (
      <div className="App">
        {page}
        {loadingScreen}
      </div>
    );
  }
}
