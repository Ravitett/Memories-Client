import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Context } from '../Context';

import { getAllMemoryForApprove } from '../Api/memories'

const Admin = () => {
  let navigate = useNavigate();

  const { userAdminContext } = useContext(Context);
  const [userAdmin, setUserAdmin] = userAdminContext;

  const [data, setData] = useState([]);
  
  useEffect(async () => {
    if (userAdmin) {
      let dataFromApi = await getAllMemoryForApprove();
      setData(dataFromApi);
    }else{
      setData([])
      navigate("/");
    }
  },[userAdmin])

  const tableHeaderStyle = {
    backgroundColor:"#a3d17b", 
    color:"#fff", 
    fontSize:"20px"
  }

  return (
    <TableContainer style={{ height: "80vh", overflowy: "scroll" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeaderStyle}>תאריך הזיכרון</TableCell>
            <TableCell style={tableHeaderStyle}>שם משתמש</TableCell>
            <TableCell style={tableHeaderStyle}>זיכרון</TableCell>
            <TableCell style={tableHeaderStyle}>סטטוס</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow
              key={row._id}
              onClick={() => { navigate(`/admin/${row._id}`) }}
              hover={true}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.full_name}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
