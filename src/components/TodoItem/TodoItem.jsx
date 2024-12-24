import React from 'react';
import styled, {css} from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useDeleteTodoItem} from '../../data/hooks/useData';
import {PrioritySelect} from './PrioritySelect';

const checkedCss = css`
    color: #B5B5BA;
    text-decoration: line-through;
`

const Title = styled.span(props => {
    return `
    width: 60%;
    font-size: 15px;
    overflow-wrap: break-word;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
    width: 20px;
    height: 20px;
    background-image: url(/assets/images/png/delete.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px;
    cursor: pointer;
`;

export const TodoItem = ({title, checked, id, priority}) => {
    const {mutate} = useDeleteTodoItem();
    const onClickDeleteHandler = () => {
        if (window.confirm(`Удалить задание с названием: "${title}"?`)) {
            mutate({id});
        }
    }

    return (
        <TodoItemContainer>
            <TodoItemCheckbox checked={checked} disabled={false} id={id} priority={priority}/>
            <PrioritySelect checked={checked} id={id} priority={priority}/>
            <Title checked={checked}>
                {title}
            </Title>
            <Delete onClick={onClickDeleteHandler}/>
        </TodoItemContainer>
    )
}
