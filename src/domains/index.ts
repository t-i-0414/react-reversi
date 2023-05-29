export type * from './board/interface';
export type * from './game/interface';
export type * from './piece/interface';
export type * from './player/interface';
export type * from './square/interface';

export * as BoardDomainService from './board/service';
export * as GameDomainService from './game/service';

export * as BoardMock from './board/mock';
export * as GameMock from './game/mock';
export * as PlayerMock from './player/mock';
