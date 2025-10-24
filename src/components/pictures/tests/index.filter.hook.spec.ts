/**
 * Pictures Filter Hook Tests
 * 
 * 강아지 사진 필터 기능 테스트
 * - 필터 옵션 목록 테스트
 * - 기본 필터 선택 테스트
 * - 필터 변경 시 이미지 크기 변경 테스트
 * - 필터 변경 핸들러 테스트
 */

import { describe, it, expect } from 'vitest';
import { 
  PictureFilterType, 
  getAllPictureFilterData, 
  getPictureFilterData 
} from '@/commons/constants/enum';
import { useFilter } from '../hooks/index.filter.hook';

describe('Picture Filter Functionality', () => {
  describe('필터 옵션', () => {
    it('필터 옵션 목록이 올바르게 생성되어야 한다', () => {
      const filterData = getAllPictureFilterData();
      
      expect(filterData).toHaveLength(3);
      expect(filterData).toEqual([
        { type: PictureFilterType.DEFAULT, displayText: '기본', imageSize: { width: 640, height: 640 } },
        { type: PictureFilterType.HORIZONTAL, displayText: '가로형', imageSize: { width: 640, height: 480 } },
        { type: PictureFilterType.VERTICAL, displayText: '세로형', imageSize: { width: 480, height: 640 } },
      ]);
    });

    it('기본 필터 데이터가 올바르게 반환되어야 한다', () => {
      const defaultData = getPictureFilterData(PictureFilterType.DEFAULT);
      
      expect(defaultData.type).toBe(PictureFilterType.DEFAULT);
      expect(defaultData.displayText).toBe('기본');
      expect(defaultData.imageSize).toEqual({ width: 640, height: 640 });
    });

    it('가로형 필터 데이터가 올바르게 반환되어야 한다', () => {
      const horizontalData = getPictureFilterData(PictureFilterType.HORIZONTAL);
      
      expect(horizontalData.type).toBe(PictureFilterType.HORIZONTAL);
      expect(horizontalData.displayText).toBe('가로형');
      expect(horizontalData.imageSize).toEqual({ width: 640, height: 480 });
    });

    it('세로형 필터 데이터가 올바르게 반환되어야 한다', () => {
      const verticalData = getPictureFilterData(PictureFilterType.VERTICAL);
      
      expect(verticalData.type).toBe(PictureFilterType.VERTICAL);
      expect(verticalData.displayText).toBe('세로형');
      expect(verticalData.imageSize).toEqual({ width: 480, height: 640 });
    });
  });

  describe('이미지 크기 계산', () => {
    it('기본 필터의 이미지 크기가 640x640이어야 한다', () => {
      const imageSize = getPictureFilterData(PictureFilterType.DEFAULT).imageSize;
      
      expect(imageSize.width).toBe(640);
      expect(imageSize.height).toBe(640);
    });

    it('가로형 필터의 이미지 크기가 640x480이어야 한다', () => {
      const imageSize = getPictureFilterData(PictureFilterType.HORIZONTAL).imageSize;
      
      expect(imageSize.width).toBe(640);
      expect(imageSize.height).toBe(480);
    });

    it('세로형 필터의 이미지 크기가 480x640이어야 한다', () => {
      const imageSize = getPictureFilterData(PictureFilterType.VERTICAL).imageSize;
      
      expect(imageSize.width).toBe(480);
      expect(imageSize.height).toBe(640);
    });
  });

  describe('useFilter Hook 동작', () => {
    it('기본 필터가 DEFAULT로 설정되어야 한다', () => {
      const hookResult = useFilter();
      
      expect(hookResult.selectedFilter).toBe(PictureFilterType.DEFAULT);
      expect(hookResult.currentImageSize).toEqual({ width: 640, height: 640 });
    });

    it('필터 옵션 목록이 올바르게 생성되어야 한다', () => {
      const hookResult = useFilter();
      
      expect(hookResult.filterOptions).toHaveLength(3);
      expect(hookResult.filterOptions).toEqual([
        { value: PictureFilterType.DEFAULT as string, label: '기본' },
        { value: PictureFilterType.HORIZONTAL as string, label: '가로형' },
        { value: PictureFilterType.VERTICAL as string, label: '세로형' },
      ]);
    });

    it('필터 변경시 이미지 크기가 올바르게 변경되어야 한다', () => {
      const hookResult = useFilter();
      
      // 가로형으로 변경
      hookResult.handleFilterChange(PictureFilterType.HORIZONTAL as string);
      expect(hookResult.selectedFilter).toBe(PictureFilterType.HORIZONTAL);
      expect(hookResult.currentImageSize).toEqual({ width: 640, height: 480 });
      
      // 세로형으로 변경
      hookResult.handleFilterChange(PictureFilterType.VERTICAL as string);
      expect(hookResult.selectedFilter).toBe(PictureFilterType.VERTICAL);
      expect(hookResult.currentImageSize).toEqual({ width: 480, height: 640 });
      
      // 기본으로 변경
      hookResult.handleFilterChange(PictureFilterType.DEFAULT as string);
      expect(hookResult.selectedFilter).toBe(PictureFilterType.DEFAULT);
      expect(hookResult.currentImageSize).toEqual({ width: 640, height: 640 });
    });
  });
});