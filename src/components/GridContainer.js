import Grid from '@material-ui/core/Grid';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
// import {
//   useParams
// } from "react-router-dom";
import Loading from '../components/Loading';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: theme.spacing(10, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const mockPost = {
    summary: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    title: "My Post",
    image: "https://bit.ly/39VxniL"
};

const mockPosts = Array(5).fill(mockPost); 

export default function GridContainer() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // let { topic } = useParams();
  // topic = topic || '';

  useEffect(() => {
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={5}  className={classes.gridContainer}>
        {posts.map((post, id) => (
          <Grid item sm={12} md={8} key={id}>
            <Card title={post.title} image={post.image} summary={post.summary}/>
          </Grid>
        ))}
    </Grid>    
  );
}