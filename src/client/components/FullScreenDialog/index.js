import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={handleClickOpen}>
            <MenuIcon />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              設定してください
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              実行！
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="１．実際に実行されたチェーン" secondary={
              <span>
                <span className="cp_ipselect cp_sl01">
                  <select name="チェーン" onChange={(e)=>console.log(e.target.value)} required>
                    <option value='0'>チェーン1</option>
                    <option value='1'>チェーン2</option>
                    <option value='2'>チェーン3</option>
                  </select>
                </span>
                を
                <span className="cp_ipselect cp_sl01">
                  <select name="年月日" onChange={(e)=>console.log(e.target.value)} required>
                    <option value='2019/10/12'>2019/10/12</option>
                    <option value='2019/10/13'>2019/10/13</option>
                    <option value='2019/10/14'>2019/10/14</option>
                    <option value='2019/10/15'>2019/10/15</option>
                  </select>
                </span>
                <span className="cp_ipselect cp_sl01">
                  <select name="時分秒" onChange={(e)=>console.log(e.target.value)} required>
                    <option value='11:12:33.234'>11:12:33.234</option>
                    <option value='12:12:33.234'>12:12:33.234</option>
                    <option value='13:12:33.234'>13:12:33.234</option>
                    <option value='14:12:33.234'>14:12:33.234</option>
                  </select>
                </span>
                に実行した。
              </span>
            } />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="２．予測したい時間帯の設定" secondary={
            <span>
              <span className="cp_ipselect cp_sl01">
                <select name="開始日" onChange={(e)=>console.log(e.target.value)} required>
                  <option value='2019/10/12'>2019/10/12</option>
                  <option value='2019/10/13'>2019/10/13</option>
                  <option value='2019/10/14'>2019/10/14</option>
                  <option value='2019/10/15'>2019/10/15</option>
                </select>
              </span>
              <span className="cp_ipselect cp_sl01">
                <select name="開始時間" onChange={(e)=>console.log(e.target.value)} required>
                  <option value='10:00'>10:00</option>
                  <option value='11:00'>11:00</option>
                  <option value='12:00'>12:00</option>
                  <option value='13:00'>13:00</option>
                  <option value='14:00'>14:00</option>
                  <option value='15:00'>15:00</option>
                </select>
              </span>
              から
              <span className="cp_ipselect cp_sl01">
                <select name="終了日" onChange={(e)=>console.log(e.target.value)} required>
                  <option value='2019/10/13'>2019/10/13</option>
                  <option value='2019/10/14'>2019/10/14</option>
                  <option value='2019/10/15'>2019/10/15</option>
                  <option value='2019/10/16'>2019/10/12</option>
                </select>
              </span>
              <span className="cp_ipselect cp_sl01">
                <select name="開始時間" onChange={(e)=>console.log(e.target.value)} required>
                  <option value='10:00'>10:00</option>
                  <option value='11:00'>11:00</option>
                  <option value='12:00'>12:00</option>
                  <option value='13:00'>13:00</option>
                  <option value='14:00'>14:00</option>
                  <option value='15:00'>15:00</option>
                </select>
              </span>
              までを
              <span className="cp_ipselect cp_sl01">
                <select name="間隔" onChange={(e)=>console.log(e.target.value)} required>
                  <option value='30'>30</option>
                  <option value='60'>60</option>
                  <option value='120'>120</option>
                </select>
              </span>
              分ごとに予測する。
            </span>
            } />
          </ListItem>
          <Divider />
          <ListItem>
            <div style={{margin:'40px 0'}}>
              <ul style={{marginLeft:'20px'}}>
                <li>{'チェーン1・・・[item0]->[item1]->[item2]->[item3]->[item4]->[item5]'}</li>
                <li>{'チェーン2・・・[item1]->[item2]->[item4]->[item5]'}</li>
                <li>{'チェーン3・・・[item0]->[item2]->[item4]->[item5]'}</li>
              </ul>
            </div>
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}

export default FullScreenDialog;