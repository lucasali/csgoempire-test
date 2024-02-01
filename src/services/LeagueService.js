/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
  /**
   * Represents a LeagueService singleton  object.
   * @constructor
   */
  constructor() {
    this.matches = []
    this.leaderboard = []
  }

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches
    this.updateLeaderboard()
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    return this.leaderboard
  }

  /**
   * Updates the leaderboard based on the matches played.
   */
  updateLeaderboard() {
    let leaderboard = {}

    this.matches.forEach(match => {
      if (match.matchPlayed) {
        if (!leaderboard[match.homeTeam]) {
          leaderboard[match.homeTeam] = {
            teamName: match.homeTeam,
            matchesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0
          }
        }
        if (!leaderboard[match.awayTeam]) {
          leaderboard[match.awayTeam] = {
            teamName: match.awayTeam,
            matchesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0
          }
        }

        leaderboard[match.homeTeam].matchesPlayed++
        leaderboard[match.awayTeam].matchesPlayed++

        leaderboard[match.homeTeam].goalsFor += match.homeTeamScore
        leaderboard[match.homeTeam].goalsAgainst += match.awayTeamScore

        leaderboard[match.awayTeam].goalsFor += match.awayTeamScore
        leaderboard[match.awayTeam].goalsAgainst += match.homeTeamScore

        if (match.homeTeamScore > match.awayTeamScore) {
          leaderboard[match.homeTeam].points += 3
        } else if (match.homeTeamScore < match.awayTeamScore) {
          leaderboard[match.awayTeam].points += 3
        } else {
          leaderboard[match.homeTeam].points++
          leaderboard[match.awayTeam].points++
        }
      }
    })

    this.leaderboard = Object.values(leaderboard).sort((a, b) =>
      a.points < b.points ? 1 : -1
    )
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    const url = 'http://localhost:3001/api/v1/getAllMatches'

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()

    this.setMatches(data.matches)
  }
}

export default LeagueService
