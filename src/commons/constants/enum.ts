/**
 * Enum Constants
 * 
 * This file contains all enum constants used throughout the application.
 * Includes emotion types with display text, images, and colors.
 */

import { light as colors } from './color';

// Emotion enum with comprehensive data structure
export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
}

// Emotion data interface
export interface EmotionData {
  type: EmotionType;
  displayText: string;
  images: {
    medium: string;
    small: string;
  };
  color: string;
}

// Color mapping for emotions (mapping to existing color system)
const emotionColors = {
  red60: colors.error[600],      // red60 -> error.600
  blue60: colors.primary[600],   // blue60 -> primary.600 
  gray60: colors.neutral[600],   // gray60 -> neutral.600
  yellow60: colors.warning[600], // yellow60 -> warning.600
  green60: colors.success[600],  // green60 -> success.600
} as const;

// Emotion configuration mapping
export const EMOTION_CONFIG: Record<EmotionType, EmotionData> = {
  [EmotionType.HAPPY]: {
    type: EmotionType.HAPPY,
    displayText: '행복해요',
    images: {
      medium: '/icons/emotion-happy-m.svg',
      small: '/icons/emotion-happy-s.svg',
    },
    color: emotionColors.red60,
  },
  [EmotionType.SAD]: {
    type: EmotionType.SAD,
    displayText: '슬퍼요',
    images: {
      medium: '/icons/emotion-sad-m.svg',
      small: '/icons/emotion-sad-s.svg',
    },
    color: emotionColors.blue60,
  },
  [EmotionType.ANGRY]: {
    type: EmotionType.ANGRY,
    displayText: '화나요',
    images: {
      medium: '/icons/emotion-angry-m.svg',
      small: '/icons/emotion-angry-s.svg',
    },
    color: emotionColors.gray60,
  },
  [EmotionType.SURPRISE]: {
    type: EmotionType.SURPRISE,
    displayText: '놀랐어요',
    images: {
      medium: '/icons/emotion-surprise-m.svg',
      small: '/icons/emotion-surprise-s.svg',
    },
    color: emotionColors.yellow60,
  },
  [EmotionType.ETC]: {
    type: EmotionType.ETC,
    displayText: '기타',
    images: {
      medium: '/icons/emotion-etc-m.svg',
      small: '/icons/emotion-etc-s.svg',
    },
    color: emotionColors.green60,
  },
} as const;

// Utility functions for emotion handling
export const getEmotionData = (type: EmotionType): EmotionData => {
  return EMOTION_CONFIG[type];
};

export const getEmotionDisplayText = (type: EmotionType): string => {
  return EMOTION_CONFIG[type].displayText;
};

export const getEmotionImages = (type: EmotionType) => {
  return EMOTION_CONFIG[type].images;
};

export const getEmotionColor = (type: EmotionType): string => {
  return EMOTION_CONFIG[type].color;
};

export const getAllEmotionTypes = (): EmotionType[] => {
  return Object.values(EmotionType);
};

export const getAllEmotionData = (): EmotionData[] => {
  return Object.values(EMOTION_CONFIG);
};

// Export types for TypeScript
export type EmotionTypeKey = keyof typeof EmotionType;
export type EmotionConfigKey = keyof typeof EMOTION_CONFIG;
