import React from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import Layout from "../Components/Layout/Layout";
import { useGetDepartmentsQuery, useGetEmployeesQuery, usePostEmployeeMutation } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface CreateEmployeeForm {
    name: string;
    email: string;
    managerId: number;
    departmentId: number;
}

const CreateEmployee: React.FC = () => {
    const { data: managers } = useGetEmployeesQuery();
    const { data: departments } = useGetDepartmentsQuery();
    const [postEmployee] = usePostEmployeeMutation();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<CreateEmployeeForm>();

    const onSubmit: SubmitHandler<CreateEmployeeForm> = async (data) => {
        await postEmployee(data);
        navigate('/employees');
    };

    return (
        <Layout>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack sx={{ gap: '10px' }}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} label="Name" required={true} />}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} label="Email" required={true} />}
                        />
                        <FormControl>
                            <InputLabel>Manager</InputLabel>
                            <Controller
                                name="managerId"
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <Select {...field}>
                                        {managers &&
                                            managers.map((manager) => (
                                                <MenuItem key={manager.id} value={manager.id}>
                                                    {manager.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Department</InputLabel>
                            <Controller
                                name="departmentId"
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <Select {...field}>
                                        {departments &&
                                            departments.map((department) => (
                                                <MenuItem key={department.id} value={department.id}>
                                                    {department.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Stack>
                    <Box sx={{ m: '20px' }}>
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Box>
                </form>
            </Container>
        </Layout>
    );
}

export default CreateEmployee;
