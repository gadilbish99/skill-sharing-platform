import { default as MuiAlert } from '@material-ui/lab/Alert';
import { default as MuiAlertTitle } from '@material-ui/lab/AlertTitle';


export default function Alert({warning}) {
  return (
    !!warning &&
    <MuiAlert severity="error">
        <MuiAlertTitle>{warning}</MuiAlertTitle>
    </MuiAlert>
  );
}