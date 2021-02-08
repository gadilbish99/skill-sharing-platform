// import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRef } from 'react';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Utils/tools'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.grey[200],
    margin: theme.spacing(5, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  root: {
    paddingTop: theme.spacing(10)
  }
}));

export default function Writer() {
  const classes = useStyles();
  const instanceRef = useRef(null)
  const data = JSON.parse(localStorage.getItem('data')) || {};

  async function onChange() {
    const savedData = await instanceRef.current.save()
    localStorage.setItem('data', JSON.stringify(savedData));
  }

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
          <CardContent>
            <Box className={classes.root}>
              <EditorJs
                data={data} 
                onChange={onChange} 
                instanceRef={(instance) => (instanceRef.current = instance)} 
                tools={EDITOR_JS_TOOLS}
                autofocus
              />
            </Box>
          </CardContent>
      </Card>
    </Container>
  );
}
