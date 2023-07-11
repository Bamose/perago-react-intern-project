import { configureStore, createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Employee, EmployeesMap } from "./EmployeeTree";

export const FetchEmployees = createAsyncThunk<Employee[], void, { state: RootState }>(
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
)
const employeesSlice = createSlice({
  name: 'employees',
  initialState: [] as Employee[],  // specify the Employee type for your initial state
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchEmployees.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const Store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
type AppDispatch = typeof Store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()