import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Utils/tools'
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { getPost } from '../Services/service';

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.grey[200],
    margin: theme.spacing(5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  root: {
    marginBottom: theme.spacing(-35)
  }
}));

export default function Post() {
  const classes = useStyles();
  const { id } = useParams();
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost(id) {
      const post = await getPost(id);
      const { title, image, body } = post;
      setData({title: title, image: image, body: JSON.parse(body)});
      setLoading(false);
    }
    fetchPost(id);

  }, [id]);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
          <CardMedia
            component="img"
            alt="No Picture"
            height="300"
            image={data.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {data.title}
            </Typography>
            <Box className={classes.root}>
              <EditorJs
                  style={{maxWidth: '10'}}
                  data={data.body} 
                  tools={EDITOR_JS_TOOLS}
                  readOnly
              />
            </Box>
          </CardContent>
      </Card>
    </Container>
  );
}
