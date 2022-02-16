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

import { getAllMemoryForUser } from '../Api/memories'

const User = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(async () => {
    let dataFromApi = await getAllMemoryForUser();
    setData(dataFromApi);
    console.log(dataFromApi);
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>תאריך</TableCell>
            <TableCell>זיכרון</TableCell>
            <TableCell>סטטוס</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              onClick={()=>{navigate(`/user/${row._id}`)}}
              hover={true}
              style={{ cursor: "pointer"}}
            >
               <TableCell>{row.date}</TableCell>
               <TableCell>{row.title}</TableCell>
               <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default User;

