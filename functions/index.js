// NOW LOOKING AT THIS, I SHOULD HAVE NEVER HAVE DONE THIS. INSTEAD SHOULD HAVE USED A MICROSERVICE THAT READS THE DB AND CALCULATES THESE.
// OH WELL...

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const increaseOrCreate = (val) => (val || 0) + 1
const decreaseOrRemove = (val) => {
  // if curr is null or 1 (becoming 0/nonexistent) return null, otherwise -1 from curr
  if (!val || val <= 1) return null
  return val - 1
}

exports.increaseAttemptSummaries = functions.database.ref('/attemptsByID/{attemptID}')
  .onCreate((snapshot, context) => {
    const db = admin.database()
    const { exerciseID, studentID, cohortID, ID } = snapshot.val();

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

const UpdateStudentExerciseAndCohortCount = (studentID, exerciseID, cohortID) => (setterFunc) => (countToUpdate) => {
  return Promise.resolve()
    .then(() =>
      admin.database().ref(`/students/${studentID}/summary/${countToUpdate}`)
        .transaction(setterFunc)
    )
    .then(() =>
      admin.database().ref(`/exercises/${exerciseID}/summary/${countToUpdate}`)
        .transaction(setterFunc)
    )
    .then(() =>
      admin.database().ref(`/cohorts/${cohortID}/summary/${countToUpdate}`)
        .transaction(setterFunc)
    )
}

// exports.exerciseProgress = functions.database.ref('/students/{studentID}/exercises/{exerciseID}')
//   .onWrite((event, context) => {
//     const { studentID, exerciseID } = context.params
//     const alreadyAttempted = event.data && event.data.previous.exists()
//     const deleting = alreadyAttempted && !event.data.exists()
//     const studentRef = deleting ? event.data.previous.parent.parent : event.data.parent.parent
//     const cohortID = studentRef.val().cohortID


//     const UpdateAllCounts = UpdateStudentExerciseAndCohortCount(studentID, exerciseID, cohortID)

//     // deleting a student's record of an exercise, or the students record altogether
//     if(deleting) {
//       const countToDecrease = event.data.previous.val().completed ? 'completedCount' : 'unfinishedCount'
//       return UpdateAllCounts(decreaseOrRemove)(countToDecrease)
//     }

//     const isNowCompleted = event.data.val().completed

//     if(alreadyAttempted && isNowCompleted) {
//       return UpdateAllCounts(decreaseOrRemove)('unfinishedCount').then(() =>
//         UpdateAllCounts(increaseOrCreate)('completedCount')
//       )
//     }

//     if(isNowCompleted) {
//       return UpdateAllCounts(increaseOrCreate)('completedCount')
//     }

//     if(alreadyAttempted) {
//       return null // do nothing
//     }
//     admin.database().ref('go').set('attempt made')
//     // UpdateAllCounts(increaseOrCreate)('unfinishedCount')
//   })

//   // export.completeExercise = functions.database.ref

exports.exerciseProgressCreated = functions.database.ref('/students/{studentID}/exercises/{exerciseID}')
  .onCreate((snapshot, context) => {
    const { studentID, exerciseID } = context.params
    return snapshot.ref.parent.parent.child('cohortID').once('value').then((cohortSnapshot) => {
      const cohortID = cohortSnapshot.val()

      const countToIncrease = snapshot.val().completed ? 'completedCount' : 'unfinishedCount'

      return UpdateStudentExerciseAndCohortCount(studentID, exerciseID, cohortID)(increaseOrCreate)(countToIncrease)
    })
  })

exports.exerciseProgressUpdated = functions.database.ref('/students/{studentID}/exercises/{exerciseID}')
  .onUpdate((event, context) => {
    const { studentID, exerciseID } = context.params
    let cohortID
    const isNowComplete = event.data.val().completed

    return event.data.ref.parent.parent.once('value').then((cohortSnapshot) => {
      cohortID = cohortSnapshot.val().cohortID
      return Promise.resolve()
    }).then(() => {
      if (isNowComplete) {
        return UpdateStudentExerciseAndCohortCount(studentID, exerciseID, cohortID)(increaseOrCreate)('completedCount')
          .then(() =>
            UpdateStudentExerciseAndCohortCount(studentID, exerciseID, cohortID)(decreaseOrRemove)('unfinishedCount')
          )
      } else {
        return null
      }
    })

})