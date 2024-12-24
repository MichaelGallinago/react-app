import styled from "styled-components"
import {useUpdateTodoItem} from "../../data/hooks/useData";

const Select = styled.select`
    font-size: 16px;
    width: 40px;
    border: solid 1px gray;
    border-radius: 15%;
    height: 20px;
    background-color: #F6F6F6;
`

export const PrioritySelect = ({id, checked, priority, setPriorityForNewTask}) => {
    const priorityColors = ['#80FF80', '#C0FF80', '#FFFF80', '#FFC080', '#FF8080'];
    const backgroundColor = priorityColors[priority - 1] || '#FFFFFF';
    const priorities = [1, 2, 3, 4, 5]

    const {mutate} = useUpdateTodoItem();

    const onChangeHandler = (e) => {
        if (setPriorityForNewTask) {
            setPriorityForNewTask(e.target.value);
        }
        mutate({id, checked, priority: e.target.value});
    };

    const prioritiesElements = priorities.map(num =>
        <option key={num} value={num}>
            {num}
        </option>
    )

    return (
        <Select value={priority} onChange={onChangeHandler} style={{ backgroundColor, textAlign: 'center' }} >
            <>{prioritiesElements}</>
        </Select>
    );
}
