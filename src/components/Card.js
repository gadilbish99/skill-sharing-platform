import { makeStyles } from '@material-ui/core/styles';
import {default as MuiCard} from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardActionArea: {
    // padding: theme.spacing(2, 5)
  }
}));

export default function Card({ title, image, summary, id }) {
  const classes = useStyles();

  return (
    <MuiCard>
      <CardActionArea className={classes.cardActionArea} component={Link} to={"/post/" + id}>
        <CardMedia
          component="img"
          alt="No Picture"
          height="300"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
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
