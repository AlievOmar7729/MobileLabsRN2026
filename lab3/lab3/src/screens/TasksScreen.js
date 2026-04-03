import React from 'react';
import styled from 'styled-components/native';
import TaskList from '../components/TaskList';
import { useGame } from '../game-context';

const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 18,
    paddingBottom: 32,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  margin-bottom: 14px;
  gap: 6px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  font-weight: 500;
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
  line-height: 18px;
`;

const Summary = styled.View`
  margin-bottom: 14px;
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.softBlue};
  border-radius: 16px;
`;

const SummaryText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 600;
`;

export default function TasksScreen() {
  const { tasks, completedTasks } = useGame();

  return (
    <Screen>
      <Header>
        <Title>Завдання</Title>
        <Description>Прогрес оновлюється автоматично після кожної жестової взаємодії на екрані гри.</Description>
      </Header>
      <Summary>
        <SummaryText>
          Виконано {completedTasks} з {tasks.length} завдань
        </SummaryText>
      </Summary>
      <TaskList tasks={tasks} />
    </Screen>
  );
}
