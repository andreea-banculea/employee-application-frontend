import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EmployeeDTO } from '../dto/EmployeeDTO';
import { DepartmentDTO } from '../dto/DepartmentDTO';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    tagTypes: ['Employee', 'Department'],
    endpoints: (builder) => ({
        getEmployees: builder.query<EmployeeDTO[], void>({
            query: () => '/api/employee',
            providesTags: ['Employee'],
        }),
        getFilteredEmployees: builder.query<EmployeeDTO[], { departmentId?: number; role?: string }>({
            query: ({ departmentId, role }) => {
                let queryString = '/api/employee/filter';

                if (departmentId != 0 || role != '') {
                    queryString += '?';
                }

                if (departmentId != 0) {
                    queryString += `departmentId=${departmentId}`;
                }

                if (role != '') {
                    queryString += `${departmentId != 0 ? '&' : ''}role=${role}`;
                }

                return queryString;
            },
            providesTags: ['Employee'],
        }),

        getDepartments: builder.query<DepartmentDTO[], void>({
            query: () => '/api/department',
            providesTags: ['Department']
        }),
        postEmployee: builder.mutation<
            EmployeeDTO,
            {
                name: string,
                departmentId?: number,
                managerId?: number,
                email: string
            }
        >({
            query: (data) => ({
                url: '/api/employee',
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['Employee']
        }),
        postDepartment: builder.mutation<
            DepartmentDTO,
            {
                name: string,
                description: string,
                parentId: number
            }
        >({
            query: (data) => ({
                url: `/api/department`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['Department']
        }),
        deleteEmployee: builder.mutation<void, number>({
            query: (employeeId) => ({
                url: `api/employee/${employeeId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Employee']
        }),
        deleteDepartment: builder.mutation<void, number>({
            query: (departmentId) => ({
                url: `/api/department/${departmentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Department']
        }),
        login: builder.query<EmployeeDTO, { email: string; password: string }>({
            query: ({ email, password }) => ({
              url: '/api/login',
              method: 'POST',
              body: { email, password },
            }),
        }),
    }),
});

export const { useGetEmployeesQuery, useGetFilteredEmployeesQuery, useGetDepartmentsQuery, usePostEmployeeMutation, usePostDepartmentMutation, useDeleteEmployeeMutation, useDeleteDepartmentMutation, useLoginQuery } = api;

export default api;
