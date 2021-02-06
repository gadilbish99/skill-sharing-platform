import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

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

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

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
          <Button size="small" href="/write">
            Write
          </Button>
          <Button size="small" href="/signin">
            Sign In
          </Button>
          <Button variant="contained" size="small" color="primary" href="/signup">
            Get Started
          </Button>
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