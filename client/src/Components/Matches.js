import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Matches(props) {
  let data = Object.values(props.data)

  let cards = [];
  for (let card of data) {
    let img;
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    if (card['Gender'] === 'Male') {
      img = `matches/man${randomNumber}.png`;
    } else {
      img = `matches/woman${randomNumber}.png`;
    }
    cards.push(
      <Grid item key={card['Index']} xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '56.25%',
            }}
            image={img}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4" component="h2">
              {card['FullName']}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              From: {card['CountryofOrigin']}!
            </Typography>
            <Typography>
              {card['Major']} {card['UniversityYear']} at {card['UniversityName']}
               {/* in {card['UniversityLocation']} */}
            </Typography>
            <Typography textAlign='left'>
              <br/><br/>{card['FullName']} loves {card['InterestsHobbies']}
              <br/><br/>Experience: {card['ExperiencewithMentalHealthSituation']}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Contact</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              // gutterBottom
            >
              Matches
            </Typography>
            {/* <Stack
              sx={{ pt: 0 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}