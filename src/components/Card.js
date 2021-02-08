import { makeStyles } from '@material-ui/core/styles';
import {default as MuiCard} from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  cardActionArea: {
    padding: theme.spacing(2, 5)
  }
}));

export default function Card(props) {
  const classes = useStyles();
  const { title, image, summary } = props;

  return (
    <MuiCard>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
          component="img"
          alt="No Picture"
          height="300"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
}
