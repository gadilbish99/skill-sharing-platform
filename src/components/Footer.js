import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Designed by Ganbold Adilbish.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {`Copyright © ${new Date().getFullYear()} ${title}`}
        </Typography>
      </Container>
    </footer>
  );
}