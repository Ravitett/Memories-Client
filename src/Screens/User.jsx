import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';

import { Context } from '../Context';
import { getAllMemoryForUser } from '../Api/memories'


const User = () => {
  let navigate = useNavigate();

  const { userLoginContext, userAlertContext } = useContext(Context);
  const [userLogin, setUserLogin] = userLoginContext;

  const [data, setData] = useState([]);

  useEffect(async () => {
    if (userLogin) {
      let dataFromApi = await getAllMemoryForUser();
      setData(dataFromApi);
    }else{
      setData([])
      navigate("/")
    }
  }, [userLogin])

  const tableHeaderStyle = {
    backgroundColor:"#a3d17b", 
    color:"#fff", 
    fontSize:"20px"
  }

  return (
    <>
      <TableContainer style={{ height: "80vh", overflowy: "scroll" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeaderStyle}>תאריך הזיכרון</TableCell>
              <TableCell style={tableHeaderStyle}>זיכרון</TableCell>
              <TableCell style={tableHeaderStyle}>סטטוס</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <TableRow
                key={row._id}
                onClick={() => { navigate(`/user/${row._id}`) }}
                hover={true}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default User;

