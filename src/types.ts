// src/types.ts

// 1. 방명록에 남길 참석자 정보의 형태를 새롭게 확장했습니다.
export interface GuestInfo {
    id: string;         // 참석자 고유 번호 (데이터베이스에서 구별하기 위한 용도)
    name: string;       // 참석자 이름 (중요: 서버에 저장 전 암호화 필수)
    department: string; // 소속 부서
    drink: string;      // 웰컴 드링크 (Red Wine, White Wine, Draft Beer, Safe Non-Alc)
    meal: string;       // 연회 코스 요리 (한우 안심 스테이크, 락토오보 채식, 셰프 특별 할랄식)
    shuttle: boolean;   // 귀가 셔틀 서비스 신청 여부 (true/false)
    message: string;    // 방명록에 남긴 축하 메시지나 슬로건
    timestamp: number;  // 글을 남긴 시간 (숫자 형태)
}

// 2. 좌석 배치도에서 한 좌석의 상태를 정의합니다.
export interface SeatInfo {
    id: string;         // 좌석 고유 번호 (예: 'A-1')
    isOccupied: boolean;// 자리가 이미 예약되었는지 여부 (true면 예약됨, false면 빈자리)
    reservedBy?: string;// 자리를 예약한 사람의 이름 (선택 사항, 빈자리일 수도 있으니까요)
}

// 3. 럭키 드로우(추첨) 경품 정보를 정의합니다.
export interface PrizeInfo {
    id: number;         // 경품 고유 번호
    name: string;       // 경품 이름 (예: '아이패드', '커피 쿠폰')
    winner?: string;    // 당첨자 이름 (추첨 전에는 없을 수도 있음)
}
