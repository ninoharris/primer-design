import * as firebase from 'firebase'


var config = {
  apiKey: "AIzaSyCbwCc9Bdc0QC7OgEx91K_y629J7Txr04c",
  authDomain: "primer-design-dd8e7.firebaseapp.com",
  databaseURL: "https://primer-design-dd8e7.firebaseio.com",
  projectId: "primer-design-dd8e7",
  storageBucket: "primer-design-dd8e7.appspot.com",
  messagingSenderId: "1072741661175"
}
firebase.initializeApp(config)

const db = firebase.database()
const emailAuthProvider = new firebase.auth.EmailAuthProvider()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  db as default,
  googleAuthProvider,
  emailAuthProvider,
  firebase,
}

// db.ref('expenses')
// .orderByKey()
// .on('value', (snapshot => {
//   const expenses = []
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })

//     const counts = []
//   const repeatedExpensesList = []

//   expenses.forEach((expense) => {
//     if(counts.includes(expense.description)) {
//       repeatedExpensesList.push(expense.id)
//     } else {
//       counts.push(expense.description)
//     }
//   })

//   Promise.all(repeatedExpensesList.map(id => {
//     return db.ref(`expenses/${id}`).remove()
//   })).then(() => console.log('The following expenses were deleted:', repeatedExpensesList || 'oh, none...'))
// }))

// db.ref('expenses').on('child_removed', (snapshot) => {
//   console.log('Expense removed with id of `', snapshot.key, '` with value of: ', snapshot.val())
// })

// db.ref('expenses').on('child_changed', (snapshot) => {
//   console.log('Expense changed with id of `', snapshot.key, '` with a new value of ', snapshot.val())
// })
//   databaseURL: "https://primer-design-dd8e7.firebaseio.com",
//   projectId: "primer-design-dd8e7",
//   storageBucket: "primer-design-dd8e7.appspot.com",
//   messagingSenderId: "1072741661175"
// }
// firebase.initializeApp(config)

// const db = firebase.database()

// db.ref('expenses')
// .orderByKey()
// .on('value', (snapshot => {
//   const expenses = []
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })

//     const counts = []
//   const repeatedExpensesList = []

//   expenses.forEach((expense) => {
//     if(counts.includes(expense.description)) {
//       repeatedExpensesList.push(expense.id)
//     } else {
//       counts.push(expense.description)
//     }
//   })

//   Promise.all(repeatedExpensesList.map(id => {
//     return db.ref(`expenses/${id}`).remove()
//   })).then(() => console.log('The following expenses were deleted:', repeatedExpensesList || 'oh, none...'))
// }))

// db.ref('expenses').on('child_removed', (snapshot) => {
//   console.log('Expense removed with id of `', snapshot.key, '` with value of: ', snapshot.val())
// })

// db.ref('expenses').on('child_changed', (snapshot) => {
//   console.log('Expense changed with id of `', snapshot.key, '` with a new value of ', snapshot.val())
// })
//   databaseURL: "https://primer-design-dd8e7.firebaseio.com",
//   projectId: "primer-design-dd8e7",
//   storageBucket: "primer-design-dd8e7.appspot.com",
//   messagingSenderId: "1072741661175"
// }
// firebase.initializeApp(config)

// const db = firebase.database()

// db.ref('expenses')
// .orderByKey()
// .on('value', (snapshot => {
//   const expenses = []
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })

//     const counts = []
//   const repeatedExpensesList = []

//   expenses.forEach((expense) => {
//     if(counts.includes(expense.description)) {
//       repeatedExpensesList.push(expense.id)
//     } else {
//       counts.push(expense.description)
//     }
//   })

//   Promise.all(repeatedExpensesList.map(id => {
//     return db.ref(`expenses/${id}`).remove()
//   })).then(() => console.log('The following expenses were deleted:', repeatedExpensesList || 'oh, none...'))
// }))

// db.ref('expenses').on('child_removed', (snapshot) => {
//   console.log('Expense removed with id of `', snapshot.key, '` with value of: ', snapshot.val())
// })

// db.ref('expenses').on('child_changed', (snapshot) => {
//   console.log('Expense changed with id of `', snapshot.key, '` with a new value of ', snapshot.val())
// })
// .then(expenses => {
//   const counts = []
//   const repeatedExpensesList = []
//   expenses.forEach((expense) => {
//     if(counts.includes(expense.description)) {
//       repeatedExpensesList.push(expense.id)
//     } else {
//       counts.push(expense.description)
//     }
//   })
//   return repeatedExpensesList
// })
// .then(repeatedExpensesList => {
//   repeatedExpensesList.forEach(id => {
//     db.ref(`expenses/${id}`).remove()
//   })
//   return repeatedExpensesList
// })
// .then(repeatedExpensesList => {
//   console.log('The following expenses were removed:', repeatedExpensesList)
// })