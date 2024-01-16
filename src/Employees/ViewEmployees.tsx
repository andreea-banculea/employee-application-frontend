import React, { useState } from "react";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import Layout from "../Components/Layout/Layout";
import { useDeleteEmployeeMutation, useGetDepartmentsQuery, useGetFilteredEmployeesQuery } from "../api/api";
import { useNavigate } from "react-router-dom";

const ViewEmployees: React.FC = () => {
    const [role, setRole] = useState('');
    const [departmentId, setDepartmentId] = useState(0);
    const [filterRole, setFilterRole] = useState('');
    const [filterDepartmentId, setFilterDepartmentId] = useState(0);
    const { data, refetch } = useGetFilteredEmployeesQuery({ role: filterRole, departmentId: filterDepartmentId });
    const { data: departments } = useGetDepartmentsQuery();
    const [deleteEmployee] = useDeleteEmployeeMutation();
    const navigate = useNavigate();

    const getDepartmentNameById = (departmentId: number) => {
        const department = departments?.find((d) => d.id === departmentId);
        return department ? department.name : 'No department';
    };

    const getManagerNameById = (managerId: number) => {
        const manager = data?.find((m) => m.id === managerId);
        return manager ? manager.name : 'No manager';
    };

    const handleFilter = () => {
        console.log(role);
        setFilterRole(role);
        setFilterDepartmentId(departmentId);
    };

    const clearFilter = () => {
        setFilterRole('');
        setFilterDepartmentId(0);
    }

    return (
        <>
            <Layout>
                <TableContainer component={Paper} sx={{ marginTop: '50px', marginBottom: '50px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="employee table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Department</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Manager</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Delete?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                                        {employee.name}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{employee.email}</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{getDepartmentNameById(employee.departmentId)}</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{getManagerNameById(employee.managerId)}</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}><Button variant='outlined' onClick={() => deleteEmployee(employee.id)}>Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Stack direction={'row'} width={'auto'} gap={2} padding={2}>
                        <TextField label='Department ID' onChange={(e) => setDepartmentId(+e.target.value || 0)} />
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Role</InputLabel>
                            <Select onChange={(e) => setRole(e.target.value as string)}>
                                <MenuItem value="Employee">Employee</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant='outlined' onClick={handleFilter}>Filter</Button>
                        <Button variant='outlined' onClick={clearFilter}>Clear Filter</Button>
                    </Stack>
                    <Box sx={{ padding: '20px' }}>
                        <Button variant='contained' onClick={() => navigate('/employees/create')}>Create new employee</Button>
                    </Box>
                </TableContainer>
            </Layout>
        </>
    )
}

export default ViewEmployees;
