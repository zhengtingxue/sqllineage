import React, {useMemo} from 'react';
import {Box, Drawer, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup} from "@material-ui/core";
import {DAG} from "./features/dag/DAG";
import {Editor} from "./features/editor/Editor";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import {Directory} from "./features/directory/Directory";
import {BrowserRouter as Router} from "react-router-dom";
import {DAGDesc} from "./features/dag/DAGDesc";

const drawerWidth = "18vw";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(6),
    float: "right"
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function App() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('dag');
  const [open, setOpen] = React.useState(false);

  const height = "85vh", width = "99vw";
  const adjusted_width = useMemo(() => {
    return open ? (width.slice(0, -2) - drawerWidth.slice(0, -2)) + "vw" : width
  }, [open])

  return (
    <Router>
      <div>
        <Box>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setOpen(!open)
                }}
              >
                {open ? <ChevronLeftIcon/> : <MenuIcon/>}
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                SQLLineage
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Box className={classes.content}>
              <Directory/>
            </Box>
          </Drawer>
        </Box>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Paper elevation="24" style={{height: height, width: adjusted_width}}>
            <Box className={selectedValue === "dag" ? "" : classes.hide}>
              <DAG height={height} width={adjusted_width}/>
            </Box>
            <Box className={selectedValue === "text" ? "" : classes.hide}>
              <DAGDesc height={height} width={adjusted_width}/>
            </Box>
            <Box className={selectedValue === "script" ? "" : classes.hide}>
              <Editor height={height} width={adjusted_width}/>
            </Box>
          </Paper>
          <Grid container justify="center">
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position" defaultValue="dag"
                          value={selectedValue}
                          onChange={(event) => setSelectedValue(event.target.value)}>
                <FormControlLabel
                  value="dag"
                  control={<Radio color="primary"/>}
                  label="Lineage View"
                />
                <FormControlLabel
                  value="text"
                  control={<Radio color="primary"/>}
                  label="Text View"
                />
                <FormControlLabel
                  value="script"
                  control={<Radio color="primary"/>}
                  label="Script View"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </main>
      </div>
    </Router>
  )
}