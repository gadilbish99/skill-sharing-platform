import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { UserContext } from '../App';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
      textTransform: 'none'
    },
  },
}));

const sections = [
  { title: 'Technology'},
  { title: 'Design'},
  { title: 'Culture'},
  { title: 'Business'},
  { title: 'Politics'},
  { title: 'Opinion'},
  { title: 'Science'},
  { title: 'Health'},
  { title: 'Style'},
  { title: 'Travel'},
];

export default function Header({ title }) {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const isLoggedIn = !!user.accesstoken;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Box className={classes.buttonGroup}>
          <Button size="small" href="/">
            Home
          </Button>
          {isLoggedIn ? (
            <React.Fragment>
              <Button size="small" href="/write">
                Write
              </Button>
              <Button variant="contained" size="small" color="primary" href="/logout">
                Log Out
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button size="small" href="/signin">
                Sign In
              </Button>
              <Button variant="contained" size="small" color="primary" href="/signup">
                Get Started
              </Button>
            </React.Fragment>
          )}          
        </Box>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={'/' + section.title.toLowerCase()}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};