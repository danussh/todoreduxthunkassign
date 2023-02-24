import React, { useState, useEffect } from 'react';
import { Form } from "./components/Form";
import { Todos } from "./components/Todos";
import { useDispatch, useSelector } from 'react-redux';
import { allTodosCompleted, fetchdata } from './redux/todoapp/actions';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="wrapper">
      {
        BasicTabs()
      }
    </div>
  );
}

export default App;



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {

  const [value, setValue] = React.useState(0);
  // dispatch function to dispatch an action
  const dispatch = useDispatch();

  // getting todos state for conditional rendering
  const todos = useSelector((state) => state.operationsReducer);

  // update form visibility state
  const [editFormVisibility, setEditFormVisibility] = useState(false);

  // editTodo state
  const [editTodo, setEditTodo] = useState('');

  // fetch data from todo api
  useEffect(() => {
    dispatch(fetchdata());
  }, [])

  // this function will trigger when someone clicks the edit icon
  const handleEditClick = (todo) => {
    setEditFormVisibility(true);
    setEditTodo(todo);
  }

  // this function will trigger when someone clicks the edit icon
  const onMarkCompletedClicked = () => dispatch(allTodosCompleted())

  // back button click
  const cancelUpdate = () => {
    setEditFormVisibility(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Todo" {...a11yProps(0)} />
          <Tab label="Active Todo" {...a11yProps(1)} />
          <Tab label="Completed Todo" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <br></br>
        <h3 className="text-center">TODO-APP</h3>
        <Form editFormVisibility={editFormVisibility} editTodo={editTodo}
          cancelUpdate={cancelUpdate} />
        <div className='testcheck'>
          <Todos handleEditClick={handleEditClick} editFormVisibility={editFormVisibility} />
          {todos.length > 1 && (
            <div className='todo-box'>

              <button className=' todo-box btn btn-outline-info btn-md mark-all'
                onClick={onMarkCompletedClicked}>Mark All Completed</button>
            </div>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          todos.map((todo) => {
            if (!todo.completed)
              return <li key={todo.id}>{todo.title}</li>
          })
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          todos.map((todo) => {
            if (todo.completed)
              return <li key={todo.id}>{todo.title}</li>
          })
        }
      </TabPanel>
    </Box>
  );
}