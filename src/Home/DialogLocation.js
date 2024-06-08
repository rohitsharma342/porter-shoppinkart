import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogLocation(props) {
  const [lat,setLat]=React.useState("")
  const [long,setLong]=React.useState("")
  const [userId,setUserId]=React.useState("")
React.useEffect(()=>{
  setUserId(props.userId)
},[props])

function handleSubmit(){
  if(lat===""){
    toast.error("Enter Latitude")
  }else if(long===""){
    toast.error("Enter Longitude")
  }else{
    fetch(`http://139.59.64.38:80/api/user/lat-long/${userId}?lat=${lat}&long=${long}`,{
        headers: { "Content-Type": "application/json" },
    }).then((res)=>{return res.json()})
    .then((response)=>{
       if(response.status==true){
          //  setButton(false)
          toast.success("Location Updated Successfully")
          props.handleClose()
       }else{
       toast.error("Something Went Wrong")
       }
    })
  }
}
  return (
    <React.Fragment>
         <ToastContainer/>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update Users Location"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className='mt-5'>
            <TextField variant='outlined' type='number' label="Latitude*" style={{marginTop:"10px",width:"100%"}}
            value={lat}
            onChange={(e)=>{setLat(e.target.value)}}
            />
            <TextField variant='outlined' type='number' label="Longitude*" style={{marginTop:"10px",width:"100%"}}
            value={long}
            onChange={(e)=>{setLong(e.target.value)}}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
