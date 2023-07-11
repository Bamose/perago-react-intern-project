import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './Store';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch, FetchEmployees   } from './Store';

export interface Employee {
  id: string;
  email: string;
  name: string;
  position: string;
  parentId: string | null;
  children: Employee[];
}

export interface EmployeesMap {
  [key: string]: Employee;
}

// TreeNode component
const TreeNode: React.FC<{ employee: Employee }> = ({ employee }) => (
    <div className="flex flex-col items-start">
      <Paper className="m-4 p-4"> {/* Here 'p-4' is tailwind's class for padding */}
        <div className="text-xl">{employee.name}</div>
        <div className="text-sm text-gray-500">{employee.position}</div>
      </Paper>
      <div className="pl-8 border-l-2 border-gray-400">
        {employee.children && employee.children.map((child) => <TreeNode key={child.id} employee={child} />)}
      </div>
    </div>
  );
 /*  export const FetchEmployees = createAsyncThunk<Employee[], void, { state: RootState }>(
    'employees/fetch',
    async () => {
      try {
        const response = await axios.get<EmployeesMap>('https://employee-list-d5b9f-default-rtdb.europe-west1.firebasedatabase.app/employees.json');
        console.log('axios response data:', response.data);
  
        // Convert the object to an array
     const dataArr = Object.values(response.data);

     // Filter out any null entries in the array
     const filteredData = dataArr.filter((item: Employee | null): item is Employee => item !== null);

     // Convert the filtered array to a map for easy access
     const employeesMap = filteredData.reduce((acc: EmployeesMap, curr: Employee) => {
         acc[curr.id] = { ...curr, children: [] };
         return acc;

     }, {});

     // Add employees as children to their respective parents
     for (const id in employeesMap) {
       const employee = employeesMap[id];
       if (employee.parentId && employeesMap[employee.parentId]) {
         employeesMap[employee.parentId].children.push(employee);
       }
     }

     // Filter out the top-level employees and set as state
     const topLevelEmployees = Object.values(employeesMap).filter((employee) => !employee.parentId);
     console.log('Top level employees:', topLevelEmployees);
        return topLevelEmployees;
  
      } catch (error) {
        console.error('axios error:', error);
        throw error; // this will be handled by rejected action
      }
    }
  ) */
 /*  export const FetchEmployees = createAsyncThunk(
    'employees/fetch',
    async (_, thunkAPI) => {
    const dispatch = useDispatch();
    try {
        const response = await axios.get<EmployeesMap>('https://employee-list-d5b9f-default-rtdb.europe-west1.firebasedatabase.app/employees.json');
        console.log('axios response data:', response.data);

     // Convert the object to an array
     const dataArr = Object.values(response.data);

     // Filter out any null entries in the array
     const filteredData = dataArr.filter((item: Employee | null): item is Employee => item !== null);

     // Convert the filtered array to a map for easy access
     const employeesMap = filteredData.reduce((acc: EmployeesMap, curr: Employee) => {
         acc[curr.id] = { ...curr, children: [] };
         return acc;

     }, {});

     // Add employees as children to their respective parents
     for (const id in employeesMap) {
       const employee = employeesMap[id];
       if (employee.parentId && employeesMap[employee.parentId]) {
         employeesMap[employee.parentId].children.push(employee);
       }
     }

     // Filter out the top-level employees and set as state
     const topLevelEmployees = Object.values(employeesMap).filter((employee) => !employee.parentId);
     console.log('Top level employees:', topLevelEmployees);

        dispatch({ type: 'employees/set', payload: topLevelEmployees });
    } catch (error) {
        console.error('axios error:', error);
    }
} ) */
// EmployeeTree component
export const EmployeeTree: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchEmployees());
  }, [dispatch]);

  return (
    <div className="mt-10">
      {employees && employees.map((employee: Employee) => <TreeNode key={employee.id} employee={employee} />)}
    </div>
  );
};
