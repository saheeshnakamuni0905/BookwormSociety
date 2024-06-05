import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button,
  Paper, Select, MenuItem, FormControl, Snackbar, Alert
} from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');

function Admin() {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newAuthorRequest', (message) => {
      console.log('Received new author request:', message);
      setNotification(message);
      setOpenSnackbar(true);
      fetchUsers();
    });

    return () => {
      socket.off('connect');
      socket.off('newAuthorRequest');
    };
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/user/getAllusers');
      if (Array.isArray(response.data)) {
        setUsers(response.data.map(user => ({ ...user, editing: false })));
      } else {
        console.error('Data received is not an array:', response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert('Failed to fetch users');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangeType = (id, type) => {
    axios.put(`http://localhost:3002/user/updateUserType/${id}`, { type })
      .then(() => fetchUsers())
      .catch(error => {
        console.error("Failed to update user type:", error);
        alert('Failed to update user type');
      });
  };

  const handleApproveAuthor = async (id) => {
    try {
      await axios.put(`http://localhost:3002/user/approveAuthor/${id}`);
      alert('Author request approved.');
      fetchUsers();
    } catch (error) {
      console.error("Failed to approve author request:", error);
      alert('Failed to approve author request');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/user/deleteuser/${id}`);
      fetchUsers(); // Re-fetch users to update the list after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert('Failed to delete user');
    }
  };

  const handleRejectAuthor = async (id) => {
    try {
      await axios.put(`http://localhost:3002/user/rejectAuthor/${id}`);
      alert('Author request rejected.');
      fetchUsers();
    } catch (error) {
      console.error("Failed to reject author request:", error);
      alert('Failed to reject author request');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 2, backgroundColor: '#f3f6f9', borderRadius: 2, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5' }}>
        Admin Dashboard
      </Typography>
    
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" elevation={6} variant="filled">
          {notification}
        </Alert>
      </Snackbar>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#3f51b5' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Full Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              <TableCell sx={{ color: 'white' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      labelId="user-type-select-label"
                      id="user-type-select"
                      value={user.type}
                      onChange={(e) => handleChangeType(user._id, e.target.value)}
                      label="Type"
                    >
                      <MenuItem value="author">Author</MenuItem>
                      <MenuItem value="reader">Reader</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {user.authorRequestStatus === 'pending' && (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleApproveAuthor(user._id)}>
                        Approve
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleRejectAuthor(user._id)}>
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Admin;
