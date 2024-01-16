import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Layout from "../Components/Layout/Layout";
import { useDeleteDepartmentMutation, useGetDepartmentsQuery } from "../api/api";
import { useNavigate } from "react-router-dom";

const ViewDepartments: React.FC = () => {
    const { data } = useGetDepartmentsQuery();
    const [deleteDepartment] = useDeleteDepartmentMutation();
    const navigate = useNavigate();
    console.log(data);
    return (
        <>
            <Layout>
                <TableContainer component={Paper} sx={{ marginTop: '50px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="employee table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Parent</TableCell>
                                <TableCell sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>Delete?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                                        {department.name}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{department.description}</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{department.parent != null ? (department.parent.name) : ('No parent')}</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid #ccc' }}><Button variant='outlined' onClick={() => deleteDepartment(department.id)}>Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ padding: '20px' }}>
                        <Button variant='contained' onClick={() => navigate('/departments/create')}>Create new department</Button>
                    </Box>
                </TableContainer>
            </Layout>
        </>
    )
}

export default ViewDepartments;