import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';

const List = styled.View`
  gap: 12px;
`;

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, completed }) => (completed ? theme.colors.softGreen : theme.colors.softBlue)};
  border-radius: 18px;
  padding: 14px 16px;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const IconWrap = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, completed }) => (completed ? theme.colors.softGreen : theme.colors.softBlue)};
`;

const Main = styled.View`
  flex: 1;
`;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Title = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 700;
`;

const Badge = styled.View`
  margin-left: 8px;
`;

const Description = styled.Text`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
  line-height: 18px;
`;

const ProgressBar = styled.View`
  margin-top: 12px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.View`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ theme, completed }) => (completed ? theme.colors.success : theme.colors.accent)};
`;

const ProgressText = styled.Text`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  font-weight: 600;
`;

export default function TaskList({ tasks }) {
  const theme = useTheme();

  const getIcon = (taskId, completed, colors) => {
    const color = completed ? colors.success : colors.accent;

    switch (taskId) {
      case 'tap-ten':
        return <MaterialCommunityIcons name="gesture-tap" size={18} color={color} />;
      case 'double-five':
        return <MaterialCommunityIcons name="gesture-double-tap" size={18} color={color} />;
      case 'hold-three-seconds':
        return <MaterialCommunityIcons name="gesture-tap-hold" size={18} color={color} />;
      case 'drag-once':
        return <MaterialCommunityIcons name="drag-variant" size={18} color={color} />;
      case 'fling-right':
        return <Feather name="arrow-right" size={18} color={color} />;
      case 'fling-left':
        return <Feather name="arrow-left" size={18} color={color} />;
      case 'pinch-once':
        return <MaterialCommunityIcons name="resize" size={18} color={color} />;
      case 'score-hundred':
        return <MaterialCommunityIcons name="star-four-points-outline" size={18} color={color} />;
      default:
        return <MaterialCommunityIcons name="shape-outline" size={18} color={color} />;
    }
  };

  return (
    <List>
      {tasks.map((task) => {
        const width = Math.min((task.progress / task.target) * 100, 100);

        return (
          <Card key={task.id} completed={task.completed}>
            <IconWrap completed={task.completed}>{getIcon(task.id, task.completed, theme.colors)}</IconWrap>
            <Main>
              <TitleRow>
                <Title>{task.title}</Title>
                <Badge>
                  {task.completed ? (
                    <Feather name="check-circle" size={18} color="#22c55e" />
                  ) : (
                    <Feather name="circle" size={18} color="#9ca3af" />
                  )}
                </Badge>
              </TitleRow>
              <Description>{task.description}</Description>
              <ProgressBar>
                <ProgressFill width={width} completed={task.completed} />
              </ProgressBar>
              <ProgressText>
                {Math.min(task.progress, task.target)} / {task.target}
              </ProgressText>
            </Main>
          </Card>
        );
      })}
    </List>
  );
}
