const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.increaseAttemptSummaries = functions.database.ref('/attemptsByID/{attemptID}')
  .onCreate((snapshot, context) => {
    const db = admin.database()
    const { exerciseID, studentID, cohortID, ID } = snapshot.val();
    const increaseOrCreate = (val) => (val || 0) + 1

    return Promise.resolve()
    .then(() =>
      db.ref(`/students/${studentID}/summary/attemptsCount/${ID}`)
      .transaction(increaseOrCreate)
    )
    .then(() =>
      db.ref(`/exercises/${exerciseID}/summary/attemptsCount/${ID}`)
      .transaction(increaseOrCreate)
    )
    .then(() =>
      db.ref(`/cohorts/${cohortID}/summary/attemptsCount/${ID}`)
      .transaction(increaseOrCreate)
    )
  })

exports.decreaseAttemptSummaries = functions.database.ref('/attemptsByID/{attemptID}')
  .onDelete((snapshot, context) => {
    const db = admin.database()
    const { exerciseID, studentID, cohortID, ID } = snapshot.val();
    const decreaseOrRemove = (val) => {
      // if curr is null or 1 (becoming 0/nonexistent) return null, otherwise -1 from curr
      if(!val || val <= 1) return null
      return val - 1
    }

    return Promise.resolve()
      .then(() =>
        db.ref(`/students/${studentID}/summary/attemptsCount/${ID}`)
        .transaction(decreaseOrRemove)
      )
      .then(() =>
        db.ref(`/exercises/${exerciseID}/summary/attemptsCount/${ID}`)
        .transaction(decreaseOrRemove)
      )
      .then(() =>
        db.ref(`/cohorts/${cohortID}/summary/attemptsCount/${ID}`)
        .transaction(decreaseOrRemove)
      )
  })

  // export.completeExercise = functions.database.ref