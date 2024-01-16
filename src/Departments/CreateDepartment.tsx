import React from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import Layout from "../Components/Layout/Layout";
import { useGetDepartmentsQuery, usePostDepartmentMutation } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface CreateDepartmentForm {
    name: string;
    description: string;
    parentId: number;
}

const CreateDepartment: React.FC = () => {
    const { data: departments } = useGetDepartmentsQuery();
    const [postDepartment] = usePostDepartmentMutation();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<CreateDepartmentForm>();

    const onSubmit: SubmitHandler<CreateDepartmentForm> = async (data) => {
        // Handle the form submission here, e.g., call your mutation function
        await postDepartment(data);
        navigate('/departments'); // Redirect to the desired page after successful submission
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
                            render={({ field }) => <TextField {...field} label="Name" />}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} label="Description" />}
                        />
                        <FormControl>
                            <InputLabel>Parent department</InputLabel>
                            <Controller
                                name="parentId"
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
};

export default CreateDepartment;
