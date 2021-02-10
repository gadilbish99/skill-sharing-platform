import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  Switch,
  Route,
} from "react-router-dom";

import Header from '../components/Header';
import Footer from '../components/Footer';
import GridContainer from '../components/GridContainer';
import Writer from '../components/Writer';
import Post from '../components/Post';

import { UserContext } from '../App';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

export default function MainPage() {
  const classes = useStyles();
  const title = "My Blog";
  const [user] = useContext(UserContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters maxWidth={false} className={classes.root}>
        <Container maxWidth="lg">
          <Header title={title}/>
          <Switch>
            <Route exact path="/" component={GridContainer} />
            <Route path="/write" component={!!user.accesstoken ? Writer : GridContainer}/>
            <Route path="/post/:id" component={Post} /> 
            <Route path="/:topic" component={GridContainer} />
          </Switch>
        </Container>
        <Footer title={title}/>
      </Container>
    </React.Fragment>    
  );
}