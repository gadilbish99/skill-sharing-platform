import { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {validateInputChange, performFinalValidation} from '../Utils/validator'
import { UserContext } from '../App';
import { login } from "../Services/service";
import { useHistory } from 'react-router-dom';
import { setToken } from '../Utils/cookie';
import Alert from '../components/Alert';

const initialState = {
  email: '',
  password: ''
}

const warningInitialState = {
  email: '',
  password: '',
  response: ''
}
  
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const setUser = useContext(UserContext)[1];
  const [credential, setCredential] = useState(initialState);
  const [warning, setWarning] = useState(warningInitialState);
  const history = useHistory();

  function handleInputChange(event) {
    const {value, type, id} = event.target;
    const {canAddInput, resultMsg} = validateInputChange(value, type);

    if (canAddInput)
        setCredential({...credential, [id]: value});

    setWarning({...warning, [id]: resultMsg});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const {isValid, newWarning} = performFinalValidation(credential);

    if (isValid) {
      const result = await login(credential);
      if (result.accesstoken) {
        setToken(result.accesstoken);
        setUser(result);
        history.push('/');
      } else {
        setWarning({...warning, response: result.error});
      }
      
    }
    else 
      setWarning(newWarning);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={credential.email}
              onChange={handleInputChange}
              helperText={warning.email}
              error={!!warning.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credential.password}
              onChange={handleInputChange}
              helperText={warning.password}
              error={!!warning.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Alert warning={warning.response}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
