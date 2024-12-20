import React from 'react';
import {RootWrapper} from './components/common/RootWrapper';
import {TodoItems} from './components/TodoItems/TodoItems'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient();

export const App = () => {
    return (
        <RootWrapper>
            <QueryClientProvider client={queryClient}>
                <TodoItems/>
            </QueryClientProvider>
        </RootWrapper>
    );
}
