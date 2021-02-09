import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    circularProgress: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <Container className={classes.circularProgress}>
      <CircularProgress size={100}/>
    </Container>
  );
}