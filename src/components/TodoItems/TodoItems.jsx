import React, {useEffect, useState} from 'react';
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
    const [sortedItems, setSortedItems] = useState(null);

    const {data: todoItems, isLoading} = useData();

    useEffect(() => {
        if (sortedItems) {
            const filteredBySearchItems = todoItems.filter((todoItem) => {
                const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
                const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
                return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 1;
            });
            setSortedItems(filteredBySearchItems.sort((a, b) => b.priority - a.priority));
        }
    }, [todoItems, searchValue, sortedItems]);

    if (!todoItems || isLoading) {
        return (
            <TodoItemsContainer>
                Загрузка данных...
            </TodoItemsContainer>
        );
    }

    const filteredBySearchItems = todoItems.filter((todoItem) => {
        const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
        const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
        return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 1;
    });

    const onClickHandler = () => {
        if (sortedItems) {
            setSortedItems(null)
            return;
        }
        setSortedItems(filteredBySearchItems.sort((a, b) => b.priority - a.priority));
    };

    const todoItemsElements = sortedItems ? sortedItems.map((item, index) => {
        return <TodoItem
            key={item.id}
            title={item.title}
            checked={item.isDone}
            id={item.id}
            priority={item.priority}/>;
    }) : filteredBySearchItems.map((item, index) => {
        return <TodoItem
            key={item.id}
            title={item.title}
            checked={item.isDone}
            id={item.id}
            priority={item.priority}/>;
    });

    return (
        <TodoItemsContainer>
            <SearchInput value={searchValue} setValue={setSearchValue} setSortedItems={setSortedItems} />
            <SortButton onClick={onClickHandler}>
                { sortedItems ? 'Не сортировать' : 'Отсортировать по приоритету' }
            </SortButton>
            {todoItemsElements}
            <NewTodoItem />
        </TodoItemsContainer>
    )
}
