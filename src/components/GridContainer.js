import Grid from '@material-ui/core/Grid';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { getPosts } from '../Services/service';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: theme.spacing(10, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function GridContainer() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useContext (UserContext);
  const history = useHistory();
  // let { topic } = useParams();
  // topic = topic || '';

  useEffect(() => {
    async function fetchPosts() {
      if (user.accesstoken) {
        try {
          const posts = await getPosts();
          setPosts(posts);
        } catch (error) {
          const errorMsg = error.response.data.error;
          setPosts([]);
          if (errorMsg === 'jwt expired') {
            history.push('/logout');
          }
        } finally {
          setLoading(false);
        }
      }
      else {
        setPosts([]);
        setLoading(false);
      }
    }
    fetchPosts();
  }, [user, history]);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={5}  className={classes.gridContainer}>
        {posts.map((post, id) => (
          <Grid item sm={12} md={8} key={id}>
            <Card title={post.title} image={post.image} summary={post.summary} id={post._id}/>
          </Grid>
        ))}
    </Grid>    
  );
}