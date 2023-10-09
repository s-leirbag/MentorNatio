import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { attrs, inputAttrs, inputName, exampleMentees } from '../Constants.js';

const defaultTheme = createTheme();

export default class MenteeSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exampleNum: Math.floor(Math.random() * exampleMentees.length),
      randomNumber: Math.floor(Math.random() * 2) + 1,
      randomNumber2: Math.floor(Math.random() * 2) + 1,
      useExample: false,
    };
  }

  componentDidMount() {
      window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
      window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = (event) => {
    if (event.key === "1") {
      this.setState({ example: 1, useExample: true });
    } else if (event.key === "2") {
      this.setState({ example: 2, useExample: true });
    } else if (event.key === "3") {
      this.setState({ example: 3, useExample: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {};
    for (const attr of inputAttrs) {
      formData[attr] = data.get(attr);
    }
    formData['Index'] = 1;
    this.props.onSubmit(formData);
  };

  render() {

    let fields = [];
    if (this.state.useExample) {
      inputAttrs.forEach((attr) => {
        fields.push(
          <Grid item xs={12} key={attr}>
            <TextField
              required
              fullWidth
              id={attr}
              label={inputName[attr]}
              name={attr}
              autoComplete={attr}
              value={exampleMentees[this.state.exampleNum][attr]}
            />
          </Grid>
        )
      })
    } else {
      inputAttrs.forEach((attr) => {
        fields.push(
          <Grid item xs={12} key={attr}>
            <TextField
              required
              fullWidth
              id={attr}
              label={inputName[attr]}
              name={attr}
              autoComplete={attr}
              placeholder={exampleMentees[this.state.exampleNum][attr]}
            />
          </Grid>
        )
      })
    }
  
    let img1, img2;
    img1 = `signup/man${this.state.randomNumber}.png`;
    img2 = `signup/woman${this.state.randomNumber2}.png`;
  
    return (
      <ThemeProvider theme={defaultTheme}>
        <img alt='img1' src={img1} style={{ position: 'absolute', top: 20, left: 50 }}></img>
        <img alt='img2' src={img2} style={{ position: 'absolute', top: 20, right: 50 }}></img>
        {/* <Typography component="h1" variant="h3" style={{ m: 0, position: 'absolute', bottom: -300, right: 50 }}>
          vriend
          <br/><br/>mik
          <br/><br/>ግብር፣ ልጅ
          <br/><br/>amigo
          <br/><br/>ami
        </Typography> */}
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              // gutterBottom
            >
              MentorNatio
            </Typography>
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Mentee sign up
            </Typography>
            {/* <Typography component="p" variant="subtitle">
              Find a familiar friend
            </Typography> */}
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {fields}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Find a Friend!
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    );
  }
}