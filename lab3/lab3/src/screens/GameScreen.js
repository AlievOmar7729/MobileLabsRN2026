import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import ScoreOrb from '../components/ScoreOrb';
import { useGame } from '../game-context';

const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: 14px 20px 32px;
  gap: 22px;
`;

const Hero = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 18px;
  padding: 18px 20px;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-opacity: 1;
  shadow-offset: 0px 10px;
  shadow-radius: 24px;
  elevation: 6;
`;

const Eyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ScoreText = styled.Text`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 52px;
  font-weight: 800;
  margin-top: 6px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
  line-height: 18px;
  margin-top: 8px;
  text-align: center;
`;

const Arena = styled.View`
  min-height: 280px;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
`;

const ActivityCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 18px;
  padding: 16px;
  gap: 10px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-opacity: 1;
  shadow-offset: 0px 10px;
  shadow-radius: 24px;
  elevation: 5;
`;

const ActivityTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 700;
`;

const ActivityText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 15px;
  line-height: 21px;
`;

const RuleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const RuleIcon = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, tone }) => (tone === 'green' ? theme.colors.softGreen : theme.colors.softBlue)};
`;

const RuleLabel = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
  font-weight: 600;
`;

const rules = [
  { id: 'tap', label: 'Tap: +1 point', icon: 'gesture-tap', tone: 'blue' },
  { id: 'double', label: 'Double-tap: +2 points', icon: 'gesture-double-tap', tone: 'blue' },
  { id: 'hold', label: 'Long-press (3s): +15 points', icon: 'gesture-tap-hold', tone: 'green' },
  { id: 'swipe', label: 'Swipe: +4..11 random points', icon: 'arrow-expand-horizontal', tone: 'blue' },
  { id: 'pinch', label: 'Pinch: +8 or +12 points', icon: 'resize', tone: 'green' },
];

export default function GameScreen() {
  const { score, stats, activity, addScore, markLongPressCompleted, markDrag, completedTasks } = useGame();

  const handleSingleTap = () => {
    addScore(1, 'Коротке натискання: +1 очко.', 'taps');
  };

  const handleDoubleTap = () => {
    addScore(2, 'Подвійний клік: +2 очки.', 'doubleTaps');
  };

  const handleLongPress = (durationMs) => {
    const points = durationMs >= 3000 ? 15 : 6;
    markLongPressCompleted(points, durationMs);
  };

  const handleFling = (direction) => {
    const points = Math.floor(Math.random() * 8) + 4;
    const statKey = direction === 'right' ? 'swipeRight' : 'swipeLeft';
    const directionLabel = direction === 'right' ? 'вправо' : 'вліво';

    addScore(points, `Свайп ${directionLabel}: +${points} випадкових очок.`, statKey);
  };

  const handlePinch = (gestureScale) => {
    const points = gestureScale > 1 ? 12 : 8;
    addScore(points, `Масштабування: +${points} бонусних очок.`, 'pinches');
  };

  return (
    <Screen>
      <Content>
        <Hero>
          <Eyebrow>Gesture Clicker</Eyebrow>
          <ScoreText>{score}</ScoreText>
          <Subtitle>{completedTasks} tasks completed</Subtitle>
        </Hero>

        <Arena>
          <ScoreOrb
            onSingleTap={handleSingleTap}
            onDoubleTap={handleDoubleTap}
            onLongPress={handleLongPress}
            onDrag={markDrag}
            onFling={handleFling}
            onPinch={handlePinch}
          />
        </Arena>

        <ActivityCard>
          <ActivityTitle>Actions</ActivityTitle>
          {rules.map((rule) => (
            <RuleRow key={rule.id}>
              <RuleIcon tone={rule.tone}>
                <MaterialCommunityIcons
                  name={rule.icon}
                  size={16}
                  color={rule.tone === 'green' ? '#22c55e' : '#1ea8f2'}
                />
              </RuleIcon>
              <RuleLabel>{rule.label}</RuleLabel>
            </RuleRow>
          ))}
          <ActivityText>{activity}</ActivityText>
        </ActivityCard>
      </Content>
    </Screen>
  );
}
