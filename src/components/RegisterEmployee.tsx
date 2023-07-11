import React, { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { EmployeeTree } from "./EmployeeTree";
/* import { useDispatch } from 'react-redux'; */
import {useAppDispatch, FetchEmployees } from './Store';

const config = {
  apiKey: "AIzaSyAeqfuDaABRKYvdgneWiptC0fMrQsOepw4",
  authDomain: "employee-list-d5b9f.firebaseapp.com",
  databaseURL: "https://employee-list-d5b9f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "employee-list-d5b9f",
  storageBucket: "employee-list-d5b9f.appspot.com",
  messagingSenderId: "505041054295",
  appId: "1:505041054295:web:9ca64a4f39d829f9acd112",
  measurementId: "G-XN8H9BGXS7"
};

let app;
if (!getApps().length) {
  app = initializeApp(config);
} else {
  app = getApp();
}

const db = getDatabase(app);

export const RegisterEmployee = () => {
  const dispatch = useAppDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm({
    initialValues: {
      id: '',
      email: '',
      name: '',
      position: '',
      parentId: '',
    },
  });


  const handleSubmit = () => {
    
    const employee = {
      
      id: form.values.id,
      email: form.values.email,
      name: form.values.name,
      position: form.values.position,
      parentId: form.values.parentId || null,
    };

    set(ref(db, 'employees/' + employee.id), employee)
    .then(() => {
      console.log('Data write successful');
      form.reset();
  
      setIsSubmitted(true);
  
      dispatch(FetchEmployees()); // trigger a re-fetch
    })
    .catch((error) => {
      console.error('Data write failed:', error);
    })
    .catch((error) => {
      console.error('Data write failed:', error);
    });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="ID" required {...form.getInputProps('id')} />
        <TextInput label="Email" required {...form.getInputProps('email')} />
        <TextInput label="Name" required {...form.getInputProps('name')} />
        <TextInput label="Position" required {...form.getInputProps('position')} />
        <TextInput label="Parent ID" {...form.getInputProps('parentId')} />
        <Button variant="outline" type="submit">
          Register Employee
        </Button>
      </form>
      {isSubmitted && <EmployeeTree />}
    </>
  )
};
