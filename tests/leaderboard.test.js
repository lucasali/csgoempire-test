/**
 *
 *  THIS IS A TESTING FILE. YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO TEST YOUR WORK.
 *  PLEASE DON´T CHANGE THE INTERFACE OF leagueService.js METHODS
 *
 */

require('jest-fetch-mock').enableMocks()
fetchMock.dontMock()

import LeagueService from '../src/services/LeagueService'

describe('laderboard', () => {
  let leagueService

  beforeEach(() => {
    leagueService = new LeagueService()
  })

  test('check-leaderboard-teams', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ]
    leagueService.setMatches(matches)

    const leaderboard = leagueService.getLeaderboard()

    const firstTeam = leaderboard[0]
    expect(firstTeam.teamName).toBe('Brazil')
    expect(firstTeam.matchesPlayed).toBe(1)
    expect(firstTeam.goalsFor).toBe(2)
    expect(firstTeam.goalsAgainst).toBe(1)
    expect(firstTeam.points).toBe(3)

    const secondTeam = leaderboard[1]
    expect(secondTeam.teamName).toBe('France')
    expect(secondTeam.matchesPlayed).toBe(1)
    expect(secondTeam.goalsFor).toBe(1)
    expect(secondTeam.goalsAgainst).toBe(2)
    expect(secondTeam.points).toBe(0)
  })

  test('should update leaderboard correctly for a single match', () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ]
    leagueService.setMatches(matches)
    leagueService.updateLeaderboard()

    const leaderboard = leagueService.getLeaderboard()

    expect(leaderboard.length).toBe(2)

    const firstTeam = leaderboard[0]
    expect(firstTeam.teamName).toBe('Brazil')
    expect(firstTeam.matchesPlayed).toBe(1)
    expect(firstTeam.goalsFor).toBe(2)
    expect(firstTeam.goalsAgainst).toBe(1)
    expect(firstTeam.points).toBe(3)

    const secondTeam = leaderboard[1]
    expect(secondTeam.teamName).toBe('France')
    expect(secondTeam.matchesPlayed).toBe(1)
    expect(secondTeam.goalsFor).toBe(1)
    expect(secondTeam.goalsAgainst).toBe(2)
    expect(secondTeam.points).toBe(0)
  })

  test('should update leaderboard correctly for multiple matches', () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      },
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'Germany',
        matchPlayed: true,
        homeTeamScore: 3,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Germany',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1
      }
    ]
    leagueService.setMatches(matches)
    leagueService.updateLeaderboard()

    const leaderboard = leagueService.getLeaderboard()

    expect(leaderboard.length).toBe(3)

    leaderboard.sort((a, b) => b.points - a.points)

    const firstTeam = leaderboard[0]
    expect(firstTeam.teamName).toBe('Brazil')
    expect(firstTeam.matchesPlayed).toBe(2)
    expect(firstTeam.goalsFor).toBe(5)
    expect(firstTeam.goalsAgainst).toBe(1)
    expect(firstTeam.points).toBe(6)

    const secondTeam = leaderboard[1]
    expect(secondTeam.teamName).toBe('Germany')
    expect(secondTeam.matchesPlayed).toBe(2)
    expect(secondTeam.goalsFor).toBe(1)
    expect(secondTeam.goalsAgainst).toBe(4)
    expect(secondTeam.points).toBe(1)

    const thirdTeam = leaderboard[2]
    expect(thirdTeam.teamName).toBe('France')
    expect(thirdTeam.matchesPlayed).toBe(2)
    expect(thirdTeam.goalsFor).toBe(2)
    expect(thirdTeam.goalsAgainst).toBe(3)
    expect(thirdTeam.points).toBe(1)
  })

  test('should correctly set matches and update leaderboard', () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ]
    leagueService.setMatches(matches)

    expect(leagueService.matches).toEqual(matches)

    const leaderboard = leagueService.getLeaderboard()
    expect(leaderboard.length).toBe(2)

    const firstTeam = leaderboard[0]
    expect(firstTeam.teamName).toBe('Brazil')
    expect(firstTeam.matchesPlayed).toBe(1)
    expect(firstTeam.goalsFor).toBe(2)
    expect(firstTeam.goalsAgainst).toBe(1)
    expect(firstTeam.points).toBe(3)

    const secondTeam = leaderboard[1]
    expect(secondTeam.teamName).toBe('France')
    expect(secondTeam.matchesPlayed).toBe(1)
    expect(secondTeam.goalsFor).toBe(1)
    expect(secondTeam.goalsAgainst).toBe(2)
    expect(secondTeam.points).toBe(0)
  })

  test('should return an empty array when no matches are set', () => {
    const matches = leagueService.getMatches()
    expect(matches).toEqual([])
  })

  test('should return the correct matches when matches are set', () => {
    const testMatches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ]
    leagueService.setMatches(testMatches)

    const matches = leagueService.getMatches()
    expect(matches).toEqual(testMatches)
  })

  test('should return the correct leaderboard when matches are set', () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ]
    leagueService.setMatches(matches)
    leagueService.updateLeaderboard()

    const leaderboard = leagueService.getLeaderboard()
    expect(leaderboard.length).toBe(2)

    const firstTeam = leaderboard[0]
    expect(firstTeam.teamName).toBe('Brazil')
    expect(firstTeam.matchesPlayed).toBe(1)
    expect(firstTeam.goalsFor).toBe(2)
    expect(firstTeam.goalsAgainst).toBe(1)
    expect(firstTeam.points).toBe(3)

    const secondTeam = leaderboard[1]
    expect(secondTeam.teamName).toBe('France')
    expect(secondTeam.matchesPlayed).toBe(1)
    expect(secondTeam.goalsFor).toBe(1)
    expect(secondTeam.goalsAgainst).toBe(2)
    expect(secondTeam.points).toBe(0)
  })

  test('should return an empty array when no matches are set', () => {
    const leaderboard = leagueService.getLeaderboard()
    expect(leaderboard).toEqual([])
  })
})
