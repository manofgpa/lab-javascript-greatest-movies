const movies = require('./data')

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

const getAllDirectors = (arr) => [...(new Set(arr.map(movie => movie.director)))]



// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
const howManyMovies = arr => arr
  .filter(movie => (movie.genre.includes('Drama') && movie.director === 'Steven Spielberg'))
  .length


// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(arr) {

  if (arr.length === 0) {
    return 0
  }

  const totalScore = arr.reduce((sum, movie) => {
    if (!movie.score) {
      return sum
    } else {
      return sum + movie.score
    }

  }, 0)

  return Math.round((totalScore / arr.length) * 100) / 100
}


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(arr) {
  let dramaMoviesLength = 0
  const total = arr.reduce((sum, movie) => {
    if (movie.genre.includes('Drama')) {
      dramaMoviesLength++
      return sum + movie.score
    }
    else {
      return sum
    }
  }, 0)

  if (dramaMoviesLength === 0) {

    return 0
  }

  return Math.round((total / dramaMoviesLength) * 100) / 100
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
const orderByYear = (arr) => [...arr]
  .sort((a, b) => a.year > b.year ? 1 : -1)



// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
const orderAlphabetically = (arr) => [...arr]
  .sort((a, b) => a.title > b.title ? 1 : -1)
  .slice(0, 20)
  .map(movie => movie.title)


// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(arr) {
  const minutesMovies = arr.map(movie => {
    const newDuration = movie.duration.split(' ')
    const hours = newDuration[0].replace('h', '')
    const minutes = newDuration[1] ? newDuration[1].replace('min', '') : 0
    const duration = +hours * 60 + +minutes


    return {
      ...movie,
      duration
    }
  })

  return minutesMovies
}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(arr) {

  if (arr.length === 0) {
    return null
  }

  const uniqueYears = [...new Set(arr.map(movie => movie.year))].sort()
  let moviesByYearArray = []

  uniqueYears.forEach(year => {
    moviesByYearArray = [...moviesByYearArray, arr.filter(movie => {
      return movie.year === year
    })]
  })

  let results = []

  moviesByYearArray.forEach(year => {
    results = [...results, { name: year[0].year, averageScore: year.reduce((acc, cur) => acc + cur.score, 0) / year.length }]
  })

  const bestYear = results.sort((a, b) => a.averageScore > b.averageScore ? -1 : 1)[0]


  return `The best year was ${bestYear.name} with an average score of ${bestYear.averageScore}`

}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  }
}
