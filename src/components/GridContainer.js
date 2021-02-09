import Grid from '@material-ui/core/Grid';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
// import {
//   useParams
// } from "react-router-dom";
import Loading from '../components/Loading';
import { getPosts } from '../Services/service';

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
  // let { topic } = useParams();
  // topic = topic || '';

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts();
      setPosts(posts);
      setLoading(false);
    }
    fetchPosts();
  }, []);

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