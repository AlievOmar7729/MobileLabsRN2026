import React, { useRef } from 'react';
import { Animated } from 'react-native';
import {
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const Frame = styled.View`
  align-items: center;
  justify-content: center;
`;

const Orb = styled(Animated.View)`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.orb};
  align-items: center;
  justify-content: center;
  border: 10px solid ${({ theme }) => theme.colors.surface};
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: 0px 18px;
  shadow-radius: 30px;
  elevation: 12;
`;

const OrbLabel = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: 22px;
  font-weight: 800;
  text-align: center;
`;

const OrbHint = styled.Text`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.background};
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
  text-align: center;
`;

export default function ScoreOrb({ onSingleTap, onDoubleTap, onLongPress, onDrag, onFling, onPinch }) {
  const doubleTapRef = useRef(null);
  const longPressRef = useRef(null);
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const translation = useRef(new Animated.ValueXY()).current;
  const baseScaleValue = useRef(1);
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = useRef(Animated.multiply(baseScale, pinchScale)).current;
  const dragStarted = useRef(false);
  const longPressStart = useRef(0);
  const pinchRewarded = useRef(false);

  const handleSingleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      onSingleTap();
    }
  };

  const handleDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      onDoubleTap();
    }
  };

  const handleLongPress = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) {
      longPressStart.current = Date.now();
    }

    if (nativeEvent.state === State.ACTIVE) {
      const duration = Math.max(Date.now() - longPressStart.current, nativeEvent.duration || 0);
      onLongPress(duration);
    }
  };

  const handlePanGesture = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translation.x,
          translationY: translation.y,
        },
      },
    ],
    {
      useNativeDriver: false,
      listener: (event) => {
        const { translationX = 0, translationY = 0 } = event.nativeEvent || {};

        if (!dragStarted.current && (Math.abs(translationX) > 12 || Math.abs(translationY) > 12)) {
          dragStarted.current = true;
          onDrag();
        }
      },
    },
  );

  const handlePanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const { translationX = 0, velocityX = 0 } = nativeEvent;
      const isSwipe = Math.abs(translationX) > 70 || Math.abs(velocityX) > 700;

      if (isSwipe) {
        onFling(translationX >= 0 ? 'right' : 'left');
      }

      Animated.spring(translation, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        friction: 6,
        tension: 70,
      }).start();
      dragStarted.current = false;
    }
  };

  const handlePinchGesture = Animated.event([{ nativeEvent: { scale: pinchScale } }], {
    useNativeDriver: false,
    listener: (event) => {
      const { scale: gestureScale = 1 } = event.nativeEvent || {};

      if (!pinchRewarded.current && Math.abs(gestureScale - 1) > 0.18) {
        pinchRewarded.current = true;
        onPinch(gestureScale);
      }
    },
  });

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      baseScaleValue.current *= nativeEvent.scale;
      baseScale.setValue(baseScaleValue.current);
      pinchScale.setValue(1);
      pinchRewarded.current = false;
    }
  };

  return (
    <Frame>
      <PanGestureHandler ref={panRef} onGestureEvent={handlePanGesture} onHandlerStateChange={handlePanStateChange}>
        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={handlePinchGesture}
          onHandlerStateChange={handlePinchStateChange}
          simultaneousHandlers={panRef}
        >
          <LongPressGestureHandler
            ref={longPressRef}
            minDurationMs={3000}
            maxDist={20}
            simultaneousHandlers={[panRef, pinchRef]}
            onHandlerStateChange={handleLongPress}
          >
            <TapGestureHandler waitFor={[doubleTapRef, longPressRef]} onHandlerStateChange={handleSingleTap}>
              <TapGestureHandler ref={doubleTapRef} numberOfTaps={2} waitFor={longPressRef} onHandlerStateChange={handleDoubleTap}>
                <Orb
                  style={{
                    transform: [
                      { translateX: translation.x },
                      { translateY: translation.y },
                      { scale },
                    ],
                  }}
                >
                  <OrbLabel>CLACK</OrbLabel>
                  <OrbHint>Tap, hold, drag, fling, pinch</OrbHint>
                </Orb>
              </TapGestureHandler>
            </TapGestureHandler>
          </LongPressGestureHandler>
        </PinchGestureHandler>
      </PanGestureHandler>
    </Frame>
  );
}
