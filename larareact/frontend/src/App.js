import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './services/api';

function App() {
    const [users, setUsers] = useState([]);
    const [fullName, setFullName] = useState('');
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operator, setOperator] = useState('+');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            // console.log(data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Function to perform calculations
    const calculateResult = (a, b, op) => {
        const n1 = parseFloat(a) || 0; // Defaults to 0 if empty
        const n2 = parseFloat(b) || 0;
        
        if (isNaN(n1) || isNaN(n2)) return 'Invalid';
    
        switch (op) {
            case '+': return n1 + n2;
            case '-': return n1 - n2;
            case '*': return n1 * n2;
            case '/': return n2 !== 0 ? n1 / n2 : 'Error';
            default: return 'Invalid';
        }
    };
    
    const handleAddUser = async () => {
        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            alert("Only letters and spaces are allowed.");
            return;
        }

        const result = calculateResult(num1, num2, operator);
        try {
            await addUser(fullName, result);
            setFullName('');
            setNum1('');
            setNum2('');
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleUpdateUser = async (id) => {
        const newName = prompt("Enter new name:");
        
        if (newName && /^[a-zA-Z\s]+$/.test(newName)) {
            try {
                const user = users.find(user => user.id === id);
                const newResult = calculateResult(user.num1, user.num2, user.operator);
    
                await updateUser(id, newName, newResult);
                fetchUsers();
            } catch (error) {
                console.error("Error updating user:", error);
            }
        } else {
            alert("Invalid name!");
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
            <h1>User Calculator</h1>
            <input 
                type="text" 
                placeholder="Enter Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ padding: '10px', marginBottom: '10px' }}
            />

            <div>
                <input 
                    type="number" 
                    placeholder="Number 1" 
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    style={{ padding: '10px', width: '80px' }}
                />
                <select value={operator} onChange={(e) => setOperator(e.target.value)} style={{ padding: '10px', margin: '0 10px' }}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <input 
                    type="number" 
                    placeholder="Number 2" 
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    style={{ padding: '10px', width: '80px' }}
                />
            </div>
            
            <button onClick={handleAddUser} style={{ padding: '10px', marginTop: '10px' }}>Add User</button>

            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Calculation Result</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.full_name}</td>
                            <td>{user.calculated_value}</td>
                            <td>
                                <button onClick={() => handleUpdateUser(user.id)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
