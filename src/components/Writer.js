import { makeStyles } from '@material-ui/core/styles';
import { useRef, useState } from 'react';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Utils/tools'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validateInputChange, performFinalValidation} from '../Utils/validator';
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import Typography from '@material-ui/core/Typography';
import uploadImage from "../Utils/imageUploader";
import { postBlog } from "../Services/service";

const initialState = {
  title: '',
  image: '',
  body: {}
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(5),
    }
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  root: {
    // marginTop: theme.spacing(10),
    marginBottom: theme.spacing(-25)
  },
  button: {
    align: 'center',
    marginBottom: theme.spacing(5)
  },
  input: {
    display: 'none'
  }
}));

function ImageUpload({onChange}) {
  const classes = useStyles();

  return (
    <Box>
      <input
        accept=".jpg, .jpeg, .png, .gif"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained" 
          color="primary" 
          component="span"
        >
          Upload Image
        </Button>
      </label>
    </Box>
  );
}

export default function Writer() {
  const classes = useStyles();
  const instanceRef = useRef(null)
  const [data, setData] = useState(initialState);
  const [warning, setWarning] = useState({});
  const [imageName, setImageName] = useState("");
  const history = useHistory();

  function isEmpty() {
    if (Object.keys(data.body).length === 0)
      return true
    else
      return data.body && data.body.blocks.length === 0
  }

  function handleInputChange(event) {
    const {value, type, id} = event.target;
    const {canAddInput, resultMsg} = validateInputChange(value, type);

    if (canAddInput)
      setData({...data, [id]: value});

    setWarning({...warning, [id]: resultMsg});
  }

  async function handleImage(event) {
    event.preventDefault();
    const { uploadedImageName, imageUrl } = await uploadImage(event);
    
    setImageName(uploadedImageName);
    setData({...data, image: imageUrl})
    setWarning({...warning, image: ''});
  }

  async function onChange() {
    const savedBody = await instanceRef.current.save();
    setData({...data, body: savedBody});
    if (!isEmpty())
      setWarning({...warning, body: ''});
  }

  async function publish() {
    const finalData = {...data, body: isEmpty() ? '' : JSON.stringify(data.body)}
    const {isValid, newWarning} = performFinalValidation(finalData);

    if (isValid) {
      const response = await postBlog(finalData);
      console.log(response);
      history.push('/');
    }
    else
      setWarning(newWarning);
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <TextField 
        label="Title" 
        id="title"
        multiline 
        type="text"
        value={data.title}
        helperText={warning.title} 
        error={!!warning.title}
        onChange={handleInputChange}
      />
      <ImageUpload onChange={handleImage}/>
      <Alert warning={warning.image} />
      {imageName && 
      <Typography variant="body2">
        Image Name: {imageName}
      </Typography>} 
      <Card className={classes.card}>
          <CardContent>
            <Box className={classes.root}>
              <EditorJs
                data={data.body} 
                onChange={onChange} 
                instanceRef={(instance) => (instanceRef.current = instance)} 
                tools={EDITOR_JS_TOOLS}
                placeholder="Write something"
              />
            </Box>
          </CardContent>
      </Card>
      <Alert warning={warning.body}/>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        className={classes.button}
        onClick={publish}
      >
        Publish
      </Button>

    </Container>
  );
}
