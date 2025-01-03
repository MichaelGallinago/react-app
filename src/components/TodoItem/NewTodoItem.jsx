import React, {useEffect, useRef, useState} from 'react';
import {TodoItemContainer} from './TodoItemContainer';
import {TodoItemCheckbox} from './TodoItemCheckbox';
import styled from 'styled-components';
import {useSaveNewTodoItem} from '../../data/hooks/useData';
import {PrioritySelect} from './PrioritySelect';


const Input = styled.input`
    flex-grow: 1;
    border: 1px solid #ccc;
    padding: 5px;
    
    &::placeholder {
        font-size: 15px;
        color: rgba(63, 63, 63, 0.6);
    }
`

export const NewTodoItem = () => {
    const {mutate, isPending, isSuccess} = useSaveNewTodoItem();
    const [value, setValue] = useState('');
    const [priority, setPriority] = useState(1);
    const inputRef = useRef();

    useEffect(() => {
        if (!isPending && isSuccess) {
            setValue('');
        }
    }, [isPending, isSuccess]);

    const onInputChange = (event) => {
        const newValue = event.nativeEvent.target.value;
        const clearedValue = newValue.replace(/\d/, '');
        setValue(clearedValue);
    }

    const onInputKeyPressed = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        if (value === '') {
            alert('Значение поля не должно быть пустым');
            return;
        }

        mutate({title: value, priority: priority});
    }

    return (
        <TodoItemContainer>
            <TodoItemCheckbox disabled={true}/>
            <PrioritySelect priority={priority} setPriorityForNewTask={setPriority}/>
            <Input
                ref={inputRef}
                value={value}
                onChange={onInputChange}
                onKeyDown={onInputKeyPressed}
                placeholder='Напишите задание...'
                disabled={isPending}
            />
        </TodoItemContainer>
    )
}
