import React, {useMemo, useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import styled from "styled-components";

const SortButton = styled.button`
    background-color: #AAAAAA;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #999999;
    }
`;

export const TodoItems = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isSorted, setIsSorted] = useState(false);

    const {data: todoItems, isLoading} = useData();

    const filteredBySearchItems = useMemo(() => {
        if (!todoItems) return [];

        const filteredItems = todoItems.filter((todoItem) => {
            const clearedTodoItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
            const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
            return clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1 || clearedSearchValue.length < 3;
        });

        if (isSorted) {
            return filteredItems.sort((a, b) => b.priority - a.priority);
        }
        return filteredItems;
    }, [todoItems, searchValue, isSorted]);

    if (!todoItems || isLoading) {
        return (
            <TodoItemsContainer>
                Загрузка данных...
            </TodoItemsContainer>
        );
    }

    const onClickHandler = () => {
        setIsSorted((prev) => !prev);
    };

    const todoItemsElements = filteredBySearchItems.map((item, index) => (
        <TodoItem
            key={item.id}
            title={item.title}
            checked={item.isDone}
            id={item.id}
            priority={item.priority}
        />
    ));

    return (
        <TodoItemsContainer>
            <SearchInput value={searchValue} setValue={setSearchValue}/>
            <SortButton onClick={onClickHandler}>
                {isSorted ? 'Не сортировать' : 'Отсортировать по приоритету'}
            </SortButton>
            {todoItemsElements}
            <NewTodoItem />
        </TodoItemsContainer>
    )
}
