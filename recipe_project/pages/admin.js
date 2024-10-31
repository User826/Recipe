import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // State to track admin status
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = sessionStorage.getItem('admin');
      if (adminStatus !== 'true') {
        // Set isAdmin to false if not an admin
        setIsAdmin(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/user?awaiting=true'); // Fetch awaiting users
        const data = await response.json();
        setUsers(data.awaiting || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus(); // Check admin status on component mount
    fetchUsers(); // Fetch users from API
  }, [router]);

  const handleApprove = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchUsers(); // Re-fetch user data
      } else {
        console.error('Failed to approve user');
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You are not authorized to view this page.</p>
        <Link href="/" passHref>
          <Button variant="link">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <Link href="/" passHref>
        <Button variant="link">Back to Home</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.approved ? 'Yes' : 'No'}</td>
                <td>
                  {!user.approved && (
                    <Button onClick={() => handleApprove(user._id)}>Approve</Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
