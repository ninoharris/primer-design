// URLs (for links) and paths (for routers)
export const getAdminURL = () => `/admin`

export const getCohortsURL = () => `/admin/cohorts`

export const getCohortURL = (cohortID) => `/admin/cohorts/${cohortID}`
export const getCohortPath = () => `/admin/cohorts/:id`

export const getCohortManageURL = (cohortID) => `/admin/cohorts/${cohortID}/manage`
export const getCohortManagePath = () => `/admin/cohorts/:id/manage`

export const getCohortExercisesURL = (cohortID) => `/admin/cohorts/${cohortID}/exercises`
export const getCohortExercisesPath = () => `/admin/cohorts/:id/exercises`

export const getCohortManageExercisesURL = (cohortID) => `/admin/cohorts/${cohortID}/exercises/manage`
export const getCohortManageExercisesPath = () => `/admin/cohorts/:id/exercises/manage`

export const getExercisesURL = () => `/admin/exercises`

export const getExerciseURL = (exerciseID) => `/admin/exercises/${exerciseID}`
export const getExercisePath = () => `/admin/exercises/:id`

export const getExerciseCreateURL = () => `/admin/exercises/create`

export const getMyAccountURL = () => `/admin/my-account`
