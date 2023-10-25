import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { inputAttrs, inputName, exampleMentees } from '../Constants.js';

import { cloneDeep } from 'lodash';

const defaultTheme = createTheme();

function SettingButtons(props) {
  let buttons = [];
  for (const [name, onClick] of Object.entries(props.map)) {
      buttons.push(
          <Button onClick={() => onClick()} key={name}>
              {name}
          </Button>
      );
  }

  return (
      <Box sx={{ p: 1 }}>
          <Typography variant='body1' component='p'>
              {props.name}
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
              {buttons}
          </ButtonGroup>
      </Box>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Developed at SASEhack 2023 by Ryan Zhang, Samin Nihad, and Gabriel Shiu. '}
    </Typography>
  );
}

export default class MenteeSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: Math.floor(Math.random() * 2) + 1,
      randomNumber2: Math.floor(Math.random() * 2) + 1,
      values: exampleMentees[0],
    };
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);

    // Set form values empty as default
    let newVals = cloneDeep(this.state.values);
    for (const key of inputAttrs)
      newVals[key] = '';
    this.setState({values: newVals});
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = (event) => {
    // const number = parseFloat(event.key);
    // if (!isNaN(number) && number > 0 && number <= exampleMentees.length)
    //   this.setExampleMentee(number - 1);
  };

  setExampleMentee = (index) => {
    this.setState({ values: exampleMentees[index] });
  }

  handleFormChange = (event) => {
    let newVals = cloneDeep(this.state.values);
    newVals[event.target.name] = event.target.value;
    this.setState({values: newVals});
  };

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

  renderFields() {
    let fields = [];
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
            value={this.state.values[attr]}
            placeholder={exampleMentees[0][attr]}
            onChange={this.handleFormChange}
          />
        </Grid>
      )
    });
    return fields;
  }

  renderExampleButtons() {
    let map = {};
    exampleMentees.forEach((mentee) => {
      map[mentee['FullName']] = () => {
        this.setExampleMentee(mentee['Index'] - 1);
      }
    });

    return (
      <div>
        <Typography variant='h6' component='p' sx={{ mt: 2 }}>
          Example Mentees
        </Typography>
        <SettingButtons map={map} key={'examples'} />
      </div>
    );
  }

  render() {
    const fields = this.renderFields();
  
    let img1, img2;
    img1 = `signup/man${this.state.randomNumber}.png`;
    img2 = `signup/woman${this.state.randomNumber2}.png`;

    const exampleButtons = this.renderExampleButtons();
  
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
            <Typography component="h1" variant="h5">
              Mentee sign up
            </Typography>
            <Typography component="p" variant="subtitle">
              Are you an international student struggling to find mental health resources?
              Fill out this form to find a suitable mentor for you.
            </Typography>
            <Link color="primary" href="https://github.com/s-leirbag/MentorNatio/">
              Github repo
            </Link>
            {exampleButtons}
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
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}