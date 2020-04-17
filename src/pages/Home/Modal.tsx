import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import useControllerMail from "./MailController";

import {getDirection, useTranslation} from '../../strings';


function Modal ({open, handleClose, setOpen} : any) {

    const {Strings} = useTranslation();
    const Direction = getDirection();

    const {sendMail, mail} = useControllerMail();

    useEffect(() => {
        if (mail.response === "success") {
            setOpen(false);
        }
        if(mail.response === "failed"){
            setOpen(true);
        }
    }, [mail, setOpen])


    const [text, setText] = React.useState("");
    const [label, setLabel] = React.useState("");

    const handleChangeText = (event: any) => {
        setText(event.target.value);
    };

    const handleChangeLabel = (event: any) => {
        setLabel(event.target.value);
    };

    const handleSubmit = async () => {
        sendMail(text, label);
    };

    return (
        <div>
            <Dialog dir={Direction} onClose={handleClose} aria-labelledby="customized-dialog-title"
                    style={{zIndex: 9999}} open={open}>
                <DialogTitle id="customized-dialog-title" disableTypography={true}>
                    <span style={{fontSize: "18px", fontWeight: 600}}> {Strings("headerTitle")} </span>
                </DialogTitle>
                <DialogContent dividers style={{padding: "16px 43px"}}>
                    <div style={{fontVariant: "contextual", fontSize: "15px", fontWeight: 700}}>
                        {Strings("headerDesc")}
                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label={Strings("labelEmail")}
                            value={text}
                            onChange={handleChangeText}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-static"
                            label={Strings("labelDesc")}
                            multiline
                            rows="4"
                            value={label}
                            onChange={handleChangeLabel}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </div>
                </DialogContent>
                <DialogActions style={{  justifyContent:" space-between"}}>
                    <Button variant="contained" onClick={handleClose} >
                        {Strings("buttonCancel")}
                    </Button>
                    <Button variant="contained" disabled={!(label!="" && text!="")} onClick={handleSubmit} color="primary">
                        {Strings("buttonConfirm")}
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Modal;