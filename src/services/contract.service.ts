import { ethers } from 'ethers';
import { Match } from '../structures/match.struct';
import { PvPGridAbi } from './contracts/PvPGridABI';

// Конфигурация
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS 
const RPC_URL = process.env.RPC_URL 
const PRIVATE_KEY = process.env.PRIVATE_KEY 

export interface ContractMatch {
  id: number;
  createdAt: number;
  creator: string;
  players: string[];
  bid: number;
  total: number;
  count: number;
  status: number; // 0: waiting, 1: active, 2: finished
  token: string;
}

export interface ContractMatchInfo {
  id: number;
  createdAt: number;
  creator: string;
  players: string[];
  bid: number;
  total: number;
  count: number;
  status: number;
  token: string;
}

export class ContractService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      PvPGridABI,
      this.wallet
    );
  }

  /* Создать матч в контракте */
  async createMatch(
    playerAddress: string,
    bid: number,
    tokenAddress: string = ethers.ZeroAddress // Для нативного токена (ETH)
  ): Promise<number> {
    try {
      // Для нативного токена отправляем ETH вместе с транзакцией
      const tx = await this.contract.createMatch(
        tokenAddress,
        bid,
        ethers.ZeroAddress, // referrer (может быть нулевым)
        tokenAddress === ethers.ZeroAddress 
          ? { value: bid } // Для ETH отправляем value
          : {} // Для ERC-20 токенов value не отправляем
      );

      const receipt = await tx.wait();
      
      // Ищем событие MatchCreated
      const event = receipt.logs
        .map((log:any) => this.contract.interface.parseLog(log))
        .find((e:any) => e?.name === 'MatchCreated');

      if (!event) {
        throw new Error('MatchCreated event not found');
      }

      return event.args.matchId;
    } catch (error) {
      console.error('Error creating match in contract:', error);
      throw error;
    }
  }

  /* Присоединиться к матчу в контракте */
  async joinMatch(
    matchId: number,
    playerAddress: string,
    bid: number,
    tokenAddress: string = ethers.ZeroAddress
  ): Promise<void> {
    try {
      const tx = await this.contract.joinMatch(
        matchId,
        tokenAddress,
        ethers.ZeroAddress, // referrer
        tokenAddress === ethers.ZeroAddress 
          ? { value: bid }
          : {}
      );

      await tx.wait();
    } catch (error) {
      console.error('Error joining match in contract:', error);
      throw error;
    }
  }

  /* Стартовать матч в контракте (только backend может вызывать) */
  async startMatch(matchId: number, boardHash: string): Promise<void> {
    try {
      const tx = await this.contract.startMatch(
        matchId,
        boardHash
      );

      await tx.wait();
    } catch (error) {
      console.error('Error starting match in contract:', error);
      throw error;
    }
  }

  /* Завершить матч в контракте */
  async finishMatch(matchId: number, winnerAddress: string): Promise<void> {
    try {
      const tx = await this.contract.finishMatch(
        matchId,
        winnerAddress
      );

      await tx.wait();
    } catch (error) {
      console.error('Error finishing match in contract:', error);
      throw error;
    }
  }

  /* Получить информацию о матче из контракта */
  async getMatchInfo(matchId: number): Promise<ContractMatchInfo> {
    try {
      const result = await this.contract.getMatchInfo(matchId);
      
      return {
        id: Number(result.id),
        createdAt: Number(result.createdAt),
        creator: result.creator,
        players: result.players,
        bid: Number(result.bid),
        total: Number(result.total),
        count: Number(result.count),
        status: Number(result.status),
        token: result.token
      };
    } catch (error) {
      console.error('Error getting match info from contract:', error);
      throw error;
    }
  }

  /* Получить хеш доски из контракта */
  async getMatchBoardHash(matchId: number): Promise<string> {
    try {
      return await this.contract.getMatchBoardHash(matchId);
    } catch (error) {
      console.error('Error getting board hash from contract:', error);
      throw error;
    }
  }

  /* Получить баланс игрока в матче */
  async getPlayerBalance(matchId: number, playerAddress: string): Promise<number> {
    try {
      const balance = await this.contract.getPlayerBalance(matchId, playerAddress);
      return Number(balance);
    } catch (error) {
      console.error('Error getting player balance from contract:', error);
      throw error;
    }
  }

  /* Получить ожидающие матчи */
  async getWaitingMatches(): Promise<number[]> {
    try {
      const matches = await this.contract.getWaitingMatches();
      return matches.map((id: bigint) => Number(id));
    } catch (error) {
      console.error('Error getting waiting matches from contract:', error);
      throw error;
    }
  }

  /* Получить матчи игрока */
  async getPlayerMatches(playerAddress: string): Promise<number[]> {
    try {
      const matches = await this.contract.getPlayerMatches(playerAddress);
      return matches.map((id: bigint) => Number(id));
    } catch (error) {
      console.error('Error getting player matches from contract:', error);
      throw error;
    }
  }

  /* Получить параметры контракта */
  async getContractParams() {
    try {
      const [minBet, maxBet, houseEdge, cellCount] = await Promise.all([
        this.contract.minBetAmount(),
        this.contract.maxBetAmount(),
        this.contract.houseEdge(),
        this.contract.cellCount()
      ]);

      return {
        minBet: Number(minBet),
        maxBet: Number(maxBet),
        houseEdge: Number(houseEdge),
        cellCount: Number(cellCount)
      };
    } catch (error) {
      console.error('Error getting contract params:', error);
      throw error;
    }
  }

  /* Проверить, что средства депонированы */
  async verifyDeposits(matchId: number, players: string[]): Promise<boolean> {
    try {
      const matchInfo = await this.getMatchInfo(matchId);
      
      // Проверяем статус матча
      if (matchInfo.status !== 1) { // 1 = active в контракте
        return false;
      }

      // Проверяем, что все игроки внесли средства
      const balances = await Promise.all(
        players.map(player => this.getPlayerBalance(matchId, player))
      );

      return balances.every(balance => balance >= matchInfo.bid);
    } catch (error) {
      console.error('Error verifying deposits:', error);
      return false;
    }
  }
}

// Синглтон экземпляр
export const contractService = new ContractService();