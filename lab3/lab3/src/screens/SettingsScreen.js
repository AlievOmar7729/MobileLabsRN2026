import React from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import { useGame } from '../game-context';

const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 32,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  font-weight: 500;
`;

const Description = styled.Text`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
  line-height: 18px;
`;

const Card = styled.View`
  margin-top: 18px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  gap: 14px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-opacity: 1;
  shadow-offset: 0px 10px;
  shadow-radius: 24px;
  elevation: 5;
`;

const CardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const ThemeRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ThemeButton = styled(Pressable)`
  flex: 1;
  padding: 14px 10px;
  border-radius: 18px;
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.border)};
  background-color: ${({ theme, active }) => (active ? theme.colors.accent : theme.colors.surfaceElevated)};
`;

const ThemeButtonText = styled.Text`
  color: ${({ theme, active }) => (active ? theme.colors.background : theme.colors.text)};
  text-align: center;
  font-weight: 700;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 15px;
  line-height: 22px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SummaryLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 15px;
`;

const SummaryValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 800;
`;

const ResetButton = styled(Pressable)`
  margin-top: 8px;
  padding: 16px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.danger};
`;

const ResetButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
  font-weight: 800;
`;

const themeOptions = [
  { value: 'system', label: 'Система' },
  { value: 'light', label: 'Світла' },
  { value: 'dark', label: 'Темна' },
];

export default function SettingsScreen() {
  const { completedTasks, tasks, score, themeMode, setThemeMode, resetProgress } = useGame();

  return (
    <Screen>
      <Title>Налаштування</Title>
      <Description>Перемикайте тему застосунку та переглядайте зведену статистику виконання завдань.</Description>

      <Card>
        <CardTitle>Тема</CardTitle>
        <ThemeRow>
          {themeOptions.map((option) => (
            <ThemeButton key={option.value} active={themeMode === option.value} onPress={() => setThemeMode(option.value)}>
              <ThemeButtonText active={themeMode === option.value}>{option.label}</ThemeButtonText>
            </ThemeButton>
          ))}
        </ThemeRow>
        <InfoText>Режим "Система" підлаштовує вигляд під поточну тему пристрою.</InfoText>
      </Card>

      <Card>
        <CardTitle>Статус завдань</CardTitle>
        <SummaryRow>
          <SummaryLabel>Виконано</SummaryLabel>
          <SummaryValue>
            {completedTasks} / {tasks.length}
          </SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Поточний рахунок</SummaryLabel>
          <SummaryValue>{score} очок</SummaryValue>
        </SummaryRow>
        <InfoText>Ця сторінка дублює ключовий статус завдань, як вимагалося в умовах лабораторної.</InfoText>
        <ResetButton onPress={resetProgress}>
          <ResetButtonText>Скинути прогрес</ResetButtonText>
        </ResetButton>
      </Card>
    </Screen>
  );
}
