import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getAllMemoryForApprove } from '../Api/memories'

const Admin = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(async () => {
    let dataFromApi = await getAllMemoryForApprove();
    setData(dataFromApi);
    console.log(dataFromApi);
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>תאריך</TableCell>
            <TableCell>שם משתמש</TableCell>
            <TableCell>זיכרון</TableCell>
            <TableCell>סטטוס</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              onClick={()=>{navigate(`/admin/${row._id}`)}}
              hover={true}
              style={{ cursor: "pointer"}}
            >
               <TableCell>{row.date}</TableCell>
               <TableCell>{row.fullName}</TableCell>
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
